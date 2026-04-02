/**
 * Switch Component
 * Componente de toggle on/off
 *
 * Requirements: 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, Switch as RNSwitch, View, Text } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export interface SwitchProps {
  /** Valor atual do switch (on/off) */
  value: boolean;
  /** Callback quando o valor muda */
  onValueChange: (value: boolean) => void;
  /** Se o switch está desabilitado */
  disabled?: boolean;
  /** Label do switch */
  label?: string;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
  /** Hint de acessibilidade */
  accessibilityHint?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  label,
  accessibilityLabel,
  accessibilityHint,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: colors.surfaceVariant,
          true: colors.primaryContainer,
        }}
        thumbColor={value ? colors.primary : colors.outline}
        ios_backgroundColor={colors.surfaceVariant}
        accessibilityLabel={accessibilityLabel || label || 'Switch'}
        accessibilityHint={accessibilityHint}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48, // Touch target mínimo
  },
  label: {
    flex: 1,
    fontFamily: typography.fontFamily,
    fontSize: typography.body.large.fontSize,
    lineHeight: typography.body.large.lineHeight,
    color: colors.onSurface,
    marginRight: spacing[2], // 8px
  },
  labelDisabled: {
    color: colors.onSurfaceVariant,
    opacity: 0.6,
  },
});

export default Switch;
