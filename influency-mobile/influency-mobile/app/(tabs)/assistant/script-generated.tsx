import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function ScriptgeneratedScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Roteiro Gerado</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Exibir roteiro, word count, duraÃ§Ã£o]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
