import { create } from 'zustand';
import { Script } from '../services/scripts';

/**
 * ScriptStore
 * 
 * Store para gerenciar o estado dos roteiros.
 * Armazena lista de roteiros e roteiro atual sendo editado/visualizado.
 */

export interface ScriptState {
  // State
  scripts: Script[];
  currentScript: Script | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setScripts: (scripts: Script[]) => void;
  setCurrentScript: (script: Script | null) => void;
  addScript: (script: Script) => void;
  updateScript: (id: string, data: Partial<Script>) => void;
  deleteScript: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useScriptStore = create<ScriptState>((set) => ({
  // Initial state
  scripts: [],
  currentScript: null,
  isLoading: false,
  error: null,

  // Set scripts list
  setScripts: (scripts) => {
    set({ scripts, error: null });
  },

  // Set current script
  setCurrentScript: (script) => {
    set({ currentScript: script });
  },

  // Add new script
  addScript: (script) => {
    set((state) => ({
      scripts: [script, ...state.scripts],
      currentScript: script,
      error: null,
    }));
  },

  // Update existing script
  updateScript: (id, data) => {
    set((state) => ({
      scripts: state.scripts.map((script) =>
        script.id === id ? { ...script, ...data } : script
      ),
      currentScript:
        state.currentScript?.id === id
          ? { ...state.currentScript, ...data }
          : state.currentScript,
      error: null,
    }));
  },

  // Delete script
  deleteScript: (id) => {
    set((state) => ({
      scripts: state.scripts.filter((script) => script.id !== id),
      currentScript: state.currentScript?.id === id ? null : state.currentScript,
      error: null,
    }));
  },

  // Set loading state
  setLoading: (isLoading) => {
    set({ isLoading });
  },

  // Set error
  setError: (error) => {
    set({ error });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
