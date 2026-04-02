import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { Text, FAB, IconButton, Menu } from 'react-native-paper';
import { router } from 'expo-router';
import { useCarouselStore } from '../../../src/store/carouselStore';
import { carouselsService, Carousel } from '../../../src/services/carousels';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';
import { borderRadius } from '../../../src/theme/borderRadius';
import { shadows } from '../../../src/theme/shadows';

interface CarouselCardProps {
  carousel: Carousel;
  onEdit: () => void;
  onPublish: () => void;
  onDelete: () => void;
}

function CarouselCard({ carousel, onEdit, onPublish, onDelete }: CarouselCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const firstSlide = carousel.slides[0];

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        useCarouselStore.getState().setCurrentCarousel(carousel);
        router.push('/(tabs)/assistant/carousel-preview');
      }}
      accessibilityLabel={`Carrossel ${carousel.title}`}
      accessibilityHint="Toque para visualizar"
    >
      {/* Preview do primeiro slide */}
      <View
        style={[
          styles.cardPreview,
          { backgroundColor: firstSlide?.backgroundColor || colors.neutral[200] },
        ]}
      >
        {firstSlide?.imageUrl && (
          <View style={styles.previewImagePlaceholder}>
            <Text style={styles.previewImageText}>Imagem</Text>
          </View>
        )}
        <View style={styles.previewContent}>
          <Text style={styles.previewTitle} numberOfLines={2}>
            {firstSlide?.title || 'Sem título'}
          </Text>
        </View>
      </View>

      {/* Card Info */}
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {carousel.title}
          </Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={20}
                onPress={() => setMenuVisible(true)}
                accessibilityLabel="Menu de ações"
              />
            }
          >
            <Menu.Item onPress={onEdit} title="Editar" leadingIcon="pencil" />
            <Menu.Item onPress={onPublish} title="Publicar" leadingIcon="send" />
            <Menu.Item onPress={onDelete} title="Excluir" leadingIcon="delete" />
          </Menu>
        </View>

        <View style={styles.cardMeta}>
          <Text style={styles.cardMetaText}>
            {carousel.slideCount} {carousel.slideCount === 1 ? 'slide' : 'slides'}
          </Text>
          <Text style={styles.cardMetaText}>•</Text>
          <Text style={styles.cardMetaText}>
            {new Date(carousel.createdAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>

        {/* Status Badge */}
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {carousel.status === 'draft' && 'Rascunho'}
            {carousel.status === 'ready' && 'Pronto'}
            {carousel.status === 'published' && 'Publicado'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function SavedCarouselsScreen() {
  const { carousels, setCurrentCarousel, deleteCarousel } = useCarouselStore();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadCarousels = async () => {
    try {
      setLoading(true);
      const response = await carouselsService.list();
      // TODO: Atualizar store com carrosséis do backend
      console.log('Carrosséis carregados:', response.total);
    } catch (error) {
      console.error('Erro ao carregar carrosséis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCarousels();
    setRefreshing(false);
  };

  useEffect(() => {
    loadCarousels();
  }, []);

  const handleEdit = (carousel: Carousel) => {
    setCurrentCarousel(carousel);
    router.push('/(tabs)/assistant/carousel-preview');
  };

  const handlePublish = (carousel: Carousel) => {
    setCurrentCarousel(carousel);
    router.push('/(tabs)/assistant/select-networks');
  };

  const handleDelete = (carousel: Carousel) => {
    Alert.alert(
      'Excluir Carrossel',
      `Tem certeza que deseja excluir "${carousel.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await carouselsService.delete(carousel.id);
              deleteCarousel(carousel.id);
            } catch (error) {
              console.error('Erro ao excluir carrossel:', error);
              Alert.alert('Erro', 'Não foi possível excluir o carrossel');
            }
          },
        },
      ]
    );
  };

  const handleCreateNew = () => {
    router.push('/(tabs)/assistant/carousel-generation');
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>Nenhum carrossel salvo</Text>
      <Text style={styles.emptyStateText}>
        Crie seu primeiro carrossel para começar
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={carousels}
        renderItem={({ item }) => (
          <CarouselCard
            carousel={item}
            onEdit={() => handleEdit(item)}
            onPublish={() => handlePublish(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={renderEmptyState}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <FAB
        icon="plus"
        label="Criar novo"
        style={styles.fab}
        onPress={handleCreateNew}
        accessibilityLabel="Criar novo carrossel"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  listContent: {
    padding: spacing[4],
    paddingBottom: spacing[20],
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing[4],
    ...shadows.elevation2,
  },
  cardPreview: {
    height: 200,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    padding: spacing[3],
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImagePlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  previewImageText: {
    ...typography.label.small,
    color: colors.neutral[600],
  },
  previewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewTitle: {
    ...typography.title.small,
    color: colors.neutral[900],
    textAlign: 'center',
  },
  cardInfo: {
    padding: spacing[3],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  cardTitle: {
    ...typography.title.medium,
    color: colors.neutral[900],
    flex: 1,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  cardMetaText: {
    ...typography.label.small,
    color: colors.neutral[600],
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    backgroundColor: colors.primary[100],
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...typography.label.small,
    color: colors.primary[700],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[16],
  },
  emptyStateTitle: {
    ...typography.title.large,
    color: colors.neutral[900],
    marginBottom: spacing[2],
  },
  emptyStateText: {
    ...typography.body.medium,
    color: colors.neutral[600],
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing[4],
    bottom: spacing[4],
    backgroundColor: colors.primary[500],
  },
});
