# 📱 ARQUITETURA FRONTEND - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Stack:** React Native + Expo  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Navegação](#navegação)
5. [Gerenciamento de Estado](#gerenciamento-de-estado)
6. [Assistente IA Híbrido](#assistente-ia-híbrido)
7. [Componentes Reutilizáveis](#componentes-reutilizáveis)

---

## 🎯 VISÃO GERAL

### Arquitetura Mobile-First

O frontend do Influency v2 é um aplicativo mobile nativo construído com React Native e Expo, focado em:
- **Performance:** Navegação fluida, animações suaves
- **Offline-First:** Funciona sem internet (modo degradado)
- **Acessibilidade:** WCAG 2.1 Level A
- **Multimodal:** Interface híbrida (voz + texto)

### Princípios de Design

1. **Conversacional:** Assistente IA guia o usuário
2. **Progressivo:** Funcionalidades reveladas gradualmente
3. **Tolerante a Erros:** Sempre permite desfazer/refazer
4. **Feedback Imediato:** Usuário sempre sabe o que está acontecendo
5. **Mobile-First:** Otimizado para telas pequenas e touch

---

## 💻 STACK TECNOLÓGICO

### Core
- **React Native 0.73+** - Framework mobile
- **Expo 50+** - Toolchain e SDK
- **TypeScript 5.0+** - Linguagem
- **React Navigation 6+** - Navegação

### Voz e Áudio
- **@react-native-voice/voice** - Reconhecimento de voz
- **expo-speech** - Síntese de voz (TTS)
- **@siteed/expo-audio-studio** - Streaming de áudio
- **expo-av** - Reprodução de áudio/vídeo

### Câmera e Mídia
- **expo-camera** - Gravação de vídeo
- **expo-image-picker** - Seleção de imagens
- **expo-media-library** - Acesso à galeria

### Estado e Cache
- **Zustand** - Gerenciamento de estado global
- **React Query** - Cache de dados do servidor
- **AsyncStorage** - Persistência local

### UI e Animações
- **React Native Paper** - Componentes Material Design
- **React Native Reanimated** - Animações performáticas
- **React Native Gesture Handler** - Gestos touch

### Networking
- **Axios** - HTTP client
- **Socket.io** - WebSocket (tempo real)

---

## 📁 ESTRUTURA DE PASTAS

```
influency-mobile/
├── app.json                    # Configuração Expo
├── package.json
├── tsconfig.json
├── src/
│   ├── App.tsx                # Entry point
│   ├── navigation/
│   │   ├── RootNavigator.tsx  # Navigator principal
│   │   ├── AuthStack.tsx      # Stack de autenticação
│   │   ├── MainTabs.tsx       # Bottom tabs
│   │   └── types.ts           # Tipos de navegação
│   ├── screens/
│   │   ├── auth/              # Telas de autenticação
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── OnboardingScreen.tsx
│   │   │   └── BusinessDNAScreen.tsx
│   │   ├── assistant/         # Assistente IA
│   │   │   └── AssistantScreen.tsx
│   │   ├── scripts/           # Geração de roteiros
│   │   │   ├── ScriptGenerationScreen.tsx
│   │   │   ├── ScriptEditScreen.tsx
│   │   │   └── SavedScriptsScreen.tsx
│   │   ├── recording/         # Gravação
│   │   │   ├── TeleprompterScreen.tsx
│   │   │   └── RecordingScreen.tsx
│   │   ├── editing/           # Edição
│   │   │   ├── VideoEditScreen.tsx
│   │   │   └── SubtitlesScreen.tsx
│   │   ├── carousels/         # Carrosséis
│   │   │   └── CarouselGenerationScreen.tsx
│   │   ├── posting/           # Publicação
│   │   │   ├── SchedulePostScreen.tsx
│   │   │   └── PostsListScreen.tsx
│   │   └── analytics/         # Analytics
│   │       └── AnalyticsScreen.tsx
│   ├── components/
│   │   ├── ui/                # Componentes base
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Loading.tsx
│   │   ├── assistant/         # Componentes do assistente
│   │   │   ├── VoiceButton.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   └── SuggestionChips.tsx
│   │   ├── teleprompter/      # Componentes do teleprompter
│   │   │   ├── TeleprompterView.tsx
│   │   │   └── ScrollController.tsx
│   │   └── video/             # Componentes de vídeo
│   │       ├── VideoPlayer.tsx
│   │       └── VideoTimeline.tsx
│   ├── hooks/
│   │   ├── useVoiceRecognition.ts
│   │   ├── useTextToSpeech.ts
│   │   ├── useCamera.ts
│   │   └── useAuth.ts
│   ├── services/
│   │   ├── api.ts             # Cliente HTTP
│   │   ├── auth.ts            # Autenticação
│   │   ├── scripts.ts         # Scripts API
│   │   ├── videos.ts          # Videos API
│   │   └── posts.ts           # Posts API
│   ├── store/
│   │   ├── authStore.ts       # Estado de autenticação
│   │   ├── assistantStore.ts  # Estado do assistente
│   │   └── videoStore.ts      # Estado de vídeos
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   └── utils/
│       ├── validation.ts
│       ├── formatting.ts
│       └── constants.ts
└── assets/
    ├── images/
    ├── fonts/
    └── sounds/
```

---

## 🧭 NAVEGAÇÃO

### Estrutura de Navegação Completa (51 telas)

```
RootNavigator (Stack)
├── AuthStack (Stack) - 11 telas
│   ├── Splash
│   ├── Login
│   ├── Register
│   ├── Welcome
│   ├── Onboarding (5 perguntas)
│   ├── ConnectSocialNetworks
│   └── OnboardingComplete
│
└── MainTabs (Bottom Tabs) - 3 tabs principais
    │
    ├── AssistantTab (Stack) - 14 telas
    │   ├── Assistant (tela principal - chat híbrido)
    │   ├── ConversationHistory
    │   ├── AssistantSettings
    │   │
    │   ├── ScriptGeneration (modal)
    │   ├── GeneratingScript (loading)
    │   ├── ScriptGenerated
    │   ├── EditScript (modal)
    │   │
    │   ├── ChooseScript
    │   ├── TeleprompterSettings
    │   ├── RecordingActive (fullscreen)
    │   ├── VideoPreview
    │   │
    │   ├── VideoEdit
    │   ├── ProcessingVideo (loading)
    │   ├── VideoFinalPreview
    │   └── SubtitlesCustomization (modal)
    │
    ├── LibraryTab (Stack) - 13 telas
    │   ├── Library (tela principal - tabs internas)
    │   ├── SavedScripts
    │   ├── SavedVideos
    │   ├── SavedCarousels
    │   │
    │   ├── CarouselGeneration (modal)
    │   ├── GeneratingCarousel (loading)
    │   ├── CarouselPreview
    │   ├── EditSlide (modal)
    │   │
    │   ├── SelectNetworks
    │   ├── CaptionHashtags
    │   ├── SchedulePost
    │   ├── PostConfirmation
    │   └── ScheduledPosts
    │
    └── SettingsTab (Stack) - 10 telas
        ├── Settings (tela principal)
        ├── Profile
        ├── BusinessDNASettings
        ├── BusinessDNAEdit (modal)
        ├── SocialAccounts
        ├── BrandAssets
        ├── UploadAsset (modal)
        ├── ConfigureAsset (modal)
        ├── NotificationsSettings
        └── Integrations
```

> ⚠️ **Nota:** A especificação detalhada de cada tela está em `10-ESPECIFICACAO-TELAS.md` (fonte de verdade). Este documento descreve a estrutura de navegação; para a lista completa de telas, consulte o documento 10.

### Modais Globais (não pertencem a nenhum stack)

Estes modais podem ser abertos de qualquer lugar do app:

```typescript
// src/navigation/RootNavigator.tsx
<Stack.Navigator screenOptions={{ headerShown: false }}>
  {/* Auth ou Main */}
  
  {/* Modais globais */}
  <Stack.Group screenOptions={{ presentation: 'modal' }}>
    <Stack.Screen name="Analytics" component={AnalyticsScreen} />
    <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
    <Stack.Screen name="URLAnalysis" component={URLAnalysisScreen} />
  </Stack.Group>
</Stack.Navigator>
```

### Implementação Completa

#### RootNavigator.tsx

```typescript
// src/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/store/authStore';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

// Modais globais
import AnalyticsScreen from '@/screens/analytics/AnalyticsScreen';
import PostDetailsScreen from '@/screens/posting/PostDetailsScreen';
import URLAnalysisScreen from '@/screens/scripts/URLAnalysisScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
        
        {/* Modais globais */}
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
          <Stack.Screen name="URLAnalysis" component={URLAnalysisScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

#### AuthStack.tsx

```typescript
// src/navigation/AuthStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@/screens/auth/SplashScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import WelcomeScreen from '@/screens/auth/WelcomeScreen';
import OnboardingScreen from '@/screens/auth/OnboardingScreen';
import ConnectSocialNetworksScreen from '@/screens/auth/ConnectSocialNetworksScreen';
import OnboardingCompleteScreen from '@/screens/auth/OnboardingCompleteScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ConnectSocialNetworks" component={ConnectSocialNetworksScreen} />
      <Stack.Screen name="OnboardingComplete" component={OnboardingCompleteScreen} />
    </Stack.Navigator>
  );
}
```

#### MainTabs.tsx

```typescript
// src/navigation/MainTabs.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AssistantStack from './AssistantStack';
import LibraryStack from './LibraryStack';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tab.Screen
        name="AssistantTab"
        component={AssistantStack}
        options={{
          tabBarLabel: 'Assistente',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LibraryTab"
        component={LibraryStack}
        options={{
          tabBarLabel: 'Biblioteca',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
```

#### AssistantStack.tsx

```typescript
// src/navigation/AssistantStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Assistente
import AssistantScreen from '@/screens/assistant/AssistantScreen';
import ConversationHistoryScreen from '@/screens/assistant/ConversationHistoryScreen';
import AssistantSettingsScreen from '@/screens/assistant/AssistantSettingsScreen';

// Scripts
import ScriptGenerationScreen from '@/screens/scripts/ScriptGenerationScreen';
import GeneratingScriptScreen from '@/screens/scripts/GeneratingScriptScreen';
import ScriptGeneratedScreen from '@/screens/scripts/ScriptGeneratedScreen';
import EditScriptScreen from '@/screens/scripts/EditScriptScreen';

// Gravação
import ChooseScriptScreen from '@/screens/recording/ChooseScriptScreen';
import TeleprompterSettingsScreen from '@/screens/recording/TeleprompterSettingsScreen';
import RecordingActiveScreen from '@/screens/recording/RecordingActiveScreen';
import VideoPreviewScreen from '@/screens/recording/VideoPreviewScreen';

// Edição
import VideoEditScreen from '@/screens/editing/VideoEditScreen';
import ProcessingVideoScreen from '@/screens/editing/ProcessingVideoScreen';
import VideoFinalPreviewScreen from '@/screens/editing/VideoFinalPreviewScreen';
import SubtitlesCustomizationScreen from '@/screens/editing/SubtitlesCustomizationScreen';

const Stack = createNativeStackNavigator();

export default function AssistantStack() {
  return (
    <Stack.Navigator>
      {/* Tela principal */}
      <Stack.Screen 
        name="Assistant" 
        component={AssistantScreen}
        options={{ title: 'Assistente IA' }}
      />
      <Stack.Screen name="ConversationHistory" component={ConversationHistoryScreen} />
      <Stack.Screen name="AssistantSettings" component={AssistantSettingsScreen} />
      
      {/* Scripts */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="ScriptGeneration" component={ScriptGenerationScreen} />
      </Stack.Group>
      <Stack.Screen name="GeneratingScript" component={GeneratingScriptScreen} />
      <Stack.Screen name="ScriptGenerated" component={ScriptGeneratedScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="EditScript" component={EditScriptScreen} />
      </Stack.Group>
      
      {/* Gravação */}
      <Stack.Screen name="ChooseScript" component={ChooseScriptScreen} />
      <Stack.Screen name="TeleprompterSettings" component={TeleprompterSettingsScreen} />
      <Stack.Screen 
        name="RecordingActive" 
        component={RecordingActiveScreen}
        options={{ presentation: 'fullScreenModal' }}
      />
      <Stack.Screen name="VideoPreview" component={VideoPreviewScreen} />
      
      {/* Edição */}
      <Stack.Screen name="VideoEdit" component={VideoEditScreen} />
      <Stack.Screen name="ProcessingVideo" component={ProcessingVideoScreen} />
      <Stack.Screen name="VideoFinalPreview" component={VideoFinalPreviewScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="SubtitlesCustomization" component={SubtitlesCustomizationScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
```

#### LibraryStack.tsx

```typescript
// src/navigation/LibraryStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Biblioteca
import LibraryScreen from '@/screens/library/LibraryScreen';
import SavedScriptsScreen from '@/screens/library/SavedScriptsScreen';
import SavedVideosScreen from '@/screens/library/SavedVideosScreen';
import SavedCarouselsScreen from '@/screens/library/SavedCarouselsScreen';

// Carrosséis
import CarouselGenerationScreen from '@/screens/carousels/CarouselGenerationScreen';
import GeneratingCarouselScreen from '@/screens/carousels/GeneratingCarouselScreen';
import CarouselPreviewScreen from '@/screens/carousels/CarouselPreviewScreen';
import EditSlideScreen from '@/screens/carousels/EditSlideScreen';

// Publicação
import SelectNetworksScreen from '@/screens/posting/SelectNetworksScreen';
import CaptionHashtagsScreen from '@/screens/posting/CaptionHashtagsScreen';
import SchedulePostScreen from '@/screens/posting/SchedulePostScreen';
import PostConfirmationScreen from '@/screens/posting/PostConfirmationScreen';
import ScheduledPostsScreen from '@/screens/posting/ScheduledPostsScreen';

const Stack = createNativeStackNavigator();

export default function LibraryStack() {
  return (
    <Stack.Navigator>
      {/* Tela principal */}
      <Stack.Screen 
        name="Library" 
        component={LibraryScreen}
        options={{ title: 'Biblioteca' }}
      />
      <Stack.Screen name="SavedScripts" component={SavedScriptsScreen} />
      <Stack.Screen name="SavedVideos" component={SavedVideosScreen} />
      <Stack.Screen name="SavedCarousels" component={SavedCarouselsScreen} />
      
      {/* Carrosséis */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="CarouselGeneration" component={CarouselGenerationScreen} />
      </Stack.Group>
      <Stack.Screen name="GeneratingCarousel" component={GeneratingCarouselScreen} />
      <Stack.Screen name="CarouselPreview" component={CarouselPreviewScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="EditSlide" component={EditSlideScreen} />
      </Stack.Group>
      
      {/* Publicação */}
      <Stack.Screen name="SelectNetworks" component={SelectNetworksScreen} />
      <Stack.Screen name="CaptionHashtags" component={CaptionHashtagsScreen} />
      <Stack.Screen name="SchedulePost" component={SchedulePostScreen} />
      <Stack.Screen name="PostConfirmation" component={PostConfirmationScreen} />
      <Stack.Screen name="ScheduledPosts" component={ScheduledPostsScreen} />
    </Stack.Navigator>
  );
}
```

#### SettingsStack.tsx

```typescript
// src/navigation/SettingsStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Configurações
import SettingsScreen from '@/screens/settings/SettingsScreen';
import ProfileScreen from '@/screens/settings/ProfileScreen';
import BusinessDNASettingsScreen from '@/screens/settings/BusinessDNASettingsScreen';
import BusinessDNAEditScreen from '@/screens/settings/BusinessDNAEditScreen';
import SocialAccountsScreen from '@/screens/settings/SocialAccountsScreen';
import BrandAssetsScreen from '@/screens/settings/BrandAssetsScreen';
import UploadAssetScreen from '@/screens/settings/UploadAssetScreen';
import ConfigureAssetScreen from '@/screens/settings/ConfigureAssetScreen';
import NotificationsSettingsScreen from '@/screens/settings/NotificationsSettingsScreen';
import IntegrationsScreen from '@/screens/settings/IntegrationsScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator>
      {/* Tela principal */}
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Configurações' }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="BusinessDNASettings" component={BusinessDNASettingsScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="BusinessDNAEdit" component={BusinessDNAEditScreen} />
      </Stack.Group>
      <Stack.Screen name="SocialAccounts" component={SocialAccountsScreen} />
      <Stack.Screen name="BrandAssets" component={BrandAssetsScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="UploadAsset" component={UploadAssetScreen} />
        <Stack.Screen name="ConfigureAsset" component={ConfigureAssetScreen} />
      </Stack.Group>
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} />
      <Stack.Screen name="Integrations" component={IntegrationsScreen} />
    </Stack.Navigator>
  );
}
```

### Resumo da Navegação

| Stack | Telas | Modais | Fullscreen |
|---|---|---|---|
| AuthStack | 11 | 0 | 0 |
| AssistantStack | 12 | 3 | 1 |
| LibraryStack | 10 | 2 | 0 |
| SettingsStack | 7 | 3 | 0 |
| Modais Globais | 3 | 3 | 0 |
| **TOTAL** | **43** | **11** | **1** |

**Total de telas:** 51 telas (43 regulares + 2 loading states)

---

## 🗄️ GERENCIAMENTO DE ESTADO

### Zustand (Estado Global)

```typescript
// src/store/authStore.ts
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    const response = await authService.login(email, password);
    
    // Tokens em SecureStore (criptografado)
    await SecureStore.setItemAsync('access_token', response.access_token);
    await SecureStore.setItemAsync('refresh_token', response.refresh_token);
    
    // User data em AsyncStorage (não sensível)
    await AsyncStorage.setItem('user', JSON.stringify(response.user));
    
    set({
      user: response.user,
      isAuthenticated: true,
    });
  },
  
  logout: async () => {
    // Remove tokens do SecureStore
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    
    // Remove user data do AsyncStorage
    await AsyncStorage.removeItem('user');
    
    set({
      user: null,
      isAuthenticated: false,
    });
  },
  
  loadAuth: async () => {
    // Carrega user data do AsyncStorage
    const userJson = await AsyncStorage.getItem('user');
    const accessToken = await SecureStore.getItemAsync('access_token');
    
    if (userJson && accessToken) {
      set({
        user: JSON.parse(userJson),
        isAuthenticated: true,
      });
    }
  },
}));
```

```typescript
// src/store/assistantStore.ts
import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode: 'voice' | 'text';
  timestamp: Date;
}

interface AssistantState {
  messages: Message[];
  isListening: boolean;
  isSpeaking: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setListening: (listening: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  messages: [],
  isListening: false,
  isSpeaking: false,
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Math.random().toString(36),
      timestamp: new Date(),
    }],
  })),
  
  clearMessages: () => set({ messages: [] }),
  setListening: (listening) => set({ isListening: listening }),
  setSpeaking: (speaking) => set({ isSpeaking: speaking }),
}));
```

### React Query (Cache de Servidor)

```typescript
// src/hooks/useScripts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scriptsService } from '@/services/scripts';

