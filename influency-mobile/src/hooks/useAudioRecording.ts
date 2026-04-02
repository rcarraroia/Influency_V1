import { useState, useCallback, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

/**
 * useAudioRecording Hook
 * 
 * Hook para gravação de áudio e transcrição de voz para texto.
 * Usa expo-av para gravação de áudio.
 * 
 * NOTA: A transcrição real será implementada quando o backend estiver pronto.
 * Por enquanto, retorna um mock de transcrição.
 * 
 * @example
 * const { startRecording, stopRecording, isRecording } = useAudioRecording({
 *   onResult: (text) => console.log('Transcribed:', text),
 *   onError: (error) => console.error('Recording error:', error),
 * });
 * 
 * await startRecording();
 * // ... usuário fala ...
 * await stopRecording();
 */

export interface UseAudioRecordingOptions {
  /**
   * Callback chamado com o texto transcrito
   */
  onResult?: (text: string) => void;
  
  /**
   * Callback chamado em caso de erro
   */
  onError?: (error: Error) => void;
  
  /**
   * Duração máxima da gravação em milissegundos (padrão: 60000 = 1 minuto)
   */
  maxDuration?: number;
}

export interface UseAudioRecordingReturn {
  /**
   * Iniciar gravação de áudio
   */
  startRecording: () => Promise<void>;
  
  /**
   * Parar gravação e retornar transcrição
   */
  stopRecording: () => Promise<void>;
  
  /**
   * Indica se está gravando no momento
   */
  isRecording: boolean;
  
  /**
   * Indica se tem permissão para gravar
   */
  hasPermission: boolean | null;
  
  /**
   * Duração da gravação atual em segundos
   */
  duration: number;
}

export function useAudioRecording(options: UseAudioRecordingOptions = {}): UseAudioRecordingReturn {
  const {
    onResult,
    onError,
    maxDuration = 60000, // 1 minuto
  } = options;

  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [duration, setDuration] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [durationInterval, setDurationInterval] = useState<NodeJS.Timeout | null>(null);

  // Solicitar permissão ao montar
  useEffect(() => {
    requestPermission();
  }, []);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (durationInterval) {
        clearInterval(durationInterval);
      }
    };
  }, [recording, durationInterval]);

  // Solicitar permissão de microfone
  const requestPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
      if (status !== 'granted') {
        const error = new Error('Permissão de microfone negada');
        onError?.(error);
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      setHasPermission(false);
      onError?.(error as Error);
    }
  };

  // Iniciar gravação
  const startRecording = useCallback(async () => {
    if (isRecording) {
      console.warn('useAudioRecording: Already recording');
      return;
    }

    if (hasPermission === false) {
      const error = new Error('Permissão de microfone negada');
      onError?.(error);
      return;
    }

    if (hasPermission === null) {
      await requestPermission();
      return;
    }

    try {
      // Configurar modo de áudio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Criar nova gravação
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
      setDuration(0);

      // Iniciar contador de duração
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      setDurationInterval(interval);

      // Parar automaticamente após duração máxima
      setTimeout(async () => {
        if (isRecording) {
          await stopRecording();
        }
      }, maxDuration);

    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      onError?.(error as Error);
    }
  }, [isRecording, hasPermission, maxDuration, onError]);

  // Parar gravação
  const stopRecording = useCallback(async () => {
    if (!isRecording || !recording) {
      console.warn('useAudioRecording: Not recording');
      return;
    }

    try {
      // Parar gravação
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      setRecording(null);

      // Parar contador de duração
      if (durationInterval) {
        clearInterval(durationInterval);
        setDurationInterval(null);
      }

      // Obter URI do arquivo de áudio
      const uri = recording.getURI();
      
      if (!uri) {
        throw new Error('Failed to get recording URI');
      }

      // TODO: Enviar áudio para API de transcrição quando backend estiver pronto
      // const transcription = await transcribeAudio(uri);
      
      // Mock de transcrição por enquanto
      const mockTranscription = 'Texto transcrito da gravação de áudio';
      
      // Chamar callback com resultado
      onResult?.(mockTranscription);

      // Resetar duração
      setDuration(0);

    } catch (error) {
      console.error('Error stopping recording:', error);
      setIsRecording(false);
      setRecording(null);
      if (durationInterval) {
        clearInterval(durationInterval);
        setDurationInterval(null);
      }
      onError?.(error as Error);
    }
  }, [isRecording, recording, durationInterval, onResult, onError]);

  return {
    startRecording,
    stopRecording,
    isRecording,
    hasPermission,
    duration,
  };
}
