/**
 * Checkbox Component
 * Componente de checkbox para seleção múltipla
 *
 * Requirements: 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface CheckboxProps {
  /** Valor atual do checkbox (marcado/desmarcado) */
  checked: boolean;
  /** Callback quando o valor muda */
  onValueChange: (checked: boolean) => void;
  /** Se o checkbox está desabilitado */
  disabled?: boolean;
  /** Label do checkbox */
  label?: string;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
  /** Hint de acessibilidade */
  accessibilityHint?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  disabled = false,
  label,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel || label || 'Checkbox'}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ checked, disabled }}
    >
      <View
        style={[
          styles.box,
          checked && styles.boxChecked,
          disabled && styles.boxDisabled,
        ]}
      >
        {checked && <Text style={styles.checkmark}>✓</Text>}
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
  box: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.xs, // 4px
    borderWidth: 2,
    borderColor: colors.outline,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  boxDisabled: {
    opacity: 0.38,
  },
  checkmark: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
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

export default Checkbox;
