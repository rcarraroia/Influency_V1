import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Perfil</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Avatar, nome, email]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
