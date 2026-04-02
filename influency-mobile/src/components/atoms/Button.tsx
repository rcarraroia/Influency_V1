/**
 * Button Component
 * Componente de botão reutilizável com múltiplas variantes e tamanhos
 *
 * Requirements: 3.1, 3.8, 3.9, 3.10, 18.1, 18.3
 */

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface ButtonProps {
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'icon';
  /** Tamanho do botão */
  size?: 'small' | 'medium' | 'large';
  /** Se o botão está desabilitado */
  disabled?: boolean;
  /** Se o botão está em estado de loading */
  loading?: boolean;
  /** Ícone a ser exibido (componente React) */
  icon?: React.ReactNode;
  /** Callback ao pressionar o botão */
  onPress: () => void;
  /** Conteúdo do botão */
  children?: React.ReactNode;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
  /** Hint de acessibilidade */
  accessibilityHint?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  onPress,
  children,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const isDisabled = disabled || loading;

  // Determinar estilos baseados na variante
  const containerStyle = [
    styles.base,
    styles[`${variant}Container`],
    styles[`${size}Container`],
    isDisabled && styles.disabledContainer,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
  ];

  // Determinar cor do spinner baseado na variante
  const spinnerColor =
    variant === 'primary' ? colors.onPrimary : colors.primary;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ||
        (typeof children === 'string' ? children : 'Botão')
      }
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled }}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={spinnerColor} />
        ) : (
          <>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            {children && typeof children === 'string' ? (
              <Text style={textStyle}>{children}</Text>
            ) : (
              children
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md, // 12px (md)
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // Touch target mínimo de 48x48px (Requirement 18.3)
    minHeight: 48,
    minWidth: 48,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing[2], // 8px
  },
  text: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.label.large.fontWeight as any,
  },

  // Variantes de container
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  textContainer: {
    backgroundColor: 'transparent',
  },
  iconVariantContainer: {
    backgroundColor: 'transparent',
    minWidth: 48,
    minHeight: 48,
    paddingHorizontal: 0,
  },

  // Variantes de texto
  primaryText: {
    color: colors.onPrimary,
    fontSize: typography.label.large.fontSize,
    lineHeight: typography.label.large.lineHeight,
  },
  secondaryText: {
    color: colors.onSecondary,
    fontSize: typography.label.large.fontSize,
    lineHeight: typography.label.large.lineHeight,
  },
  outlineText: {
    color: colors.primary,
    fontSize: typography.label.large.fontSize,
    lineHeight: typography.label.large.lineHeight,
  },
  textText: {
    color: colors.primary,
    fontSize: typography.label.large.fontSize,
    lineHeight: typography.label.large.lineHeight,
  },
  iconText: {
    color: colors.primary,
    fontSize: typography.label.large.fontSize,
    lineHeight: typography.label.large.lineHeight,
  },

  // Tamanhos de container
  smallContainer: {
    height: 32,
    paddingHorizontal: spacing[2], // 8px
  },
  mediumContainer: {
    height: 40,
    paddingHorizontal: spacing[4], // 16px
  },
  largeContainer: {
    height: 48,
    paddingHorizontal: spacing[6], // 24px
  },

  // Tamanhos de texto
  smallText: {
    fontSize: typography.label.small.fontSize,
    lineHeight: typography.label.small.lineHeight,
  },
  mediumText: {
    fontSize: typography.label.medium.fontSize,
    lineHeight: typography.label.medium.lineHeight,
  },
  largeText: {
    fontSize: typography.label.large.fontSize,
    lineHeight: typography.label.large.lineHeight,
  },

  // Estados desabilitados
  disabledContainer: {
    opacity: 0.38,
  },
  disabledText: {
    opacity: 0.38,
  },
});

export default Button;
