import { useState, useCallback, useEffect } from 'react';
import * as Speech from 'expo-speech';

/**
 * useTextToSpeech Hook
 * 
 * Hook para reprodução de texto em áudio (Text-to-Speech).
 * Usa expo-speech para sintetizar voz.
 * 
 * @example
 * const { speak, stop, isSpeaking } = useTextToSpeech({
 *   onDone: () => console.log('Finished speaking'),
 *   onError: (error) => console.error('Speech error:', error),
 * });
 * 
 * speak('Olá, como posso ajudar?');
 */

export interface UseTextToSpeechOptions {
  /**
   * Callback chamado quando termina de falar
   */
  onDone?: () => void;
  
  /**
   * Callback chamado em caso de erro
   */
  onError?: (error: Error) => void;
  
  /**
   * Idioma da voz (padrão: pt-BR)
   */
  language?: string;
  
  /**
   * Velocidade da fala (0.5 a 2.0, padrão: 1.0)
   */
  rate?: number;
  
  /**
   * Tom da voz (0.5 a 2.0, padrão: 1.0)
   */
  pitch?: number;
}

export interface UseTextToSpeechReturn {
  /**
   * Falar o texto fornecido
   */
  speak: (text: string) => Promise<void>;
  
  /**
   * Parar a reprodução atual
   */
  stop: () => Promise<void>;
  
  /**
   * Indica se está falando no momento
   */
  isSpeaking: boolean;
  
  /**
   * Indica se o TTS está disponível no dispositivo
   */
  isAvailable: boolean;
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}): UseTextToSpeechReturn {
  const {
    onDone,
    onError,
    language = 'pt-BR',
    rate = 1.0,
    pitch = 1.0,
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Verificar disponibilidade do TTS ao montar
  useEffect(() => {
    checkAvailability();
  }, []);

  // Verificar se TTS está disponível
  const checkAvailability = async () => {
    try {
      const available = await Speech.isSpeakingAsync();
      setIsAvailable(true);
    } catch (error) {
      console.error('TTS not available:', error);
      setIsAvailable(false);
      onError?.(error as Error);
    }
  };

  // Falar texto
  const speak = useCallback(async (text: string) => {
    if (!text || text.trim() === '') {
      console.warn('useTextToSpeech: Empty text provided');
      return;
    }

    if (!isAvailable) {
      const error = new Error('Text-to-Speech not available on this device');
      onError?.(error);
      return;
    }

    try {
      // Parar qualquer fala em andamento
      await Speech.stop();

      // Iniciar nova fala
      setIsSpeaking(true);

      await Speech.speak(text, {
        language,
        rate,
        pitch,
        onDone: () => {
          setIsSpeaking(false);
          onDone?.();
        },
        onStopped: () => {
          setIsSpeaking(false);
        },
        onError: (error) => {
          setIsSpeaking(false);
          onError?.(new Error(error.error));
        },
      });
    } catch (error) {
      setIsSpeaking(false);
      console.error('Error speaking text:', error);
      onError?.(error as Error);
    }
  }, [isAvailable, language, rate, pitch, onDone, onError]);

  // Parar fala
  const stop = useCallback(async () => {
    try {
      await Speech.stop();
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error stopping speech:', error);
      onError?.(error as Error);
    }
  }, [onError]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    isAvailable,
  };
}
