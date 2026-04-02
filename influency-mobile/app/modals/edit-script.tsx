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
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Edit Script Modal — "Escolha um Roteiro"
 *
 * Tela de seleção de roteiro para gravação.
 * Layout baseado EXATAMENTE no HTML de referência: edit-script-modal.html
 *
 * CORES DO HTML:
 * - primary: "#6400f0"
 * - background: "#f5f5f5"
 */

interface ScriptOption {
  id: string;
  title: string;
  preview: string;
  duration: string;
  words: number;
}

const SCRIPT_OPTIONS: ScriptOption[] = [
  {
    id: '1',
    title: '5 Estratégias de Marketing Digital',
    preview:
      'Olá! Hoje vou compartilhar 5 estratégias poderosas para alavancar o seu negócio no digital...',
    duration: '90s',
    words: 245,
  },
  {
    id: '2',
    title: 'Como criar Reels virais',
    preview:
      'O segredo para um Reels de sucesso está nos primeiros 3 segundos. Aprenda a prender a atenção...',
    duration: '60s',
    words: 120,
  },
  {
    id: '3',
    title: 'Dicas de iluminação para vídeos',
    preview:
      'Você não precisa de equipamentos caros. A luz da janela pode ser sua melhor amiga se você souber posicionar...',
    duration: '45s',
    words: 85,
  },
  {
    id: '4',
    title: 'Networking para Introvertidos',
    preview:
      'Muitas pessoas acham que networking é só para extrovertidos, mas na verdade, a escuta ativa é um superpoder...',
    duration: '120s',
    words: 310,
  },
];

export default function EditScriptModal() {
  const [selectedId, setSelectedId] = useState('1');

  const handleRecordWithoutScript = () => {
    // TODO: Gravar sem roteiro
    console.log('Record without script');
    router.back();
  };

  const handleContinue = () => {
    router.push({
      pathname: '/(tabs)/assistant/script-generated',
      params: { scriptId: selectedId },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#6400f0" />

      {/* Header (Fixed 56px) - EXATO DO HTML */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escolha um Roteiro</Text>
      </View>

      {/* Main Scrollable Content - EXATO DO HTML */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsList}>
          {SCRIPT_OPTIONS.map((script) => {
            const isSelected = selectedId === script.id;
            return (
              <TouchableOpacity
                key={script.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedId(script.id)}
                activeOpacity={0.8}
              >
                <View style={styles.cardInner}>
                  {/* Text content */}
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{script.title}</Text>
                    <Text style={styles.cardPreview} numberOfLines={2}>
                      {script.preview}
                    </Text>
                    {/* Badges row - EXATO DO HTML */}
                    <View style={styles.badgesRow}>
                      <View style={styles.badge}>
                        <MaterialIcons name="schedule" size={14} color="#64748b" />
                        <Text style={styles.badgeText}>{script.duration}</Text>
                      </View>
                      <View style={styles.badge}>
                        <MaterialIcons name="description" size={14} color="#64748b" />
                        <Text style={styles.badgeText}>{script.words} palavras</Text>
                      </View>
                    </View>
                  </View>

                  {/* Radio icon - EXATO DO HTML */}
                  <View style={styles.radioIcon}>
                    {isSelected ? (
                      <MaterialIcons name="check-circle" size={24} color="#6400f0" />
                    ) : (
                      <MaterialIcons name="radio-button-unchecked" size={24} color="#cbd5e1" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Spacer for footer */}
        <View style={styles.footerSpacer} />
      </ScrollView>

      {/* Footer — absolute bottom-0 - EXATO DO HTML */}
      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          {/* "Gravar sem roteiro" — outlined - EXATO DO HTML */}
          <TouchableOpacity
            style={styles.outlinedButton}
            onPress={handleRecordWithoutScript}
            activeOpacity={0.8}
          >
            <Text style={styles.outlinedButtonText}>Gravar sem roteiro</Text>
          </TouchableOpacity>

          {/* "Continuar" — filled - EXATO DO HTML */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleContinue}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>Continuar</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* iOS Bottom Indicator - EXATO DO HTML */}
        <View style={styles.bottomIndicator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // bg-[#f5f5f5] EXATO DO HTML
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
    fontWeight: '600', // font-semibold
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
  optionsList: {
    gap: 12, // gap-3
  },
  // Script Card — border-2 rounded-xl - EXATO DO HTML
  card: {
    padding: 16, // p-4
    backgroundColor: '#FFFFFF', // bg-white
    borderRadius: 12, // rounded-xl
    borderWidth: 2, // border-2
    borderColor: 'transparent', // border-transparent (unselected)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // shadow-sm
    shadowRadius: 2,
    elevation: 1,
  },
  cardSelected: {
    borderColor: '#6400f0', // peer-checked:border-primary EXATO
    backgroundColor: 'rgba(100, 0, 240, 0.05)', // peer-checked:bg-primary/5 EXATO
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12, // gap-3
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#212121', // text-[#212121] EXATO
    fontWeight: '600', // font-semibold
    fontSize: 16, // text-[16px] EXATO
    marginBottom: 4, // mb-1
  },
  cardPreview: {
    color: '#757575', // text-[#757575] EXATO
    fontSize: 14, // text-[14px] EXATO
    lineHeight: 20,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 12, // gap-3
    marginTop: 12, // mt-3
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    color: '#64748b', // text-slate-500
    fontSize: 12, // text-[12px] EXATO
  },
  radioIcon: {
    flexShrink: 0,
  },
  footerSpacer: {
    height: 160,
  },
  // Footer — absolute bottom-0 bg-white border-t - EXATO DO HTML
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0', // border-slate-200
    padding: 16, // p-4
    paddingBottom: 4, // pb-1
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  footerButtons: {
    gap: 12, // gap-3
  },
  // "Gravar sem roteiro" — outlined button - EXATO DO HTML
  outlinedButton: {
    width: '100%',
    height: 48, // h-[48px] EXATO
    borderRadius: 8, // rounded-lg
    borderWidth: 2, // border-2
    borderColor: '#6400f0', // border-primary EXATO
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedButtonText: {
    color: '#6400f0', // text-primary EXATO
    fontSize: 15, // text-[15px] EXATO
    fontWeight: '700', // font-bold
    letterSpacing: 0.5,
  },
  // "Continuar" — filled button - EXATO DO HTML
  primaryButton: {
    width: '100%',
    height: 48, // h-[48px] EXATO
    borderRadius: 8, // rounded-lg
    backgroundColor: '#6400f0', // bg-primary EXATO
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6400f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15, // text-[15px] EXATO
    fontWeight: '700', // font-bold
    letterSpacing: 0.5,
  },
  // iOS Bottom Indicator - EXATO DO HTML (mt-4 mb-2)
  bottomIndicator: {
    width: 128, // w-32
    height: 4, // h-1
    backgroundColor: '#cbd5e1', // bg-slate-300 EXATO
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 16, // mt-4
    marginBottom: 8, // mb-2
  },
});
