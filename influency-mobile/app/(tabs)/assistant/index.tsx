import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Assistant Screen
 * 
 * Tela principal do assistente IA com chat.
 * Layout baseado EXATAMENTE no HTML de referência: assistant-screen.html
 * 
 * CORES DO HTML:
 * - primary: "#6400f0"
 * - background-light: "#f5f5f5"
 * - background-dark: "#170f23"
 */

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AssistantScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputText, setInputText] = useState('');
  
  // Mensagens EXATAS do HTML
  const [messages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou seu assistente de criação de conteúdo. Como posso ajudar você hoje?',
      timestamp: new Date(),
    },
    {
      id: '2',
      role: 'user',
      content: 'Preciso de ideias para um vídeo sobre marketing digital',
      timestamp: new Date(),
    },
    {
      id: '3',
      role: 'assistant',
      content: 'Ótimo! Vou sugerir 3 ideias de vídeos virais sobre marketing digital...',
      timestamp: new Date(),
    },
  ]);
  const [isThinking] = useState(true);

  // Scroll para última mensagem quando nova mensagem é adicionada
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      // TODO: Implementar envio de mensagem
      console.log('Sending message:', inputText);
      setInputText('');
    }
  };

  const handleVoicePress = () => {
    // TODO: Implementar gravação de voz
    console.log('Voice recording...');
  };

  const handleMenuPress = () => {
    // Botão visual apenas - sem funcionalidade especificada no HTML
    console.log('Menu button pressed - no functionality specified in HTML');
  };

  const handleHistoryPress = () => {
    router.push('/(tabs)/assistant/history');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#6400f0" />
      
      {/* Header (Fixed 56px) - EXATO DO HTML */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleMenuPress}>
          <MaterialIcons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assistente IA</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleHistoryPress}>
          <MaterialIcons name="history" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Chat Area (Scrollable) - EXATO DO HTML */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View key={message.id}>
            {message.role === 'assistant' ? (
              /* Assistant Message - EXATO DO HTML */
              <View style={styles.assistantMessageContainer}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>IA</Text>
                  </View>
                </View>
                <View style={styles.assistantBubble}>
                  <Text style={styles.assistantMessageText}>
                    {message.content}
                  </Text>
                </View>
              </View>
            ) : (
              /* User Message - EXATO DO HTML */
              <View style={styles.userMessageContainer}>
                <View style={styles.userBubble}>
                  <Text style={styles.userMessageText}>
                    {message.content}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Assistant Thinking State - EXATO DO HTML */}
        {isThinking && (
          <View style={styles.assistantMessageContainer}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>IA</Text>
              </View>
            </View>
            <View style={styles.thinkingBubble}>
              <View style={styles.thinkingDots}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer (Fixed) - EXATO DO HTML */}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          {/* Voice Button - EXATO DO HTML */}
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={handleVoicePress}
            activeOpacity={0.95}
          >
            <MaterialIcons name="mic" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Input Field - EXATO DO HTML */}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Digite sua mensagem..."
              placeholderTextColor="#64748b"
              multiline
              maxLength={500}
            />
          </View>

          {/* Send Button - EXATO DO HTML */}
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendMessage}
            activeOpacity={0.95}
          >
            <MaterialIcons name="arrow-upward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* iOS Bottom Indicator - EXATO DO HTML */}
      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // background-light EXATO DO HTML
  },
  // Header (Fixed 56px) - EXATO DO HTML
  header: {
    height: 56, // h-[56px] EXATO
    width: '100%', // w-full
    backgroundColor: '#6400f0', // bg-primary EXATO
    flexDirection: 'row', // flex
    alignItems: 'center', // items-center
    justifyContent: 'space-between', // justify-between
    paddingHorizontal: 16, // px-4
    zIndex: 20, // z-20
  },
  headerButton: {
    padding: 8, // p-2
  },
  headerTitle: {
    color: '#FFFFFF', // text-white
    fontSize: 20, // text-[20px] EXATO
    fontWeight: '600', // font-semibold
    flex: 1, // flex-1
    textAlign: 'center', // text-center
    fontFamily: 'Inter', // font-display
  },
  // Chat Container - EXATO DO HTML
  chatContainer: {
    flex: 1, // flex-1
    // height: calc(844px - 56px - 88px) = 700px implementado via flex
  },
  chatContent: {
    padding: 16, // p-4
    gap: 16, // space-y-4
  },
  // Assistant Message Container - EXATO DO HTML
  assistantMessageContainer: {
    flexDirection: 'row', // flex
    alignItems: 'flex-end', // items-end
    gap: 8, // gap-2
    maxWidth: '85%', // max-w-[85%] EXATO
  },
  avatarContainer: {
    marginBottom: 4, // mb-1
  },
  avatar: {
    width: 32, // size-8 = 32px
    height: 32, // size-8 = 32px
    borderRadius: 16, // rounded-full
    backgroundColor: '#6400f0', // bg-primary EXATO
    alignItems: 'center', // flex items-center
    justifyContent: 'center', // justify-center
  },
  avatarText: {
    fontSize: 10, // text-[10px] EXATO
    fontWeight: 'bold', // font-bold
    color: '#FFFFFF', // text-white
  },
  assistantBubble: {
    backgroundColor: '#FFFFFF', // bg-white EXATO
    color: '#1e293b', // text-slate-900 (será aplicado no texto)
    padding: 16, // p-4
    borderRadius: 16, // rounded-2xl = 16px
    borderBottomLeftRadius: 4, // rounded-bl-none = pequeno raio
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // shadow-sm
    shadowRadius: 2,
    elevation: 1,
  },
  assistantMessageText: {
    fontSize: 15, // text-[15px] EXATO
    lineHeight: 22, // leading-relaxed
    color: '#1e293b', // text-slate-900 EXATO
  },
  // User Message Container - EXATO DO HTML
  userMessageContainer: {
    flexDirection: 'row', // flex
    alignItems: 'flex-end', // items-end
    justifyContent: 'flex-end', // justify-end
    gap: 8, // gap-2
    width: '100%', // w-full
  },
  userBubble: {
    backgroundColor: '#6400f0', // bg-primary EXATO
    color: '#FFFFFF', // text-white
    padding: 16, // p-4
    borderRadius: 16, // rounded-2xl
    borderBottomRightRadius: 4, // rounded-br-none
    maxWidth: '85%', // max-w-[85%] EXATO
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // shadow-md
    shadowRadius: 4,
    elevation: 3,
  },
  userMessageText: {
    fontSize: 15, // text-[15px] EXATO
    lineHeight: 22, // leading-relaxed
    color: '#FFFFFF', // text-white EXATO
  },
  // Thinking Bubble - EXATO DO HTML
  thinkingBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // bg-white/50 EXATO
    padding: 12, // p-3
    borderRadius: 16, // rounded-2xl
    borderBottomLeftRadius: 4, // rounded-bl-none
  },
  thinkingDots: {
    flexDirection: 'row', // flex
    gap: 4, // gap-1
  },
  dot: {
    width: 6, // size-1.5 = 6px EXATO
    height: 6, // size-1.5 = 6px EXATO
    backgroundColor: 'rgba(100, 0, 240, 0.4)', // bg-primary/40 EXATO
    borderRadius: 3, // rounded-full
  },
  // Footer - EXATO DO HTML com padding para tab bar
  footer: {
    backgroundColor: '#FFFFFF', // bg-white EXATO
    borderTopWidth: 1, // border-t
    borderTopColor: '#e2e8f0', // border-slate-200 EXATO
    padding: 16, // p-4
    paddingBottom: 32, // pb-8 = 32px (conteúdo está acima da tab bar, não precisa compensar)
    zIndex: 20, // z-20
  },
  inputContainer: {
    flexDirection: 'row', // flex
    alignItems: 'center', // items-center
    gap: 12, // gap-3
  },
  // Voice Button - EXATO DO HTML
  voiceButton: {
    width: 48, // size-12 = 48px EXATO
    height: 48, // size-12 = 48px EXATO
    borderRadius: 24, // rounded-full
    backgroundColor: '#6400f0', // bg-primary EXATO
    alignItems: 'center', // flex items-center
    justifyContent: 'center', // justify-center
    shadowColor: '#6400f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // shadow-lg
    shadowRadius: 8,
    elevation: 8,
  },
  // Input Field Container - EXATO DO HTML
  textInputContainer: {
    flex: 1, // flex-1
    backgroundColor: '#f1f5f9', // bg-slate-100 EXATO
    borderRadius: 24, // rounded-full
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    borderWidth: 1, // border
    borderColor: 'transparent', // border-transparent
    // focus-within:border-primary/30 - será implementado via estado se necessário
  },
  textInput: {
    width: '100%', // w-full
    backgroundColor: 'transparent', // bg-transparent
    fontSize: 15, // text-[15px] EXATO
    color: '#1e293b', // text-slate-900 EXATO
    maxHeight: 100,
    // placeholder-slate-500 aplicado via placeholderTextColor
  },
  // Send Button - EXATO DO HTML
  sendButton: {
    width: 48, // size-12 = 48px EXATO
    height: 48, // size-12 = 48px EXATO
    borderRadius: 24, // rounded-full
    backgroundColor: '#6400f0', // bg-primary EXATO
    alignItems: 'center', // flex items-center
    justifyContent: 'center', // justify-center
    shadowColor: '#6400f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, // shadow-lg
    shadowRadius: 8,
    elevation: 8,
  },
  // iOS Bottom Indicator - EXATO DO HTML
  bottomIndicator: {
    position: 'absolute', // absolute
    bottom: 6, // bottom-1.5 = 6px
    left: '50%', // left-1/2
    marginLeft: -64, // -translate-x-1/2 (w-32 = 128px / 2 = 64px)
    width: 128, // w-32 = 128px EXATO
    height: 4, // h-1 = 4px EXATO
    backgroundColor: '#cbd5e1', // bg-slate-300 EXATO
    borderRadius: 2, // rounded-full
  },
});
