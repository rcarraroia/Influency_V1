import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput as RNTextInput } from 'react-native';
import { Text, Button, IconButton, Chip, ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { usePostStore } from '../../../src/store/postStore';
import { postsService } from '../../../src/services/posts';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { typography } from '../../../src/theme/typography';
import { borderRadius } from '../../../src/theme/borderRadius';

export default function CaptionHashtagsScreen() {
  const { caption, hashtags, setCaption, setHashtags } = usePostStore();
  const [localCaption, setLocalCaption] = useState(caption);
  const [localHashtags, setLocalHashtags] = useState<string[]>(hashtags);
  const [hashtagInput, setHashtagInput] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleAddHashtag = () => {
    if (hashtagInput.trim()) {
      const tag = hashtagInput.trim().startsWith('#')
        ? hashtagInput.trim()
        : `#${hashtagInput.trim()}`;
      
      if (!localHashtags.includes(tag)) {
        setLocalHashtags([...localHashtags, tag]);
      }
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setLocalHashtags(localHashtags.filter((t) => t !== tag));
  };

  const handleGenerateCaption = async () => {
    try {
      setGenerating(true);
      const response = await postsService.generateCaption({
        contentId: 'temp-id', // TODO: Use actual content ID
        contentType: 'video',
        tone: 'casual',
        includeHashtags: true,
      });
      
      setLocalCaption(response.caption);
      setLocalHashtags(response.hashtags);
    } catch (error) {
      console.error('Error generating caption:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleNext = () => {
    setCaption(localCaption);
    setHashtags(localHashtags);
    router.push('/(tabs)/assistant/schedule-post');
  };

  const characterCount = localCaption.length;
  const maxCharacters = 2200; // Instagram limit

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
        <Text style={styles.headerTitle}>Legenda e Hashtags</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* AI Generate Button */}
        <Button
          mode="outlined"
          onPress={handleGenerateCaption}
          disabled={generating}
          icon="sparkles"
          style={styles.generateButton}
          contentStyle={styles.generateButtonContent}
          accessibilityLabel="Gerar legenda com IA"
        >
          {generating ? 'Gerando...' : 'Gerar legenda com IA'}
        </Button>

        {generating && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Gerando legenda perfeita...</Text>
          </View>
        )}

        {/* Caption Input */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Legenda</Text>
          <View style={styles.textareaContainer}>
            <RNTextInput
              style={styles.textarea}
              value={localCaption}
              onChangeText={setLocalCaption}
              placeholder="Escreva uma legenda incrível..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={8}
              maxLength={maxCharacters}
              accessibilityLabel="Campo de legenda"
            />
            <Text style={styles.characterCount}>
              {characterCount}/{maxCharacters}
            </Text>
          </View>
        </View>

        {/* Hashtags Input */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Hashtags</Text>
          <View style={styles.hashtagInputContainer}>
            <RNTextInput
              style={styles.hashtagInput}
              value={hashtagInput}
              onChangeText={setHashtagInput}
              placeholder="Digite uma hashtag"
              placeholderTextColor={colors.textSecondary}
              onSubmitEditing={handleAddHashtag}
              returnKeyType="done"
              accessibilityLabel="Campo de hashtag"
            />
            <IconButton
              icon="plus"
              size={20}
              onPress={handleAddHashtag}
              disabled={!hashtagInput.trim()}
              accessibilityLabel="Adicionar hashtag"
            />
          </View>

          {/* Hashtags List */}
          {localHashtags.length > 0 && (
            <View style={styles.hashtagsList}>
              {localHashtags.map((tag, index) => (
                <Chip
                  key={index}
                  onClose={() => handleRemoveHashtag(tag)}
                  style={styles.hashtagChip}
                  textStyle={styles.hashtagChipText}
                  accessibilityLabel={`Remover hashtag ${tag}`}
                >
                  {tag}
                </Chip>
              ))}
            </View>
          )}

          <Text style={styles.hashtagHint}>
            Pressione Enter ou toque em + para adicionar
          </Text>
        </View>

        {/* Tips */}
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💡 Dicas para uma boa legenda:</Text>
          <Text style={styles.tipItem}>• Use emojis para chamar atenção</Text>
          <Text style={styles.tipItem}>• Faça perguntas para engajar</Text>
          <Text style={styles.tipItem}>• Inclua call-to-action</Text>
          <Text style={styles.tipItem}>• Use até 30 hashtags relevantes</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleNext}
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
  generateButton: {
    marginBottom: spacing[4],
    borderColor: colors.primary,
  },
  generateButtonContent: {
    paddingVertical: spacing[2],
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[4],
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.md,
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  loadingText: {
    ...typography.body.medium,
    color: colors.primary,
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionLabel: {
    ...typography.title.medium,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  },
  textareaContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    padding: spacing[3],
  },
  textarea: {
    ...typography.body.large,
    color: colors.textPrimary,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  characterCount: {
    ...typography.label.small,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing[2],
  },
  hashtagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    paddingLeft: spacing[3],
  },
  hashtagInput: {
    ...typography.body.large,
    color: colors.textPrimary,
    flex: 1,
    paddingVertical: spacing[3],
  },
  hashtagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginTop: spacing[3],
  },
  hashtagChip: {
    backgroundColor: colors.primaryContainer,
  },
  hashtagChipText: {
    ...typography.label.medium,
    color: colors.primary,
  },
  hashtagHint: {
    ...typography.label.small,
    color: colors.textSecondary,
    marginTop: spacing[2],
  },
  tipsBox: {
    backgroundColor: colors.infoContainer,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    marginTop: spacing[4],
  },
  tipsTitle: {
    ...typography.title.small,
    color: colors.textPrimary,
    marginBottom: spacing[2],
  },
  tipItem: {
    ...typography.body.medium,
    color: colors.textPrimary,
    marginTop: spacing[1],
  },
  footer: {
    padding: spacing[4],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  nextButton: {
    marginTop: spacing[2],
  },
});