export function useScripts() {
  return useQuery({
    queryKey: ['scripts'],
    queryFn: scriptsService.list,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useGenerateScript() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (topic: string) => scriptsService.generate(topic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scripts'] });
    },
  });
}
```

---

## 🎤 ASSISTENTE IA HÍBRIDO (VOZ + TEXTO)

### Componente Principal

```typescript
// src/screens/assistant/AssistantScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useAssistantStore } from '@/store/assistantStore';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import ChatBubble from '@/components/assistant/ChatBubble';
import VoiceButton from '@/components/assistant/VoiceButton';
import TextInput from '@/components/assistant/TextInput';

export default function AssistantScreen() {
  const { messages, addMessage, isListening, isSpeaking } = useAssistantStore();
  const [inputText, setInputText] = useState('');
  
  const { startListening, stopListening } = useVoiceRecognition({
    onResult: (text) => handleUserMessage(text, 'voice'),
  });
  
  const { speak } = useTextToSpeech();
  
  const handleUserMessage = async (content: string, mode: 'voice' | 'text') => {
    // Adiciona mensagem do usuário
    addMessage({ role: 'user', content, mode });
    
    // Envia para API
    const response = await assistantService.sendMessage(content);
    
    // Adiciona resposta do assistente
    addMessage({ role: 'assistant', content: response.text, mode: 'text' });
    
    // Fala a resposta (se usuário usou voz)
    if (mode === 'voice') {
      speak(response.text);
    }
  };
  
  const handleVoicePress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const handleTextSubmit = () => {
    if (inputText.trim()) {
      handleUserMessage(inputText, 'text');
      setInputText('');
    }
  };
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </ScrollView>
      
      <View style={{ flexDirection: 'row', padding: 16, gap: 8 }}>
        <VoiceButton
          isListening={isListening}
          onPress={handleVoicePress}
        />
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          onSubmit={handleTextSubmit}
          placeholder="Digite ou fale..."
        />
      </View>
    </KeyboardAvoidingView>
  );
}
```

### Hook de Reconhecimento de Voz

```typescript
// src/hooks/useVoiceRecognition.ts
import { useEffect } from 'react';
import Voice from '@react-native-voice/voice';
import { useAssistantStore } from '@/store/assistantStore';

