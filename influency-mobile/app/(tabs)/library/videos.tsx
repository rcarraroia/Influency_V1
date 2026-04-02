import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { Text, Appbar, FAB, IconButton, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';
import { Card } from '../../../src/components/atoms/Card';
import { useVideoStore, Video } from '../../../src/store/videoStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - spacing.md * 3) / 2; // 2 columns with gaps
const CARD_HEIGHT = CARD_WIDTH * 1.5; // 2:3 aspect ratio

/**
 * SavedVideosScreen - Grid de vídeos salvos
 * 
 * Exibe todos os vídeos salvos pelo usuário com:
 * - Grid de vídeos (thumbnail, duração, data)
 * - Ações: Editar, Publicar, Excluir
 * - FAB para gravar novo vídeo
 * 
 * Requirements: 13.6, 13.7, 13.8
 */
export default function SavedVideosScreen() {
  const { videos } = useVideoStore();
  const [menuVisible, setMenuVisible] = React.useState<string | null>(null);

  const handleNewVideo = () => {
    router.push('/(tabs)/assistant/teleprompter-settings');
  };

  const handleEdit = (video: Video) => {
    setMenuVisible(null);
    router.push({
      pathname: '/(tabs)/assistant/video-edit',
      params: {
        videoUri: video.uri,
      },
    });
  };

  const handlePublish = (video: Video) => {
    setMenuVisible(null);
    router.push({
      pathname: '/(tabs)/assistant/select-networks',
      params: {
        videoUri: video.uri,
      },
    });
  };

  const handleDelete = (video: Video) => {
    setMenuVisible(null);
    // TODO: Show confirmation dialog
    useVideoStore.getState().deleteVideo(video.id);
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(date);
  };

  const renderVideoCard = ({ item }: { item: Video }) => (
    <Card variant="elevated" style={styles.videoCard}>
      {/* Thumbnail */}
      <View style={styles.thumbnailContainer}>
        {item.thumbnailUri ? (
          <Image
            source={{ uri: item.thumbnailUri }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.mockThumbnail}>
            <IconButton
              icon="video"
              size={32}
              iconColor={colors.neutral[400]}
            />
          </View>
        )}

        {/* Duration Badge */}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>
            {formatDuration(item.duration)}
          </Text>
        </View>

        {/* Status Badge */}
        {item.status !== 'ready' && (
          <View style={[
            styles.statusBadge,
            item.status === 'processing' && styles.statusBadgeProcessing,
            item.status === 'draft' && styles.statusBadgeDraft,
          ]}>
            <Text style={styles.statusText}>
              {item.status === 'processing' && '⏳ Processando'}
              {item.status === 'draft' && '📝 Rascunho'}
              {item.status === 'published' && '✓ Publicado'}
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.videoInfo}>
        <Text variant="titleSmall" numberOfLines={2} style={styles.videoTitle}>
          {item.title || 'Sem título'}
        </Text>
        <Text variant="bodySmall" style={styles.videoDate}>
          {formatDate(item.createdAt)}
        </Text>
      </View>

      {/* Actions Menu */}
      <Menu
        visible={menuVisible === item.id}
        onDismiss={() => setMenuVisible(null)}
        anchor={
          <IconButton
            icon="dots-vertical"
            size={20}
            onPress={() => setMenuVisible(item.id)}
            style={styles.menuButton}
          />
        }
      >
        <Menu.Item
          onPress={() => handleEdit(item)}
          title="Editar"
          leadingIcon="pencil"
        />
        <Menu.Item
          onPress={() => handlePublish(item)}
          title="Publicar"
          leadingIcon="send"
        />
        <Menu.Item
          onPress={() => handleDelete(item)}
          title="Excluir"
          leadingIcon="delete"
        />
      </Menu>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content 
          title="Vídeos Salvos" 
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      {videos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Nenhum vídeo salvo ainda
          </Text>
          <Text style={styles.emptySubtext}>
            Toque no botão + para gravar seu primeiro vídeo
          </Text>
        </View>
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
        />
      )}

      <FAB
        icon="video"
        style={styles.fab}
        onPress={handleNewVideo}
        label="Gravar novo"
        accessibilityLabel="Gravar novo vídeo"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
  },
  headerTitle: {
    ...typography.headlineSmall,
    color: colors.text.primary,
  },
  grid: {
    padding: spacing.md,
  },
  row: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  videoCard: {
    width: CARD_WIDTH,
    padding: 0,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    width: '100%',
    height: CARD_HEIGHT * 0.7,
    backgroundColor: colors.neutral[900],
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  mockThumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[800],
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeProcessing: {
    backgroundColor: colors.warning,
  },
  statusBadgeDraft: {
    backgroundColor: colors.neutral[600],
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  videoInfo: {
    padding: spacing.sm,
    gap: spacing.xs,
  },
  videoTitle: {
    color: colors.text.primary,
  },
  videoDate: {
    color: colors.text.secondary,
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyText: {
    ...typography.titleLarge,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  emptySubtext: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    backgroundColor: colors.primary.main,
  },
});
