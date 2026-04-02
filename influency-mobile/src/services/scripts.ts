import apiClient, { handleApiError } from './api';

/**
 * Scripts Service
 * 
 * Serviço para gerenciar roteiros (scripts).
 * Inclui métodos para listar, gerar, atualizar e deletar roteiros.
 */

// Types
export interface Script {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  estimatedDuration: number; // em segundos
  topic?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GenerateScriptRequest {
  topic: string;
  duration: number; // em segundos (30-300)
}

export interface UpdateScriptRequest {
  title?: string;
  content?: string;
}

export interface ScriptsListResponse {
  scripts: Script[];
  total: number;
}

/**
 * Scripts Service
 */
class ScriptsService {
  /**
   * Listar todos os roteiros do usuário
   */
  async list(): Promise<ScriptsListResponse> {
    try {
      const response = await apiClient.get<ScriptsListResponse>('/scripts');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Obter um roteiro específico
   */
  async get(id: string): Promise<Script> {
    try {
      const response = await apiClient.get<Script>(`/scripts/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Gerar novo roteiro com IA
   */
  async generate(data: GenerateScriptRequest): Promise<Script> {
    try {
      const response = await apiClient.post<Script>('/scripts/generate', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Atualizar roteiro existente
   */
  async update(id: string, data: UpdateScriptRequest): Promise<Script> {
    try {
      const response = await apiClient.patch<Script>(`/scripts/${id}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Deletar roteiro
   */
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/scripts/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  }
}

// Exportar instância singleton
export const scriptsService = new ScriptsService();
