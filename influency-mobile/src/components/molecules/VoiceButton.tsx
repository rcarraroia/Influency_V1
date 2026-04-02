import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors } from '../../theme/colors';

/**
 * VoiceButton Component
 * 
 * Botão de gravação de voz com animação pulsante.
 * Exibe animação quando recording=true.
 * 
 * @example
 * <VoiceButton
 *   recording={isRecording}
 *   onPress={handleToggleRecording}
 * />
 */

export interface VoiceButtonProps {
  /**
   * Indica se está gravando
   */
  recording: boolean;
  
  /**
   * Callback ao pressionar o botão
   */
  onPress: () => void;
  
  /**
   * Desabilitar botão
   */
  disabled?: boolean;
  
  /**
   * Tamanho do botão (padrão: 56)
   */
  size?: number;
}

export function VoiceButton({
  recording,
  onPress,
  disabled = false,
  size = 56,
}: VoiceButtonProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animação pulsante quando gravando
  useEffect(() => {
    if (recording) {
      // Criar animação de pulso contínua
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      return () => {
        pulse.stop();
        pulseAnim.setValue(1);
      };
    } else {
      // Resetar escala quando não está gravando
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [recording, pulseAnim]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={recording ? 'Parar gravação' : 'Iniciar gravação de voz'}
      accessibilityHint={recording ? 'Toque para parar de gravar' : 'Toque para gravar sua mensagem'}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: pulseAnim }],
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          recording && styles.containerRecording,
          disabled && styles.containerDisabled,
        ]}
      >
        <IconButton
          icon={recording ? 'stop' : 'microphone'}
          size={size * 0.5}
          iconColor={recording ? colors.error : colors.primary}
          style={styles.iconButton}
          disabled={disabled}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  containerRecording: {
    backgroundColor: colors.errorContainer,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  iconButton: {
    margin: 0,
  },
});
