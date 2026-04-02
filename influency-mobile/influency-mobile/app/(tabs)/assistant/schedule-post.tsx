import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function SchedulepostScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Agendar PublicaÃ§Ã£o</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>[Radio buttons, DateTimePicker]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
