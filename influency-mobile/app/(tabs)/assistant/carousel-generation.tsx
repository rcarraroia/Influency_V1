import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { spacing, colors } from '../../../src/theme';
import { Card } from '../../../src/components/atoms/Card';
import { Input } from '../../../src/components/atoms/Input';
import { Button } from '../../../src/components/atoms/Button';

export default function CarouselGenerationScreen() {
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState(5);

  const handleGenerate = () => {
    if (!topic.trim()) {
      return;
    }

    // Navigate to generating screen
    router.push({
      pathname: '/(tabs)/assistant/generating-carousel',
      params: {
        topic,
        slideCount: slideCount.toString(),
      },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineMedium" style={styles.title}>
        Gerar Carrossel
      </Text>

      {/* Topic Input */}
      <Card variant="outlined" style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Tema do Carrossel
        </Text>
        <Input
          placeholder="Sobre o que você quer criar um carrossel?"
          value={topic}
          onChangeText={setTopic}
          multiline
          rows={3}
        />
        <Text variant="bodySmall" style={styles.hint}>
          Exemplo: "5 dicas para aumentar vendas no Instagram"
        </Text>
      </Card>

      {/* Slide Count Slider */}
      <Card variant="outlined" style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Número de Slides
        </Text>
        <View style={styles.sliderContainer}>
          <Text variant="bodyMedium">3</Text>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={10}
            step={1}
            value={slideCount}
            onValueChange={setSlideCount}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.neutral[300]}
            thumbTintColor={colors.primary}
          />
          <Text variant="bodyMedium">10</Text>
        </View>
        <Text variant="bodySmall" style={styles.hint}>
          {slideCount} slides
        </Text>
      </Card>

      {/* Tips Card */}
      <Card variant="filled" style={styles.tipsCard}>
        <Text variant="titleSmall" style={styles.tipsTitle}>
          💡 Dicas para um bom carrossel
        </Text>
        <View style={styles.tipsList}>
          <Text variant="bodySmall" style={styles.tipItem}>
            • Seja específico no tema
          </Text>
          <Text variant="bodySmall" style={styles.tipItem}>
            • Use entre 5-7 slides para melhor engajamento
          </Text>
          <Text variant="bodySmall" style={styles.tipItem}>
            • Comece com um gancho forte no primeiro slide
          </Text>
          <Text variant="bodySmall" style={styles.tipItem}>
            • Termine com uma call-to-action
          </Text>
        </View>
      </Card>

      {/* Generate Button */}
      <Button
        mode="contained"
        onPress={handleGenerate}
        disabled={!topic.trim()}
        style={styles.generateButton}
        contentStyle={styles.generateButtonContent}
        icon="auto-fix"
      >
        Gerar Carrossel
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
  tipsCard: {
    padding: spacing.md,
    backgroundColor: colors.primary + '10',
    gap: spacing.sm,
  },
  tipsTitle: {
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  tipsList: {
    gap: spacing.xs,
  },
  tipItem: {
    color: colors.neutral[700],
  },
  generateButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  generateButtonContent: {
    paddingVertical: spacing.xs,
  },
});
