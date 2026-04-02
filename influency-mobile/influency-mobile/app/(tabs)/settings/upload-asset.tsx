import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function UploadassetScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Upload de Asset</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Image picker, preview]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
