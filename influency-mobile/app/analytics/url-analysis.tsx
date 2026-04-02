import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Appbar, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Input } from '../../src/components/atoms/Input';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function URLAnalysisModal() {
  const [url, setUrl] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Analisar URL" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Text style={styles.label}>URL do Post</Text>
        <Input
          type="text"
          placeholder="https://instagram.com/p/..."
          value={url}
          onChangeText={setUrl}
        />

        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.button}
          disabled={!url}
        >
          Analisar
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  header: { backgroundColor: '#FFFFFF', elevation: 0 },
  headerTitle: { ...typography.headlineSmall, color: colors.text.primary },
  content: { flex: 1, padding: spacing.md },
  label: {
    ...typography.labelLarge,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary.main,
  },
});
