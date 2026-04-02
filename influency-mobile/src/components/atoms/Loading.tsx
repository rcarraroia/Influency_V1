/**
 * Loading Component
 * Componente de loading com spinner animado
 *
 * Requirements: 3.6, 3.8, 3.9, 3.10, 18.1
 */

import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';

export interface LoadingProps {
  /** Tamanho do spinner */
  size?: 'small' | 'large';
  /** Cor do spinner */
  color?: string;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = colors.primary,
  accessibilityLabel = 'Carregando',
}) => {
  return (
    <View
      style={styles.container}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
