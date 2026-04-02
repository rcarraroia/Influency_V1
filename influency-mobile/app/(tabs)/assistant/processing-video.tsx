import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Processing Video Loading Screen
 * Layout baseado EXATAMENTE no HTML de referência: processing-video-loading.html
 *
 * CORES DO HTML:
 * - primary: "#660ce4"
 * - background: "#f7f5f8"
 */

type ProcessingStage = 'transcribing' | 'subtitles' | 'music' | 'finalizing';

export default function ProcessingVideoScreen() {
  const params = useLocalSearchParams();
  const videoUri = params.videoUri as string;

  // Defensive JSON parse para evitar crash se settings for inválido
  let settings: Record<string, unknown> = {};
  try {
    const settingsJson = params.settings as string;
    if (settingsJson) settings = JSON.parse(settingsJson);
  } catch {
    settings = {};
  }

  const [currentStage, setCurrentStage] = useState<ProcessingStage>('transcribing');
  const [progress, setProgress] = useState(0);

  const spinAnim = useRef(new Animated.Value(0)).current;
  const stepSpinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(stepSpinAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    simulateProcessing();
  }, []);

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const stepSpinInterpolate = stepSpinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const simulateProcessing = async () => {
    setCurrentStage('transcribing');
    await animateProgress(0, 25, 2000);

    setCurrentStage('subtitles');
    await animateProgress(25, 50, 2000);

    setCurrentStage('music');
    await animateProgress(50, 75, 2000);

    setCurrentStage('finalizing');
    await animateProgress(75, 100, 2000);

    setTimeout(() => {
      router.replace({
        pathname: '/(tabs)/assistant/video-final-preview',
        params: {
          originalVideoUri: videoUri,
          processedVideoUri: 'mock-processed-video-uri',
        },
      });
    }, 500);
  };

  const animateProgress = (from: number, to: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      const steps = 20;
      const stepDuration = duration / steps;
      const stepSize = (to - from) / steps;
      let current = from;
      const interval = setInterval(() => {
        current += stepSize;
        setProgress(Math.min(current, to));
        if (current >= to) {
          clearInterval(interval);
          resolve();
        }
      }, stepDuration);
    });
  };

  const getStageStatus = (stage: ProcessingStage): 'pending' | 'active' | 'completed' => {
    const order: ProcessingStage[] = ['transcribing', 'subtitles', 'music', 'finalizing'];
    const ci = order.indexOf(currentStage);
    const si = order.indexOf(stage);
    if (si < ci) return 'completed';
    if (si === ci) return 'active';
    return 'pending';
  };

  const progressPercent = Math.round(progress);

  const stages: { key: ProcessingStage; label: string }[] = [
    { key: 'transcribing', label: 'Transcrevendo' },
    { key: 'subtitles',    label: 'Legendas' },
    { key: 'music',        label: 'Música' },
    { key: 'finalizing',   label: 'Finalizando' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header — flex items-center p-4 pt-12 pb-2 justify-between */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Processando Vídeo</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Main content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Central Animation — mb-12 */}
        <View style={styles.animationWrapper}>
          <View style={styles.ringOuter}>
            {/* Spinning ring — border-t-4 border-primary animate-spin */}
            <Animated.View
              style={[styles.ringSpin, { transform: [{ rotate: spinInterpolate }] }]}
            />
            {/* movie_edit icon inside — text-primary text-5xl */}
            <MaterialIcons name="movie" size={48} color="#660ce4" />
          </View>
        </View>

        {/* Vertical Progress List — space-y-0 */}
        <View>
          {stages.map((stage, idx) => {
            const status = getStageStatus(stage.key);
            const isLast = idx === stages.length - 1;
            return (
              <View key={stage.key} style={styles.stageRow}>
                {/* Left: icon + connector */}
                <View style={styles.stageIconCol}>
                  {status === 'completed' && (
                    <View style={styles.iconWrapCompleted}>
                      <MaterialIcons name="check-circle" size={24} color="#10b981" />
                    </View>
                  )}
                  {status === 'active' && (
                    <View style={styles.iconWrapActive}>
                      <Animated.View style={{ transform: [{ rotate: stepSpinInterpolate }] }}>
                        <MaterialIcons name="autorenew" size={24} color="#660ce4" />
                      </Animated.View>
                    </View>
                  )}
                  {status === 'pending' && (
                    <View style={styles.iconWrapPending}>
                      <MaterialIcons name="radio-button-unchecked" size={24} color="#cbd5e1" />
                    </View>
                  )}
                  {/* Connector line — w-[2px] h-10 */}
                  {!isLast && (
                    <View
                      style={[
                        styles.connectorLine,
                        status === 'completed' ? styles.connectorGreen : styles.connectorGray,
                      ]}
                    />
                  )}
                </View>

                {/* Right: label + sublabel — flex flex-col pt-1 */}
                <View style={styles.stageTextCol}>
                  <Text
                    style={[
                      styles.stageLabel,
                      status === 'pending' && styles.stageLabelPending,
                    ]}
                  >
                    {stage.label}
                  </Text>
                  <Text
                    style={[
                      styles.stageSublabel,
                      status === 'completed' && styles.stageSublabelGreen,
                      status === 'active'    && styles.stageSublabelPrimary,
                      status === 'pending'   && styles.stageSublabelGray,
                    ]}
                  >
                    {status === 'completed'
                      ? 'Concluído'
                      : status === 'active'
                      ? `${progressPercent}% processando...`
                      : 'Aguardando'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer Progress Section — p-6 pb-12 border-t */}
      <View style={styles.footer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Processando vídeo...</Text>
          <Text style={styles.progressPercent}>{progressPercent}%</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` as any }]} />
        </View>

        <Text style={styles.footerMessage}>
          Por favor, aguarde enquanto finalizamos seu conteúdo. Não feche o app.
        </Text>

        {/* Cancel button */}
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancelar Processamento</Text>
        </TouchableOpacity>

        {/* iOS indicator */}
        <View style={styles.homeIndicator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  // Central animation
  animationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48, // mb-12
  },
  // Outer ring — w-32 h-32 = 128px rounded-full border-4 border-primary/20
  ringOuter: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: 'rgba(102,12,228,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Spinning partial ring
  ringSpin: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    borderTopWidth: 4,
    borderTopColor: '#660ce4',
    borderRightWidth: 4,
    borderRightColor: 'transparent',
    borderBottomWidth: 4,
    borderBottomColor: 'transparent',
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  // Stage row — flex gap-4
  stageRow: {
    flexDirection: 'row',
    gap: 16,
  },
  stageIconCol: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconWrapCompleted: {
    backgroundColor: 'rgba(16,185,129,0.10)',
    borderRadius: 9999,
    padding: 4,
  },
  iconWrapActive: {
    backgroundColor: 'rgba(102,12,228,0.10)',
    borderRadius: 9999,
    padding: 4,
  },
  iconWrapPending: {
    borderRadius: 9999,
    padding: 4,
  },
  // Connector line — w-[2px] h-10
  connectorLine: {
    width: 2,
    height: 40,
  },
  connectorGreen: {
    backgroundColor: 'rgba(16,185,129,0.30)',
  },
  connectorGray: {
    backgroundColor: '#e2e8f0',
  },
  stageTextCol: {
    flexDirection: 'column',
    paddingTop: 4,
    flex: 1,
    paddingBottom: 4,
  },
  stageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: 20,
  },
  stageLabelPending: {
    color: '#94a3b8',
  },
  stageSublabel: {
    fontSize: 14,
    marginTop: 4,
  },
  stageSublabelGreen: {
    color: '#059669',
  },
  stageSublabelPrimary: {
    color: '#660ce4',
    fontWeight: '500',
  },
  stageSublabelGray: {
    color: '#cbd5e1',
  },
  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#660ce4',
  },
  // Progress bar — bg-primary/10 h-3 rounded-full
  progressBarBg: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(102,12,228,0.10)',
    borderRadius: 9999,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 12,
    backgroundColor: '#660ce4',
    borderRadius: 9999,
  },
  footerMessage: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  cancelButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  homeIndicator: {
    width: 128,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 16,
  },
});
