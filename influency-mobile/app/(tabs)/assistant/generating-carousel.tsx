import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { spacing, colors } from '../../../src/theme';
import { Card } from '../../../src/components/atoms/Card';
import { carouselsService } from '../../../src/services/carousels';
import { useCarouselStore } from '../../../src/store/carouselStore';

export default function GeneratingCarouselScreen() {
  const params = useLocalSearchParams();
  const topic = params.topic as string;
  const slideCount = parseInt(params.slideCount as string) || 5;
  const { addCarousel } = useCarouselStore();

  useEffect(() => {
    generateCarousel();
  }, []);

  const generateCarousel = async () => {
    try {
      // Simulate generation delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate carousel
      const result = await carouselsService.generate({
        topic,
        slideCount,
      });

      // Add to store
      addCarousel(result.carousel);

      // Navigate to preview
      router.replace({
        pathname: '/(tabs)/assistant/carousel-preview',
        params: {
          carouselId: result.carousel.id,
        },
      });
    } catch (error) {
      console.error('Error generating carousel:', error);
      // TODO: Show error message
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Card variant="elevated" style={styles.card}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text variant="headlineMedium" style={styles.title}>
          Gerando Carrossel...
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          A IA está criando {slideCount} slides sobre "{topic}"
        </Text>
        <Text variant="bodySmall" style={styles.hint}>
          Isso pode levar alguns segundos
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    padding: spacing.xl,
    gap: spacing.md,
    alignItems: 'center',
    maxWidth: 400,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.neutral[700],
  },
  hint: {
    textAlign: 'center',
    color: colors.neutral[600],
    fontStyle: 'italic',
  },
});
