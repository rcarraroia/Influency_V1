import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

/**
 * API Client
 * 
 * Cliente HTTP configurado com Axios para comunicação com o backend.
 * Inclui interceptors para autenticação, refresh token e tratamento de erros.
 */

// Base URL da API (configurável via variável de ambiente)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

// Criar instância do Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Adicionar token JWT no header
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Obter access token do SecureStore
      const accessToken = await SecureStore.getItemAsync('accessToken');

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    } catch (error) {
      console.error('Error adding auth token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Refresh automático de token em 401
apiClient.interceptors.response.use(
  (response) => {
    // Resposta bem-sucedida, retornar dados
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Se erro 401 (Unauthorized) e não é retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Obter refresh token
        const refreshToken = await SecureStore.getItemAsync('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Tentar refresh do token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token: newRefreshToken } = response.data;

        // Salvar novos tokens
        await SecureStore.setItemAsync('accessToken', access_token);
        if (newRefreshToken) {
          await SecureStore.setItemAsync('refreshToken', newRefreshToken);
        }

        // Atualizar header da requisição original
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        // Retentar requisição original
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh falhou, fazer logout
        console.error('Token refresh failed:', refreshError);
        
        // Limpar tokens
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');

        // Redirecionar para login
        router.replace('/(auth)/login');

        return Promise.reject(refreshError);
      }
    }

    // Outros erros, rejeitar
    return Promise.reject(error);
  }
);

/**
 * Tipos de erro da API
 */
export class NetworkError extends Error {
  constructor(message: string = 'Erro de conexão. Verifique sua internet.') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  public errors: Record<string, string[]>;

  constructor(errors: Record<string, string[]>, message: string = 'Erro de validação') {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class ApiError extends Error {
  public statusCode: number;
  public data?: any;

  constructor(statusCode: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Tratamento de erros da API
 */
export function handleApiError(error: any): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Erro de rede (sem resposta do servidor)
    if (!axiosError.response) {
      throw new NetworkError();
    }

    const { status, data } = axiosError.response;

    // Erro de validação (422)
    if (status === 422 && data && typeof data === 'object' && 'errors' in data) {
      throw new ValidationError(
        (data as any).errors,
        (data as any).message || 'Erro de validação'
      );
    }

    // Outros erros da API
    throw new ApiError(
      status,
      (data as any)?.message || axiosError.message,
      data
    );
  }

  // Erro desconhecido
  throw error;
}

export default apiClient;
