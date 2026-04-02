/**
 * Validation Utilities
 * 
 * Funções de validação reutilizáveis para formulários.
 * Todas as funções retornam string vazia se válido, ou mensagem de erro se inválido.
 */

/**
 * Valida se um campo é obrigatório (não vazio)
 */
export const validateRequired = (value: string, fieldName: string = 'Campo'): string => {
  if (!value || value.trim() === '') {
    return `${fieldName} é obrigatório`;
  }
  return '';
};

/**
 * Valida formato de email
 */
export const validateEmail = (email: string): string => {
  if (!email) {
    return 'Email é obrigatório';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email inválido';
  }

  return '';
};

/**
 * Valida senha (mínimo 8 caracteres)
 */
export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Senha é obrigatória';
  }

  if (password.length < 8) {
    return 'Senha deve ter pelo menos 8 caracteres';
  }

  return '';
};

/**
 * Valida senha forte (mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial)
 */
export const validateStrongPassword = (password: string): string => {
  if (!password) {
    return 'Senha é obrigatória';
  }

  if (password.length < 8) {
    return 'Senha deve ter pelo menos 8 caracteres';
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) {
    return 'Senha deve conter pelo menos uma letra maiúscula';
  }

  if (!hasLowerCase) {
    return 'Senha deve conter pelo menos uma letra minúscula';
  }

  if (!hasNumber) {
    return 'Senha deve conter pelo menos um número';
  }

  if (!hasSpecialChar) {
    return 'Senha deve conter pelo menos um caractere especial';
  }

  return '';
};

/**
 * Valida confirmação de senha
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) {
    return 'Confirmação de senha é obrigatória';
  }

  if (password !== confirmPassword) {
    return 'As senhas não coincidem';
  }

  return '';
};

/**
 * Valida nome (mínimo 3 caracteres)
 */
export const validateName = (name: string): string => {
  if (!name) {
    return 'Nome é obrigatório';
  }

  if (name.trim().length < 3) {
    return 'Nome deve ter pelo menos 3 caracteres';
  }

  return '';
};

/**
 * Valida telefone brasileiro (formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
 */
export const validatePhone = (phone: string): string => {
  if (!phone) {
    return 'Telefone é obrigatório';
  }

  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');

  // Valida se tem 10 ou 11 dígitos (com DDD)
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return 'Telefone inválido';
  }

  return '';
};

/**
 * Valida URL
 */
export const validateUrl = (url: string): string => {
  if (!url) {
    return 'URL é obrigatória';
  }

  try {
    new URL(url);
    return '';
  } catch {
    return 'URL inválida';
  }
};

/**
 * Valida número mínimo
 */
export const validateMin = (value: number, min: number, fieldName: string = 'Valor'): string => {
  if (value < min) {
    return `${fieldName} deve ser no mínimo ${min}`;
  }
  return '';
};

/**
 * Valida número máximo
 */
export const validateMax = (value: number, max: number, fieldName: string = 'Valor'): string => {
  if (value > max) {
    return `${fieldName} deve ser no máximo ${max}`;
  }
  return '';
};

/**
 * Valida comprimento mínimo de string
 */
export const validateMinLength = (value: string, minLength: number, fieldName: string = 'Campo'): string => {
  if (value.length < minLength) {
    return `${fieldName} deve ter pelo menos ${minLength} caracteres`;
  }
  return '';
};

/**
 * Valida comprimento máximo de string
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string = 'Campo'): string => {
  if (value.length > maxLength) {
    return `${fieldName} deve ter no máximo ${maxLength} caracteres`;
  }
  return '';
};

/**
 * Valida se valor está em uma lista de opções
 */
export const validateInList = (value: string, options: string[], fieldName: string = 'Valor'): string => {
  if (!options.includes(value)) {
    return `${fieldName} inválido`;
  }
  return '';
};

/**
 * Combina múltiplas validações
 * Retorna a primeira mensagem de erro encontrada, ou string vazia se todas passarem
 */
export const combineValidations = (...validations: string[]): string => {
  for (const validation of validations) {
    if (validation) {
      return validation;
    }
  }
  return '';
};
