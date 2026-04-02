import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Card, IconButton, Chip } from 'react-native-paper';
import { router } from 'expo-router';
import { colors } from '../../../src/theme/colors';
import { typography } from '../../../src/theme/typography';
import { useScriptStore } from '../../../src/store/scriptStore';
import { scriptsService, Script } from '../../../src/services/scripts';

export default function SavedScriptsScreen() {
  const { scripts, setScripts, deleteScript, setLoading } = useScriptStore();

  useEffect(() => {
    loadScripts();
  }, []);

  const loadScripts = async () => {
    try {
      setLoading(true);
      const response = await scriptsService.list();
      setScripts(response.scripts);
    } catch (error) {
      console.error('Error loading scripts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await scriptsService.delete(id);
      deleteScript(id);
    } catch (error) {
      console.error('Error deleting script:', error);
    }
  };

  const renderScript = ({ item }: { item: Script }) => (
    <Card style={styles.card} onPress={() => router.push({
      pathname: '/(tabs)/assistant/script-generated',
      params: { scriptId: item.id },
    })}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.cardTitle}>
          {item.title}
        </Text>
        <View style={styles.metadata}>
          <Chip icon="text" compact>{item.wordCount} palavras</Chip>
          <Chip icon="clock" compact>{Math.floor(item.estimatedDuration / 60)}min</Chip>
        </View>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="pencil" onPress={() => router.push({
          pathname: '/modals/edit-script',
          params: { scriptId: item.id },
        })} />
        <IconButton icon="video" onPress={() => router.push({
          pathname: '/(tabs)/assistant/teleprompter-settings',
          params: { scriptId: item.id },
        })} />
        <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={scripts}
        renderItem={renderScript}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text variant="titleLarge" style={styles.emptyTitle}>
              Nenhum roteiro salvo
            </Text>
            <Text variant="bodyMedium" style={styles.emptyText}>
              Crie seu primeiro roteiro com IA
            </Text>
          </View>
        }
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/modals/script-generation')}
        label="Novo roteiro"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#FFFFFF' },
  cardTitle: { color: colors.text.primary, marginBottom: 8 },
  metadata: { flexDirection: 'row', gap: 8 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100, gap: 16 },
  emptyIcon: { fontSize: 64 },
  emptyTitle: { color: colors.text.primary },
  emptyText: { color: colors.text.secondary },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: colors.primary },
});
