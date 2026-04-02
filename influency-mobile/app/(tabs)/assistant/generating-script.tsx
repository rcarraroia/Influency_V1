import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { scriptsService } from '../../../src/services/scripts';
import { useScriptStore } from '../../../src/store/scriptStore';

/**
 * Generating Script Loading Screen
 *
 * Tela de loading durante geração do roteiro com IA.
 * Layout baseado EXATAMENTE no HTML de referência: generating-script-loading.html
 *
 * CORES DO HTML:
 * - primary: "#6400f0"
 * - background: "#FFFFFF"
 */

export default function GeneratingScriptScreen() {
  const params = useLocalSearchParams<{ topic: string; duration: string }>();
  const { addScript, setError } = useScriptStore();
  const [progress, setProgress] = useState(0);

  // Animação do spinner — gira 360° em 1s linear infinite
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação do spinner
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Simula progresso enquanto a API responde
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 8;
      });
    }, 400);

    generateScript();

    return () => clearInterval(progressInterval);
  }, []);

  const generateScript = async () => {
    try {
      const topic = params.topic || '';
      const duration = parseInt(params.duration || '60', 10);

      const script = await scriptsService.generate({ topic, duration });
      addScript(script);

      setProgress(100);

      router.replace({
        pathname: '/(tabs)/assistant/script-generated',
        params: { scriptId: script.id },
      });
    } catch (error) {
      console.error('Error generating script:', error);
      setError('Erro ao gerar roteiro. Tente novamente.');
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top bar — close button + title - EXATO DO HTML */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Influency</Text>
      </View>

      {/* Center area — spinner + progress - EXATO DO HTML */}
      <View style={styles.centerArea}>
        {/* Loading Spinner - border-left animated - EXATO DO HTML */}
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />

        {/* Progress info - EXATO DO HTML */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressPercent}>{displayProgress}%</Text>

          {/* Progress bar */}
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${displayProgress}%` }]} />
          </View>

          <Text style={styles.progressLabel}>Gerando roteiro viral...</Text>
        </View>
      </View>

      {/* Bottom tip card - EXATO DO HTML */}
      <View style={styles.bottomArea}>
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <MaterialIcons name="lightbulb" size={24} color="#6400f0" />
          </View>
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipLabel}>Dica Pro</Text>
            <Text style={styles.tipText}>
              Estamos analisando tendências e criando um roteiro otimizado para engajamento.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // bg-white EXATO DO HTML
  },
  // Top bar — p-4 justify-between - EXATO DO HTML
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16, // p-4
  },
  closeButton: {
    width: 48, // size-12 = 48px EXATO
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    color: '#0f172a', // text-slate-900
    fontSize: 18, // text-lg
    fontWeight: '700', // font-bold
    flex: 1,
    textAlign: 'center',
    paddingRight: 48, // compensar close button
    letterSpacing: -0.3, // tracking-[-0.015em]
  },
  // Center area — flex-1 items-center justify-center px-6 - EXATO DO HTML
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24, // px-6
  },
  // Loading Spinner — 80x80, border 4px - EXATO DO HTML CSS
  spinner: {
    width: 80, // 80px EXATO
    height: 80, // 80px EXATO
    borderRadius: 40, // rounded
    borderWidth: 4, // border: 4px
    borderColor: 'rgba(100, 0, 240, 0.1)', // border: 4px solid rgba(100, 0, 240, 0.1)
    borderLeftColor: '#6400f0', // border-left-color: #6400f0
    marginBottom: 48, // mb-12
  },
  // Progress Container — w-[280px] space-y-4 text-center
  progressContainer: {
    width: 280, // w-[280px] EXATO
    gap: 16, // space-y-4
    alignItems: 'center',
  },
  progressPercent: {
    color: '#6400f0', // text-primary EXATO
    fontSize: 32, // text-[32px] EXATO
    fontWeight: '700', // font-bold
    lineHeight: 38,
  },
  // Progress bar track — h-2 rounded-full bg-slate-200
  progressBarTrack: {
    width: '100%',
    height: 8, // h-2
    borderRadius: 4, // rounded-full
    backgroundColor: '#e2e8f0', // bg-slate-200
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6400f0', // bg-primary EXATO
    borderRadius: 4,
  },
  progressLabel: {
    color: '#475569', // text-slate-600
    fontSize: 18, // text-lg
    fontWeight: '500', // font-medium
  },
  // Bottom area — p-6 pb-12
  bottomArea: {
    padding: 24, // p-6
    paddingBottom: 48, // pb-12
  },
  // Tip card — bg-primary/10 rounded-xl p-4 flex gap-4 items-start - EXATO DO HTML
  tipCard: {
    backgroundColor: 'rgba(100, 0, 240, 0.1)', // bg-primary/10
    borderRadius: 12, // rounded-xl
    padding: 16, // p-4
    flexDirection: 'row',
    gap: 16, // gap-4
    alignItems: 'flex-start',
  },
  tipIconContainer: {
    backgroundColor: 'rgba(100, 0, 240, 0.2)', // bg-primary/20
    padding: 8, // p-2
    borderRadius: 8, // rounded-lg
    flexShrink: 0,
  },
  tipTextContainer: {
    flex: 1,
    gap: 4, // gap-1
  },
  tipLabel: {
    color: '#6400f0', // text-primary EXATO
    fontSize: 12, // text-sm
    fontWeight: '700', // font-bold
    textTransform: 'uppercase', // uppercase
    letterSpacing: 1, // tracking-wider
  },
  tipText: {
    color: '#334155', // text-slate-700
    fontSize: 14, // text-sm
    lineHeight: 20, // leading-relaxed
  },
});
