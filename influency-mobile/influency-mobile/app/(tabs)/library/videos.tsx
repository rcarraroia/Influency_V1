import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function VideosScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">VÃ­deos Salvos</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Grid de vÃ­deos]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
