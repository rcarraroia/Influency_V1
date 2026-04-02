/**
 * ProgressBar Component
 * Componente de barra de progresso com animação suave
 *
 * Requirements: 3.7, 3.8, 3.9, 3.10, 18.1
 */

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, borderRadius } from '../../theme';

export interface ProgressBarProps {
  /** Progresso atual (0-100) */
  progress: number;
  /** Se a animação está habilitada */
  animated?: boolean;
  /** Cor da barra de progresso */
  color?: string;
  /** Cor de fundo da barra */
  backgroundColor?: string;
  /** Altura da barra */
  height?: number;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  animated = true,
  color = colors.primary,
  backgroundColor = colors.surfaceVariant,
  height = 8,
  accessibilityLabel,
}) => {
  // Garantir que progress está entre 0 e 100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  // Valor animado para a largura da barra
  const progressWidth = useSharedValue(0);

  // Atualizar valor animado quando progress muda
  useEffect(() => {
    if (animated) {
      progressWidth.value = withTiming(clampedProgress, {
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    } else {
      progressWidth.value = clampedProgress;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampedProgress, animated]);

  // Estilo animado para a barra de progresso
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  return (
    <View
      style={[styles.container, { height, backgroundColor }]}
      accessibilityLabel={
        accessibilityLabel || `Progresso: ${clampedProgress}%`
      }
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedProgress }}
    >
      <Animated.View
        style={[
          styles.progressBar,
          { backgroundColor: color, height },
          animatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: borderRadius.full, // 9999 (totalmente arredondado)
    overflow: 'hidden',
  },
  progressBar: {
    borderRadius: borderRadius.full, // 9999 (totalmente arredondado)
  },
});

export default ProgressBar;
