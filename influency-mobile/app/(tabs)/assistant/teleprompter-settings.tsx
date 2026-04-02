import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, SegmentedButtons, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { spacing, colors } from '../../../src/theme';
import { Card } from '../../../src/components/atoms/Card';
import { TeleprompterView, ScrollMode } from '../../../src/components/molecules/TeleprompterView';
import Slider from '@react-native-community/slider';

export default function TeleprompterSettingsScreen() {
  const [scrollMode, setScrollMode] = useState<ScrollMode>('auto');
  const [scrollSpeed, setScrollSpeed] = useState(50); // pixels/second
  const [fontSize, setFontSize] = useState(24);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const sampleText = `Este é um exemplo de texto para o teleprompter.

Você pode ajustar a velocidade de rolagem, o tamanho da fonte e o modo de scroll.

O modo automático rola o texto automaticamente.

O modo manual permite que você arraste o texto.

O modo de voz sincroniza com sua fala (em breve).`;

  const handleStartRecording = () => {
    // Navegar para tela de gravação com as configurações
    router.push({
      pathname: '/(tabs)/assistant/recording-active',
      params: {
        scrollMode,
        scrollSpeed: scrollSpeed.toString(),
        fontSize: fontSize.toString(),
      },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineMedium" style={styles.title}>
        Configurações do Teleprompter
      </Text>

      {/* Modo de Scroll */}
      <Card variant="outlined" style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Modo de Scroll
        </Text>
        <SegmentedButtons
          value={scrollMode}
          onValueChange={(value) => setScrollMode(value as ScrollMode)}
          buttons={[
            {
              value: 'auto',
              label: 'Automático',
              icon: 'play-circle',
            },
            {
              value: 'manual',
              label: 'Manual',
              icon: 'gesture-swipe-vertical',
            },
            {
              value: 'voice',
              label: 'Voz',
              icon: 'microphone',
              disabled: true, // TODO: Implementar sincronização com voz
            },
          ]}
        />
        <Text variant="bodySmall" style={styles.hint}>
          {scrollMode === 'auto' && 'O texto rolará automaticamente na velocidade configurada'}
          {scrollMode === 'manual' && 'Arraste o texto para cima ou para baixo manualmente'}
          {scrollMode === 'voice' && 'O texto rolará sincronizado com sua fala (em breve)'}
        </Text>
      </Card>

      {/* Velocidade de Rolagem (apenas para modo automático) */}
      {scrollMode === 'auto' && (
        <Card variant="outlined" style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Velocidade de Rolagem
          </Text>
          <View style={styles.sliderContainer}>
            <Text variant="bodyMedium">Lento</Text>
            <Slider
              style={styles.slider}
              minimumValue={20}
              maximumValue={100}
              step={10}
              value={scrollSpeed}
              onValueChange={setScrollSpeed}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.neutral[300]}
              thumbTintColor={colors.primary}
            />
            <Text variant="bodyMedium">Rápido</Text>
          </View>
          <Text variant="bodySmall" style={styles.hint}>
            {scrollSpeed} pixels/segundo
          </Text>
        </Card>
      )}

      {/* Tamanho da Fonte */}
      <Card variant="outlined" style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Tamanho da Fonte
        </Text>
        <View style={styles.sliderContainer}>
          <Text variant="bodyMedium">Pequeno</Text>
          <Slider
            style={styles.slider}
            minimumValue={16}
            maximumValue={40}
            step={2}
            value={fontSize}
            onValueChange={setFontSize}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.neutral[300]}
            thumbTintColor={colors.primary}
          />
          <Text variant="bodyMedium">Grande</Text>
        </View>
        <Text variant="bodySmall" style={styles.hint}>
          {fontSize}px
        </Text>
      </Card>

      {/* Preview */}
      <Card variant="outlined" style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Preview
        </Text>
        <View style={styles.previewContainer}>
          <TeleprompterView
            text={sampleText}
            scrollMode={scrollMode}
            scrollSpeed={scrollSpeed}
            fontSize={fontSize}
            isPlaying={isPreviewPlaying}
            onPlayPause={() => setIsPreviewPlaying(!isPreviewPlaying)}
          />
        </View>
      </Card>

      {/* Botão Iniciar Gravação */}
      <Button
        mode="contained"
        onPress={handleStartRecording}
        style={styles.startButton}
        contentStyle={styles.startButtonContent}
        icon="video"
      >
        Iniciar Gravação
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    marginBottom: spacing.sm,
  },
  section: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.xs,
  },
  hint: {
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  slider: {
    flex: 1,
  },
  previewContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.neutral[900],
  },
  startButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  startButtonContent: {
    paddingVertical: spacing.xs,
  },
});
