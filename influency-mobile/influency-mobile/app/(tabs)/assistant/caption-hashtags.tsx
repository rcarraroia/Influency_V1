import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function CaptionhashtagsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Legenda e Hashtags</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Textarea de legenda, tag input]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
