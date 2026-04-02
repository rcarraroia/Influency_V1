import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Appbar, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User, Brain, Share2, Image, Bell, Plug } from 'lucide-react-native';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';

/**
 * SettingsScreen - Menu principal de configurações
 * 
 * Exibe lista de opções:
 * - Perfil
 * - Business DNA
 * - Redes Sociais
 * - Assets de Marca
 * - Notificações
 * - Integrações
 * 
 * Requirements: 14.1
 */
export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content 
          title="Configurações" 
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <List.Section>
          <List.Item
            title="Perfil"
            description="Editar informações pessoais"
            left={(props) => <User {...props} color={colors.text.secondary} size={24} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/settings/profile')}
            accessibilityLabel="Ir para Perfil"
          />
          <Divider />

          <List.Item
            title="Business DNA"
            description="Editar perfil do negócio"
            left={(props) => <Brain {...props} color={colors.text.secondary} size={24} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/settings/business-dna-settings')}
            accessibilityLabel="Ir para Business DNA"
          />
          <Divider />

          <List.Item
            title="Redes Sociais"
            description="Gerenciar contas conectadas"
            left={(props) => <Share2 {...props} color={colors.text.secondary} size={24} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/settings/social-accounts')}
            accessibilityLabel="Ir para Redes Sociais"
          />
          <Divider />

          <List.Item
            title="Assets de Marca"
            description="Logo, intro, outro, watermark"
            left={(props) => <Image {...props} color={colors.text.secondary} size={24} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/settings/brand-assets')}
            accessibilityLabel="Ir para Assets de Marca"
          />
          <Divider />

          <List.Item
            title="Notificações"
            description="Preferências de notificações"
            left={(props) => <Bell {...props} color={colors.text.secondary} size={24} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/settings/notifications-settings')}
            accessibilityLabel="Ir para Notificações"
          />
          <Divider />

          <List.Item
            title="Integrações"
            description="Conectar serviços externos"
            left={(props) => <Plug {...props} color={colors.text.secondary} size={24} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/settings/integrations')}
            accessibilityLabel="Ir para Integrações"
          />
        </List.Section>
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
  },
});
