import React, { useState } from 'react';
import { View, StyleSheet, TextInput as RNTextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { VoiceButton } from '../molecules/VoiceButton';
import { useAudioRecording } from '../../hooks/useAudioRecording';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

/**
 * ChatInput Component
 * 
 * Componente de input para chat com suporte a texto e voz.
 * Permite alternância entre digitação e gravação de voz.
 * 
 * @example
 * <ChatInput
 *   onSendMessage={(message) => console.log('Send:', message)}
 *   onVoiceMessage={(text) => console.log('Voice:', text)}
 *   placeholder="Digite sua mensagem..."
 * />
 */

export interface ChatInputProps {
  /**
   * Callback ao enviar mensagem de texto
   */
  onSendMessage: (message: string) => void;
  
  /**
   * Callback ao enviar mensagem de voz (texto transcrito)
   */
  onVoiceMessage?: (text: string) => void;
  
  /**
   * Placeholder do input
   */
  placeholder?: string;
  
  /**
   * Desabilitar input
   */
  disabled?: boolean;
  
  /**
   * Indica se o assistente está processando
   */
  isProcessing?: boolean;
}

export function ChatInput({
  onSendMessage,
  onVoiceMessage,
  placeholder = 'Digite sua mensagem...',
  disabled = false,
  isProcessing = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');

  // Hook de gravação de áudio
  const {
    startRecording,
    stopRecording,
    isRecording,
    hasPermission,
    duration,
  } = useAudioRecording({
    onResult: (text) => {
      // Quando transcrição estiver pronta, enviar como mensagem
      onVoiceMessage?.(text);
      setInputMode('text');
    },
    onError: (error) => {
      console.error('Recording error:', error);
      setInputMode('text');
    },
  });

  // Enviar mensagem de texto
  const handleSendMessage = () => {
    if (message.trim() === '' || disabled || isProcessing) {
      return;
    }

    onSendMessage(message.trim());
    setMessage('');
  };

  // Toggle gravação de voz
  const handleToggleVoiceRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
      setInputMode('voice');
    }
  };

  // Alternar entre modo texto e voz
  const handleToggleInputMode = () => {
    if (inputMode === 'text') {
      setInputMode('voice');
    } else {
      setInputMode('text');
      if (isRecording) {
        stopRecording();
      }
    }
  };

  const canSend = message.trim() !== '' && !disabled && !isProcessing;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        {/* Indicador de estado */}
        {(isRecording || isProcessing) && (
          <View style={styles.statusBar}>
            {isRecording && (
              <Text style={styles.statusText}>
                🎤 Gravando... {duration}s
              </Text>
            )}
            {isProcessing && (
              <Text style={styles.statusText}>
                ⏳ Processando...
              </Text>
            )}
          </View>
        )}

        {/* Input principal */}
        <View style={styles.inputContainer}>
          {/* Botão de alternar modo */}
          <IconButton
            icon={inputMode === 'text' ? 'microphone' : 'keyboard'}
            size={24}
            iconColor={colors.text.secondary}
            onPress={handleToggleInputMode}
            disabled={disabled || isProcessing}
            accessibilityLabel={inputMode === 'text' ? 'Alternar para modo voz' : 'Alternar para modo texto'}
          />

          {/* Input de texto ou botão de voz */}
          {inputMode === 'text' ? (
            <RNTextInput
              style={styles.textInput}
              value={message}
              onChangeText={setMessage}
              placeholder={placeholder}
              placeholderTextColor={colors.text.disabled}
              multiline
              maxLength={500}
              editable={!disabled && !isProcessing}
              accessibilityLabel="Campo de mensagem"
              accessibilityHint="Digite sua mensagem aqui"
            />
          ) : (
            <View style={styles.voiceContainer}>
              <VoiceButton
                recording={isRecording}
                onPress={handleToggleVoiceRecording}
                disabled={disabled || isProcessing || hasPermission === false}
                size={48}
              />
              {hasPermission === false && (
                <Text style={styles.permissionText}>
                  Permissão de microfone negada
                </Text>
              )}
            </View>
          )}

          {/* Botão de enviar (apenas modo texto) */}
          {inputMode === 'text' && (
            <IconButton
              icon="send"
              size={24}
              iconColor={canSend ? colors.primary : colors.text.disabled}
              onPress={handleSendMessage}
              disabled={!canSend}
              accessibilityLabel="Enviar mensagem"
              accessibilityHint="Toque para enviar sua mensagem"
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.default,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  statusBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.background.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  statusText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  textInput: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.text.primary,
    backgroundColor: colors.background.surface,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 120,
  },
  voiceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  permissionText: {
    ...typography.bodySmall,
    color: colors.error,
    textAlign: 'center',
  },
});