interface UseVoiceRecognitionProps {
  onResult: (text: string) => void;
}

export function useVoiceRecognition({ onResult }: UseVoiceRecognitionProps) {
  const { setListening } = useAssistantStore();
  
  useEffect(() => {
    Voice.onSpeechStart = () => setListening(true);
    Voice.onSpeechEnd = () => setListening(false);
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value[0]) {
        onResult(e.value[0]);
      }
    };
    
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  
  const startListening = async () => {
    try {
      await Voice.start('pt-BR');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };
  
  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };
  
  return { startListening, stopListening };
}
```

### Hook de Síntese de Voz

```typescript
// src/hooks/useTextToSpeech.ts
import * as Speech from 'expo-speech';
import { useAssistantStore } from '@/store/assistantStore';

export function useTextToSpeech() {
  const { setSpeaking } = useAssistantStore();
  
  const speak = async (text: string) => {
    setSpeaking(true);
    
    await Speech.speak(text, {
      language: 'pt-BR',
      pitch: 1.0,
      rate: 0.9,
      onDone: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };
  
  const stop = () => {
    Speech.stop();
    setSpeaking(false);
  };
  
  return { speak, stop };
}
```


---

## 🧩 COMPONENTES REUTILIZÁVEIS

### Componentes Base (UI)

#### Button

```typescript
// src/components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ];
  
  const textStyle = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : Colors.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: Typography.fontSize.base,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: Colors.primary,
  },
});
```

#### Card

```typescript
// src/components/ui/Card.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

