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
 * Video Preview Screen
 * Layout baseado EXATAMENTE no HTML de referência: video-preview-screen.html
 *
 * CORES DO HTML:
 * - primary: "#6506ea"
 * - background-light: "#f7f5f8"
 */

export default function VideoPreviewScreen() {
  const params = useLocalSearchParams();
  const videoUri = params.videoUri as string;

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef<Video>(null);

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

  const handleSaveAndEdit = () => {
    router.push({
      pathname: '/(tabs)/assistant/video-edit',
      params: { videoUri },
    });
  };

  const handleReRecord = () => {
    router.back();
  };

  const handleSaveWithoutEdit = () => {
    router.push('/(tabs)/library');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#6506ea" />

      {/* Header — bg-primary px-6 pt-12 pb-6 flex items-center gap-4 text-white */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview do Vídeo</Text>
        {/* Spacer para centralizar (mr-6) */}
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Player — w-full aspect-[9/16] max-h-[450px] relative rounded-xl */}
        <View style={styles.videoWrapper}>
          {videoUri && videoUri !== 'mock-video-uri' ? (
            <Video
              ref={videoRef}
              source={{ uri: videoUri }}
              style={styles.video}
              resizeMode={ResizeMode.COVER}
              isLooping
              onPlaybackStatusUpdate={(status) => {
                if ('isPlaying' in status) setIsPlaying(status.isPlaying);
              }}
            />
          ) : (
            /* Mock placeholder — video-thumbnail background */
            <View style={styles.mockVideo}>
              <MaterialIcons name="videocam" size={48} color="rgba(255,255,255,0.5)" />
            </View>
          )}

          {/* Play Button Overlay — absolute inset-0 flex items-center justify-center */}
          <TouchableOpacity style={styles.playOverlay} onPress={handlePlayPause} activeOpacity={0.9}>
            <View style={styles.playButton}>
              <MaterialIcons
                name={isPlaying ? 'pause' : 'play-arrow'}
                size={40}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>

          {/* Timeline Bar — absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t */}
          <View style={styles.timelineBar}>
            <View style={styles.progressRow}>
              {/* Progress track */}
              <View style={styles.progressTrack}>
                {/* Fill 40% */}
                <View style={styles.progressFill} />
                {/* Thumb */}
                <View style={styles.progressThumb} />
              </View>
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>0:36</Text>
              <Text style={styles.timeText}>1:30</Text>
            </View>
          </View>
        </View>

        {/* Duration Indicator — mb-8 text-primary font-semibold text-lg */}
        <View style={styles.durationWrapper}>
          <Text style={styles.durationText}>1:30</Text>
        </View>

        {/* Action Buttons — w-full space-y-3 */}
        <View style={styles.actionsWrapper}>
          {/* Salvar e Editar — primary */}
          <TouchableOpacity style={styles.btnPrimary} onPress={handleSaveAndEdit} activeOpacity={0.85}>
            <Text style={styles.btnPrimaryText}>Salvar e Editar</Text>
          </TouchableOpacity>

          {/* Regravar — outline */}
          <TouchableOpacity style={styles.btnOutline} onPress={handleReRecord} activeOpacity={0.85}>
            <Text style={styles.btnOutlineText}>Regravar</Text>
          </TouchableOpacity>

          {/* Salvar sem Editar — outline */}
          <TouchableOpacity style={styles.btnOutline} onPress={handleSaveWithoutEdit} activeOpacity={0.85}>
            <Text style={styles.btnOutlineText}>Salvar sem Editar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* iOS indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6506ea', // primary (para a SafeArea top ficar com cor certa)
  },
  // Header — bg-primary px-6 pt-12 pb-6
  header: {
    backgroundColor: '#6506ea',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24, // px-6
    paddingTop: 8,
    paddingBottom: 24, // pb-6
    gap: 16, // gap-4
  },
  headerBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18, // text-lg
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 24, // compensa o espaçamento do back button
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24, // px-6
    paddingTop: 32, // py-8
    paddingBottom: 24,
    alignItems: 'center',
  },
  // Video container — w-full aspect-[9/16] max-h-[450px] relative rounded-xl overflow-hidden shadow-lg mb-4
  videoWrapper: {
    width: '100%',
    aspectRatio: 9 / 16,
    maxHeight: 450,
    borderRadius: 12, // rounded-xl
    overflow: 'hidden',
    backgroundColor: '#1e293b',
    marginBottom: 16, // mb-4
    position: 'relative',
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
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Play overlay — absolute inset-0 flex items-center justify-center
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Play button — w-16 h-16 bg-white/20 backdrop border border-white/30 rounded-full
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
  // Timeline bar — absolute inset-x-0 bottom-0 p-4
  timelineBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 24,
    backgroundColor: 'rgba(0,0,0,0.40)',
  },
  progressRow: {
    marginBottom: 4,
  },
  // Progress track — h-1 flex-1 bg-white/30 rounded-full relative
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderRadius: 9999,
    position: 'relative',
  },
  // Fill — w-[40%] h-full bg-primary
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 4,
    width: '40%',
    backgroundColor: '#6506ea',
    borderRadius: 9999,
  },
  // Thumb — w-3 h-3 bg-white rounded-full
  progressThumb: {
    position: 'absolute',
    top: -4,
    left: '40%',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginLeft: -6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 10, // text-[10px]
    color: '#FFFFFF',
    fontWeight: '500',
  },
  // Duration indicator — mb-8
  durationWrapper: {
    marginBottom: 32, // mb-8
    alignSelf: 'flex-start',
  },
  durationText: {
    color: '#6506ea', // text-primary
    fontWeight: '600',
    fontSize: 18, // text-lg
  },
  // Actions wrapper — w-full space-y-3
  actionsWrapper: {
    width: '100%',
    gap: 12, // space-y-3
  },
  // Primary button — h-14 bg-primary text-white font-bold rounded-xl
  btnPrimary: {
    width: '100%',
    height: 56, // h-14
    backgroundColor: '#6506ea',
    borderRadius: 12, // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6506ea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Outline button — h-14 border-2 border-primary text-primary font-bold rounded-xl
  btnOutline: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: '#6506ea',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnOutlineText: {
    color: '#6506ea',
    fontSize: 16,
    fontWeight: '700',
  },
  homeIndicator: {
    width: 128,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
});
