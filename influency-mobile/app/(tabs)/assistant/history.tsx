import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Conversation History Screen
 *
 * Tela de histórico de conversas com o assistente.
 * Layout baseado EXATAMENTE no HTML de referência: conversation-history.html
 *
 * CORES DO HTML:
 * - primary: "#6200EE"
 * - background-light: "#f5f5f5"
 */

const CONVERSATIONS = [
  {
    id: '1',
    title: 'Ideias para vídeo de marketing',
    preview: 'Ótimo! Vou sugerir 3 ideias de vídeos virais...',
    time: 'Há 2 horas',
  },
  {
    id: '2',
    title: 'Roteiro sobre alimentação saudável',
    preview: 'Claro! Vou criar um roteiro envolvente sobre...',
    time: 'Ontem',
  },
  {
    id: '3',
    title: 'Legendas para carrossel Instagram',
    preview: 'Aqui estão 5 opções de legendas criativas...',
    time: '15/02',
  },
  {
    id: '4',
    title: 'Hashtags para TikTok',
    preview: 'Vou sugerir hashtags relevantes para seu nicho...',
    time: '14/02',
  },
  {
    id: '5',
    title: 'Análise de vídeo viral',
    preview: 'Analisando o vídeo, identifiquei 3 elementos...',
    time: '13/02',
  },
  {
    id: '6',
    title: 'Planejamento de conteúdo semanal',
    preview: 'Vamos organizar sua semana de postagens...',
    time: '12/02',
  },
];

export default function ConversationHistoryScreen() {
  const handleNewConversation = () => {
    // TODO: Iniciar nova conversa
    console.log('New conversation');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#6200EE" />

      {/* Header (Fixed 56px) - EXATO DO HTML */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico</Text>
      </View>

      {/* Main Content (Scrollable) - EXATO DO HTML */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CONVERSATIONS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
            {/* Icon Container - EXATO DO HTML */}
            <View style={styles.iconContainer}>
              <MaterialIcons name="chat-bubble" size={20} color="#6200EE" />
            </View>

            {/* Text Content - EXATO DO HTML */}
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPreview} numberOfLines={1}>
                {item.preview}
              </Text>
            </View>

            {/* Timestamp - absolute top-4 right-4 - EXATO DO HTML */}
            <Text style={styles.cardTime}>{item.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button - EXATO DO HTML */}
      <TouchableOpacity style={styles.fab} onPress={handleNewConversation} activeOpacity={0.9}>
        <MaterialIcons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* iOS Bottom Indicator - EXATO DO HTML */}
      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // background-light EXATO DO HTML
  },
  // Header (Fixed 56px) - EXATO DO HTML
  header: {
    height: 56, // h-[56px] EXATO
    backgroundColor: '#6200EE', // bg-primary EXATO
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, // px-4
    zIndex: 20,
  },
  headerButton: {
    width: 40, // w-10 = 40px
    height: 40, // h-10 = 40px
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8, // -ml-2
  },
  headerTitle: {
    color: '#FFFFFF', // text-white
    fontSize: 20, // text-[20px] EXATO
    fontWeight: '600', // font-semibold
    flex: 1, // flex-1
    textAlign: 'center', // text-center
    paddingRight: 32, // pr-8 — compensa o botão de voltar para centralizar
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16, // px-4
    paddingTop: 16, // pt-4
    paddingBottom: 96, // pb-24
    gap: 12, // space-y-3
  },
  // Card - EXATO DO HTML
  card: {
    backgroundColor: '#FFFFFF', // bg-white
    padding: 16, // p-4
    borderRadius: 8, // rounded-lg
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, // ios-shadow
    shadowRadius: 8,
    elevation: 1,
  },
  // Icon Container - EXATO DO HTML (w-10 h-10 rounded-full bg-primary/10)
  iconContainer: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 20, // rounded-full
    backgroundColor: 'rgba(98, 0, 238, 0.1)', // bg-primary/10
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0, // shrink-0
  },
  textContainer: {
    flex: 1, // flex-1
    paddingRight: 64, // pr-16 = 64px — evita sobreposição com o timestamp
  },
  cardTitle: {
    color: '#0f172a', // text-slate-900
    fontSize: 16, // text-base
    fontWeight: '500', // font-medium
    lineHeight: 20, // leading-tight
    marginBottom: 4, // mb-1
  },
  cardPreview: {
    color: '#64748b', // text-slate-500
    fontSize: 14, // text-sm
  },
  cardTime: {
    position: 'absolute', // absolute
    top: 16, // top-4
    right: 16, // right-4
    color: '#94a3b8', // text-slate-400
    fontSize: 12, // text-[12px] EXATO
  },
  // FAB - absolute bottom-6 right-6 - EXATO DO HTML
  fab: {
    position: 'absolute',
    bottom: 24, // bottom-6
    right: 24, // right-6
    width: 56, // w-[56px] EXATO
    height: 56, // h-[56px] EXATO
    borderRadius: 28, // rounded-full
    backgroundColor: '#6200EE', // bg-primary EXATO
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, // fab-shadow
    shadowRadius: 12,
    elevation: 10,
    zIndex: 30, // z-30
  },
  // iOS Bottom Indicator - EXATO DO HTML
  bottomIndicator: {
    position: 'absolute',
    bottom: 6, // bottom-1.5
    left: '50%',
    marginLeft: -64,
    width: 128, // w-32
    height: 4, // h-1
    backgroundColor: '#cbd5e1', // bg-slate-300
    borderRadius: 2,
  },
});
