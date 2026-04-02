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
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { VideoSettings } from '../../../src/store/videoStore';

/**
 * Video Edit Screen
 * Layout baseado EXATAMENTE no HTML de referência: video-edit-screen.html
 * Tema: dark mode
 *
 * CORES DO HTML:
 * - primary: "#660ce4"
 * - background-dark: "#171022"
 */

export default function VideoEditScreen() {
  const params = useLocalSearchParams();
  const videoUri = params.videoUri as string;

  const [hasSubtitles, setHasSubtitles] = useState(true);
  const [hasMusic, setHasMusic] = useState(true);
  const [hasAssets, setHasAssets] = useState(true);
  const [hasAutoCuts, setHasAutoCuts] = useState(true);

  const [subtitleStyle, setSubtitleStyle] = useState<string>('moderno');
  const [cutMode, setCutMode] = useState<string>('dinamico');
  const [musicVolume, setMusicVolume] = useState(70);

  const handleProcessVideo = () => {
    const settings: VideoSettings = {
      hasSubtitles,
      subtitleStyle: hasSubtitles ? (subtitleStyle as any) : undefined,
      hasMusic,
      musicVolume: hasMusic ? musicVolume : undefined,
      hasAssets,
      hasAutoCuts,
      cutMode: hasAutoCuts ? (cutMode as any) : undefined,
    };

    router.push({
      pathname: '/(tabs)/assistant/processing-video',
      params: {
        videoUri,
        settings: JSON.stringify(settings),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#171022" />

      {/* Header — sticky top-0 flex items-center bg-background-dark p-4 pb-2 justify-between */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#f1f5f9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Vídeo</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Video thumbnail — relative w-full aspect-video rounded-xl */}
        <View style={styles.thumbnailWrapper}>
          <View style={styles.thumbnail}>
            {/* Play button overlay — bg-primary/90 text-white rounded-full p-3 */}
            <View style={styles.playOverlay}>
              <MaterialIcons name="play-arrow" size={32} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* Toggle list — px-4 space-y-1 */}
        <View style={styles.toggleList}>
          {/* Adicionar legendas */}
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setHasSubtitles(!hasSubtitles)}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleLabel}>Adicionar legendas</Text>
            <View style={[styles.checkbox, hasSubtitles && styles.checkboxChecked]}>
              {hasSubtitles && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Adicionar música */}
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setHasMusic(!hasMusic)}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleLabel}>Adicionar música</Text>
            <View style={[styles.checkbox, hasMusic && styles.checkboxChecked]}>
              {hasMusic && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Aplicar assets */}
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setHasAssets(!hasAssets)}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleLabel}>Aplicar assets</Text>
            <View style={[styles.checkbox, hasAssets && styles.checkboxChecked]}>
              {hasAssets && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Cortes automáticos */}
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setHasAutoCuts(!hasAutoCuts)}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleLabel}>Cortes automáticos</Text>
            <View style={[styles.checkbox, hasAutoCuts && styles.checkboxChecked]}>
              {hasAutoCuts && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Settings section — px-4 py-4 space-y-4 */}
        <View style={styles.settingsSection}>
          {/* Estilo de legenda — select */}
          <View style={styles.selectGroup}>
            <Text style={styles.selectLabel}>Estilo de legenda</Text>
            <View style={styles.selectWrapper}>
              {(['moderno', 'classico', 'minimalista'] as const).map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.selectOption, subtitleStyle === opt && styles.selectOptionActive]}
                  onPress={() => setSubtitleStyle(opt)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.selectOptionText,
                      subtitleStyle === opt && styles.selectOptionTextActive,
                    ]}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Modo de corte — select */}
          <View style={styles.selectGroup}>
            <Text style={styles.selectLabel}>Modo de corte</Text>
            <View style={styles.selectWrapper}>
              {([
                { value: 'dinamico', label: 'Dinâmico' },
                { value: 'suave', label: 'Suave' },
                { value: 'cinematografico', label: 'Cinematográfico' },
              ] as const).map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.selectOption, cutMode === opt.value && styles.selectOptionActive]}
                  onPress={() => setCutMode(opt.value)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.selectOptionText,
                      cutMode === opt.value && styles.selectOptionTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Volume da música — slider */}
          <View style={styles.sliderGroup}>
            <View style={styles.sliderHeader}>
              <Text style={styles.selectLabel}>Volume da música</Text>
              <Text style={styles.sliderValue}>{musicVolume}%</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={5}
              value={musicVolume}
              onValueChange={setMusicVolume}
              minimumTrackTintColor="#660ce4"
              maximumTrackTintColor="rgba(102,12,228,0.20)"
              thumbTintColor="#660ce4"
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer — p-6 border-t border-primary/10 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.processButton} onPress={handleProcessVideo} activeOpacity={0.9}>
          <Text style={styles.processButtonText}>Processar Vídeo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#171022', // background-dark EXATO
  },
  // Header — sticky top-0 flex items-center bg-background-dark p-4 pb-2 justify-between
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171022',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  headerBack: {
    width: 48,
    height: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9', // text-slate-100
    letterSpacing: -0.3,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#171022',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  // Thumbnail — p-4 relative w-full aspect-video rounded-xl
  thumbnailWrapper: {
    padding: 16,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: '#334155', // bg-slate-800
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  // Play overlay — bg-primary/90 rounded-full p-3
  playOverlay: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(102,12,228,0.90)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#660ce4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  // Toggle list — px-4 space-y-1
  toggleList: {
    paddingHorizontal: 16,
    gap: 0,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12, // py-3
    cursor: 'pointer',
  },
  toggleLabel: {
    fontSize: 16, // text-base
    fontWeight: '500',
    color: '#f1f5f9', // text-slate-100
  },
  // Checkbox — h-6 w-6 rounded border
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(102,12,228,0.30)',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#660ce4',
    borderColor: '#660ce4',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(102,12,228,0.10)', // bg-primary/10
    marginHorizontal: 4,
  },
  // Settings section — px-4 py-4 space-y-4
  settingsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  selectGroup: {
    gap: 8,
  },
  selectLabel: {
    fontSize: 12, // text-sm
    fontWeight: '600',
    color: '#f1f5f9', // text-slate-100
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Select as segmented buttons (matching HTML visual)
  selectWrapper: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102,12,228,0.20)',
    overflow: 'hidden',
  },
  selectOption: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(102,12,228,0.10)',
  },
  selectOptionActive: {
    backgroundColor: '#660ce4',
  },
  selectOptionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94a3b8', // text-slate-400
  },
  selectOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Volume slider
  sliderGroup: {
    gap: 8,
    paddingVertical: 8,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#660ce4',
  },
  slider: {
    width: '100%',
    height: 32,
  },
  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: '#171022',
    borderTopWidth: 1,
    borderTopColor: 'rgba(102,12,228,0.10)',
  },
  // Processar Vídeo — bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow
  processButton: {
    width: '100%',
    backgroundColor: '#660ce4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(102,12,228)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.30,
    shadowRadius: 15,
    elevation: 8,
  },
  processButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
