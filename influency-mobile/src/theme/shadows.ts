/**
 * Design System - Elevação e Sombras
 * Seguindo Material Design 3 (0dp a 5dp)
 * Fonte: stitch-output/DESIGN.md
 */

import { Platform, ViewStyle } from 'react-native';

/**
 * Sombras para iOS
 * Usa shadowColor, shadowOffset, shadowOpacity, shadowRadius
 */
export const shadowsIOS = {
  // Elevation 0 - No shadow
  elevation0: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },

  // Elevation 1 - 2dp
  elevation1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  // Elevation 2 - 4dp
  elevation2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  // Elevation 3 - 8dp
  elevation3: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  // Elevation 4 - 12dp
  elevation4: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // Elevation 5 - 16dp
  elevation5: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
} as const;

/**
 * Sombras para Android
 * Usa propriedade elevation
 */
export const shadowsAndroid = {
  elevation0: { elevation: 0 },
  elevation1: { elevation: 2 },
  elevation2: { elevation: 4 },
  elevation3: { elevation: 8 },
  elevation4: { elevation: 12 },
  elevation5: { elevation: 16 },
} as const;

/**
 * Sombras multiplataforma
 * Retorna o estilo correto baseado na plataforma
 */
export const shadows = {
  elevation0: (Platform.OS === 'ios'
    ? shadowsIOS.elevation0
    : shadowsAndroid.elevation0) as ViewStyle,
  elevation1: (Platform.OS === 'ios'
    ? shadowsIOS.elevation1
    : shadowsAndroid.elevation1) as ViewStyle,
  elevation2: (Platform.OS === 'ios'
    ? shadowsIOS.elevation2
    : shadowsAndroid.elevation2) as ViewStyle,
  elevation3: (Platform.OS === 'ios'
    ? shadowsIOS.elevation3
    : shadowsAndroid.elevation3) as ViewStyle,
  elevation4: (Platform.OS === 'ios'
    ? shadowsIOS.elevation4
    : shadowsAndroid.elevation4) as ViewStyle,
  elevation5: (Platform.OS === 'ios'
    ? shadowsIOS.elevation5
    : shadowsAndroid.elevation5) as ViewStyle,
} as const;

/**
 * Uso recomendado:
 *
 * - 0dp (elevation0): Superfícies planas, backgrounds
 * - 1dp (elevation1): Cards em repouso
 * - 2dp (elevation2): Botões elevados, chips
 * - 3dp (elevation3): FABs em repouso, cards hover
 * - 4dp (elevation4): Modais, dialogs
 * - 5dp (elevation5): Navigation drawer, bottom sheets
 */

export type ShadowKey = keyof typeof shadows;
