import React, { useEffect, useState } from 'react';
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
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useScriptStore } from '../../../src/store/scriptStore';
import { Script } from '../../../src/services/scripts';

/**
 * Script Generated Screen — Teleprompter Settings
 *
 * Tela de configuração do teleprompter após roteiro gerado.
 * Layout baseado EXATAMENTE no HTML de referência: script-results-screen.html
 *
 * CORES DO HTML:
 * - primary: "#6400f0"
 * - background: "#f5f5f5"
 */

type ScrollMode = 'Auto' | 'Manual' | 'Voz';

export default function ScriptGeneratedScreen() {
  const params = useLocalSearchParams<{ scriptId: string }>();
  const { scripts, currentScript, setCurrentScript } = useScriptStore();
  const [script, setScript] = useState<Script | null>(null);

  const [scrollMode, setScrollMode] = useState<ScrollMode>('Auto');
  const [speed, setSpeed] = useState(45); // wpm
  const [fontSize, setFontSize] = useState(24); // px
  const [mirrorText, setMirrorText] = useState(false);

  useEffect(() => {
    const scriptId = params.scriptId;
    const foundScript = scripts.find((s) => s.id === scriptId) || currentScript;
    if (foundScript) {
      setScript(foundScript);
      setCurrentScript(foundScript);
    }
  }, [params.scriptId, scripts, currentScript]);

  const handleStartRecording = () => {
    router.push('/(tabs)/assistant/teleprompter-settings');
  };

  const previewText =
    script?.content ||
    'Olá! Hoje vou compartilhar 5 estratégias poderosas para alavancar o seu negócio...';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#6400f0" />

      {/* Header (Fixed 56px) - EXATO DO HTML */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview Area — bg-black rounded-xl p-6 h-48 - EXATO DO HTML */}
        <View style={styles.previewArea}>
          <Text style={styles.previewLabel}>Preview</Text>
          <ScrollView style={styles.previewScroll} scrollEnabled={false} nestedScrollEnabled>
            <Text style={styles.previewText}>{previewText}</Text>
          </ScrollView>
          {/* Center line indicator */}
          <View style={styles.centerLine} />
        </View>

        <View style={styles.settingsContainer}>
          {/* Scroll Mode Section - EXATO DO HTML */}
          <View style={styles.section}>
            <View style={styles.sectionLabel}>
              <MaterialIcons name="swap-calls" size={20} color="#6400f0" />
              <Text style={styles.sectionLabelText}>Modo de Scroll</Text>
            </View>
            <View style={styles.toggleGroup}>
              {(['Auto', 'Manual', 'Voz'] as ScrollMode[]).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[styles.toggleButton, scrollMode === mode && styles.toggleButtonActive]}
                  onPress={() => setScrollMode(mode)}
                >
                  <Text
                    style={[
                      styles.toggleButtonText,
                      scrollMode === mode && styles.toggleButtonTextActive,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Speed Section - EXATO DO HTML */}
          <View style={styles.section}>
            <View style={styles.sliderHeader}>
              <View style={styles.sectionLabel}>
                <MaterialIcons name="speed" size={20} color="#6400f0" />
                <Text style={styles.sectionLabelText}>Velocidade</Text>
              </View>
              <View style={styles.valueBadge}>
                <Text style={styles.valueBadgeText}>{Math.round(speed)} wpm</Text>
              </View>
            </View>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={speed}
                onValueChange={setSpeed}
                minimumTrackTintColor="#6400f0"
                maximumTrackTintColor="#e2e8f0"
                thumbTintColor="#6400f0"
              />
            </View>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Lento</Text>
              <Text style={styles.sliderLabelText}>Rápido</Text>
            </View>
          </View>

          {/* Font Size Section - EXATO DO HTML */}
          <View style={styles.section}>
            <View style={styles.sliderHeader}>
              <View style={styles.sectionLabel}>
                <MaterialIcons name="format-size" size={20} color="#6400f0" />
                <Text style={styles.sectionLabelText}>Tamanho da Fonte</Text>
              </View>
              <View style={styles.valueBadge}>
                <Text style={styles.valueBadgeText}>{Math.round(fontSize)}px</Text>
              </View>
            </View>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={48}
                step={1}
                value={fontSize}
                onValueChange={setFontSize}
                minimumTrackTintColor="#6400f0"
                maximumTrackTintColor="#e2e8f0"
                thumbTintColor="#6400f0"
              />
            </View>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Pequeno</Text>
              <Text style={styles.sliderLabelText}>Grande</Text>
            </View>
          </View>

          {/* Mirror Text Toggle - EXATO DO HTML */}
          <View style={styles.mirrorRow}>
            <View style={styles.mirrorLeft}>
              <MaterialIcons name="face" size={24} color="#6400f0" />
              <Text style={styles.mirrorLabel}>Espelhar Texto</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, mirrorText && styles.toggleOn]}
              onPress={() => setMirrorText(!mirrorText)}
            >
              <View style={[styles.toggleThumb, mirrorText && styles.toggleThumbOn]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer for absolute footer */}
        <View style={styles.footerSpacer} />
      </ScrollView>

      {/* Footer — absolute bottom-0 - EXATO DO HTML */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartRecording} activeOpacity={0.9}>
          <MaterialIcons name="videocam" size={24} color="#FFFFFF" />
          <Text style={styles.startButtonText}>Iniciar Gravação</Text>
        </TouchableOpacity>
        {/* iOS Bottom Indicator - EXATO DO HTML */}
        <View style={styles.bottomIndicator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // background EXATO DO HTML
  },
  // Header (Fixed 56px) - EXATO DO HTML
  header: {
    height: 56, // h-[56px] EXATO
    backgroundColor: '#6400f0', // bg-primary EXATO
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, // px-4
    zIndex: 10,
  },
  headerButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20, // text-[20px] EXATO
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    paddingRight: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16, // p-4
  },
  // Preview Area — bg-black rounded-xl p-6 h-48 - EXATO DO HTML
  previewArea: {
    backgroundColor: '#000000', // bg-black EXATO
    borderRadius: 12, // rounded-xl
    padding: 24, // p-6
    marginBottom: 32, // mb-8
    height: 192, // h-48 = 192px
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1e293b', // border-slate-800
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  previewLabel: {
    position: 'absolute',
    top: 8, // top-2
    left: 16, // left-4
    color: '#64748b', // text-slate-500 EXATO
    fontSize: 10, // text-[10px]
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 2, // tracking-widest
  },
  previewScroll: {
    width: '100%',
    paddingHorizontal: 16,
  },
  previewText: {
    color: 'rgba(255,255,255,0.9)', // text-white opacity-90 EXATO
    fontSize: 20, // text-xl
    fontWeight: '500', // font-medium
    lineHeight: 28, // leading-snug
    textAlign: 'center',
  },
  // Center line indicator — border-y border-white/10 h-10
  centerLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    marginTop: -20,
    height: 40, // h-10
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)', // border-white/10
  },
  settingsContainer: {
    gap: 32, // space-y-8
  },
  // Section
  section: {
    gap: 12, // space-y-3
  },
  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  sectionLabelText: {
    color: '#334155', // text-slate-700
    fontSize: 14, // text-sm
    fontWeight: '700', // font-bold
  },
  // Toggle Group — bg-white p-1.5 rounded-xl border - EXATO DO HTML
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 6, // p-1.5
    borderRadius: 12, // rounded-xl
    borderWidth: 1,
    borderColor: '#e2e8f0', // border-slate-200
    gap: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10, // py-2.5
    paddingHorizontal: 8, // px-2
    borderRadius: 8, // rounded-lg
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#6400f0', // bg-primary EXATO
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleButtonText: {
    fontSize: 14, // text-sm
    fontWeight: '600', // font-semibold
    color: '#64748b', // text-slate-500
  },
  toggleButtonTextActive: {
    color: '#FFFFFF', // text-white EXATO
  },
  // Slider section
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  valueBadge: {
    backgroundColor: 'rgba(100, 0, 240, 0.1)', // bg-primary/10
    paddingHorizontal: 8, // px-2
    paddingVertical: 4, // py-1
    borderRadius: 999, // rounded-full
  },
  valueBadgeText: {
    color: '#6400f0', // text-primary EXATO
    fontSize: 12, // text-xs
    fontWeight: '600',
  },
  sliderContainer: {
    paddingHorizontal: 8, // px-2
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4, // px-1
  },
  sliderLabelText: {
    color: '#94a3b8', // text-slate-400
    fontSize: 10, // text-[10px] EXATO
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Mirror Text toggle row — bg-white p-4 rounded-xl border - EXATO DO HTML
  mirrorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl
    borderWidth: 1,
    borderColor: '#e2e8f0', // border-slate-200
  },
  mirrorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap-3
  },
  mirrorLabel: {
    color: '#334155', // text-slate-700
    fontSize: 14, // text-sm
    fontWeight: '600',
  },
  // Toggle switch — w-12 h-6 rounded-full - EXATO DO HTML
  toggle: {
    width: 48, // w-12
    height: 24, // h-6
    backgroundColor: '#e2e8f0', // bg-slate-200
    borderRadius: 12, // rounded-full
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: {
    backgroundColor: '#6400f0',
  },
  // Toggle thumb — w-4 h-4 bg-white rounded-full - EXATO DO HTML
  toggleThumb: {
    width: 16, // w-4
    height: 16, // h-4
    backgroundColor: '#FFFFFF',
    borderRadius: 8, // rounded-full
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
  footerSpacer: {
    height: 120, // espaço para footer absoluto
  },
  // Footer — absolute bottom-0 - EXATO DO HTML
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0', // border-slate-200
    padding: 24, // p-6
    paddingBottom: 32, // pb-8
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
  },
  // "Iniciar Gravação" button — w-full h-[54px] rounded-xl bg-primary - EXATO DO HTML
  startButton: {
    width: '100%',
    height: 54, // h-[54px] EXATO
    borderRadius: 12, // rounded-xl
    backgroundColor: '#6400f0', // bg-primary EXATO
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6400f0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, // shadow-xl shadow-primary/30
    shadowRadius: 20,
    elevation: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16, // text-[16px] EXATO
    fontWeight: '700', // font-bold
    letterSpacing: 0.5,
  },
  // iOS Bottom Indicator - EXATO DO HTML (mt-6 justify-center)
  bottomIndicator: {
    width: 128, // w-32
    height: 6, // h-1.5
    backgroundColor: '#e2e8f0', // bg-slate-200
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 24, // mt-6
  },
});