export default function Card({ children, style, elevated = true }: CardProps) {
  return (
    <View style={[styles.card, elevated && styles.elevated, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
```

#### Input

```typescript
// src/components/ui/Input.tsx
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  error?: string;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  error,
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, multiline && styles.multiline, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textDisabled}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    fontSize: Typography.fontSize.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});
```

### Componentes do Assistente

#### VoiceButton

```typescript
// src/components/assistant/VoiceButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme';

interface VoiceButtonProps {
  isListening: boolean;
  onPress: () => void;
}

export default function VoiceButton({ isListening, onPress }: VoiceButtonProps) {
  const scale = React.useRef(new Animated.Value(1)).current;
  
  React.useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scale.setValue(1);
    }
  }, [isListening]);
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.button,
          isListening && styles.listening,
          { transform: [{ scale }] },
        ]}
      >
        <Ionicons
          name={isListening ? 'mic' : 'mic-outline'}
          size={28}
          color="#FFFFFF"
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  listening: {
    backgroundColor: Colors.error,
  },
});
```

#### ChatBubble

```typescript
// src/components/assistant/ChatBubble.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/theme';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  mode: 'voice' | 'text';
}

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <View style={[styles.container, isUser && styles.userContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={[styles.text, isUser && styles.userText]}>
          {message.content}
        </Text>
        {message.mode === 'voice' && (
          <Ionicons
            name="mic"
            size={12}
            color={isUser ? '#FFFFFF' : Colors.textSecondary}
            style={styles.icon}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
    alignItems: 'flex-start',
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.lg,
  },
  assistantBubble: {
    backgroundColor: Colors.surface,
  },
  userBubble: {
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  icon: {
    marginTop: Spacing.xs,
  },
});
```

### Componentes de Vídeo

#### VideoPlayer

```typescript
// src/components/video/VideoPlayer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface VideoPlayerProps {
  uri: string;
  onPlaybackStatusUpdate?: (status: any) => void;
}

export default function VideoPlayer({ uri, onPlaybackStatusUpdate }: VideoPlayerProps) {
  const videoRef = React.useRef<Video>(null);
  
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 9 / 16,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
```

#### TeleprompterView

```typescript
// src/components/teleprompter/TeleprompterView.tsx
import React, { useRef, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing, Typography } from '@/theme';

interface TeleprompterViewProps {
  text: string;
  scrollSpeed: number; // pixels por segundo
  isScrolling: boolean;
  fontSize: number;
}

export default function TeleprompterView({
  text,
  scrollSpeed,
  isScrolling,
  fontSize,
}: TeleprompterViewProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (isScrolling) {
      // Scroll automático
      const interval = setInterval(() => {
        scrollViewRef.current?.scrollTo({
          y: scrollY._value + scrollSpeed / 60,
          animated: true,
        });
      }, 16); // 60 FPS
      
      return () => clearInterval(interval);
    }
  }, [isScrolling, scrollSpeed]);
  
  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
    >
      <Text style={[styles.text, { fontSize }]}>
        {text}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    padding: Spacing.xl,
    paddingTop: 100,
    paddingBottom: 200,
  },
  text: {
    color: '#FFFFFF',
    lineHeight: 1.8,
    textAlign: 'center',
  },
});
```

---

## 🎨 DESIGN SYSTEM

### Cores

```typescript
// src/theme/colors.ts
export const Colors = {
  // Primary
  primary: '#6200EE',
  primaryLight: '#7F39FB',
  primaryDark: '#5300CC',
  
  // Secondary
  secondary: '#03DAC6',
  secondaryLight: '#66FFF9',
  secondaryDark: '#00A896',
  
  // Functional
  success: '#00C853',
  error: '#B00020',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Neutral
  background: '#FFFFFF',
  surface: '#F5F5F5',
  border: '#E0E0E0',
  
  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
};
```

### Tipografia

```typescript
// src/theme/typography.ts
export const Typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xxl: 28,
    xl: 24,
    lg: 20,
    base: 16,
    sm: 14,
    xs: 12,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};
