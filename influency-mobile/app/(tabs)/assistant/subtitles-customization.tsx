import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Subtitles Customization Modal (Bottom Sheet)
 * Layout baseado EXATAMENTE no HTML de referência: subtitles-customization-modal.html
 * Tema: light mode
 *
 * CORES DO HTML:
 * - primary: "#660ce4"
 * - background-light: "#f7f5f8"
 */

const TEXT_COLORS = [
  { color: '#ffffff', label: 'Branco' },
  { color: '#FFEB3B', label: 'Amarelo' },
  { color: '#4CAF50', label: 'Verde' },
  { color: '#F44336', label: 'Vermelho' },
];

const SUBTITLE_STYLES = ['Moderno', 'Clássico', 'Neon'] as const;
type SubtitleStyleOption = typeof SUBTITLE_STYLES[number];

export default function SubtitlesCustomizationScreen() {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(18);
  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyleOption>('Moderno');

  const handleCancel = () => {
    router.back();
  };

  const handleApply = () => {
    // TODO: Aplicar configurações de legenda
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0.60)" />

      {/* Background blurred app content simulation */}
      <View style={styles.backgroundOverlay} />

      {/* Bottom Sheet Overlay — absolute inset-0 z-10 flex flex-col justify-end bg-black/60 */}
      <View style={styles.overlay}>
        {/* Modal Card — flex flex-col rounded-t-xl bg-background-light */}
        <View style={styles.modalCard}>
          {/* Handle — h-6 w-full flex items-center justify-center pt-2 */}
          <TouchableOpacity style={styles.handleWrapper} onPress={handleCancel} activeOpacity={0.7}>
            <View style={styles.handle} />
          </TouchableOpacity>

          <View style={styles.modalContent}>
            {/* Title — py-4 text-center text-lg font-bold text-slate-900 */}
            <Text style={styles.title}>Personalizar Legendas</Text>

            {/* Preview Area — mb-6 overflow-hidden rounded-xl border border-primary/10 */}
            <View style={styles.previewArea}>
              <View style={styles.previewVideo}>
                {/* Subtitle preview text — rounded-md bg-black/70 px-3 py-1 text-center text-[18px] font-bold */}
                <View style={styles.previewSubtitleBox}>
                  <Text style={[styles.previewSubtitleText, { fontSize: fontSize, color: selectedColor }]}>
                    Exemplo de legenda
                  </Text>
                </View>
              </View>
              <View style={styles.previewLabel}>
                <Text style={styles.previewLabelText}>Prévia em tempo real</Text>
              </View>
            </View>

            {/* Controls Scrollable Area — max-h-[420px] overflow-y-auto */}
            <ScrollView
              style={styles.controlsScroll}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              {/* Text Color Selection — mb-3 */}
              <View style={styles.controlSection}>
                <Text style={styles.controlLabel}>Cor do texto</Text>
                <View style={styles.colorRow}>
                  {TEXT_COLORS.map((item) => (
                    <TouchableOpacity
                      key={item.color}
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: item.color },
                        selectedColor === item.color && styles.colorSwatchSelected,
                        item.color === '#ffffff' && styles.colorSwatchWhite,
                      ]}
                      onPress={() => setSelectedColor(item.color)}
                      activeOpacity={0.8}
                    />
                  ))}
                  {/* Custom color button — dashed border */}
                  <TouchableOpacity style={styles.colorSwatchCustom} activeOpacity={0.8}>
                    <MaterialIcons name="palette" size={16} color="#660ce4" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Background Opacity — mb-3 */}
              <View style={styles.controlSection}>
                <Text style={styles.controlLabel}>Fundo da legenda</Text>
                <View style={styles.bgRow}>
                  <View style={styles.bgSelector}>
                    <Text style={styles.bgSelectorText}>Preto (70%)</Text>
                    <MaterialIcons name="expand-more" size={20} color="#660ce4" />
                  </View>
                  {/* Preview swatch */}
                  <View style={styles.bgPreviewSwatch} />
                </View>
              </View>

              {/* Font Size Slider */}
              <View style={styles.controlSection}>
                <View style={styles.sliderHeaderRow}>
                  <Text style={styles.controlLabel}>Tamanho da fonte</Text>
                  <Text style={styles.sliderValueText}>{fontSize}px</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={12}
                  maximumValue={32}
                  step={1}
                  value={fontSize}
                  onValueChange={setFontSize}
                  minimumTrackTintColor="#660ce4"
                  maximumTrackTintColor="rgba(102,12,228,0.20)"
                  thumbTintColor="#660ce4"
                />
              </View>

              {/* Style Dropdown (simulated segmented) */}
              <View style={styles.controlSection}>
                <Text style={styles.controlLabel}>Estilo</Text>
                <View style={styles.styleWrapper}>
                  {SUBTITLE_STYLES.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.styleOption, subtitleStyle === opt && styles.styleOptionActive]}
                      onPress={() => setSubtitleStyle(opt)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.styleOptionText,
                          subtitleStyle === opt && styles.styleOptionTextActive,
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Bottom spacer */}
              <View style={{ height: 8 }} />
            </ScrollView>

            {/* Action Buttons — mt-8 flex gap-4 */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.btnCancel} onPress={handleCancel} activeOpacity={0.8}>
                <Text style={styles.btnCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnApply} onPress={handleApply} activeOpacity={0.85}>
                <Text style={styles.btnApplyText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* iOS indicator */}
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b', // simulated dark bg
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.40)',
  },
  // Overlay — absolute inset-0 z-10 flex flex-col justify-end bg-black/60
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  // Modal Card — flex flex-col rounded-t-xl bg-background-light
  modalCard: {
    backgroundColor: '#f7f5f8', // background-light EXATO
    borderTopLeftRadius: 12, // rounded-t-xl
    borderTopRightRadius: 12,
    paddingBottom: 8,
  },
  // Handle — h-6 w-full flex items-center justify-center pt-2
  handleWrapper: {
    height: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  handle: {
    height: 6, // h-1.5
    width: 48, // w-12
    borderRadius: 9999,
    backgroundColor: 'rgba(102,12,228,0.20)', // bg-primary/20
  },
  modalContent: {
    paddingHorizontal: 24, // px-6
  },
  // Title — py-4 text-center text-lg font-bold text-slate-900
  title: {
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 18, // text-lg
    fontWeight: '700',
    color: '#0f172a', // text-slate-900
  },
  // Preview area — mb-6 overflow-hidden rounded-xl border border-primary/10
  previewArea: {
    marginBottom: 24, // mb-6
    overflow: 'hidden',
    borderRadius: 12, // rounded-xl
    borderWidth: 1,
    borderColor: 'rgba(102,12,228,0.10)',
  },
  // Preview video container — relative h-32 items-center justify-center bg-slate-800
  previewVideo: {
    height: 128, // h-32
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Subtitle preview text box — rounded-md bg-black/70 px-3 py-1
  previewSubtitleBox: {
    backgroundColor: 'rgba(0,0,0,0.70)',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  previewSubtitleText: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  // Preview label — bg-primary/5 py-2 text-center text-xs font-medium text-primary
  previewLabel: {
    backgroundColor: 'rgba(102,12,228,0.05)',
    paddingVertical: 8,
    alignItems: 'center',
  },
  previewLabelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#660ce4',
  },
  // Controls scroll — max-h-420
  controlsScroll: {
    maxHeight: 420,
  },
  controlSection: {
    marginBottom: 24, // space-y-6
  },
  controlLabel: {
    fontSize: 14, // text-sm
    fontWeight: '700',
    color: '#334155', // text-slate-700
    marginBottom: 12, // mb-3
  },
  // Color row — flex gap-4
  colorRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  // Color swatch — size-9 = 36px rounded-full border-2 border-white ring-1
  colorSwatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  colorSwatchSelected: {
    // ring-2 ring-primary ring-offset-2 effect
    shadowColor: '#660ce4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  colorSwatchWhite: {
    borderColor: '#e2e8f0',
  },
  // Custom color button — size-9 dashed border-primary/30
  colorSwatchCustom: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(102,12,228,0.30)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Background selector row
  bgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bgSelector: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(102,12,228,0.10)',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  bgSelectorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#660ce4',
  },
  // Background preview swatch — size-10 rounded-lg bg-black/70 border-2 border-white
  bgPreviewSwatch: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.70)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  // Font size slider
  sliderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderValueText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#660ce4',
  },
  slider: {
    width: '100%',
    height: 32,
    marginTop: -4,
  },
  // Style segmented (simulating <select>)
  styleWrapper: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  styleOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
  },
  styleOptionActive: {
    backgroundColor: '#660ce4',
  },
  styleOptionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },
  styleOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Action buttons — mt-8 flex gap-4
  actionsRow: {
    flexDirection: 'row',
    gap: 16, // gap-4
    marginTop: 32, // mt-8
    marginBottom: 8,
  },
  // Cancel — flex-1 rounded-xl border border-primary/20 py-3.5 text-sm font-bold text-primary
  btnCancel: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102,12,228,0.20)',
    paddingVertical: 14, // py-3.5
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#660ce4',
  },
  // Apply — flex-1 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow
  btnApply: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#660ce4',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#660ce4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 6,
  },
  btnApplyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // iOS indicator — absolute bottom-1.5 center h-1 w-32
  homeIndicator: {
    width: 128,
    height: 4,
    backgroundColor: 'rgba(30,41,59,0.20)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
});
