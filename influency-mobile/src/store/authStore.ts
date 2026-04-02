import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as secureStorage from '../utils/secureStorage';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Store
export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: true,
  isAuthenticated: false,

  // Login
  login: async (email: string, password: string) => {
    try {
      // TODO: Integrar com API real quando backend estiver pronto
      // const response = await authService.login(email, password);
      
      // Mock de resposta da API
      const mockResponse = {
        user: {
          id: '1',
          email,
          name: 'Usuário Teste',
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      // Salvar tokens (funciona no mobile e web)
      await secureStorage.setItemAsync('accessToken', mockResponse.accessToken);
      await secureStorage.setItemAsync('refreshToken', mockResponse.refreshToken);

      // Salvar dados do usuário no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(mockResponse.user));

      // Atualizar estado
      set({
        user: mockResponse.user,
        accessToken: mockResponse.accessToken,
        refreshToken: mockResponse.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  // Register
  register: async (name: string, email: string, password: string) => {
    try {
      // TODO: Integrar com API real quando backend estiver pronto
      // const response = await authService.register(name, email, password);
      
      // Mock de resposta da API
      const mockResponse = {
        user: {
          id: '1',
          email,
          name,
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      // Salvar tokens (funciona no mobile e web)
      await secureStorage.setItemAsync('accessToken', mockResponse.accessToken);
      await secureStorage.setItemAsync('refreshToken', mockResponse.refreshToken);

      // Salvar dados do usuário no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(mockResponse.user));

      // Atualizar estado
      set({
        user: mockResponse.user,
        accessToken: mockResponse.accessToken,
        refreshToken: mockResponse.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      // Limpar tokens
      await secureStorage.deleteItemAsync('accessToken');
      await secureStorage.deleteItemAsync('refreshToken');

      // Limpar dados do usuário do AsyncStorage
      await AsyncStorage.removeItem('user');

      // Atualizar estado
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  },

  // Load auth (restaurar autenticação ao abrir o app)
  loadAuth: async () => {
    try {
      set({ isLoading: true });

      // Carregar tokens
      const accessToken = await secureStorage.getItemAsync('accessToken');
      const refreshToken = await secureStorage.getItemAsync('refreshToken');

      // Carregar dados do usuário do AsyncStorage
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;

      // Se tiver tokens e usuário, restaurar autenticação
      if (accessToken && refreshToken && user) {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Não autenticado
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar autenticação:', error);
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  // Update profile
  updateProfile: async (data: Partial<User>) => {
    try {
      const currentUser = get().user;
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      // TODO: Integrar com API real quando backend estiver pronto
      // const response = await authService.updateProfile(data);

      // Mock de atualização
      const updatedUser = {
        ...currentUser,
        ...data,
      };

      // Salvar dados atualizados no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      // Atualizar estado
      set({ user: updatedUser });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },
}));
