import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

/**
 * ChatBubble Component
 * 
 * Componente de bolha de mensagem para chat.
 * Suporta duas variantes: user (usuário) e assistant (assistente IA).
 * 
 * @example
 * <ChatBubble
 *   variant="user"
 *   message="Olá, como posso criar um roteiro?"
 *   timestamp="14:30"
 * />
 * 
 * <ChatBubble
 *   variant="assistant"
 *   message="Claro! Vou te ajudar a criar um roteiro incrível."
 *   timestamp="14:31"
 *   avatar="https://example.com/avatar.png"
 * />
 */

export interface ChatBubbleProps {
  /**
   * Variante da bolha
   * - user: Mensagem do usuário (alinhada à direita, cor primary)
   * - assistant: Mensagem do assistente (alinhada à esquerda, cor neutral)
   */
  variant: 'user' | 'assistant';
  
  /**
   * Texto da mensagem
   */
  message: string;
  
  /**
   * Timestamp da mensagem (formato: HH:MM)
   */
  timestamp?: string;
  
  /**
   * URL do avatar (apenas para variant="assistant")
   */
  avatar?: string;
  
  /**
   * Indica se a mensagem está sendo digitada (animação de typing)
   */
  isTyping?: boolean;
}

export function ChatBubble({
  variant,
  message,
  timestamp,
  avatar,
  isTyping = false,
}: ChatBubbleProps) {
  const isUser = variant === 'user';

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.containerUser : styles.containerAssistant,
      ]}
      accessibilityLabel={`Mensagem ${isUser ? 'do usuário' : 'do assistente'}: ${message}`}
      accessibilityRole="text"
    >
      {/* Avatar (apenas para assistant) */}
      {!isUser && (
        <Avatar.Icon
          size={32}
          icon="robot"
          style={styles.avatar}
          color={colors.primary}
        />
      )}

      {/* Bolha de mensagem */}
      <View style={styles.bubbleWrapper}>
        <View
          style={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleAssistant,
          ]}
        >
          {isTyping ? (
            <View style={styles.typingContainer}>
              <View style={styles.typingDot} />
              <View style={[styles.typingDot, styles.typingDotDelay1]} />
              <View style={[styles.typingDot, styles.typingDotDelay2]} />
            </View>
          ) : (
            <Text
              style={[
                styles.message,
                isUser ? styles.messageUser : styles.messageAssistant,
              ]}
            >
              {message}
            </Text>
          )}
        </View>

        {/* Timestamp */}
        {timestamp && !isTyping && (
          <Text style={styles.timestamp}>{timestamp}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
    gap: 8,
  },
  containerUser: {
    justifyContent: 'flex-end',
  },
  containerAssistant: {
    justifyContent: 'flex-start',
  },
  avatar: {
    backgroundColor: colors.background.surface,
  },
  bubbleWrapper: {
    maxWidth: '75%',
    gap: 4,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: colors.background.surface,
    borderBottomLeftRadius: 4,
  },
  message: {
    ...typography.bodyMedium,
  },
  messageUser: {
    color: colors.onPrimary,
  },
  messageAssistant: {
    color: colors.text.primary,
  },
  timestamp: {
    ...typography.labelSmall,
    color: colors.text.disabled,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  typingContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.disabled,
  },
  typingDotDelay1: {
    opacity: 0.7,
  },
  typingDotDelay2: {
    opacity: 0.4,
  },
});
