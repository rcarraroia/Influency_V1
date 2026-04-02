import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Checkbox, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { usePostStore } from '../../../src/store/postStore';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';
import { borderRadius } from '../../../src/theme/borderRadius';
import { shadows } from '../../../src/theme/shadows';

interface SocialNetworkOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
}

const SOCIAL_NETWORKS: SocialNetworkOption[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    color: '#E4405F',
    connected: true,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'music-note',
    color: '#000000',
    connected: true,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    connected: false,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    connected: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
    connected: false,
  },
];

export default function SelectNetworksScreen() {
  const { selectedNetworks, setSelectedNetworks } = usePostStore();
  const [localSelection, setLocalSelection] = useState<string[]>(selectedNetworks);

  const handleToggleNetwork = (networkId: string) => {
    if (localSelection.includes(networkId)) {
      setLocalSelection(localSelection.filter((id) => id !== networkId));
    } else {
      setLocalSelection([...localSelection, networkId]);
    }
  };

  const handleNext = () => {
    if (localSelection.length === 0) {
      return;
    }
    setSelectedNetworks(localSelection);
    router.push('/(tabs)/assistant/caption-hashtags');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        />
        <Text style={styles.headerTitle}>Selecionar Redes</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>
          Escolha onde você quer publicar seu conteúdo
        </Text>

        {/* Networks List */}
        <View style={styles.networksList}>
          {SOCIAL_NETWORKS.map((network) => (
            <View
              key={network.id}
              style={[
                styles.networkCard,
                localSelection.includes(network.id) && styles.networkCardSelected,
                !network.connected && styles.networkCardDisabled,
              ]}
            >
              <View style={styles.networkHeader}>
                <View style={styles.networkInfo}>
                  <View
                    style={[
                      styles.networkIconContainer,
                      { backgroundColor: network.color },
                    ]}
                  >
                    <IconButton
                      icon={network.icon}
                      size={24}
                      iconColor={colors.white}
                    />
                  </View>
                  <View style={styles.networkText}>
                    <Text style={styles.networkName}>{network.name}</Text>
                    {network.connected ? (
                      <Text style={styles.networkStatus}>Conectado</Text>
                    ) : (
                      <Text style={styles.networkStatusDisconnected}>
                        Não conectado
                      </Text>
                    )}
                  </View>
                </View>

                <Checkbox
                  status={
                    localSelection.includes(network.id) ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleToggleNetwork(network.id)}
                  disabled={!network.connected}
                />
              </View>

              {/* Preview placeholder */}
              {localSelection.includes(network.id) && (
                <View style={styles.previewContainer}>
                  <Text style={styles.previewLabel}>Preview:</Text>
                  <View style={styles.previewBox}>
                    <Text style={styles.previewText}>
                      Seu conteúdo aparecerá aqui
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Info message */}
        <View style={styles.infoBox}>
          <IconButton icon="information" size={20} iconColor={colors.info} />
          <Text style={styles.infoText}>
            Conecte mais redes sociais em Configurações → Contas Sociais
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.selectionCount}>
          {localSelection.length} {localSelection.length === 1 ? 'rede selecionada' : 'redes selecionadas'}
        </Text>
        <Button
          mode="contained"
          onPress={handleNext}
          disabled={localSelection.length === 0}
          buttonColor={colors.primary}
          style={styles.nextButton}
          accessibilityLabel="Próximo"
        >
          Próximo
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  headerTitle: {
    ...typography.title.large,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing[4],
  },
  subtitle: {
    ...typography.body.large,
    color: colors.textSecondary,
    marginBottom: spacing[6],
    textAlign: 'center',
  },
  networksList: {
    gap: spacing[3],
  },
  networkCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    borderWidth: 2,
    borderColor: colors.neutral[200],
    ...shadows.elevation1,
  },
  networkCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryContainer,
  },
  networkCardDisabled: {
    opacity: 0.5,
  },
  networkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  networkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  networkIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  networkText: {
    marginLeft: spacing[3],
    flex: 1,
  },
  networkName: {
    ...typography.title.medium,
    color: colors.textPrimary,
  },
  networkStatus: {
    ...typography.label.small,
    color: colors.success,
    marginTop: spacing[1],
  },
  networkStatusDisconnected: {
    ...typography.label.small,
    color: colors.textSecondary,
    marginTop: spacing[1],
  },
  previewContainer: {
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  previewLabel: {
    ...typography.label.medium,
    color: colors.textSecondary,
    marginBottom: spacing[2],
  },
  previewBox: {
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.md,
    padding: spacing[4],
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    ...typography.body.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.infoContainer,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginTop: spacing[6],
  },
  infoText: {
    ...typography.body.small,
    color: colors.textPrimary,
    flex: 1,
  },
  footer: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    gap: spacing[2],
  },
  selectionCount: {
    ...typography.body.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: spacing[2],
  },
});
