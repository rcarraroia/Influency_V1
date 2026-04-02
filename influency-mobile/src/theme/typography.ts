/**
 * Design System - Tipografia
 * Baseado em Material Design 3
 * Fonte: stitch-output/DESIGN.md
 */

export const typography = {
  // ========================================
  // FAMÍLIA DE FONTES
  // ========================================
  fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',

  // ========================================
  // PESOS DE FONTE
  // ========================================
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // ========================================
  // DISPLAY
  // ========================================
  display: {
    large: {
      fontSize: 57,
      lineHeight: 64,
      fontWeight: '400' as const,
    },
    medium: {
      fontSize: 45,
      lineHeight: 52,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 36,
      lineHeight: 44,
      fontWeight: '400' as const,
    },
  },

  // ========================================
  // HEADLINE
  // ========================================
  headline: {
    large: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '400' as const,
    },
    medium: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '400' as const,
    },
  },

  // ========================================
  // TITLE
  // ========================================
  title: {
    large: {
      fontSize: 22,
      lineHeight: 28,
      fontWeight: '500' as const,
    },
    medium: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      fontWeight: '500' as const,
    },
    small: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: '500' as const,
    },
  },

  // ========================================
  // BODY
  // ========================================
  body: {
    large: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
      fontWeight: '400' as const,
    },
    medium: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      fontWeight: '400' as const,
    },
  },

  // ========================================
  // LABEL
  // ========================================
  label: {
    large: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: '500' as const,
    },
    medium: {
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '500' as const,
    },
    small: {
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '500' as const,
    },
  },
} as const;

export type TypographyScale =
  | 'display'
  | 'headline'
  | 'title'
  | 'body'
  | 'label';
export type TypographySize = 'large' | 'medium' | 'small';
