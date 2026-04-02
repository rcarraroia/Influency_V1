import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/authStore';

/**
 * Register Screen
 * 
 * Tela de cadastro com nome, email, senha e confirmação de senha.
 * 
 * Navegação:
 * - Cadastro bem-sucedido → OnboardingStack
 * - Já tem conta → LoginScreen
 */
export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = useAuthStore((state) => state.register);

  // Validação de nome
  const validateName = (value: string): boolean => {
    if (!value) {
      setNameError('Nome é obrigatório');
      return false;
    }
    if (value.length < 3) {
      setNameError('Nome deve ter pelo menos 3 caracteres');
      return false;
    }
    setNameError('');
    return true;
  };

  // Validação de email
  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Email é obrigatório');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Email inválido');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validação de senha
  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError('Senha é obrigatória');
      return false;
    }
    if (value.length < 8) {
      setPasswordError('Senha deve ter pelo menos 8 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Validação de confirmação de senha
  const validateConfirmPassword = (value: string): boolean => {
    if (!value) {
      setConfirmPasswordError('Confirmação de senha é obrigatória');
      return false;
    }
    if (value !== password) {
      setConfirmPasswordError('As senhas não coincidem');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  // Handle register
  const handleRegister = async () => {
    // Validar campos
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    try {
      setIsLoading(true);
      await register(name, email, password);
      
      // Navegar para onboarding após cadastro bem-sucedido
      router.replace('/(onboarding)/welcome');
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
      setEmailError('Este email já está em uso');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f5f8" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="rocket-launch" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.title}>Criar Conta</Text>
              <Text style={styles.subtitle}>Comece a criar conteúdo viral hoje</Text>
            </View>

            {/* Form Section */}
            <View style={styles.form}>
              {/* Full Name */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Nome completo</Text>
                <TextInput
                  mode="outlined"
                  placeholder="Seu nome"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (nameError) validateName(text);
                  }}
                  onBlur={() => validateName(name)}
                  error={!!nameError}
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  right={
                    name && !nameError ? (
                      <TextInput.Icon icon="check-circle" iconColor="#10b981" />
                    ) : null
                  }
                  theme={{
                    colors: {
                      primary: '#6200EE',
                      outline: nameError ? '#ef4444' : '#cbd5e1',
                    }
                  }}
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
              </View>

              {/* Email */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  mode="outlined"
                  placeholder="seu@email.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) validateEmail(text);
                  }}
                  onBlur={() => validateEmail(email)}
                  error={!!emailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  right={
                    email && !emailError ? (
                      <TextInput.Icon icon="check-circle" iconColor="#10b981" />
                    ) : null
                  }
                  theme={{
                    colors: {
                      primary: '#6200EE',
                      outline: emailError ? '#ef4444' : '#cbd5e1',
                    }
                  }}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              {/* Password */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  mode="outlined"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) validatePassword(text);
                    if (confirmPassword) validateConfirmPassword(confirmPassword);
                  }}
                  onBlur={() => validatePassword(password)}
                  error={!!passwordError}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  theme={{
                    colors: {
                      primary: '#6200EE',
                      outline: passwordError ? '#ef4444' : '#cbd5e1',
                    }
                  }}
                />
                <Text style={styles.helperText}>Mínimo 8 caracteres</Text>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>

              {/* Confirm Password */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Confirmar senha</Text>
                <TextInput
                  mode="outlined"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) validateConfirmPassword(text);
                  }}
                  onBlur={() => validateConfirmPassword(confirmPassword)}
                  error={!!confirmPasswordError}
                  secureTextEntry={!showConfirmPassword}
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  right={
                    <TextInput.Icon
                      icon={showConfirmPassword ? "eye-off" : "eye"}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  }
                  theme={{
                    colors: {
                      primary: '#6200EE',
                      outline: confirmPasswordError ? '#ef4444' : '#cbd5e1',
                    }
                  }}
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
              </View>

              {/* Register Button */}
              <Button
                mode="contained"
                onPress={handleRegister}
                loading={isLoading}
                disabled={isLoading}
                style={styles.registerButton}
                buttonColor="#6200EE"
                textColor="#FFFFFF"
              >
                Criar Conta
              </Button>

              {/* Footer */}
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                  Já tem conta?{' '}
                  <Text
                    style={styles.footerLink}
                    onPress={() => router.push('/(auth)/login')}
                  >
                    Fazer login
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Social Register Alternative */}
          <View style={styles.socialSection}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Ou registre-se com</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <AntDesign name="google" size={20} color="#4285f4" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#000000" />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* iOS Home Indicator */}
          <View style={styles.homeIndicator} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f8',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#6200EE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    paddingTop: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  inputOutline: {
    borderRadius: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
  registerButton: {
    height: 44,
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 8,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  footerContainer: {
    alignItems: 'center',
    paddingTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  socialSection: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: 12,
    color: '#94a3b8',
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -64,
    width: 128,
    height: 6,
    backgroundColor: '#cbd5e1',
    borderRadius: 3,
  },
});
