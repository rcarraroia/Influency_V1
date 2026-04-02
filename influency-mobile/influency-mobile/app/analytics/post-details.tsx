import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function PostdetailsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Detalhes do Post</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[MÃ©tricas detalhadas por rede]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
