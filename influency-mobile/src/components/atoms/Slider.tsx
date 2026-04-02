/**
 * Slider Component
 * Componente de slider para seleção de valor numérico
 *
 * Requirements: 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNSlider from '@react-native-community/slider';
import { colors, spacing, typography } from '../../theme';

export interface SliderProps {
  /** Valor atual do slider */
  value: number;
  /** Callback quando o valor muda */
  onValueChange: (value: number) => void;
  /** Valor mínimo */
  minimumValue?: number;
  /** Valor máximo */
  maximumValue?: number;
  /** Incremento do slider */
  step?: number;
  /** Se o slider está desabilitado */
  disabled?: boolean;
  /** Label do slider */
  label?: string;
  /** Se deve mostrar o valor atual */
  showValue?: boolean;
  /** Formatador customizado para o valor exibido */
  valueFormatter?: (value: number) => string;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
  /** Hint de acessibilidade */
  accessibilityHint?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  disabled = false,
  label,
  showValue = true,
  valueFormatter,
  accessibilityLabel,
  accessibilityHint,
}) => {
  // Formatar valor para exibição
  const displayValue = valueFormatter
    ? valueFormatter(value)
    : value.toString();

  return (
    <View style={styles.container}>
      {/* Header com label e valor */}
      {(label || showValue) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={styles.value}>{displayValue}</Text>}
        </View>
      )}

      {/* Slider */}
      <RNSlider
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        disabled={disabled}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.surfaceVariant}
        thumbTintColor={colors.primary}
        style={styles.slider}
        accessibilityLabel={accessibilityLabel || label || 'Slider'}
        accessibilityHint={accessibilityHint}
        accessibilityRole="adjustable"
        accessibilityValue={{
          min: minimumValue,
          max: maximumValue,
          now: value,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4], // 16px
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2], // 8px
  },
  label: {
    fontFamily: typography.fontFamily,
    fontSize: typography.body.large.fontSize,
    lineHeight: typography.body.large.lineHeight,
    color: colors.onSurface,
  },
  value: {
    fontFamily: typography.fontFamily,
    fontSize: typography.body.large.fontSize,
    lineHeight: typography.body.large.lineHeight,
    fontWeight: typography.fontWeight.medium as any,
    color: colors.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default Slider;
