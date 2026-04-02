import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { Text, Button, IconButton, RadioButton } from 'react-native-paper';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePostStore } from '../../../src/store/postStore';
import { postsService } from '../../../src/services/posts';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';
import { borderRadius } from '../../../src/theme/borderRadius';

export default function SchedulePostScreen() {
  const {
    selectedNetworks,
    caption,
    hashtags,
    publishNow,
    scheduledAt,
    setPublishNow,
    setScheduledAt,
    addPost,
  } = usePostStore();

  const [localPublishNow, setLocalPublishNow] = useState(publishNow);
  const [localScheduledAt, setLocalScheduledAt] = useState<Date>(
    scheduledAt || new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setLocalScheduledAt(selectedDate);
      if (Platform.OS === 'android') {
        setShowTimePicker(true);
      }
    }
  };

  const handleTimeChange = (_event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const newDate = new Date(localScheduledAt);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setLocalScheduledAt(newDate);
    }
  };

  const handlePublish = async () => {
    try {
      setPublishing(true);

      if (localPublishNow) {
        // Publish immediately
        const response = await postsService.publish({
          contentId: 'temp-content-id', // TODO: Use actual content ID
          contentType: 'video',
          caption,
          hashtags,
          networks: selectedNetworks,
        });
        
        addPost(response.post);
        setPublishNow(true);
      } else {
        // Schedule for later
        const response = await postsService.schedule({
          contentId: 'temp-content-id', // TODO: Use actual content ID
          contentType: 'video',
          caption,
          hashtags,
          networks: selectedNetworks,
          scheduledAt: localScheduledAt,
        });
        
        addPost(response.post);
        setScheduledAt(localScheduledAt);
      }

      // Navigate to confirmation
      router.push('/(tabs)/assistant/post-confirmation');
    } catch (error) {
      console.error('Error publishing post:', error);
      Alert.alert('Erro', 'Não foi possível publicar o conteúdo. Tente novamente.');
    } finally {
      setPublishing(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isValidSchedule = () => {
    if (localPublishNow) return true;
    return localScheduledAt > new Date();
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
        <Text style={styles.headerTitle}>Agendar Publicação</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Summary */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Resumo da Publicação</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Redes:</Text>
            <Text style={styles.summaryValue}>
              {selectedNetworks.length} {selectedNetworks.length === 1 ? 'rede' : 'redes'}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Legenda:</Text>
            <Text style={styles.summaryValue} numberOfLines={2}>
              {caption || 'Sem legenda'}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Hashtags:</Text>
            <Text style={styles.summaryValue}>
              {hashtags.length} {hashtags.length === 1 ? 'hashtag' : 'hashtags'}
            </Text>
          </View>
        </View>

        {/* Schedule Options */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Quando publicar?</Text>

          <RadioButton.Group
            onValueChange={(value) => setLocalPublishNow(value === 'now')}
            value={localPublishNow ? 'now' : 'schedule'}
          >
            {/* Publish Now */}
            <View style={styles.radioOption}>
              <RadioButton.Android value="now" color={colors.primary} />
              <View style={styles.radioContent}>
                <Text style={styles.radioLabel}>Publicar agora</Text>
                <Text style={styles.radioDescription}>
                  Seu conteúdo será publicado imediatamente
                </Text>
              </View>
            </View>

            {/* Schedule */}
            <View style={styles.radioOption}>
              <RadioButton.Android value="schedule" color={colors.primary} />
              <View style={styles.radioContent}>
                <Text style={styles.radioLabel}>Agendar para depois</Text>
                <Text style={styles.radioDescription}>
                  Escolha data e hora para publicar
                </Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        {/* Date Time Picker */}
        {!localPublishNow && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Data e Hora</Text>

            <View style={styles.dateTimeContainer}>
              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                icon="calendar"
                style={styles.dateTimeButton}
                contentStyle={styles.dateTimeButtonContent}
              >
                {formatDate(localScheduledAt)}
              </Button>

              <Button
                mode="outlined"
                onPress={() => setShowTimePicker(true)}
                icon="clock-outline"
                style={styles.dateTimeButton}
                contentStyle={styles.dateTimeButtonContent}
              >
                {formatTime(localScheduledAt)}
              </Button>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={localScheduledAt}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={localScheduledAt}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
              />
            )}

            {!isValidSchedule() && (
              <Text style={styles.errorText}>
                A data deve ser no futuro
              </Text>
            )}
          </View>
        )}

        {/* Info */}
        <View style={styles.infoBox}>
          <IconButton icon="information" size={20} iconColor={colors.info} />
          <Text style={styles.infoText}>
            {localPublishNow
              ? 'Seu conteúdo será publicado nas redes selecionadas assim que você confirmar.'
              : 'Você receberá uma notificação quando o conteúdo for publicado.'}
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handlePublish}
          disabled={!isValidSchedule() || publishing}
          loading={publishing}
          buttonColor={colors.primary}
          style={styles.publishButton}
          icon="send"
          accessibilityLabel={localPublishNow ? 'Publicar agora' : 'Agendar publicação'}
        >
          {publishing
            ? 'Publicando...'
            : localPublishNow
            ? 'Publicar Agora'
            : 'Agendar Publicação'}
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
  summaryBox: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[6],
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  summaryTitle: {
    ...typography.title.medium,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  },
  summaryItem: {
    flexDirection: 'row',
    marginTop: spacing[2],
  },
  summaryLabel: {
    ...typography.body.medium,
    color: colors.textSecondary,
    width: 80,
  },
  summaryValue: {
    ...typography.body.medium,
    color: colors.textPrimary,
    flex: 1,
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionLabel: {
    ...typography.title.medium,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginBottom: spacing[2],
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  radioContent: {
    flex: 1,
    marginLeft: spacing[2],
  },
  radioLabel: {
    ...typography.body.large,
    color: colors.textPrimary,
  },
  radioDescription: {
    ...typography.body.small,
    color: colors.textSecondary,
    marginTop: spacing[1],
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  dateTimeButton: {
    flex: 1,
    borderColor: colors.primary,
  },
  dateTimeButtonContent: {
    paddingVertical: spacing[2],
  },
  errorText: {
    ...typography.label.small,
    color: colors.error,
    marginTop: spacing[2],
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.infoContainer,
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginTop: spacing[4],
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
  },
  publishButton: {
    marginTop: spacing[2],
  },
});
