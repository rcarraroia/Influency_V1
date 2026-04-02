import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Connect Social Networks Screen
 * 
 * Tela para conectar redes sociais (Instagram, TikTok, Facebook).
 * Usuário pode conectar ou pular esta etapa.
 * 
 * Navegação:
 * - Após conectar ou pular → OnboardingCompleteScreen
 */

interface SocialNetwork {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
}

export default function ConnectSocialNetworksScreen() {
  const [networks, setNetworks] = useState<SocialNetwork[]>([
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'photo-camera',
      color: 'linear-gradient',
      connected: false,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'music-note',
      color: '#000000',
      connected: false,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'social-leaderboard',
      color: '#1877F2',
      connected: false,
    },
  ]);

  // Conectar rede social (mock - OAuth será implementado futuramente)
  const handleConnect = (networkId: string) => {
    setNetworks(
      networks.map((network) =>
        network.id === networkId ? { ...network, connected: true } : network
      )
    );
  };

  // Pular esta etapa
  const handleSkip = () => {
    router.push('/(onboarding)/complete');
  };

  const getNetworkIcon = (networkId: string) => {
    switch (networkId) {
      case 'instagram':
        return 'photo-camera';
      case 'tiktok':
        return 'music-note';
      case 'facebook':
        return 'social-leaderboard';
      default:
        return 'link';
    }
  };

  const getNetworkColor = (networkId: string) => {
    switch (networkId) {
      case 'instagram':
        return '#E4405F'; // Instagram gradient approximation
      case 'tiktok':
        return '#000000';
      case 'facebook':
        return '#1877F2';
      default:
        return '#6400f0';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Conecte suas redes sociais</Text>
          <Text style={styles.subtitle}>Publique em todas de uma vez</Text>
        </View>

        {/* Cards Container */}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.cardsContainer}>
          {networks.map((network) => (
            <View key={network.id} style={styles.networkCard}>
              <View style={styles.networkInfo}>
                {network.id === 'instagram' ? (
                  <LinearGradient
                    colors={['#fdf497', '#fd5949', '#d6249f', '#285AEB']}
                    start={{ x: 0.3, y: 1.07 }}
                    end={{ x: 0.9, y: 0 }}
                    style={styles.networkIconContainer}
                  >
                    <MaterialIcons 
                      name={getNetworkIcon(network.id) as any} 
                      size={24} 
                      color="#FFFFFF" 
                    />
                  </LinearGradient>
                ) : network.id === 'facebook' ? (
                  <View style={[
                    styles.networkIconContainer,
                    { backgroundColor: getNetworkColor(network.id) }
                  ]}>
                    <Text style={styles.facebookIcon}>f</Text>
                  </View>
                ) : (
                  <View style={[
                    styles.networkIconContainer,
                    { backgroundColor: getNetworkColor(network.id) }
                  ]}>
                    <MaterialIcons 
                      name={getNetworkIcon(network.id) as any} 
                      size={24} 
                      color="#FFFFFF" 
                    />
                  </View>
                )}
                <View style={styles.networkDetails}>
                  <Text style={styles.networkName}>{network.name}</Text>
                  <Text style={styles.networkStatus}>Conecte sua conta</Text>
                </View>
              </View>
              <Button
                mode="contained"
                onPress={() => handleConnect(network.id)}
                style={styles.connectButton}
                buttonColor="#6400f0"
                textColor="#FFFFFF"
                compact
              >
                Conectar
              </Button>
            </View>
          ))}
        </ScrollView>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Pular por enquanto</Text>
          </TouchableOpacity>
          
          {/* iOS Home Indicator */}
          <View style={styles.homeIndicator} />
        </View>
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
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    lineHeight: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  networkCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  networkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  networkIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  networkDetails: {
    flex: 1,
  },
  networkName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  networkStatus: {
    fontSize: 14,
    color: '#64748b',
  },
  connectButton: {
    borderRadius: 8,
  },
  facebookIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6400f0',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  homeIndicator: {
    width: 128,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginTop: 32,
  },
});
