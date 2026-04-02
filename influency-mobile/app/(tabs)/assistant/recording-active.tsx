import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../../../src/components/atoms/Button';

/**
 * Recording Active Screen
 * Layout baseado EXATAMENTE no HTML de referência: recording-active-screen.html
 *
 * CORES DO HTML:
 * - primary: "#6400f0"
 * - danger: "#FF3B30"
 */

export default function RecordingActiveScreen() {
  // Parâmetros do teleprompter (reservados para integração futura)
  // const params = useLocalSearchParams();
  // const scrollMode = params.scrollMode || 'auto';
  // const scrollSpeed = parseInt(params.scrollSpeed as string) || 50;
  // const fontSize = parseInt(params.fontSize as string) || 24;

  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [facing] = useState<CameraType>('front');

  const cameraRef = useRef<CameraView>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnimScale = useRef(new Animated.Value(1)).current;

  // Sample script text
  const scriptLines = [
    'Olá! Hoje vou compartilhar 5 estratégias poderosas para alavancar o seu negócio no digital.',
    '1. Marketing de Conteúdo: Crie conteúdo valioso que resolva as dores do seu cliente. Não tente apenas vender, tente educar.',
    '2. Redes Sociais: Esteja presente onde seu público está. Escolha as plataformas certas e mantenha uma frequência consistente.',
  ];

  // Timer effect
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  // Pulse animation for REC dot and stop button — rec-pulse from HTML
  useEffect(() => {
    if (isRecording && !isPaused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimScale, {
            toValue: 1.05,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulseAnimScale, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      pulseAnimScale.setValue(1);
    }
  }, [isRecording, isPaused, pulseAnimScale]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handlePauseResume = () => {
    if (isRecording) {
      setIsPaused(!isPaused);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    router.push({
      pathname: '/(tabs)/assistant/video-preview',
      params: { videoUri: 'mock-video-uri' },
    });
  };

  const handleSettings = () => {
    router.back();
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#FFFFFF' }}>Carregando...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Precisamos de permissão para acessar a câmera</Text>
        <Button onPress={requestPermission}>Conceder Permissão</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Camera View — full screen */}
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        {/* Subtle dark overlay over camera — bg-black/20 */}
        <View style={styles.cameraOverlay} />

        {/* Notch simulation — top-0 center w-[160px] h-[34px] bg-black rounded-b-3xl */}
        <View style={styles.notch} />

        {/* Timer Badge — absolute top-12 center */}
        <View style={styles.timerBadgeWrapper}>
          <View style={styles.timerBadge}>
            {/* Red pulsing dot — w-2 h-2 rounded-full bg-danger rec-pulse */}
            <Animated.View
              style={[
                styles.recDot,
                isRecording && !isPaused && { transform: [{ scale: pulseAnimScale }] },
              ]}
            />
            {/* Timer text — white monospace bold */}
            <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
          </View>
        </View>

        {/* Teleprompter area — absolute top-24 h-[320px] px-6 */}
        {/* Gradient mask effect via top/bottom faded Text layers */}
        <View style={styles.teleprompterArea}>
          {/* Previous line — white/40 text-2xl */}
          <Text style={styles.teleprompterTextFaded}>{scriptLines[0]}</Text>
          {/* Active line — white text-3xl */}
          <Text style={styles.teleprompterTextActive}>{scriptLines[1]}</Text>
          {/* Next line — white/40 text-2xl */}
          <Text style={styles.teleprompterTextFaded}>{scriptLines[2]}</Text>
        </View>

        {/* Bottom Controls — absolute bottom-0 pb-12 pt-12 px-8, gradient from-black/80 */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.80)']}
          style={styles.bottomGradient}
        >
          {isRecording ? (
            /* Recording state — pause | stop-ring | settings */
            <>
              <View style={styles.controlsRow}>
                {/* Pause button — w-14 h-14 rounded-full glass */}
                <TouchableOpacity
                  style={styles.glassButton}
                  onPress={handlePauseResume}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name={isPaused ? 'play-arrow' : 'pause'}
                    size={32}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

                {/* Stop button: outer ring w-24 h-24 border-4 border-white + inner red square w-16 h-16 rec-pulse */}
                <View style={styles.stopOuterRing}>
                  <Animated.View
                    style={[
                      styles.stopInnerSquare,
                      !isPaused && { transform: [{ scale: pulseAnimScale }] },
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.stopTouchable}
                      onPress={handleStopRecording}
                      activeOpacity={0.85}
                    >
                      <MaterialIcons name="stop" size={32} color="#FFFFFF" />
                    </TouchableOpacity>
                  </Animated.View>
                </View>

                {/* Settings button — w-14 h-14 rounded-full glass */}
                <TouchableOpacity
                  style={styles.glassButton}
                  onPress={handleSettings}
                  activeOpacity={0.8}
                >
                  <MaterialIcons name="settings" size={32} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Labels row — Pausar | Gravando | Ajustes */}
              <View style={styles.labelsRow}>
                <Text style={styles.labelSide}>Pausar</Text>
                <Text style={styles.labelCenter}>Gravando</Text>
                <Text style={styles.labelSide}>Ajustes</Text>
              </View>
            </>
          ) : (
            /* Pre-recording state — single large record button */
            <>
              <View style={styles.controlsRow}>
                <View style={styles.stopOuterRing}>
                  <TouchableOpacity
                    style={styles.recordStartButton}
                    onPress={handleStartRecording}
                    activeOpacity={0.85}
                  >
                    <View style={styles.recordInnerCircle} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.labelsRow}>
                <Text style={styles.labelCenter}>Toque para gravar</Text>
              </View>
            </>
          )}
        </LinearGradient>

        {/* iOS Home Indicator — absolute bottom-2 center */}
        <View style={styles.homeIndicator} />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.20)', // bg-black/20
  },
  // Notch — top-0 center w-[160px] h-[34px] bg-black rounded-b-3xl z-50
  notch: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    width: 160,
    height: 34,
    backgroundColor: '#000000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    zIndex: 50,
  },
  // Timer badge — absolute top-12 center, bg-black/60 backdrop rounded-full border-white/20
  timerBadgeWrapper: {
    position: 'absolute',
    top: 48, // top-12 = 48px
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    gap: 8,
  },
  // Red pulsing dot — w-2 h-2 = 8px rounded-full bg-danger
  recDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30', // danger EXATO DO HTML
  },
  // Timer text — white monospace bold text-lg
  timerText: {
    color: '#FFFFFF',
    fontFamily: 'monospace',
    fontSize: 18, // text-lg
    fontWeight: '700',
  },
  // Teleprompter area — absolute top-24 h-[320px] px-6
  teleprompterArea: {
    position: 'absolute',
    top: 96, // top-24 = 96px
    left: 24, // px-6
    right: 24,
    height: 320,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 20,
    gap: 24, // space-y-6
  },
  // Faded text — white/40 text-2xl font-bold
  teleprompterTextFaded: {
    color: 'rgba(255,255,255,0.40)',
    fontSize: 24, // text-2xl
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
  },
  // Active text — white text-3xl font-bold
  teleprompterTextActive: {
    color: '#FFFFFF',
    fontSize: 30, // text-3xl
    fontWeight: '700',
    lineHeight: 40,
    textAlign: 'center',
  },
  // Bottom gradient — absolute bottom-0 pb-12 pt-12 px-8
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 48, // pt-12
    paddingBottom: 48, // pb-12
    paddingHorizontal: 32, // px-8
    zIndex: 30,
  },
  // Controls row — flex items-center justify-between
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Glass button — w-14 h-14 = 56px rounded-full bg-white/10 border-white/20
  glassButton: {
    width: 56, // w-14
    height: 56, // h-14
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Stop outer ring — w-24 h-24 = 96px rounded-full border-4 border-white
  stopOuterRing: {
    width: 96, // w-24
    height: 96, // h-24
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Stop inner square — w-16 h-16 = 64px bg-danger rounded-lg rec-pulse
  stopInnerSquare: {
    width: 64, // w-16
    height: 64, // h-16
    backgroundColor: '#FF3B30', // danger EXATO
    borderRadius: 8, // rounded-lg
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },
  stopTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Pre-recording start button
  recordStartButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  // Labels row — flex items-center justify-between mt-4 px-2
  labelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16, // mt-4
    paddingHorizontal: 8, // px-2
  },
  // Side labels — white/70 text-xs font-medium uppercase tracking-widest w-14 text-center
  labelSide: {
    color: 'rgba(255,255,255,0.70)',
    fontSize: 10, // text-xs
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 2,
    width: 56,
    textAlign: 'center',
  },
  // Center label — white text-xs font-bold uppercase tracking-widest
  labelCenter: {
    color: '#FFFFFF',
    fontSize: 10, // text-xs
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
  // iOS Home Indicator — absolute bottom-2 center w-32 h-1 bg-white/40
  homeIndicator: {
    position: 'absolute',
    bottom: 8, // bottom-2
    alignSelf: 'center',
    width: 128, // w-32
    height: 4, // h-1
    backgroundColor: 'rgba(255,255,255,0.40)',
    borderRadius: 2,
    zIndex: 40,
  },
  permissionText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
    fontSize: 16,
  },
});
