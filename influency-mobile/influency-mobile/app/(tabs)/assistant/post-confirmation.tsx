import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function PostconfirmationScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">PublicaÃ§Ã£o Confirmada</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Ãcone de sucesso, lista de redes]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
