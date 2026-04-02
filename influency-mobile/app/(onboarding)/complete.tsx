import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Onboarding Complete Screen
 * 
 * Tela de conclusão do onboarding.
 * Exibe mensagem de sucesso e botão para começar a usar o app.
 * 
 * Navegação:
 * - Começar a Criar → MainStack (AssistantTab)
 */

export default function OnboardingCompleteScreen() {
  const handleStart = () => {
    // Navegar para o AssistantTab (tela principal do app)
    router.replace('/(tabs)/assistant');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f5f8" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Concluído</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconSection}>
            <View style={styles.iconContainer}>
              <View style={styles.iconInner}>
                <MaterialIcons name="check" size={48} color="#FFFFFF" />
              </View>
              <View style={styles.decorativeElement1} />
              <View style={styles.decorativeElement2} />
            </View>
          </View>

          {/* Title & Description */}
          <Text style={styles.title}>Tudo pronto!</Text>
          <Text style={styles.subtitle}>
            Seu Business DNA está configurado e você está pronta para criar conteúdo viral
          </Text>

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>RESUMO DA CONFIGURAÇÃO</Text>
            <View style={styles.summaryList}>
              <View style={styles.summaryItem}>
                <View style={styles.checkIcon}>
                  <MaterialIcons name="check" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.summaryText}>Perfil configurado</Text>
              </View>
              <View style={styles.summaryItem}>
                <View style={styles.checkIcon}>
                  <MaterialIcons name="check" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.summaryText}>Redes conectadas</Text>
              </View>
              <View style={styles.summaryItem}>
                <View style={styles.checkIcon}>
                  <MaterialIcons name="check" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.summaryText}>Business DNA definido</Text>
              </View>
            </View>
          </View>

          {/* Decorative Image */}
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTakaKnNYwjJ_mLodb8BZJ1m9IBxEob_iOp2-koFTPCfQd3rMJaeVBnNBI6_vGas3x8DwoeUKYD24h8-47R1zRaYjuXE6ZTuKqDNmh02l2Q_lssarn7tzXsKOMwpLIFqqkBpIgkx65ukXNZ5BpWiPfLI7xkerkBB1C5MNP1YPgw_hSgyN9XGEa7nHmyxQqX0Cbe7yF4jOYAQramYsh2BK0mtV7aFM0-tO26ovO7Sl-XYSIZZugvtjXUHIP2sB2SqO1ElcXE0M_DWFu'
            }}
            style={styles.decorativeImage}
            resizeMode="cover"
          >
            {/* Conteúdo vazio - apenas a imagem de fundo */}
          </ImageBackground>
        </View>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomButton}>
          <Button
            mode="contained"
            onPress={handleStart}
            style={styles.startButton}
            buttonColor="#7800f0"
            textColor="#FFFFFF"
            contentStyle={styles.startButtonContent}
          >
            Criar meu primeiro roteiro
          </Button>
        </View>
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
    paddingVertical: 16,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginRight: 48, // Compensate for close button
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 96, // Space for fixed button
    paddingTop: 32,
  },
  iconSection: {
    marginBottom: 32,
  },
  iconContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(120, 0, 240, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7800f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7800f0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  decorativeElement1: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(120, 0, 240, 0.2)',
  },
  decorativeElement2: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(120, 0, 240, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(120, 0, 240, 0.05)',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(120, 0, 240, 0.1)',
    marginBottom: 48,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7800f0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  summaryList: {
    gap: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7800f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#475569',
  },
  decorativeImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // Imagem de fundo conforme HTML - seria necessário usar ImageBackground com a URL do HTML
    backgroundColor: '#f1f5f9', // Fallback até implementar a imagem real
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
  },
  startButton: {
    borderRadius: 8,
    shadowColor: '#7800f0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  startButtonContent: {
    height: 44,
    justifyContent: 'center',
  },
});
