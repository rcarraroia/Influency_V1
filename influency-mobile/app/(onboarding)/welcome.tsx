import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Welcome Screen
 * 
 * Tela de boas-vindas do onboarding.
 * 
 * Navegação:
 * - Começar → BusinessDNAScreen
 */
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f5f8" />
      <SafeAreaView style={styles.safeArea}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.statusIcons}>
            {/* Status icons would go here in a real implementation */}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Illustration Area */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationBlur} />
            <LinearGradient
              colors={['#6400f0', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.illustration}
            >
              <MaterialIcons name="auto-awesome" size={72} color="#FFFFFF" />
              
              {/* Decorative floating elements */}
              <View style={styles.decorativeElement1}>
                <MaterialIcons name="videocam" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.decorativeElement2}>
                <MaterialIcons name="favorite" size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </View>

          {/* Title */}
          <Text style={styles.title}>Bem-vinda ao Influency!</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Vou te ajudar a criar conteúdo viral para suas redes sociais
          </Text>
        </View>

        {/* Primary Action Area */}
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={() => router.push('/(onboarding)/business-dna')}
            style={styles.button}
            buttonColor="#6400f0"
            textColor="#FFFFFF"
            contentStyle={styles.buttonContent}
          >
            Começar
          </Button>
        </View>

        {/* iOS Home Indicator */}
        <View style={styles.homeIndicator} />
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 8,
    paddingBottom: 8,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    width: 200,
    height: 200,
    marginBottom: 48,
    position: 'relative',
  },
  illustrationBlur: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(100, 0, 240, 0.1)',
    borderRadius: 100,
    transform: [{ scale: 1.2 }],
    opacity: 0.6,
  },
  illustration: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6400f0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  decorativeElement1: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 8,
    backdropFilter: 'blur(4px)',
  },
  decorativeElement2: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 8,
    backdropFilter: 'blur(4px)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#130c1d',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  button: {
    borderRadius: 8,
    shadowColor: '#6400f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    height: 44,
    justifyContent: 'center',
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
