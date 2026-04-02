import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Video Final Preview Screen
 * Layout baseado EXATAMENTE no HTML de referência: video-final-preview.html
 *
 * CORES DO HTML:
 * - primary: "#660ce4"
 * - background-light: "#f7f5f8"
 */

export default function VideoFinalPreviewScreen() {
  const params = useLocalSearchParams();
  const originalVideoUri = params.originalVideoUri as string;
  const processedVideoUri = params.processedVideoUri as string;

  const [showBefore, setShowBefore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef<Video>(null);

  const currentVideoUri = showBefore ? originalVideoUri : processedVideoUri;

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEditAgain = () => {
    router.back();
  };

  const handlePublish = () => {
    router.push({
      pathname: '/(tabs)/assistant/select-networks',
      params: { videoUri: processedVideoUri },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#660ce4" />

      {/* Header — bg-primary pt-12 pb-6 px-4 rounded-b-xl */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vídeo Pronto</Text>
        {/* Spacer */}
        <View style={{ width: 40 }} />
      </View>

      {/* Main Content — flex-1 overflow-y-auto p-4 space-y-6 */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Player — relative w-full aspect-[9/16] max-h-[400px] bg-slate-900 rounded-xl */}
        <View style={styles.videoWrapper}>
          {currentVideoUri && currentVideoUri !== 'mock-processed-video-uri' ? (
            <Video
              ref={videoRef}
              source={{ uri: currentVideoUri }}
              style={styles.video}
              resizeMode={ResizeMode.COVER}
              isLooping
              onPlaybackStatusUpdate={(status) => {
                if ('isPlaying' in status) setIsPlaying(status.isPlaying);
              }}
            />
          ) : (
            <View style={styles.mockVideo}>
              <MaterialIcons name="check-circle" size={48} color="rgba(102,12,228,0.5)" />
              <Text style={styles.mockVideoText}>
                {showBefore ? 'Vídeo Original' : 'Vídeo Editado'}
              </Text>
            </View>
          )}

          {/* Play Button Overlay */}
          <TouchableOpacity style={styles.playOverlay} onPress={handlePlayPause} activeOpacity={0.9}>
            <View style={styles.playButton}>
              <MaterialIcons
                name={isPlaying ? 'pause' : 'play-arrow'}
                size={40}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>

          {/* Video Progress Bar — absolute inset-x-0 bottom-0 p-4 */}
          <View style={styles.progressBar}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <View style={styles.progressTimes}>
              <Text style={styles.progressTime}>0:30</Text>
              <Text style={styles.progressTime}>1:30</Text>
            </View>
          </View>
        </View>

        {/* Before/After Toggle Card — bg-white p-4 rounded-xl border border-primary/10 */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleCardLeft}>
            <Text style={styles.toggleCardTitle}>Ver antes/depois</Text>
            <Text style={styles.toggleCardSubtitle}>Compare a versão original</Text>
          </View>
          {/* Toggle switch */}
          <TouchableOpacity
            style={[styles.toggleSwitch, showBefore && styles.toggleSwitchOn]}
            onPress={() => setShowBefore(!showBefore)}
            activeOpacity={0.8}
          >
            <View
              style={[styles.toggleThumb, showBefore && styles.toggleThumbOn]}
            />
          </TouchableOpacity>
        </View>

        {/* Video Metrics Card — section space-y-3 */}
        <View style={styles.metricsSection}>
          <Text style={styles.metricsTitle}>Métricas do Vídeo</Text>
          <View style={styles.metricsCard}>
            {/* Duração */}
            <View style={styles.metricRow}>
              <View style={styles.metricLeft}>
                <MaterialIcons name="schedule" size={24} color="#660ce4" />
                <Text style={styles.metricLabel}>Duração</Text>
              </View>
              <Text style={styles.metricValue}>1:30</Text>
            </View>
            <View style={styles.metricDivider} />

            {/* Legendas */}
            <View style={styles.metricRow}>
              <View style={styles.metricLeft}>
                <MaterialIcons name="closed-caption" size={24} color="#660ce4" />
                <Text style={styles.metricLabel}>Legendas</Text>
              </View>
              <Text style={styles.metricValue}>Ativadas</Text>
            </View>
            <View style={styles.metricDivider} />

            {/* Música */}
            <View style={styles.metricRow}>
              <View style={styles.metricLeft}>
                <MaterialIcons name="music-note" size={24} color="#660ce4" />
                <Text style={styles.metricLabel}>Música</Text>
              </View>
              <Text style={styles.metricValue}>Ativada</Text>
            </View>
            <View style={styles.metricDivider} />

            {/* Cortes */}
            <View style={styles.metricRow}>
              <View style={styles.metricLeft}>
                <MaterialIcons name="content-cut" size={24} color="#660ce4" />
                <Text style={styles.metricLabel}>Cortes</Text>
              </View>
              <Text style={styles.metricValue}>3 aplicados</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer Actions — p-4 border-t space-y-3 */}
      <View style={styles.footer}>
        {/* Editar Novamente — outline */}
        <TouchableOpacity style={styles.btnOutline} onPress={handleEditAgain} activeOpacity={0.85}>
          <Text style={styles.btnOutlineText}>Editar Novamente</Text>
        </TouchableOpacity>

        {/* Publicar — primary with rocket icon */}
        <TouchableOpacity style={styles.btnPrimary} onPress={handlePublish} activeOpacity={0.85}>
          <Text style={styles.btnPrimaryText}>Publicar</Text>
          <MaterialIcons name="send" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* iOS indicator */}
        <View style={styles.homeIndicator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#660ce4', // primary para a SafeArea top
  },
  // Header — bg-primary pt-12 pb-6 px-4 rounded-b-xl
  header: {
    backgroundColor: '#660ce4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24, // pb-6
    borderBottomLeftRadius: 12, // rounded-b-xl
    borderBottomRightRadius: 12,
  },
  headerBack: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f7f5f8', // background-light
  },
  scrollContent: {
    padding: 16, // p-4
    gap: 24, // space-y-6
    paddingBottom: 24,
  },
  // Video container — relative w-full aspect-[9/16] max-h-[400px] bg-slate-900 rounded-xl
  videoWrapper: {
    width: '100%',
    aspectRatio: 9 / 16,
    maxHeight: 400,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  mockVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mockVideoText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  // Play overlay
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Play button — size-16 = 64px rounded-full bg-white/20 border border-white/30
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Progress bar — absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60
  progressBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 24,
    backgroundColor: 'rgba(0,0,0,0.40)',
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderRadius: 9999,
    overflow: 'hidden',
    marginBottom: 4,
  },
  // w-1/3 bg-primary
  progressFill: {
    width: '33%',
    height: 4,
    backgroundColor: '#660ce4',
    borderRadius: 9999,
  },
  progressTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTime: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  // Before/After Toggle Card — bg-white p-4 rounded-xl border border-primary/10
  toggleCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102,12,228,0.10)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  toggleCardLeft: {
    flex: 1,
  },
  toggleCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  toggleCardSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  // Toggle switch — w-11 h-6
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleSwitchOn: {
    backgroundColor: '#660ce4',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: 'flex-start',
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
  // Metrics section
  metricsSection: {
    gap: 12,
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    paddingHorizontal: 4,
  },
  // Metrics card — bg-white rounded-xl border border-primary/5 divide-y
  metricsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102,12,228,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  // Metric row — flex items-center justify-between p-4
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  metricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569', // text-slate-600
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a', // text-slate-900
  },
  metricDivider: {
    height: 1,
    backgroundColor: '#f1f5f9', // divide-slate-100
    marginHorizontal: 0,
  },
  // Footer — p-4 bg-white/80 border-t border-slate-200 space-y-3
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12, // space-y-3
  },
  // Editar Novamente — outline border-2 border-primary text-primary font-bold
  btnOutline: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#660ce4',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnOutlineText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#660ce4',
  },
  // Publicar — bg-primary text-white shadow-lg
  btnPrimary: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#660ce4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#660ce4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 6,
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // iOS indicator
  homeIndicator: {
    width: 128,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    opacity: 0.3,
  },
});
