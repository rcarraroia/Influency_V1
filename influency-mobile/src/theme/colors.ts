/**
 * Design System - Paleta de Cores
 * Baseado em Material Design 3
 * Fonte: stitch-output/DESIGN.md
 */

export const colors = {
  // ========================================
  // CORES PRIMÁRIAS - Roxo Vibrante
  // ========================================
  primary: '#6200EE',
  primaryLight: '#7F39FB',
  primaryDark: '#5300CC',
  primaryContainer: '#EADDFF',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#21005E',

  // ========================================
  // CORES SECUNDÁRIAS - Teal
  // ========================================
  secondary: '#03DAC6',
  secondaryLight: '#66FFF9',
  secondaryDark: '#00A896',
  secondaryContainer: '#B2F7EF',
  onSecondary: '#000000',
  onSecondaryContainer: '#002020',

  // ========================================
  // CORES DE SUPERFÍCIE
  // ========================================
  background: '#FFFFFF',
  backgroundDark: '#1C1B1F',
  surface: '#FFFFFF',
  surfaceVariant: '#E7E0EC',
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#49454F',

  // ========================================
  // OUTLINE
  // ========================================
  outline: '#79747E',
  outlineVariant: '#CAC4D0',

  // ========================================
  // CORES SEMÂNTICAS
  // ========================================
  success: '#4CAF50',
  successContainer: '#C8E6C9',
  onSuccess: '#FFFFFF',

  warning: '#FF9800',
  warningContainer: '#FFE0B2',
  onWarning: '#000000',

  error: '#B3261E',
  errorContainer: '#F9DEDC',
  onError: '#FFFFFF',

  info: '#2196F3',
  infoContainer: '#BBDEFB',
  onInfo: '#FFFFFF',

  // ========================================
  // CORES DE TEXTO
  // ========================================
  textPrimary: 'rgba(0, 0, 0, 0.87)',
  textSecondary: 'rgba(0, 0, 0, 0.60)',
  textDisabled: 'rgba(0, 0, 0, 0.38)',
  textHint: 'rgba(0, 0, 0, 0.38)',

  // Cores de texto (Dark Mode)
  textPrimaryDark: 'rgba(255, 255, 255, 0.87)',
  textSecondaryDark: 'rgba(255, 255, 255, 0.60)',
  textDisabledDark: 'rgba(255, 255, 255, 0.38)',

  // ========================================
  // CORES NEUTRAS (Escala de Cinza)
  // ========================================
  white: '#FFFFFF',
  black: '#000000',
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // ========================================
  // GRADIENTES
  // ========================================
  gradientPrimary: ['#6200EE', '#7F39FB'], // Para uso com LinearGradient
  gradientCard: ['rgba(98, 0, 238, 0.05)', 'rgba(98, 0, 238, 0)'],

  // ========================================
  // COMPATIBILIDADE (Estruturas antigas)
  // ========================================
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.60)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
} as const;

export type ColorKey = keyof typeof colors;
