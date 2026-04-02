/**
 * Avatar Component
 * Componente de avatar com suporte a imagem e fallback de iniciais
 *
 * Requirements: 3.8, 3.9, 3.10, 18.1
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { colors, typography } from '../../theme';

export interface AvatarProps {
  /** Fonte da imagem (URL ou require local) */
  source?: ImageSourcePropType | string;
  /** Tamanho do avatar */
  size?: 'small' | 'medium' | 'large';
  /** Texto de fallback (iniciais) quando imagem não carrega */
  fallback?: string;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'medium',
  fallback = '?',
  accessibilityLabel,
}) => {
  const [imageError, setImageError] = useState(false);

  // Determinar tamanho do avatar
  const avatarSize = size === 'small' ? 32 : size === 'medium' ? 40 : 56;

  // Determinar tamanho da fonte do fallback
  const fallbackFontSize = size === 'small' ? 14 : size === 'medium' ? 16 : 22;

  // Estilos dinâmicos
  const containerStyle = [
    styles.container,
    {
      width: avatarSize,
      height: avatarSize,
      borderRadius: avatarSize / 2, // Circular
    },
  ];

  const fallbackTextStyle = [
    styles.fallbackText,
    {
      fontSize: fallbackFontSize,
    },
  ];

  // Processar source (pode ser string URL ou require)
  const imageSource = typeof source === 'string' ? { uri: source } : source;

  // Se tem imagem e não houve erro, exibir imagem
  if (source && !imageError) {
    return (
      <View
        style={containerStyle}
        accessibilityLabel={accessibilityLabel || 'Avatar'}
        accessibilityRole="image"
      >
        <Image
          source={imageSource as ImageSourcePropType}
          style={styles.image}
          onError={() => setImageError(true)}
          accessibilityIgnoresInvertColors
        />
      </View>
    );
  }

  // Caso contrário, exibir fallback (iniciais)
  // Extrair iniciais do fallback (primeiras 2 letras)
  const initials = fallback
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      style={containerStyle}
      accessibilityLabel={accessibilityLabel || `Avatar de ${fallback}`}
      accessibilityRole="image"
    >
      <Text style={fallbackTextStyle}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fallbackText: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.label.large.fontWeight as any,
    color: colors.onPrimaryContainer,
    textAlign: 'center',
  },
});

export default Avatar;
