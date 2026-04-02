import { Stack } from 'expo-router';

/**
 * Assistant Stack Layout
 * 
 * Stack do Assistente IA com 16 telas:
 * - Chat principal
 * - Histórico de conversas
 * - Configurações do assistente
 * - Fluxo de geração de roteiros
 * - Fluxo de gravação de vídeo
 * - Fluxo de edição de vídeo
 * - Fluxo de carrosséis
 * - Fluxo de publicação
 */
export default function AssistantLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      {/* Telas principais */}
      <Stack.Screen name="index" />
      <Stack.Screen name="history" />
      <Stack.Screen name="assistant-settings" />

      {/* Fluxo de roteiros */}
      <Stack.Screen name="generating-script" options={{ animation: 'fade' }} />
      <Stack.Screen name="script-generated" />
      <Stack.Screen name="choose-script" />

      {/* Fluxo de gravação */}
      <Stack.Screen name="teleprompter-settings" />
      <Stack.Screen 
        name="recording-active" 
        options={{ 
          presentation: 'fullScreenModal',
          animation: 'fade',
        }} 
      />
      <Stack.Screen name="video-preview" />

      {/* Fluxo de edição */}
      <Stack.Screen name="video-edit" />
      <Stack.Screen name="processing-video" options={{ animation: 'fade' }} />
      <Stack.Screen name="video-final-preview" />
      <Stack.Screen name="subtitles-customization" options={{ presentation: 'modal' }} />

      {/* Fluxo de carrosséis */}
      <Stack.Screen name="carousel-generation" />
      <Stack.Screen name="generating-carousel" options={{ animation: 'fade' }} />
      <Stack.Screen name="carousel-preview" />

      {/* Fluxo de publicação */}
      <Stack.Screen name="select-networks" />
      <Stack.Screen name="caption-hashtags" />
      <Stack.Screen name="schedule-post" />
      <Stack.Screen name="post-confirmation" />
    </Stack>
  );
}
