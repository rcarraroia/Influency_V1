import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Forgot Password Screen
 * 
 * Tela de recuperação de senha.
 * Usuário digita email e recebe link de recuperação.
 * 
 * Navegação:
 * - Voltar → LoginScreen
 * - Após envio → Exibe mensagem de confirmação
 */
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  // Handle send reset link
  const handleSendResetLink = async () => {
    // Validar email
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      return;
    }

    try {
      setIsLoading(true);
      
      // TODO: Integrar com API real quando backend estiver pronto
      // await authService.forgotPassword(email);
      
      // Simular envio
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Exibir mensagem de sucesso
      setIsSuccess(true);
    } catch (error) {
      console.error('Erro ao enviar link de recuperação:', error);
      setEmailError('Erro ao enviar link. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f5f8" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel="Voltar"
          >
            <MaterialIcons name="arrow-back" size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recuperar Senha</Text>
          <View style={styles.headerSpacer} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            {/* Icon Section */}
            <View style={styles.iconSection}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="mail" size={48} color="#6400f0" />
              </View>
            </View>

            {/* Title & Description */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>Esqueceu sua senha?</Text>
              <Text style={styles.subtitle}>
                Digite seu email e enviaremos um link para redefinir sua senha
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
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
                  theme={{
                    colors: {
                      primary: '#6400f0',
                      outline: emailError ? '#ef4444' : '#e2e8f0',
                    }
                  }}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              {/* Primary Action */}
              <Button
                mode="contained"
                onPress={handleSendResetLink}
                loading={isLoading}
                disabled={isLoading}
                style={styles.sendButton}
                buttonColor="#6400f0"
                textColor="#FFFFFF"
              >
                Enviar link de recuperação
              </Button>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.footerLink}>Voltar para login</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginRight: 24,
  },
  headerSpacer: {
    width: 24,
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
  iconSection: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(100, 0, 240, 0.1)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  form: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  inputOutline: {
    borderRadius: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
  sendButton: {
    height: 44,
    justifyContent: 'center',
    borderRadius: 8,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 24,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6400f0',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -64,
    width: 128,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
});
