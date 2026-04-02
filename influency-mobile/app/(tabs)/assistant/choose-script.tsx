import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Choose Script Screen — "Meus Roteiros"
 *
 * Tela com lista de roteiros salvos.
 * Layout baseado EXATAMENTE no HTML de referência: choose-script-screen.html
 *
 * CORES DO HTML:
 * - primary: "#6200EE"
 * - background-light: "#f5f5f5"
 */

const SCRIPTS = [
  { id: '1', title: '5 Estratégias de Marketing Digital para Pequenos Negócios', words: 245, date: '10 Out 2023', opacity: 1 },
  { id: '2', title: 'Roteiro: Lançamento Coleção de Verão', words: 180, date: '08 Out 2023', opacity: 1 },
  { id: '3', title: 'Dicas de Produtividade Home Office', words: 312, date: '05 Out 2023', opacity: 1 },
  { id: '4', title: 'Review: Smartphone Premium 2024', words: 520, date: '01 Out 2023', opacity: 1 },
  { id: '5', title: 'Convite para Webinar Exclusivo', words: 150, date: '28 Set 2023', opacity: 1 },
  { id: '6', title: 'Apresentação Institucional 2023', words: 405, date: '20 Set 2023', opacity: 0.8 },
];

export default function ChooseScriptScreen() {
  const handleNewScript = () => {
    router.push('/modals/script-generation');
  };

  const handleScriptPress = (id: string) => {
    router.push({
      pathname: '/(tabs)/assistant/script-generated',
      params: { scriptId: id },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#6200EE" />

      {/* Header (Fixed 56px) - EXATO DO HTML */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => console.log('menu')}>
          <MaterialIcons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Roteiros</Text>
      </View>

      {/* Main Scrollable Content - EXATO DO HTML */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {SCRIPTS.map((script) => (
          <TouchableOpacity
            key={script.id}
            style={[styles.card, { opacity: script.opacity }]}
            onPress={() => handleScriptPress(script.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>{script.title}</Text>

            {/* Meta row - EXATO DO HTML */}
            <View style={styles.metaRow}>
              <View style={styles.metaLeft}>
                {/* Word count */}
                <View style={styles.metaItem}>
                  <MaterialIcons name="description" size={16} color="#757575" />
                  <Text style={styles.metaText}>{script.words} palavras</Text>
                </View>
                {/* Date */}
                <View style={styles.metaItem}>
                  <MaterialIcons name="calendar-today" size={16} color="#757575" />
                  <Text style={styles.metaText}>{script.date}</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
            </View>
          </TouchableOpacity>
        ))}
        {/* Spacer - h-24 do HTML */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* FAB "Novo roteiro" - EXATO DO HTML (absolute bottom-10 right-6) */}
      <TouchableOpacity style={styles.fab} onPress={handleNewScript} activeOpacity={0.9}>
        <MaterialIcons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.fabText}>Novo roteiro</Text>
      </TouchableOpacity>
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
    height: 56, // h-[56px]
    backgroundColor: '#6200EE', // bg-primary EXATO
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, // px-4
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // shadow-md
  },
  headerButton: {
    padding: 4, // p-1
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF', // text-white
    fontSize: 20, // text-[20px] EXATO
    fontWeight: '600', // font-semibold
    flex: 1, // flex-1
    textAlign: 'center', // text-center
    paddingRight: 32, // compensar botão esquerdo
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16, // p-4
    gap: 16, // space-y-4
  },
  // Script Card - EXATO DO HTML
  card: {
    backgroundColor: '#FFFFFF', // bg-white
    borderRadius: 8, // rounded-lg
    padding: 16, // p-4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // shadow-sm
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f1f5f9', // border-slate-100
    gap: 8, // gap-2
  },
  cardTitle: {
    color: '#212121', // text-[#212121] EXATO
    fontSize: 16, // text-[16px] EXATO
    fontWeight: '600', // font-semibold
    lineHeight: 22, // leading-tight
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4, // mt-1
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap-3
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // mr-1 no ícone
  },
  metaText: {
    color: '#757575', // text-[#757575] EXATO
    fontSize: 12, // text-[12px] EXATO
  },
  spacer: {
    height: 96, // h-24
  },
  // FAB "Novo roteiro" - EXATO DO HTML (absolute bottom-10 right-6, h-[56px], px-6, rounded-full)
  fab: {
    position: 'absolute',
    bottom: 40, // bottom-10
    right: 24, // right-6
    height: 56, // h-[56px] EXATO
    paddingHorizontal: 24, // px-6
    borderRadius: 28, // rounded-full
    backgroundColor: '#6200EE', // bg-primary EXATO
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // fab-shadow
    shadowRadius: 10,
    elevation: 8,
    zIndex: 30,
  },
  fabText: {
    color: '#FFFFFF', // text-white
    fontSize: 14, // text-[14px] EXATO
    fontWeight: '700', // font-bold
    letterSpacing: 1, // tracking-wide uppercase
    textTransform: 'uppercase',
  },
});
