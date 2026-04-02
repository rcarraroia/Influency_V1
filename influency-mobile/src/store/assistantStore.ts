import { create } from 'zustand';

/**
 * AssistantStore
 * 
 * Store para gerenciar o estado do chat com o assistente IA.
 * Armazena mensagens, estados de processamento e configurações.
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface AssistantState {
  // State
  messages: Message[];
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  
  // Actions
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  clearMessages: () => void;
  setListening: (isListening: boolean) => void;
  setSpeaking: (isSpeaking: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
  setTyping: (messageId: string, isTyping: boolean) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  // Initial state
  messages: [],
  isListening: false,
  isSpeaking: false,
  isProcessing: false,

  // Add message
  addMessage: (role, content) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      isTyping: role === 'assistant', // Assistente começa com typing animation
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    // Se for mensagem do assistente, remover typing após 1 segundo
    if (role === 'assistant') {
      setTimeout(() => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === newMessage.id ? { ...msg, isTyping: false } : msg
          ),
        }));
      }, 1000);
    }
  },

  // Clear all messages
  clearMessages: () => {
    set({ messages: [] });
  },

  // Set listening state
  setListening: (isListening) => {
    set({ isListening });
  },

  // Set speaking state
  setSpeaking: (isSpeaking) => {
    set({ isSpeaking });
  },

  // Set processing state
  setProcessing: (isProcessing) => {
    set({ isProcessing });
  },

  // Set typing state for a specific message
  setTyping: (messageId, isTyping) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, isTyping } : msg
      ),
    }));
  },
}));
