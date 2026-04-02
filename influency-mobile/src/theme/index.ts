// Design system será exportado aqui
/**
 * Design System - Exportação Consolidada
 * Todos os tokens do design system em um único lugar
 * Fonte: stitch-output/DESIGN.md
 */

export { colors } from './colors';
export type { ColorKey } from './colors';

export { typography } from './typography';
export type { TypographyScale, TypographySize } from './typography';

export { spacing } from './spacing';
export type { SpacingKey } from './spacing';

export { borderRadius } from './borderRadius';
export type { BorderRadiusKey } from './borderRadius';

export { shadows, shadowsIOS, shadowsAndroid } from './shadows';
export type { ShadowKey } from './shadows';

/**
 * Theme consolidado para uso com React Native Paper
 */
import { MD3LightTheme } from 'react-native-paper';
import { colors } from './colors';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryContainer,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryContainer,
    tertiary: colors.info,
    tertiaryContainer: colors.infoContainer,
    surface: colors.surface,
    surfaceVariant: colors.surfaceVariant,
    background: colors.background,
    error: colors.error,
    errorContainer: colors.errorContainer,
    onPrimary: colors.onPrimary,
    onPrimaryContainer: colors.onPrimaryContainer,
    onSecondary: colors.onSecondary,
    onSecondaryContainer: colors.onSecondaryContainer,
    onSurface: colors.onSurface,
    onSurfaceVariant: colors.onSurfaceVariant,
    onError: colors.onError,
    outline: colors.outline,
    outlineVariant: colors.outlineVariant,
  },
};
