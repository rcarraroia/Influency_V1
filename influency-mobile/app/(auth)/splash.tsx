import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Splash Screen
 * 
 * Tela inicial do app que verifica autenticação e redireciona.
 * 
 * Fluxo:
 * - Verifica se usuário está autenticado
 * - Se sim → MainStack (tabs)
 * - Se não → LoginScreen
 */
export default function SplashScreen() {
  useEffect(() => {
    // TODO: Verificar autenticação real
    // Por enquanto, redireciona para login após 2 segundos
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#6200EE', '#7F39FB']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={styles.safeArea}>
        {/* Status Bar Area */}
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.statusIcons}>
            {/* Status icons would go here in a real implementation */}
          </View>
        </View>

        {/* Center Content */}
        <View style={styles.centerContent}>
          {/* Logo Container */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>INFLUENCY</Text>
          </View>

          {/* Loading Indicator */}
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.version}>v2.0.0</Text>
        </View>

        {/* iOS Home Indicator */}
        <View style={styles.homeIndicator} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  time: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    padding: 16,
  },
  logoText: {
    color: '#6200EE',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    lineHeight: 16,
  },
  loadingContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  version: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: 'Roboto',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -64,
    width: 128,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
  },
});
