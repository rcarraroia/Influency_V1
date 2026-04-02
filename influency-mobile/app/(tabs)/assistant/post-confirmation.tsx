import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { usePostStore } from '../../../src/store/postStore';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';
import { borderRadius } from '../../../src/theme/borderRadius';

const SOCIAL_NETWORK_NAMES: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
};

export default function PostConfirmationScreen() {
  const { selectedNetworks, publishNow, resetPublicationFlow } = usePostStore();
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    // Animate success icon
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleViewAnalytics = () => {
    resetPublicationFlow();
    router.push('/(tabs)/assistant');
  };

  const handleBackToHome = () => {
    resetPublicationFlow();
    router.push('/(tabs)/assistant');
  };

  return (
    <View style={styles.container}>
      {/* Success Animation */}
      <View style={styles.successContainer}>
        <Animated.View
          style={[
            styles.successIconContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <IconButton
            icon="check-circle"
            size={80}
            iconColor={colors.success}
          />
        </Animated.View>

        <Text style={styles.successTitle}>
          {publishNow ? 'Publicado com Sucesso!' : 'Agendado com Sucesso!'}
        </Text>

        <Text style={styles.successMessage}>
          {publishNow
            ? 'Seu conteúdo foi publicado nas redes selecionadas'
            : 'Seu conteúdo será publicado na data e hora agendadas'}
        </Text>
      </View>

      {/* Networks List */}
      <View style={styles.networksContainer}>
        <Text style={styles.networksTitle}>Redes Sociais:</Text>
        <View style={styles.networksList}>
          {selectedNetworks.map((network) => (
            <View key={network} style={styles.networkItem}>
              <IconButton
                icon="check"
                size={16}
                iconColor={colors.success}
                style={styles.networkIcon}
              />
              <Text style={styles.networkName}>
                {SOCIAL_NETWORK_NAMES[network] || network}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Info Box */}
      {!publishNow && (
        <View style={styles.infoBox}>
          <IconButton icon="information" size={20} iconColor={colors.info} />
          <Text style={styles.infoText}>
            Você receberá uma notificação quando o conteúdo for publicado. Você pode
            cancelar ou editar o agendamento em Biblioteca → Agendados.
          </Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={handleViewAnalytics}
          icon="chart-line"
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
          accessibilityLabel="Ver analytics"
        >
          Ver Analytics
        </Button>

        <Button
          mode="contained"
          onPress={handleBackToHome}
          buttonColor={colors.primary}
          icon="home"
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
          accessibilityLabel="Voltar ao início"
        >
          Voltar ao Início
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing[6],
    justifyContent: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  successIconContainer: {
    marginBottom: spacing[4],
  },
  successTitle: {
    ...typography.headline.medium,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  successMessage: {
    ...typography.body.large,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing[4],
  },
  networksContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[4],
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  networksTitle: {
    ...typography.title.medium,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  },
  networksList: {
    gap: spacing[2],
  },
  networkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkIcon: {
    margin: 0,
  },
  networkName: {
    ...typography.body.large,
    color: colors.textPrimary,
    marginLeft: spacing[2],
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.infoContainer,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginBottom: spacing[6],
  },
  infoText: {
    ...typography.body.small,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  actions: {
    gap: spacing[3],
  },
  actionButton: {
    borderColor: colors.primary,
  },
  actionButtonContent: {
    paddingVertical: spacing[2],
  },
});
