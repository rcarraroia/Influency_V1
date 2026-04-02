/**
 * Design System - Espaçamento
 * Baseado em múltiplos de 8px
 * Fonte: stitch-output/DESIGN.md
 */

export const spacing = {
  // ========================================
  // ESCALA DE ESPAÇAMENTO (múltiplos de 8px)
  // ========================================
  0: 0,
  1: 4, // 0.5x
  2: 8, // 1x - Base
  3: 12, // 1.5x
  4: 16, // 2x
  5: 20, // 2.5x
  6: 24, // 3x
  8: 32, // 4x
  10: 40, // 5x
  12: 48, // 6x
  16: 64, // 8x
  20: 80, // 10x
} as const;

/**
 * Uso recomendado:
 *
 * - 4px (spacing[1]): Espaçamento interno mínimo, gaps entre ícones
 * - 8px (spacing[2]): Padding interno de componentes pequenos
 * - 12px (spacing[3]): Espaçamento entre elementos relacionados
 * - 16px (spacing[4]): Padding padrão de cards e containers
 * - 24px (spacing[6]): Espaçamento entre seções
 * - 32px (spacing[8]): Margens laterais de tela
 * - 40px (spacing[10]): Espaçamento entre grupos de conteúdo
 * - 48px+ (spacing[12]): Espaçamento vertical entre seções principais
 */

export type SpacingKey = keyof typeof spacing;
