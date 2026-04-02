/**
 * Divider Component
 * Componente de separador visual (linha horizontal ou vertical)
 *
 * Requirements: 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';

export interface DividerProps {
  /** Orientação do divider */
  orientation?: 'horizontal' | 'vertical';
  /** Espessura do divider */
  thickness?: number;
  /** Cor do divider */
  color?: string;
  /** Margem vertical (para horizontal) ou horizontal (para vertical) */
  margin?: number;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  color = colors.outlineVariant,
  margin = spacing[4], // 16px (padrão)
  accessibilityLabel,
}) => {
  const isHorizontal = orientation === 'horizontal';

  const dividerStyle = [
    styles.base,
    {
      backgroundColor: color,
      ...(isHorizontal
        ? {
            height: thickness,
            width: '100%',
            marginVertical: margin,
          }
        : {
            width: thickness,
            height: '100%',
            marginHorizontal: margin,
          }),
    },
  ];

  return (
    <View
      style={dividerStyle}
      accessibilityLabel={accessibilityLabel || 'Separador'}
      accessibilityRole="none"
    />
  );
};

const styles = StyleSheet.create({
  base: {
    // Estilos base (dinâmicos aplicados inline)
  },
});

export default Divider;
