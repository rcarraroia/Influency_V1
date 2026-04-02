/**
 * Radio Component
 * Componente de radio button para seleção única
 *
 * Requirements: 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface RadioProps {
  /** Valor atual do radio (selecionado/não selecionado) */
  selected: boolean;
  /** Callback quando o valor muda */
  onValueChange: (selected: boolean) => void;
  /** Se o radio está desabilitado */
  disabled?: boolean;
  /** Label do radio */
  label?: string;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
  /** Hint de acessibilidade */
  accessibilityHint?: string;
}

export const Radio: React.FC<RadioProps> = ({
  selected,
  onValueChange,
  disabled = false,
  label,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!selected);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel || label || 'Radio button'}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ selected, disabled }}
    >
      <View
        style={[
          styles.circle,
          selected && styles.circleSelected,
          disabled && styles.circleDisabled,
        ]}
      >
        {selected && <View style={styles.innerCircle} />}
      </View>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48, // Touch target mínimo
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full, // 9999 (circular)
    borderWidth: 2,
    borderColor: colors.outline,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSelected: {
    borderColor: colors.primary,
  },
  circleDisabled: {
    opacity: 0.38,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.full, // 9999 (circular)
    backgroundColor: colors.primary,
  },
  label: {
    flex: 1,
    fontFamily: typography.fontFamily,
    fontSize: typography.body.large.fontSize,
    lineHeight: typography.body.large.lineHeight,
    color: colors.onSurface,
    marginLeft: spacing[2], // 8px
  },
  labelDisabled: {
    color: colors.onSurfaceVariant,
    opacity: 0.6,
  },
});

export default Radio;
