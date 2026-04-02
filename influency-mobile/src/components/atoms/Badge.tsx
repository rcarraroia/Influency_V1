/**
 * Badge Component
 * Componente de badge para notificações e contadores
 *
 * Requirements: 3.5, 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface BadgeProps {
  /** Número a ser exibido no badge */
  count?: number;
  /** Valor máximo antes de exibir "+" (ex: 99+) */
  max?: number;
  /** Variante visual do badge */
  variant?: 'default' | 'dot';
  /** Label de acessibilidade */
  accessibilityLabel?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  count = 0,
  max = 99,
  variant = 'default',
  accessibilityLabel,
}) => {
  // Se count é 0, não renderizar nada
  if (count === 0 && variant !== 'dot') {
    return null;
  }

  // Determinar o texto a ser exibido
  const displayText = count > max ? `${max}+` : count.toString();

  // Variante dot (apenas um ponto, sem número)
  if (variant === 'dot') {
    return (
      <View
        style={styles.dot}
        accessibilityLabel={accessibilityLabel || 'Notificação'}
        accessibilityRole="text"
      />
    );
  }

  // Variante default (com número)
  return (
    <View
      style={styles.container}
      accessibilityLabel={accessibilityLabel || `${count} notificações`}
      accessibilityRole="text"
    >
      <Text style={styles.text}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.full, // 9999 (circular)
    minWidth: 20,
    minHeight: 20,
    paddingHorizontal: spacing[1], // 4px
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: typography.fontFamily,
    fontSize: typography.label.small.fontSize,
    lineHeight: typography.label.small.lineHeight,
    fontWeight: typography.label.medium.fontWeight as any,
    color: colors.onError,
    textAlign: 'center',
  },
  dot: {
    backgroundColor: colors.error,
    width: 8,
    height: 8,
    borderRadius: borderRadius.full, // 9999 (circular)
  },
});

export default Badge;
