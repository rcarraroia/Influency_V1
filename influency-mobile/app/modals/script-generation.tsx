import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Script Generation Modal — "Criar Roteiro"
 *
 * Bottom sheet modal para iniciar geração de roteiro com IA.
 * Layout baseado EXATAMENTE no HTML de referência: script-generation-modal.html
 *
 * CORES DO HTML:
 * - primary: "#a400f0"
 * - background: "#FFFFFF"
 * - background-light: "#f7f5f8"
 */

const DURATION_STEPS = [30, 60, 90, 120, 180, 300];

export default function ScriptGenerationModal() {
  const [topic, setTopic] = useState('5 estratégias de marketing digital para pequenos negócios');
  const [duration, setDuration] = useState(90); // segundos

  const handleGenerate = () => {
    if (topic.trim() === '') return;

    router.push({
      pathname: '/(tabs)/assistant/generating-script',
      params: { topic, duration: duration.toString() },
    });
  };

  const handleClose = () => {
    router.back();
  };

  const displayDuration = `${duration} segundos`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.overlay}
    >
      <StatusBar barStyle="dark-content" />

      {/* Semi-transparent backdrop */}
      <TouchableOpacity style={styles.backdrop} onPress={handleClose} activeOpacity={1} />

      {/* Bottom Sheet Card — rounded-t-[24px] - EXATO DO HTML */}
      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sheetContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* BottomSheetHandle — h-1.5 w-12 bg-slate-200 - EXATO DO HTML */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header — "Criar Roteiro" + close - EXATO DO HTML */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Criar Roteiro</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <MaterialIcons name="close" size={24} color="#475569" />
            </TouchableOpacity>
          </View>

          {/* Topic Input Section - EXATO DO HTML */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Sobre o que você quer falar?</Text>
            <View style={styles.textAreaWrapper}>
              <TextInput
                style={styles.textArea}
                value={topic}
                onChangeText={setTopic}
                placeholder="Ex: Dicas de produtividade para empreendedores"
                placeholderTextColor="#94a3b8"
                multiline
                maxLength={500}
                textAlignVertical="top"
              />
              <Text style={styles.charCounter}>{topic.length}/500</Text>
            </View>
          </View>

          {/* Duration Slider Section - EXATO DO HTML */}
          <View style={styles.durationSection}>
            <View style={styles.durationHeader}>
              <Text style={styles.durationLabel}>Duração do vídeo</Text>
              <View style={styles.durationBadge}>
                <Text style={styles.durationBadgeText}>{displayDuration}</Text>
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={30}
                maximumValue={300}
                step={30}
                value={duration}
                onValueChange={setDuration}
                minimumTrackTintColor="#a400f0"
                maximumTrackTintColor="#f1f5f9"
                thumbTintColor="#a400f0"
              />
              {/* Tick labels — 30s, 60s, 90s, 120s, 180s, 300s - EXATO DO HTML */}
              <View style={styles.tickLabels}>
                {DURATION_STEPS.map((step) => (
                  <Text key={step} style={styles.tickLabel}>
                    {step}s
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Tip Card — bg-[#F3E5F5] border-l-4 border-primary - EXATO DO HTML */}
          <View style={styles.tipCard}>
            <MaterialIcons name="lightbulb" size={24} color="#a400f0" style={styles.tipIcon} />
            <Text style={styles.tipText}>
              <Text style={styles.tipBold}>Dica: </Text>
              Seja específico sobre seu público-alvo e objetivo do vídeo para roteiros mais
              personalizados.
            </Text>
          </View>

          {/* Action Button — "Gerar Roteiro" - EXATO DO HTML */}
          <TouchableOpacity
            style={[styles.generateButton, topic.trim() === '' && styles.generateButtonDisabled]}
            onPress={handleGenerate}
            disabled={topic.trim() === ''}
            activeOpacity={0.9}
          >
            <MaterialIcons name="auto-awesome" size={20} color="#FFFFFF" />
            <Text style={styles.generateButtonText}>Gerar Roteiro</Text>
          </TouchableOpacity>

          {/* iOS Home Indicator - EXATO DO HTML */}
          <View style={styles.homeIndicator} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  // Semi-transparent backdrop - bg-black/50 - EXATO DO HTML
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  // Bottom Sheet Card — rounded-t-[24px] px-6 pt-2 pb-10 - EXATO DO HTML
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24, // rounded-t-[24px] EXATO
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
    maxHeight: '90%',
  },
  sheetContent: {
    paddingHorizontal: 24, // px-6
    paddingTop: 8, // pt-2
    paddingBottom: 40, // pb-10
  },
  // Handle — h-1.5 w-12 rounded-full bg-slate-200 - EXATO DO HTML
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12, // py-3
  },
  handle: {
    height: 6, // h-1.5
    width: 48, // w-12
    borderRadius: 3,
    backgroundColor: '#e2e8f0', // bg-slate-200 EXATO
  },
  // Header — mb-6 - EXATO DO HTML
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24, // mb-6
  },
  headerTitle: {
    color: '#170c1d', // text-[#170c1d] EXATO
    fontSize: 24, // text-[24px] EXATO
    fontWeight: '600', // font-semibold
    lineHeight: 30,
  },
  closeButton: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Topic Input Section — mb-6 - EXATO DO HTML
  inputSection: {
    gap: 8, // space-y-2
    marginBottom: 24, // mb-6
  },
  inputLabel: {
    color: '#1e293b', // text-slate-800
    fontSize: 16, // text-base
    fontWeight: '500', // font-medium
  },
  textAreaWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e2e8f0', // border-slate-200 EXATO
    borderRadius: 8, // rounded-lg
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 120, // h-[120px] EXATO
    padding: 16, // p-4
    color: '#0f172a', // text-slate-900
    fontSize: 16, // text-base
    lineHeight: 24, // leading-relaxed
    paddingBottom: 28, // espaço para contador
  },
  charCounter: {
    position: 'absolute',
    bottom: 12, // bottom-3
    right: 12, // right-3
    color: '#94a3b8', // text-slate-400
    fontSize: 12, // text-xs
    fontWeight: '500',
  },
  // Duration Slider Section — mb-8 - EXATO DO HTML
  durationSection: {
    marginBottom: 32, // mb-8
  },
  durationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, // mb-4
  },
  durationLabel: {
    color: '#1e293b', // text-slate-800
    fontSize: 16, // text-base
    fontWeight: '500', // font-medium
  },
  durationBadge: {
    backgroundColor: 'rgba(164, 0, 240, 0.1)', // bg-primary/10
    paddingHorizontal: 12, // px-3
    paddingVertical: 4, // py-1
    borderRadius: 999, // rounded-full
  },
  durationBadgeText: {
    color: '#a400f0', // text-primary EXATO
    fontWeight: '700', // font-bold
    fontSize: 16, // text-base
  },
  sliderContainer: {
    paddingHorizontal: 4, // px-1
  },
  slider: {
    width: '100%',
    height: 6, // h-1.5
  },
  // Tick labels — EXATO DO HTML
  tickLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12, // mt-3
    paddingHorizontal: 4,
  },
  tickLabel: {
    color: '#94a3b8', // text-slate-400
    fontSize: 10, // text-[10px] EXATO
    fontWeight: '500',
  },
  // Tip Card — bg-[#F3E5F5] border-l-4 border-primary rounded-lg p-4 - EXATO DO HTML
  tipCard: {
    backgroundColor: '#F3E5F5', // bg-[#F3E5F5] EXATO
    borderLeftWidth: 4, // border-l-4 EXATO
    borderLeftColor: '#a400f0', // border-primary EXATO
    borderRadius: 8, // rounded-lg
    padding: 16, // p-4
    flexDirection: 'row',
    gap: 12, // gap-3
    marginBottom: 32, // mb-8
  },
  tipIcon: {
    flexShrink: 0,
  },
  tipText: {
    color: '#1e293b', // text-slate-800
    fontSize: 14, // text-sm
    lineHeight: 20, // leading-tight
    flex: 1,
  },
  tipBold: {
    fontWeight: '700',
    color: '#a400f0', // text-primary EXATO
  },
  // Generate Button — h-[52px] bg-primary rounded-xl - EXATO DO HTML
  generateButton: {
    height: 52, // h-[52px] EXATO
    backgroundColor: '#a400f0', // bg-primary EXATO
    borderRadius: 12, // rounded-xl
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#a400f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, // shadow-lg shadow-primary/20
    shadowRadius: 12,
    elevation: 6,
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontWeight: '700', // font-bold
    fontSize: 16, // text-base
  },
  // iOS Home Indicator - EXATO DO HTML (mt-6 mx-auto)
  homeIndicator: {
    width: 128, // w-32
    height: 4, // h-1
    backgroundColor: 'rgba(15, 23, 42, 0.2)', // bg-slate-900/20 EXATO
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 24, // mt-6
  },
});
