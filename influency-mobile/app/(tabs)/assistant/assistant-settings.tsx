import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

/**
 * Assistant Settings Screen
 * 
 * Tela de configurações do assistente IA.
 * Layout baseado EXATAMENTE no HTML de referência: assistant-settings.html
 * 
 * CORES DO HTML:
 * - primary: "#6508e7" (DIFERENTE da tela anterior!)
 * - background-light: "#f5f5f5"
 * - background-dark: "#170f23"
 */

export default function AssistantSettingsScreen() {
  // Estados EXATOS conforme HTML (checked/unchecked)
  const [audioResponses, setAudioResponses] = useState(true); // checked=""
  const [speechSpeed, setSpeechSpeed] = useState(2); // value="2"
  const [voiceTone, setVoiceTone] = useState('profissional'); // selected=""
  const [autoPlay, setAutoPlay] = useState(false); // sem checked
  const [creativeSuggestions, setCreativeSuggestions] = useState(true); // checked=""
  const [detailedMode, setDetailedMode] = useState(false); // sem checked

  const handleSaveSettings = () => {
    // TODO: Implementar salvamento das configurações
    console.log('Saving settings...');
    router.back();
  };

  const handleBackPress = () => {
    router.back();
  };

  const getSpeedLabel = (value: number) => {
    const labels = ['0.5x', '1x', '1.5x', '2x'];
    return labels[value - 1] || '1x';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#6508e7" />
      
      {/* Header (Fixed 56px) - EXATO DO HTML */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações do Assistente</Text>
      </View>

      {/* Scrollable Content - EXATO DO HTML */}
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Section 1: Voz do Assistente - EXATO DO HTML */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voz do Assistente</Text>
          
          {/* Item 1: Audio Responses - EXATO DO HTML */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Respostas em áudio</Text>
              <Text style={styles.settingDescription}>Ouvir respostas do assistente</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={audioResponses}
                onValueChange={setAudioResponses}
                color="#6508e7" // primary EXATO
                style={styles.switch}
              />
            </View>
          </View>

          {/* Item 2: Speech Speed Slider - EXATO DO HTML */}
          <View style={styles.sliderContainer}>
            <Text style={styles.settingLabel}>Velocidade de fala</Text>
            <View style={styles.sliderWrapper}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={4}
                step={1}
                value={speechSpeed}
                onValueChange={setSpeechSpeed}
                minimumTrackTintColor="#6508e7" // accent-primary
                maximumTrackTintColor="#e2e8f0" // bg-slate-200
                thumbStyle={styles.sliderThumb}
              />
              <View style={styles.speedLabels}>
                <Text style={[styles.speedLabel, speechSpeed === 1 && styles.activeSpeedLabel]}>0.5x</Text>
                <Text style={[styles.speedLabel, speechSpeed === 2 && styles.activeSpeedLabel]}>1x</Text>
                <Text style={[styles.speedLabel, speechSpeed === 3 && styles.activeSpeedLabel]}>1.5x</Text>
                <Text style={[styles.speedLabel, speechSpeed === 4 && styles.activeSpeedLabel]}>2x</Text>
              </View>
            </View>
          </View>

          {/* Item 3: Voice Tone Dropdown - EXATO DO HTML */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.settingLabel}>Tom de voz</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={voiceTone}
                onValueChange={setVoiceTone}
                style={styles.picker}
                dropdownIconColor="#64748b"
              >
                <Picker.Item label="Profissional" value="profissional" />
                <Picker.Item label="Amigável" value="amigavel" />
                <Picker.Item label="Entusiasta" value="entusiasta" />
              </Picker>
              <View style={styles.dropdownIcon}>
                <MaterialIcons name="expand-more" size={24} color="#64748b" />
              </View>
            </View>
          </View>
        </View>

        {/* Section 2: Reprodução - EXATO DO HTML */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reprodução</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto-play de áudio</Text>
              <Text style={styles.settingDescription}>Reproduzir automaticamente respostas em áudio</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                color="#6508e7" // primary EXATO
                style={styles.switch}
              />
            </View>
          </View>
        </View>

        {/* Section 3: Preferências - EXATO DO HTML */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          
          {/* Creative Suggestions - EXATO DO HTML */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Sugestões criativas</Text>
              <Text style={styles.settingDescription}>Receber sugestões de conteúdo proativamente</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={creativeSuggestions}
                onValueChange={setCreativeSuggestions}
                color="#6508e7" // primary EXATO
                style={styles.switch}
              />
            </View>
          </View>

          {/* Detailed Mode - EXATO DO HTML */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Modo detalhado</Text>
              <Text style={styles.settingDescription}>Respostas mais completas e explicativas</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={detailedMode}
                onValueChange={setDetailedMode}
                color="#6508e7" // primary EXATO
                style={styles.switch}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button - EXATO DO HTML */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveSettings}
          activeOpacity={0.98} // active:scale-[0.98]
        >
          <Text style={styles.saveButtonText}>Salvar Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // bg-background-light EXATO DO HTML
  },
  // Header (Fixed 56px) - EXATO DO HTML
  header: {
    height: 56, // h-[56px] EXATO
    backgroundColor: '#6508e7', // bg-primary EXATO (DIFERENTE da tela anterior!)
    flexDirection: 'row', // flex
    alignItems: 'center', // items-center
    paddingHorizontal: 16, // px-4
    zIndex: 10, // z-10
  },
  backButton: {
    padding: 4, // p-1
  },
  headerTitle: {
    flex: 1, // flex-1
    textAlign: 'center', // text-center
    color: '#FFFFFF', // text-white
    fontSize: 20, // text-[20px] EXATO
    fontWeight: '600', // font-semibold
    letterSpacing: -0.025, // tracking-tight
    paddingRight: 32, // pr-8
    fontFamily: 'Inter', // font-display
  },
  // Scrollable Content - EXATO DO HTML
  content: {
    flex: 1, // flex-1
  },
  scrollContent: {
    padding: 16, // p-4
    gap: 16, // space-y-4
  },
  // Section - EXATO DO HTML
  section: {
    backgroundColor: '#FFFFFF', // bg-white EXATO
    borderRadius: 8, // rounded-lg (DEFAULT = 0.5rem = 8px)
    padding: 16, // p-4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // shadow-sm
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    color: '#1e293b', // text-slate-900 EXATO
    fontSize: 18, // text-[18px] EXATO
    fontWeight: '500', // font-medium
    marginBottom: 16, // mb-4
  },
  // Setting Item - EXATO DO HTML
  settingItem: {
    flexDirection: 'row', // flex
    alignItems: 'center', // items-center
    justifyContent: 'space-between', // justify-between
    marginBottom: 24, // mb-6
  },
  settingInfo: {
    flexDirection: 'column', // flex-col
    maxWidth: '80%', // max-w-[80%] EXATO
  },
  settingLabel: {
    color: '#1e293b', // text-slate-900 EXATO
    fontSize: 16, // text-base
    fontWeight: '500', // font-medium
  },
  settingDescription: {
    color: '#64748b', // text-slate-500 EXATO
    fontSize: 14, // text-sm
  },
  // Switch Container - EXATO DO HTML
  switchContainer: {
    // Switch customizado para parecer com o HTML
  },
  switch: {
    // Switch nativo do React Native Paper
  },
  // Slider Container - EXATO DO HTML
  sliderContainer: {
    marginBottom: 24, // mb-6
  },
  sliderWrapper: {
    paddingTop: 8, // pt-2
    paddingHorizontal: 4, // px-1
  },
  slider: {
    width: '100%', // w-full
    height: 20, // Altura para o slider
  },
  sliderThumb: {
    width: 16, // 16px EXATO do CSS
    height: 16, // 16px EXATO do CSS
    backgroundColor: '#6508e7', // background: #6508e7 EXATO
    borderRadius: 8, // border-radius: 50%
  },
  speedLabels: {
    flexDirection: 'row', // flex
    justifyContent: 'space-between', // justify-between
    marginTop: 8, // mt-2
  },
  speedLabel: {
    fontSize: 12, // text-[12px] EXATO
    color: '#64748b', // text-slate-500 EXATO
    fontWeight: '500', // font-medium
  },
  activeSpeedLabel: {
    color: '#6508e7', // text-primary EXATO
    fontWeight: 'bold', // font-bold
  },
  // Dropdown Container - EXATO DO HTML
  dropdownContainer: {
    flexDirection: 'column', // flex-col
    marginBottom: 0, // Último item da seção
  },
  pickerWrapper: {
    position: 'relative', // relative
    backgroundColor: '#f8fafc', // bg-slate-50 EXATO
    borderWidth: 1, // border
    borderColor: '#e2e8f0', // border-slate-200 EXATO
    borderRadius: 8, // rounded-lg
    height: 48, // h-12 = 48px EXATO
    marginTop: 8, // mb-2
    justifyContent: 'center',
  },
  picker: {
    height: 48, // h-12
    color: '#1e293b', // text-slate-900 EXATO
    paddingHorizontal: 16, // px-4
  },
  dropdownIcon: {
    position: 'absolute', // absolute
    right: 12, // right-3
    top: '50%', // top-1/2
    marginTop: -12, // -translate-y-1/2
    pointerEvents: 'none', // pointer-events-none
  },
  // Footer - EXATO DO HTML
  footer: {
    padding: 16, // p-4
    backgroundColor: '#f5f5f5', // bg-background-light EXATO
    borderTopWidth: 1, // border-t
    borderTopColor: '#e2e8f0', // border-slate-200 EXATO
  },
  saveButton: {
    width: '100%', // w-full
    height: 48, // h-[48px] EXATO
    backgroundColor: '#6508e7', // bg-primary EXATO
    color: '#FFFFFF', // text-white
    fontWeight: '600', // font-semibold
    borderRadius: 8, // rounded (DEFAULT = 0.5rem = 8px)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6508e7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // shadow-lg
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    color: '#FFFFFF', // text-white EXATO
    fontSize: 16,
    fontWeight: '600', // font-semibold EXATO
  },
});
