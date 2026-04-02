import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function UrlanalysisScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">AnÃ¡lise de URL</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Input de URL, anÃ¡lise de vÃ­deo]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
