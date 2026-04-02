import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function VideoeditScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Editar VÃ­deo</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[OpÃ§Ãµes de ediÃ§Ã£o: legendas, mÃºsica, assets]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
