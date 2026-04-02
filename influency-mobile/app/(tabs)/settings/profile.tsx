import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Appbar, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';

/**
 * ProfileScreen - Edição de perfil
 * Requirements: 14.2, 14.3, 14.4, 14.5
 */
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Perfil" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Text style={styles.placeholder}>Tela de Perfil - Placeholder</Text>
        <Text style={styles.subtext}>
          Aqui o usuário poderá editar nome, email e alterar senha
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
  },
  headerTitle: {
    ...typography.headlineSmall,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  placeholder: {
    ...typography.titleLarge,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  subtext: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