```

### Espaçamento

```typescript
// src/theme/spacing.ts
export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  base: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};
```

### Border Radius

```typescript
// src/theme/borderRadius.ts
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
```

---

## 📱 OFFLINE-FIRST

### Estratégia de Cache

1. **Scripts:** Cache local com AsyncStorage
2. **Vídeos:** Apenas metadados em cache (vídeos são grandes)
3. **Posts:** Cache de posts agendados
4. **Business DNA:** Sempre em cache (essencial)

### Implementação

```typescript
// src/services/api.ts
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Interceptor para adicionar token (lê de SecureStore)
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh token automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Se 401 e não é retry, tenta refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
            { refresh_token: refreshToken }
          );
          
          // Salva novos tokens
          await SecureStore.setItemAsync('access_token', response.data.access_token);
          await SecureStore.setItemAsync('refresh_token', response.data.refresh_token);
          
          // Retry request original
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh falhou, faz logout
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        // Redireciona para login (via navigation)
        return Promise.reject(refreshError);
      }
    }
    
    // Detectar offline
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      // Adiciona à fila de sincronização
      await addToSyncQueue(error.config);
      throw new Error('Sem conexão. Operação será sincronizada quando voltar online.');
    }
    
    throw error;
  }
);

export default api;
```

---

## 🔒 SEGURANÇA

### Armazenamento Seguro vs AsyncStorage

**REGRA CRÍTICA:** Tokens e dados sensíveis SEMPRE em SecureStore, dados não sensíveis em AsyncStorage.

```typescript
// src/services/storage.ts
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ CORRETO: Dados sensíveis em SecureStore
export const secureStorage = {
  async setToken(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },
  
  async getToken(key: string) {
    return await SecureStore.getItemAsync(key);
  },
  
  async removeToken(key: string) {
    await SecureStore.deleteItemAsync(key);
  },
};

