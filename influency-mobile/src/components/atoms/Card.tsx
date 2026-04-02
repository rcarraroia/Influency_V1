/**
 * Card Component
 * Componente de card reutilizável com múltiplas variantes
 *
 * Requirements: 3.3, 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import {
  colors,
  spacing,
  borderRadius,
  shadowsIOS,
  shadowsAndroid,
} from '../../theme';

export interface CardProps {
  /** Variante visual do card */
  variant?: 'elevated' | 'outlined' | 'filled';
  /** Padding interno do card */
  padding?: number;
  /** Callback ao pressionar o card (torna o card clicável) */
  onPress?: () => void;
  /** Conteúdo do card */
  children: React.ReactNode;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
  /** Hint de acessibilidade */
  accessibilityHint?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = spacing[4], // 16px (padrão)
  onPress,
  children,
  accessibilityLabel,
  accessibilityHint,
}) => {
  // Determinar estilos baseados na variante
  const containerStyle = [
    styles.base,
    styles[`${variant}Container`],
    { padding },
    // Aplicar sombra apenas para variante elevated (Requirement 3.3)
    variant === 'elevated' &&
      (Platform.OS === 'ios'
        ? shadowsIOS.elevation2
        : shadowsAndroid.elevation2),
  ];

  // Se onPress está definido, usar TouchableOpacity (clicável)
  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || 'Card clicável'}
        accessibilityHint={accessibilityHint}
      >
        {children}
      </TouchableOpacity>
    );
  }

  // Caso contrário, usar View (não clicável)
  return (
    <View style={containerStyle} accessibilityLabel={accessibilityLabel}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md, // 12px (md) (Requirement 3.3)
    overflow: 'hidden',
  },

  // Variantes de container
  elevatedContainer: {
    backgroundColor: colors.surface,
    // Sombra aplicada via shadowsIOS/shadowsAndroid acima
  },
  outlinedContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  filledContainer: {
    backgroundColor: colors.surfaceVariant,
  },
});

export default Card;
