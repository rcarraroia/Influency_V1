import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function VideofinalpreviewScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Preview Final</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Video player do vÃ­deo editado]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
