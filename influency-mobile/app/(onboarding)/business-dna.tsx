import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Business DNA Screen
 * 
 * Tela de captura do Business DNA (5 perguntas sequenciais).
 * Usuário responde perguntas sobre nicho, público, tom de voz, objetivos e diferenciais.
 * Respostas são salvas no AsyncStorage.
 * 
 * Navegação:
 * - Após última pergunta → ConnectSocialNetworksScreen
 */

interface BusinessDNAData {
  nicho: string;
  publicoAlvo: string;
  tomDeVoz: string;
  objetivos: string;
  diferenciais: string;
}

const QUESTIONS = [
  {
    id: 'nicho',
    question: 'Qual é o seu nicho ou negócio?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 'publicoAlvo',
    question: 'Quem é o seu público-alvo?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 'tomDeVoz',
    question: 'Qual é o tom de voz da sua marca?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 'objetivos',
    question: 'Quais são seus objetivos?',
    placeholder: 'Digite sua resposta aqui...',
  },
  {
    id: 'diferenciais',
    question: 'Quais são seus diferenciais?',
    placeholder: 'Digite sua resposta aqui...',
  },
];

export default function BusinessDNAScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<BusinessDNAData>({
    nicho: '',
    publicoAlvo: '',
    tomDeVoz: '',
    objetivos: '',
    diferenciais: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const totalSteps = QUESTIONS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Atualizar resposta atual
  const handleAnswerChange = (text: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: text,
    });
  };

  // Voltar para pergunta anterior
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Avançar para próxima pergunta ou finalizar
  const handleNext = async () => {
    // Validar se resposta foi preenchida
    const currentAnswer = answers[currentQuestion.id as keyof BusinessDNAData];
    if (!currentAnswer || currentAnswer.trim() === '') {
      return;
    }

    // Se não é a última pergunta, avançar
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Se é a última pergunta, salvar e navegar
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('businessDNA', JSON.stringify(answers));
      router.push('/(onboarding)/connect-social');
    } catch (error) {
      console.error('Erro ao salvar Business DNA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.statusIcons}>
            {/* Status icons would go here */}
          </View>
        </View>

        {/* Header & Progress Bar */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#1e293b" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Influency</Text>
            <View style={styles.headerSpacer} />
          </View>
          
          <View style={styles.progressSection}>
            <Text style={styles.progressText}>Pergunta {currentStep + 1} de {totalSteps}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${(currentStep + 1) * 20}%` }]} />
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            {/* Question */}
            <Text style={styles.question}>{currentQuestion.question}</Text>

            {/* Voice Input Section */}
            <View style={styles.voiceSection}>
              <TouchableOpacity style={styles.micButton}>
                <MaterialIcons name="mic" size={32} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.voiceText}>Toque para falar</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Text Input Area */}
            <TextInput
              mode="outlined"
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id as keyof BusinessDNAData]}
              onChangeText={handleAnswerChange}
              multiline
              numberOfLines={5}
              style={styles.textInput}
              outlineStyle={styles.inputOutline}
              theme={{
                colors: {
                  primary: '#6400f0',
                  outline: '#e2e8f0',
                }
              }}
            />
          </ScrollView>

          {/* Navigation Buttons */}
          <View style={styles.footer}>
            {currentStep > 0 && (
              <Button
                mode="outlined"
                onPress={handleBack}
                style={styles.backButton}
                textColor="#64748b"
              >
                Voltar
              </Button>
            )}
            <Button
              mode="contained"
              onPress={handleNext}
              loading={isLoading}
              disabled={isLoading || !answers[currentQuestion.id as keyof BusinessDNAData]}
              style={[styles.nextButton, currentStep === 0 && styles.nextButtonFullWidth]}
              buttonColor="#6400f0"
              textColor="#FFFFFF"
            >
              Próxima
            </Button>
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
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 8,
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSpacer: {
    width: 32,
  },
  progressSection: {
    gap: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6400f0',
    borderRadius: 3,
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
    paddingVertical: 32,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    lineHeight: 32,
    marginBottom: 40,
  },
  voiceSection: {
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  micButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#6400f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6400f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  voiceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    minHeight: 120,
  },
  inputOutline: {
    borderRadius: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#cbd5e1',
  },
  nextButton: {
    flex: 1.5,
    height: 48,
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: '#6400f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonFullWidth: {
    flex: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -64,
    width: 128,
    height: 4,
    backgroundColor: '#cbd5e1',
    borderRadius: 2,
  },
});