// ✅ CORRETO: Dados não sensíveis em AsyncStorage
export const localStorage = {
  async setPreferences(preferences: object) {
    await AsyncStorage.setItem('preferences', JSON.stringify(preferences));
  },
  
  async getPreferences() {
    const data = await AsyncStorage.getItem('preferences');
    return data ? JSON.parse(data) : null;
  },
  
  async setCachedData(key: string, data: any) {
    await AsyncStorage.setItem(`cache_${key}`, JSON.stringify(data));
  },
};
```

### O que vai em cada storage?

| Dado | Storage | Motivo |
|---|---|---|
| access_token | SecureStore | Credencial de autenticação |
| refresh_token | SecureStore | Credencial de autenticação |
| user.id, user.email | AsyncStorage | Não sensível (já público) |
| preferences | AsyncStorage | Não sensível |
| cached_scripts | AsyncStorage | Não sensível |
| cached_videos | AsyncStorage | Não sensível |

### Validação de Input

```typescript
// src/utils/validation.ts
export const validation = {
  email: (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  password: (password: string) => {
    return password.length >= 8;
  },
  
  sanitizeInput: (input: string) => {
    return input.trim().replace(/[<>]/g, '');
  },
};
```

---

## 🚀 PERFORMANCE

### Otimizações

1. **Lazy Loading:** Componentes carregados sob demanda
2. **Memoização:** React.memo para componentes pesados
3. **Virtualização:** FlatList para listas longas
4. **Imagens:** expo-image com cache automático
5. **Animações:** Reanimated (thread nativo)

### Exemplo de Otimização

```typescript
// src/screens/scripts/SavedScriptsScreen.tsx
import React, { memo } from 'react';
import { FlatList } from 'react-native';
import { useScripts } from '@/hooks/useScripts';
import ScriptCard from '@/components/scripts/ScriptCard';

const ScriptCardMemo = memo(ScriptCard);

export default function SavedScriptsScreen() {
  const { data: scripts, isLoading } = useScripts();
  
  return (
    <FlatList
      data={scripts}
      renderItem={({ item }) => <ScriptCardMemo script={item} />}
      keyExtractor={(item) => item.id}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
}
```

---

## 📦 BUILD E DEPLOY

### Configuração EAS

```json
// eas.json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "contato@renum.com.br",
        "ascAppId": "XXXXXXXXXX",
        "appleTeamId": "XXXXXXXXXX"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### Scripts de Build

```json
// package.json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:ios": "eas build --platform ios --profile production",
    "build:android": "eas build --platform android --profile production",
    "submit:ios": "eas submit --platform ios",
    "submit:android": "eas submit --platform android"
  }
}
```

---

## 📚 REFERÊNCIAS

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/latest)
- [Material Design 3](https://m3.material.io/)

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ COMPLETO
