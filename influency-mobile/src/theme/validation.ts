/**
 * Validação do Design System
 * Verifica se todos os tokens correspondem ao stitch-output/DESIGN.md
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { borderRadius } from './borderRadius';
import { shadows } from './shadows';

/**
 * Validação de Cores
 * Verifica se as cores primárias correspondem ao DESIGN.md
 */
export function validateColors(): boolean {
  const expectedColors = {
    primary: '#6200EE',
    secondary: '#03DAC6',
    error: '#B3261E',
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#2196F3',
  };

  let isValid = true;

  Object.entries(expectedColors).forEach(([key, expectedValue]) => {
    const actualValue = colors[key as keyof typeof colors];
    if (actualValue !== expectedValue) {
      console.error(
        `❌ Cor ${key} incorreta: esperado ${expectedValue}, obtido ${actualValue}`
      );
      isValid = false;
    }
  });

  if (isValid) {
    console.warn('✅ Todas as cores correspondem ao DESIGN.md');
  }

  return isValid;
}

/**
 * Validação de Espaçamento
 * Verifica se todos os valores são múltiplos de 4 ou 8
 */
export function validateSpacing(): boolean {
  let isValid = true;

  Object.entries(spacing).forEach(([key, value]) => {
    if (value !== 0 && value % 4 !== 0) {
      console.error(`❌ Espaçamento ${key} não é múltiplo de 4: ${value}`);
      isValid = false;
    }
  });

  if (isValid) {
    console.warn('✅ Todos os espaçamentos são múltiplos de 4');
  }

  return isValid;
}

/**
 * Validação de Tipografia
 * Verifica se a escala tipográfica está completa
 */
export function validateTypography(): boolean {
  const requiredScales = [
    'display',
    'headline',
    'title',
    'body',
    'label',
  ] as const;
  const requiredSizes = ['large', 'medium', 'small'] as const;

  let isValid = true;

  requiredScales.forEach((scale) => {
    if (!(scale in typography)) {
      console.error(`❌ Escala tipográfica ${scale} não encontrada`);
      isValid = false;
      return;
    }

    const scaleObj = typography[scale];
    if (typeof scaleObj === 'object' && scaleObj !== null) {
      requiredSizes.forEach((size) => {
        if (!(size in scaleObj)) {
          console.error(`❌ Tamanho ${size} não encontrado na escala ${scale}`);
          isValid = false;
        }
      });
    }
  });

  if (isValid) {
    console.warn('✅ Escala tipográfica completa');
  }

  return isValid;
}

/**
 * Validação de Border Radius
 * Verifica se todos os valores estão definidos
 */
export function validateBorderRadius(): boolean {
  const requiredKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'];
  let isValid = true;

  requiredKeys.forEach((key) => {
    if (!(key in borderRadius)) {
      console.error(`❌ Border radius ${key} não encontrado`);
      isValid = false;
    }
  });

  if (isValid) {
    console.warn('✅ Todos os border radius definidos');
  }

  return isValid;
}

/**
 * Validação de Sombras
 * Verifica se todas as elevações estão definidas (0-5)
 */
export function validateShadows(): boolean {
  const requiredElevations = [0, 1, 2, 3, 4, 5];
  let isValid = true;

  requiredElevations.forEach((elevation) => {
    const key = `elevation${elevation}` as keyof typeof shadows;
    if (!(key in shadows)) {
      console.error(`❌ Elevação ${elevation} não encontrada`);
      isValid = false;
    }
  });

  if (isValid) {
    console.warn('✅ Todas as elevações definidas');
  }

  return isValid;
}

/**
 * Executa todas as validações
 */
export function validateDesignSystem(): boolean {
  console.warn('🔍 Validando Design System...\n');

  const results = [
    validateColors(),
    validateSpacing(),
    validateTypography(),
    validateBorderRadius(),
    validateShadows(),
  ];

  const allValid = results.every((result) => result);

  if (allValid) {
    console.warn('\n✅ Design System validado com sucesso!');
  } else {
    console.warn('\n❌ Design System contém erros');
  }

  return allValid;
}
