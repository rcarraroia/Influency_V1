/**
 * Chip Component
 * Componente de chip reutilizável com estados selecionado/não selecionado
 *
 * Requirements: 3.4, 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface ChipProps {
  /** Texto do chip */
  label: string;
  /** Se o chip está selecionado */
  selected?: boolean;
  /** Callback ao pressionar o chip */
  onPress?: () => void;
  /** Ícone a ser exibido (componente React) */
  icon?: React.ReactNode;
  /** Callback ao pressionar o botão de fechar */
  onClose?: () => void;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
  /** Hint de acessibilidade */
  accessibilityHint?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
  onClose,
  accessibilityLabel,
  accessibilityHint,
}) => {
  // Determinar estilos baseados no estado
  const containerStyle = [
    styles.container,
    selected ? styles.containerSelected : styles.containerDefault,
  ];

  const textStyle = [
    styles.text,
    selected ? styles.textSelected : styles.textDefault,
  ];

  // Se onPress está definido, usar TouchableOpacity (clicável)
  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ selected }}
      >
        <View style={styles.content}>
          {/* Ícone à esquerda */}
          {icon && <View style={styles.iconLeft}>{icon}</View>}

          {/* Label */}
          <Text style={textStyle}>{label}</Text>

          {/* Botão de fechar */}
          {onClose && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={`Remover ${label}`}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  // Caso contrário, usar View (não clicável)
  return (
    <View
      style={containerStyle}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ selected }}
    >
      <View style={styles.content}>
        {/* Ícone à esquerda */}
        {icon && <View style={styles.iconLeft}>{icon}</View>}

        {/* Label */}
        <Text style={textStyle}>{label}</Text>

        {/* Botão de fechar */}
        {onClose && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={`Remover ${label}`}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.sm, // 8px (sm)
    paddingHorizontal: spacing[2], // 8px
    paddingVertical: spacing[1], // 4px
    // Touch target mínimo de 32px de altura
    minHeight: 32,
    alignSelf: 'flex-start',
  },
  containerDefault: {
    backgroundColor: colors.surfaceVariant,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  containerSelected: {
    backgroundColor: colors.primaryContainer,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: spacing[1], // 4px
  },
  text: {
    fontFamily: typography.fontFamily,
    fontSize: typography.label.medium.fontSize,
    lineHeight: typography.label.medium.lineHeight,
    fontWeight: typography.label.medium.fontWeight as any,
  },
  textDefault: {
    color: colors.onSurfaceVariant,
  },
  textSelected: {
    color: colors.onPrimaryContainer,
  },
  closeButton: {
    marginLeft: spacing[1], // 4px
    padding: spacing[1], // 4px
  },
  closeIcon: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
});

export default Chip;
