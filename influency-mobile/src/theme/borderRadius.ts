/**
 * Design System - Border Radius
 * Fonte: stitch-output/DESIGN.md
 */

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/**
 * Uso recomendado:
 *
 * - 4px (xs): Chips, badges pequenos
 * - 8px (sm): Botões, inputs, cards pequenos
 * - 12px (md): Cards médios, modais
 * - 16px (lg): Cards grandes, bottom sheets
 * - 20px+ (xl): Elementos decorativos
 * - 9999px (full): Botões circulares, avatares
 */

export type BorderRadiusKey = keyof typeof borderRadius;
