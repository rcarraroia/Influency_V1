/**
 * Input Component
 * Componente de input de texto reutilizável com suporte a validação e ícones
 *
 * Requirements: 3.2, 3.8, 3.9, 3.10, 18.1, 18.4
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface InputProps {
  /** Tipo de input */
  type?: 'text' | 'password' | 'email' | 'multiline';
  /** Placeholder do input */
  placeholder?: string;
  /** Valor atual do input */
  value: string;
  /** Callback quando o texto muda */
  onChangeText: (text: string) => void;
  /** Mensagem de erro (se houver) */
  error?: string;
  /** Se o input está desabilitado */
  disabled?: boolean;
  /** Ícone a ser exibido (componente React) */
  icon?: React.ReactNode;
  /** Limite máximo de caracteres */
  maxLength?: number;
  /** Número de linhas (para multiline) */
  rows?: number;
  /** Label do input */
  label?: string;
  /** Label de acessibilidade */
  accessibilityLabel?: string;
  /** Hint de acessibilidade */
  accessibilityHint?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  icon,
  maxLength,
  rows = 1,
  label,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isMultiline = type === 'multiline';
  const isPassword = type === 'password';
  const hasError = !!error;

  // Determinar keyboard type baseado no tipo
  const keyboardType = type === 'email' ? 'email-address' : 'default';

  // Determinar se deve mostrar o texto ou ocultar (para senha)
  const secureTextEntry = isPassword && !isPasswordVisible;

  // Estilos dinâmicos
  const containerStyle = [
    styles.container,
    isFocused && styles.containerFocused,
    hasError && styles.containerError,
    disabled && styles.containerDisabled,
  ];

  const inputStyle = [
    styles.input,
    isMultiline && styles.inputMultiline,
    disabled && styles.inputDisabled,
  ];

  return (
    <View style={styles.wrapper}>
      {/* Label associado ao input (Requirement 18.4) */}
      {label && (
        <Text style={styles.label} accessibilityLabel={`Label: ${label}`}>
          {label}
        </Text>
      )}

      <View style={containerStyle}>
        {/* Ícone à esquerda */}
        {icon && <View style={styles.iconLeft}>{icon}</View>}

        {/* Input de texto */}
        <TextInput
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceVariant}
          editable={!disabled}
          multiline={isMultiline}
          numberOfLines={isMultiline ? rows : 1}
          maxLength={maxLength}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          autoCorrect={type !== 'email'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={
            accessibilityLabel || label || placeholder || 'Campo de texto'
          }
          accessibilityHint={accessibilityHint}
          accessibilityState={{ disabled }}
        />

        {/* Botão de toggle para senha */}
        {isPassword && (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'
            }
          >
            <Text style={styles.passwordToggle}>
              {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Mensagem de erro (Requirement 3.2) */}
      {hasError && (
        <Text style={styles.errorText} accessibilityLabel={`Erro: ${error}`}>
          {error}
        </Text>
      )}

      {/* Contador de caracteres (se maxLength definido) */}
      {maxLength && (
        <Text
          style={styles.charCount}
          accessibilityLabel={`${value.length} de ${maxLength} caracteres`}
        >
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing[4], // 16px
  },
  label: {
    fontSize: typography.label.medium.fontSize,
    lineHeight: typography.label.medium.lineHeight,
    fontFamily: typography.fontFamily,
    fontWeight: typography.label.medium.fontWeight as any,
    color: colors.onSurface,
    marginBottom: spacing[1], // 4px
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: borderRadius.sm, // 8px (sm)
    backgroundColor: colors.surface,
    paddingHorizontal: spacing[2], // 8px
    // Touch target mínimo de 48px de altura
    minHeight: 48,
  },
  containerFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  containerError: {
    borderColor: colors.error,
  },
  containerDisabled: {
    backgroundColor: colors.surfaceVariant,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: typography.body.large.fontSize,
    lineHeight: typography.body.large.lineHeight,
    fontFamily: typography.fontFamily,
    color: colors.onSurface,
    paddingVertical: spacing[2], // 8px
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    color: colors.onSurfaceVariant,
  },
  iconLeft: {
    marginRight: spacing[1], // 4px
  },
  iconRight: {
    marginLeft: spacing[1], // 4px
    padding: spacing[1], // 4px
  },
  passwordToggle: {
    fontSize: 20,
  },
  errorText: {
    fontSize: typography.label.small.fontSize,
    lineHeight: typography.label.small.lineHeight,
    fontFamily: typography.fontFamily,
    color: colors.error,
    marginTop: spacing[1], // 4px
  },
  charCount: {
    fontSize: typography.label.small.fontSize,
    lineHeight: typography.label.small.lineHeight,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    marginTop: spacing[1], // 4px
    textAlign: 'right',
  },
});

export default Input;
