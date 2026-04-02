import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useCarouselStore } from '../../../src/store/carouselStore';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';
import { borderRadius } from '../../../src/theme/borderRadius';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_WIDTH = SCREEN_WIDTH - spacing[8];

export default function CarouselPreviewScreen() {
  const { currentCarousel } = useCarouselStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!currentCarousel) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhum carrossel selecionado</Text>
      </View>
    );
  }

  const currentSlide = currentCarousel.slides[currentSlideIndex];
  const totalSlides = currentCarousel.slides.length;

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handleEditSlide = () => {
    // TODO: Implementar modal de edição de slide
    console.log('Editar slide:', currentSlide.id);
  };

  const handleChangeImage = () => {
    // TODO: Implementar seleção de imagem
    console.log('Trocar imagem do slide:', currentSlide.id);
  };

  const handlePublish = () => {
    router.push('/(tabs)/assistant/select-networks');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        />
        <Text style={styles.headerTitle}>{currentCarousel.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Page Indicator */}
      <View style={styles.pageIndicator}>
        <Text style={styles.pageIndicatorText}>
          {currentSlideIndex + 1}/{totalSlides}
        </Text>
      </View>

      {/* Slide Preview */}
      <View style={styles.slideContainer}>
        <View
          style={[
            styles.slide,
            { backgroundColor: currentSlide.backgroundColor || colors.neutral[100] },
          ]}
        >
          {currentSlide.imageUrl && (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Imagem</Text>
            </View>
          )}
          <View style={styles.slideContent}>
            <Text style={styles.slideTitle}>{currentSlide.title}</Text>
            <Text style={styles.slideText}>{currentSlide.content}</Text>
          </View>
        </View>
      </View>

      {/* Navigation Arrows */}
      <View style={styles.navigation}>
        <IconButton
          icon="chevron-left"
          size={32}
          disabled={currentSlideIndex === 0}
          onPress={handlePrevSlide}
          style={[
            styles.navButton,
            currentSlideIndex === 0 && styles.navButtonDisabled,
          ]}
          accessibilityLabel="Slide anterior"
        />
        <IconButton
          icon="chevron-right"
          size={32}
          disabled={currentSlideIndex === totalSlides - 1}
          onPress={handleNextSlide}
          style={[
            styles.navButton,
            currentSlideIndex === totalSlides - 1 && styles.navButtonDisabled,
          ]}
          accessibilityLabel="Próximo slide"
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={handleEditSlide}
          style={styles.actionButton}
          icon="pencil"
          accessibilityLabel="Editar slide"
        >
          Editar Slide
        </Button>
        <Button
          mode="outlined"
          onPress={handleChangeImage}
          style={styles.actionButton}
          icon="image"
          accessibilityLabel="Trocar imagem"
        >
          Trocar Imagem
        </Button>
        <Button
          mode="contained"
          onPress={handlePublish}
          style={styles.publishButton}
          buttonColor={colors.primary[500]}
          icon="send"
          accessibilityLabel="Publicar carrossel"
        >
          Publicar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  headerTitle: {
    ...typography.title.large,
    color: colors.neutral[900],
    flex: 1,
    textAlign: 'center',
  },
  pageIndicator: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
  pageIndicatorText: {
    ...typography.title.medium,
    color: colors.neutral[700],
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[4],
  },
  slide: {
    width: SLIDE_WIDTH,
    height: SLIDE_WIDTH * 1.5,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: colors.neutral[300],
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  imagePlaceholderText: {
    ...typography.body.large,
    color: colors.neutral[600],
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideTitle: {
    ...typography.headline.medium,
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  slideText: {
    ...typography.body.large,
    color: colors.neutral[700],
    textAlign: 'center',
    lineHeight: 24,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
  },
  navButton: {
    backgroundColor: colors.white,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  actions: {
    padding: spacing[4],
    gap: spacing[3],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  actionButton: {
    borderColor: colors.primary[500],
  },
  publishButton: {
    marginTop: spacing[2],
  },
  errorText: {
    ...typography.body.large,
    color: colors.error[500],
    textAlign: 'center',
    marginTop: spacing[8],
  },
});
