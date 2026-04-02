# Implementation Plan: Fase 2 - Conversão para React Native

## Visão Geral

Este plano de implementação converte as 51 telas HTML/CSS do Stitch para um aplicativo mobile funcional usando React Native + Expo. A implementação está organizada em 15 ciclos incrementais, cada um entregando funcionalidades completas e testáveis.

**Contexto:**
- Spec Type: Feature (New Feature)
- Workflow: Requirements-First
- Total de Telas: 51 telas (4 Auth + 4 Onboarding + 16 Assistant + 3 Library + 9 Settings + 3 Analytics + 4 Carousels + 5 Publication + 2 Modais + Assets)
- Linguagem: TypeScript
- Framework: React Native 0.73+ com Expo 50+

**Documentos de Referência:**
- `.kiro/specs/fase-2-conversao-react-native/requirements.md` - 20 requirements
- `.kiro/specs/fase-2-conversao-react-native/design.md` - Arquitetura completa
- `stitch-output/DESIGN.md` - Design System (100+ tokens)
- `stitch-output/COMPONENTS.md` - 35+ componentes
- `stitch-output/NAVIGATION.md` - Navegação completa

**Princípios de Implementação:**
- Cada task constrói sobre as anteriores
- Tasks marcadas com `*` são opcionais (podem ser puladas)
- Checkpoints garantem validação incremental
- Todas as tasks referenciam requirements específicos

---

## Tasks

### CICLO 1: Fundação - Setup e Design System

- [x] 1. Setup do projeto Expo com TypeScript
  - Criar novo projeto Expo usando template TypeScript: `npx create-expo-app influency-mobile --template`
  - Instalar dependências essenciais: React Native Paper, React Navigation, Zustand, React Query, Axios
  - Configurar `app.json` com nome, slug, versão, orientação (portrait), splash screen
  - Configurar `tsconfig.json` com strict mode, paths aliases (@/components, @/hooks, etc.)
  - Criar estrutura de pastas: `src/components`, `src/hooks`, `src/services`, `src/store`, `src/theme`, `src/types`, `src/utils`
  - Configurar Expo Router para navegação file-based
  - Adicionar scripts no `package.json`: dev, build, test, lint
  - Executar `npx expo start` para validar setup
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_


- [x] 2. Implementar Design System completo
  - Criar `src/theme/colors.ts` com todas as cores de `stitch-output/DESIGN.md` (primary, secondary, semantic, neutral)
  - Criar `src/theme/typography.ts` com escala tipográfica completa (Display, Headline, Title, Body, Label)
  - Criar `src/theme/spacing.ts` com escala baseada em múltiplos de 8px (4, 8, 12, 16, 24, 32, 40, 48, 64)
  - Criar `src/theme/borderRadius.ts` com valores (xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 9999)
  - Criar `src/theme/shadows.ts` com elevações 0dp-5dp para iOS (shadowColor, shadowOffset, shadowOpacity, shadowRadius) e Android (elevation)
  - Criar `src/theme/index.ts` exportando todos os tokens consolidados
  - Configurar React Native Paper theme em `app/_layout.tsx` com cores customizadas
  - Validar que todos os tokens correspondem exatamente ao `stitch-output/DESIGN.md`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [x] 3. Configurar ferramentas de qualidade
  - Instalar e configurar ESLint com regras TypeScript e React Native
  - Instalar e configurar Prettier com formatação consistente
  - Instalar e configurar Jest para testes unitários
  - Instalar React Native Testing Library
  - Criar arquivo `.eslintrc.js` com regras do projeto
  - Criar arquivo `.prettierrc` com configurações de formatação
  - Criar arquivo `jest.config.js` com setup de testes
  - Adicionar scripts `lint`, `format`, `test` no `package.json`
  - _Requirements: 1.8, 20.3_

- [x] 4. Checkpoint - Validar fundação
  - Executar `npm run lint` e garantir 0 erros
  - Executar `npm run test` e garantir todos os testes passam
  - Executar `npx expo start` e validar que o app abre sem erros
  - Perguntar ao usuário se há dúvidas ou ajustes necessários

---

### CICLO 2: Fundação - Componentes Base (Átomos)

- [-] 5. Implementar componentes base - Parte 1
  - [x] 5.1 Criar componente Button
    - Criar `src/components/atoms/Button.tsx` com interface ButtonProps (variant, size, disabled, loading, icon, onPress, children)
    - Implementar variantes: primary, secondary, outline, text, icon
    - Implementar tamanhos: small (32px), medium (40px), large (48px)
    - Aplicar cores do Design System
    - Adicionar accessibilityLabel e accessibilityRole="button"
    - Garantir touch target mínimo de 48x48px
    - _Requirements: 3.1, 3.8, 3.9, 3.10, 18.1, 18.3_
  
  - [ ]* 5.2 Escrever testes para Button
    - Criar `src/components/atoms/Button.test.tsx`
    - Testar renderização de cada variante
    - Testar callback onPress
    - Testar estado disabled (não chama onPress)
    - Testar estado loading (exibe spinner)
    - Testar snapshot visual
    - _Requirements: 20.1, 20.5, 20.6_


  - [x] 5.3 Criar componente Input
    - Criar `src/components/atoms/Input.tsx` com interface InputProps (type, placeholder, value, onChangeText, error, disabled, icon, maxLength, rows)
    - Implementar tipos: text, password, email, multiline
    - Adicionar label associado ao input
    - Exibir mensagem de erro abaixo do input quando `error` está presente
    - Aplicar estilos do Design System
    - Adicionar accessibilityLabel e accessibilityHint
    - _Requirements: 3.2, 3.8, 3.9, 3.10, 18.1, 18.4_
  
  - [ ]* 5.4 Escrever testes para Input
    - Criar `src/components/atoms/Input.test.tsx`
    - Testar renderização de cada tipo
    - Testar callback onChangeText
    - Testar exibição de erro
    - Testar estado disabled
    - Testar snapshot visual
    - _Requirements: 20.1, 20.5, 20.6_

  - [x] 5.5 Criar componente Card
    - Criar `src/components/atoms/Card.tsx` com interface CardProps (variant, padding, onPress, children)
    - Implementar variantes: elevated (sombra), outlined (borda), filled (background)
    - Aplicar elevações do Design System (elevated usa elevation 2dp)
    - Aplicar border radius do Design System (md: 12px)
    - Adicionar accessibilityRole quando onPress está presente
    - _Requirements: 3.3, 3.8, 3.9, 3.10, 18.1_
  
  - [ ]* 5.6 Escrever testes para Card
    - Criar `src/components/atoms/Card.test.tsx`
    - Testar renderização de cada variante
    - Testar callback onPress (quando presente)
    - Testar snapshot visual
    - _Requirements: 20.1, 20.5, 20.6_

- [x] 6. Implementar componentes base - Parte 2
  - [x] 6.1 Criar componente Chip
    - Criar `src/components/atoms/Chip.tsx` com interface ChipProps (label, selected, onPress, icon, onClose)
    - Implementar estados: default, selected
    - Aplicar cores do Design System (selected usa primary color)
    - Adicionar accessibilityLabel e accessibilityState
    - _Requirements: 3.4, 3.8, 3.9, 3.10, 18.1_
  
  - [x] 6.2 Criar componente Badge
    - Criar `src/components/atoms/Badge.tsx` com interface BadgeProps (count, max, variant)
    - Implementar variantes: default, dot
    - Limitar contagem ao máximo (ex: 99+)
    - Aplicar cores do Design System
    - Adicionar accessibilityLabel descritivo
    - _Requirements: 3.5, 3.8, 3.9, 3.10, 18.1_
  
  - [x] 6.3 Criar componente Avatar
    - Criar `src/components/atoms/Avatar.tsx` com interface AvatarProps (source, size, fallback)
    - Implementar tamanhos: small (32px), medium (40px), large (56px)
    - Exibir fallback (iniciais) quando imagem não carrega
    - Aplicar border radius circular (full)
    - Adicionar accessibilityLabel
    - _Requirements: 3.8, 3.9, 3.10, 18.1_


- [x] 7. Implementar componentes base - Parte 3
  - [x] 7.1 Criar componente Loading
    - Criar `src/components/atoms/Loading.tsx` com interface LoadingProps (size, color)
    - Usar ActivityIndicator do React Native
    - Aplicar cores do Design System
    - Adicionar accessibilityLabel="Carregando"
    - _Requirements: 3.6, 3.8, 3.9, 3.10, 18.1_
  
  - [x] 7.2 Criar componente ProgressBar
    - Criar `src/components/atoms/ProgressBar.tsx` com interface ProgressBarProps (progress, animated)
    - Implementar animação suave com React Native Reanimated
    - Aplicar cores do Design System
    - Adicionar accessibilityLabel com porcentagem
    - _Requirements: 3.7, 3.8, 3.9, 3.10, 18.1_
  
  - [x] 7.3 Criar componentes auxiliares
    - Criar `src/components/atoms/Switch.tsx` (toggle on/off)
    - Criar `src/components/atoms/Checkbox.tsx` (seleção múltipla)
    - Criar `src/components/atoms/Radio.tsx` (seleção única)
    - Criar `src/components/atoms/Slider.tsx` (valor numérico)
    - Criar `src/components/atoms/Divider.tsx` (separador visual)
    - Aplicar Design System em todos
    - Adicionar accessibilityLabel em todos
    - _Requirements: 3.8, 3.9, 3.10, 18.1_

- [x] 8. Checkpoint - Validar componentes base
  - Executar `npm run test` e garantir todos os testes de componentes passam
  - Criar tela de exemplo mostrando todos os 14 átomos
  - Validar visualmente cada componente no simulador iOS e Android
  - Testar acessibilidade com VoiceOver (iOS) e TalkBack (Android)
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 3: Fundação - Navegação

- [x] 9. Implementar estrutura de navegação
  - [x] 9.1 Criar RootNavigator
    - Criar `app/_layout.tsx` como root layout
    - Configurar Stack Navigator com Expo Router
    - Implementar lógica de navegação condicional baseada em autenticação
    - Configurar deep links: `influency://auth/login`, `influency://assistant`, etc.
    - _Requirements: 4.1, 4.10, 4.11, 4.13_
  
  - [x] 9.2 Criar AuthStack
    - Criar `app/(auth)/_layout.tsx` para AuthStack
    - Criar `app/(auth)/splash.tsx` (tela de splash com logo animado)
    - Criar `app/(auth)/login.tsx` (tela de login)
    - Criar `app/(auth)/register.tsx` (tela de cadastro)
    - Criar `app/(auth)/forgot-password.tsx` (tela de recuperação de senha)
    - _Requirements: 4.2, 5.1, 5.7, 5.10_
  
  - [x] 9.3 Criar OnboardingStack
    - Criar `app/(onboarding)/_layout.tsx` para OnboardingStack
    - Criar `app/(onboarding)/welcome.tsx` (tela de boas-vindas)
    - Criar `app/(onboarding)/business-dna.tsx` (5 perguntas sequenciais)
    - Criar `app/(onboarding)/connect-social.tsx` (conectar redes sociais)
    - Criar `app/(onboarding)/complete.tsx` (onboarding completo)
    - _Requirements: 4.3, 6.1, 6.5, 6.6, 6.9, 6.10_


  - [x] 9.4 Criar MainTabs (Bottom Tabs)
    - Criar `app/(tabs)/_layout.tsx` para Bottom Tabs Navigator
    - Configurar 3 tabs: AssistantTab, LibraryTab, SettingsTab
    - Adicionar ícones Lucide para cada tab
    - Aplicar cores do Design System
    - Configurar labels e accessibilityLabels
    - _Requirements: 4.4, 4.12_
  
  - [x] 9.5 Criar estrutura do AssistantStack
    - Criar `app/(tabs)/assistant/_layout.tsx` para AssistantStack
    - Criar placeholders para 16 telas do AssistantStack
    - Configurar navegação entre telas
    - _Requirements: 4.5_
  
  - [x] 9.6 Criar estrutura do LibraryStack e SettingsStack
    - Criar `app/(tabs)/library/_layout.tsx` para LibraryStack
    - Criar placeholders para 3 telas do LibraryStack
    - Criar `app/(tabs)/settings/_layout.tsx` para SettingsStack
    - Criar placeholders para 9 telas do SettingsStack
    - _Requirements: 4.6, 4.7_
  
  - [x] 9.7 Criar AnalyticsStack e Modais Globais
    - Criar `app/analytics/_layout.tsx` para AnalyticsStack
    - Criar placeholders para 3 telas do AnalyticsStack
    - Criar `app/modals/script-generation.tsx` (modal de geração de roteiro)
    - Criar `app/modals/edit-script.tsx` (modal de edição de roteiro)
    - _Requirements: 4.8, 4.9_

- [x] 10. Checkpoint - Validar navegação
  - Testar navegação entre todas as stacks
  - Validar que AuthStack aparece quando não autenticado
  - Validar que MainStack aparece quando autenticado
  - Testar deep links em todas as rotas
  - Validar preservação de estado ao navegar
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 4: Autenticação

- [x] 11. Implementar AuthStore com Zustand
  - Criar `src/store/authStore.ts` com interface AuthState
  - Implementar métodos: login, register, logout, loadAuth, updateProfile
  - Implementar persistência de tokens no SecureStore (access_token, refresh_token)
  - Implementar persistência de dados do usuário no AsyncStorage (id, email, name)
  - Implementar lógica de restauração de autenticação ao abrir o app
  - Implementar limpeza de stores no logout
  - _Requirements: 17.1, 17.2, 17.3, 17.9, 17.10_

- [x] 12. Implementar telas de autenticação
  - [x] 12.1 Implementar LoginScreen
    - Adicionar inputs de email e senha usando componente Input
    - Adicionar validação de formato de email (regex)
    - Exibir mensagens de erro quando validação falhar
    - Adicionar botão "Entrar" que chama authStore.login()
    - Adicionar links para "Esqueci minha senha" e "Criar conta"
    - Navegar para OnboardingStack (primeira vez) ou MainStack (usuário existente) após login
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  
  - [x] 12.2 Implementar RegisterScreen
    - Adicionar inputs de nome, email, senha e confirmação de senha
    - Validar que senha e confirmação são iguais
    - Adicionar botão "Criar conta" que chama authStore.register()
    - Navegar para OnboardingStack após cadastro bem-sucedido
    - _Requirements: 5.7, 5.8, 5.9_
  
  - [x] 12.3 Implementar ForgotPasswordScreen
    - Adicionar input de email
    - Adicionar botão "Enviar link"
    - Exibir mensagem de confirmação após envio
    - _Requirements: 5.10, 5.11_


- [x] 13. Implementar validação de formulários
  - Criar `src/utils/validation.ts` com funções de validação
  - Implementar validateEmail() usando regex
  - Implementar validatePassword() (mínimo 8 caracteres)
  - Implementar validateRequired() para campos obrigatórios
  - Integrar validações com React Hook Form
  - Criar schemas Zod para cada formulário
  - _Requirements: 5.2, 5.3, 5.8_

- [x] 14. Checkpoint - Validar autenticação
  - Testar fluxo completo de cadastro → login → logout
  - Validar que tokens são salvos no SecureStore
  - Validar que dados do usuário são salvos no AsyncStorage
  - Validar que autenticação é restaurada ao reabrir o app
  - Validar que logout limpa todos os dados
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 5: Onboarding

- [x] 15. Implementar fluxo de Business DNA
  - [x] 15.1 Implementar BusinessDNAScreen
    - Criar componente com 5 perguntas sequenciais
    - Implementar progress bar mostrando pergunta atual (1/5, 2/5, etc.)
    - Adicionar input híbrido (voz + texto) para cada resposta
    - Adicionar botões "Voltar" e "Próximo" para navegação
    - Salvar respostas no AsyncStorage
    - Navegar para ConnectSocialNetworksScreen após última pergunta
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 15.2 Implementar ConnectSocialNetworksScreen
    - Exibir cards de redes sociais (Instagram, TikTok, Facebook)
    - Adicionar botões de conexão OAuth para cada rede (preparação para integração futura)
    - Adicionar botão "Pular por enquanto"
    - Navegar para OnboardingCompleteScreen após conectar ou pular
    - _Requirements: 6.6, 6.7, 6.8, 6.9_
  
  - [x] 15.3 Implementar OnboardingCompleteScreen
    - Exibir mensagem de sucesso com animação
    - Exibir botão "Começar a Criar"
    - Navegar para MainStack (AssistantTab) ao clicar
    - _Requirements: 6.10, 6.11_

- [x] 16. Checkpoint - Validar onboarding
  - Testar fluxo completo de onboarding (5 perguntas → conectar redes → completo)
  - Validar que progress bar atualiza corretamente
  - Validar que respostas são salvas no AsyncStorage
  - Validar navegação para MainStack após conclusão
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 6: Assistente IA - Chat Híbrido

- [x] 17. Implementar hooks de voz
  - [x] 17.1 Criar useAudioRecording hook
    - Criar `src/hooks/useAudioRecording.ts`
    - Implementar startRecording() usando @siteed/expo-audio-studio
    - Implementar stopRecording() e retornar transcrição
    - Implementar estado isRecording
    - Implementar callback onResult com texto transcrito
    - Adicionar tratamento de erros (permissão negada, erro de gravação)
    - _Requirements: 7.4, 7.5, 7.6_
  
  - [ ]* 17.2 Escrever testes para useAudioRecording
    - Criar `src/hooks/useAudioRecording.test.ts`
    - Testar startRecording() altera isRecording para true
    - Testar stopRecording() altera isRecording para false
    - Testar callback onResult é chamado com texto
    - _Requirements: 20.2, 20.5, 20.6_


  - [x] 17.3 Criar useTextToSpeech hook
    - Criar `src/hooks/useTextToSpeech.ts`
    - Implementar speak(text: string) usando expo-speech
    - Implementar stop() para parar reprodução
    - Implementar estado isSpeaking
    - Implementar callback onDone quando termina de falar
    - Adicionar tratamento de erros
    - _Requirements: 7.9_
  
  - [ ]* 17.4 Escrever testes para useTextToSpeech
    - Criar `src/hooks/useTextToSpeech.test.ts`
    - Testar speak() altera isSpeaking para true
    - Testar callback onDone é chamado
    - _Requirements: 20.2, 20.5, 20.6_

- [x] 18. Implementar componentes de chat
  - [x] 18.1 Criar componente ChatBubble
    - Criar `src/components/molecules/ChatBubble.tsx`
    - Implementar variantes: user (alinhado à direita, cor primary) e assistant (alinhado à esquerda, cor neutral)
    - Exibir avatar, mensagem e timestamp
    - Aplicar Design System
    - Adicionar accessibilityLabel
    - _Requirements: 7.1, 7.8_
  
  - [x] 18.2 Criar componente VoiceButton
    - Criar `src/components/molecules/VoiceButton.tsx`
    - Implementar animação pulsante quando recording=true
    - Aplicar cores do Design System
    - Adicionar accessibilityLabel e accessibilityHint
    - _Requirements: 7.2, 7.4_
  
  - [x] 18.3 Criar componente ChatInput
    - Criar `src/components/organisms/ChatInput.tsx`
    - Adicionar TextInput para digitação
    - Adicionar VoiceButton para gravação
    - Adicionar botão de envio
    - Implementar lógica de alternância entre voz e texto
    - Adicionar indicadores visuais de estado (ouvindo, processando, falando)
    - _Requirements: 7.3, 7.10, 7.11_

- [x] 19. Implementar AssistantStore
  - Criar `src/store/assistantStore.ts` com interface AssistantState
  - Implementar estado: messages, isListening, isSpeaking
  - Implementar métodos: addMessage, clearMessages, setListening, setSpeaking
  - _Requirements: 17.4_

- [x] 20. Implementar AssistantScreen
  - Criar `app/(tabs)/assistant/index.tsx`
  - Exibir histórico de mensagens usando FlatList com ChatBubble
  - Adicionar ChatInput na parte inferior
  - Integrar useAudioRecording e useTextToSpeech
  - Implementar lógica: SE usuário usou voz, ENTÃO reproduzir resposta em áudio (TTS)
  - Adicionar indicadores visuais de estado
  - Integrar com AssistantStore
  - _Requirements: 7.1, 7.2, 7.3, 7.7, 7.8, 7.9, 7.10, 7.11_

- [x] 21. Checkpoint - Validar assistente IA
  - Testar reconhecimento de voz (pressionar microfone → falar → transcrever)
  - Testar digitação de texto
  - Testar alternância entre voz e texto
  - Testar reprodução de resposta em áudio (TTS)
  - Validar indicadores visuais de estado
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 7: Assistente IA - Geração de Roteiros

- [x] 22. Implementar API Client e Services
  - [x] 22.1 Criar API Client com Axios
    - Criar `src/services/api.ts`
    - Configurar base URL usando variável de ambiente (EXPO_PUBLIC_API_URL)
    - Adicionar interceptor de request para adicionar token JWT no header Authorization
    - Adicionar interceptor de response para refresh automático de token em 401
    - Adicionar tratamento de erros global (NetworkError, ValidationError, ApiError)
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_


  - [x] 22.2 Criar Scripts Service
    - Criar `src/services/scripts.ts`
    - Implementar métodos: list(), generate(topic, duration), update(id, data), delete(id)
    - Definir tipos TypeScript para requests e responses
    - Adicionar tratamento de erros específico
    - _Requirements: 16.7, 16.11_

- [x] 23. Implementar ScriptStore
  - Criar `src/store/scriptStore.ts` com interface ScriptState
  - Implementar estado: scripts, currentScript
  - Implementar métodos: setCurrentScript, addScript, updateScript, deleteScript
  - _Requirements: 17.5_

- [x] 24. Implementar fluxo de geração de roteiros
  - [x] 24.1 Implementar ScriptGenerationModal
    - Criar `app/modals/script-generation.tsx`
    - Adicionar textarea "Sobre o que você quer falar?"
    - Adicionar slider de duração (30-300 segundos)
    - Adicionar card de dica com sugestões
    - Adicionar botão "Gerar Roteiro"
    - Navegar para GeneratingScriptScreen ao clicar
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [x] 24.2 Implementar GeneratingScriptScreen
    - Criar `app/(tabs)/assistant/generating-script.tsx`
    - Exibir animação de loading (Lottie ou ActivityIndicator)
    - Exibir texto "Gerando roteiro..."
    - Chamar scriptsService.generate() com topic e duration
    - Navegar para ScriptGeneratedScreen quando API retorna
    - _Requirements: 8.6, 8.7, 8.8_
  
  - [x] 24.3 Implementar ScriptGeneratedScreen
    - Criar `app/(tabs)/assistant/script-generated.tsx`
    - Exibir título e conteúdo do roteiro
    - Exibir word count e duração estimada
    - Adicionar botões "Editar", "Salvar" e "Usar para Gravar"
    - Implementar ações: Editar → EditScriptModal, Salvar → SavedScriptsScreen, Usar → TeleprompterSettingsScreen
    - _Requirements: 8.9, 8.10, 8.11, 8.12, 8.13, 8.14_
  
  - [x] 24.4 Implementar EditScriptModal
    - Criar `app/modals/edit-script.tsx`
    - Exibir textarea com conteúdo do roteiro
    - Adicionar botões "Cancelar" e "Salvar"
    - Chamar scriptsService.update() ao salvar
    - _Requirements: 8.12_

- [x] 25. Implementar SavedScriptsScreen
  - Criar `app/(tabs)/library/saved-scripts.tsx`
  - Exibir lista de roteiros salvos usando FlatList
  - Criar componente ScriptCard para cada roteiro (título, word count, data)
  - Adicionar FAB "Novo roteiro" que abre ScriptGenerationModal
  - Adicionar ações em cada roteiro: "Editar", "Usar para Gravar", "Excluir"
  - _Requirements: 13.2, 13.3, 13.4, 13.5_

- [x] 26. Checkpoint - Validar geração de roteiros
  - Testar fluxo completo: abrir modal → gerar roteiro → visualizar → editar → salvar
  - Validar que roteiros são salvos corretamente
  - Validar que lista de roteiros salvos exibe todos os roteiros
  - Validar ações de editar e excluir
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 8: Gravação - Teleprompter

- [x] 27. Implementar componente TeleprompterView
  - Criar `src/components/molecules/TeleprompterView.tsx`
  - Implementar scroll automático com velocidade configurável
  - Implementar scroll manual (usuário arrasta)
  - Implementar scroll sincronizado com voz (detectar fala e rolar)
  - Adicionar controles de play/pause
  - Aplicar Design System (fontSize configurável)
  - _Requirements: 9.7, 9.11, 9.12_


- [x] 28. Implementar telas de gravação
  - [x] 28.1 Implementar TeleprompterSettingsScreen
    - Criar `app/(tabs)/assistant/teleprompter-settings.tsx`
    - Adicionar dropdown de modo de scroll (Auto, Manual, Voz)
    - Adicionar sliders de velocidade (pixels/segundo) e tamanho de fonte
    - Adicionar preview do teleprompter
    - Adicionar botão "Iniciar Gravação"
    - Navegar para RecordingActiveScreen ao clicar
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [x] 28.2 Implementar RecordingActiveScreen
    - Criar `app/(tabs)/assistant/recording-active.tsx`
    - Exibir preview da câmera em fullscreen usando Expo Camera
    - Adicionar overlay do TeleprompterView sobre a câmera
    - Exibir timer de gravação
    - Exibir botão REC pulsando
    - Implementar lógica de gravação: clicar em REC → iniciar gravação
    - Adicionar botões Pause e Stop
    - Navegar para VideoPreviewScreen ao clicar em Stop
    - _Requirements: 9.6, 9.7, 9.8, 9.9, 9.10, 9.11, 9.12, 9.13, 9.14_
  
  - [x] 28.3 Implementar VideoPreviewScreen
    - Criar `app/(tabs)/assistant/video-preview.tsx`
    - Exibir video player do vídeo gravado
    - Adicionar botões "Descartar", "Salvar sem Editar" e "Salvar e Editar"
    - Implementar ações: Descartar → voltar, Salvar sem Editar → LibraryScreen, Salvar e Editar → VideoEditScreen
    - _Requirements: 10.9, 10.11_

- [x] 29. Checkpoint - Validar gravação
  - Testar fluxo completo: configurar teleprompter → gravar vídeo → visualizar preview
  - Validar que teleprompter rola corretamente em cada modo (Auto, Manual, Voz)
  - Validar que câmera grava vídeo corretamente
  - Validar que timer de gravação funciona
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 9: Gravação - Edição de Vídeo

- [x] 30. Implementar VideoStore
  - Criar `src/store/videoStore.ts` com interface VideoState
  - Implementar estado: videos, currentVideo
  - Implementar métodos: setCurrentVideo, addVideo, updateVideo, deleteVideo
  - _Requirements: 17.6_

- [x] 31. Implementar Videos Service
  - Criar `src/services/videos.ts`
  - Implementar métodos: list(), upload(file), update(id, data), delete(id), process(id, settings)
  - Definir tipos TypeScript para requests e responses
  - _Requirements: 16.8, 16.11_

- [x] 32. Implementar fluxo de edição de vídeo
  - [x] 32.1 Implementar VideoEditScreen
    - Criar `app/(tabs)/assistant/video-edit.tsx`
    - Exibir preview do vídeo (thumbnail)
    - Adicionar checkboxes: Legendas, Música, Assets, Cortes automáticos
    - Adicionar dropdowns: Estilo de legenda, Modo de corte
    - Adicionar slider de volume da música
    - Adicionar botão "Processar Vídeo"
    - Navegar para ProcessingVideoScreen ao clicar
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_
  
  - [x] 32.2 Implementar ProcessingVideoScreen
    - Criar `app/(tabs)/assistant/processing-video.tsx`
    - Exibir progress bar de etapas (Transcrevendo, Legendas, Música, Finalizando)
    - Chamar videosService.process() com settings
    - Navegar para VideoFinalPreviewScreen quando concluído
    - _Requirements: 10.7, 10.8_


  - [x] 32.3 Implementar VideoFinalPreviewScreen
    - Criar `app/(tabs)/assistant/video-final-preview.tsx`
    - Exibir video player do vídeo editado
    - Adicionar toggle "Ver antes/depois"
    - Adicionar botões "Editar Novamente" e "Publicar"
    - Implementar ações: Editar Novamente → VideoEditScreen, Publicar → SelectNetworksScreen
    - _Requirements: 10.9, 10.10, 10.11, 10.12_

- [x] 33. Implementar SavedVideosScreen
  - Criar `app/(tabs)/library/saved-videos.tsx`
  - Exibir grid de vídeos (thumbnail, duração, data) usando FlatList
  - Criar componente VideoCard para cada vídeo
  - Adicionar FAB "Gravar novo" que navega para TeleprompterSettingsScreen
  - Adicionar ações em cada vídeo: "Editar", "Publicar", "Excluir"
  - _Requirements: 13.6, 13.7, 13.8_

- [x] 34. Checkpoint - Validar edição de vídeo
  - Testar fluxo completo: editar vídeo → processar → visualizar resultado
  - Validar que progress bar atualiza corretamente durante processamento
  - Validar que vídeo editado é exibido corretamente
  - Validar que lista de vídeos salvos exibe todos os vídeos
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 10: Carrosséis

- [x] 35. Implementar Carousels Service
  - Criar `src/services/carousels.ts`
  - Implementar métodos: list(), generate(topic, slideCount), update(id, data), delete(id)
  - Definir tipos TypeScript para requests e responses
  - _Requirements: 16.10, 16.11_

- [x] 36. Implementar fluxo de geração de carrosséis
  - [x] 36.1 Implementar CarouselGenerationScreen
    - Criar `app/(tabs)/assistant/carousel-generation.tsx`
    - Adicionar input "Tema do carrossel"
    - Adicionar slider de número de slides (3-10)
    - Adicionar botão "Gerar Carrossel"
    - Navegar para GeneratingCarouselScreen ao clicar
    - _Requirements: 11.1, 11.2, 11.3, 11.4_
  
  - [x] 36.2 Implementar GeneratingCarouselScreen
    - Criar `app/(tabs)/assistant/generating-carousel.tsx`
    - Exibir animação de loading
    - Chamar carouselsService.generate() com topic e slideCount
    - Navegar para CarouselPreviewScreen quando API retorna
    - _Requirements: 11.5, 11.6_
  
  - [x] 36.3 Implementar CarouselPreviewScreen
    - Criar `app/(tabs)/assistant/carousel-preview.tsx`
    - Exibir swiper de slides (react-native-swiper ou similar)
    - Exibir indicador de página (1/5)
    - Adicionar botões "Editar Slide", "Trocar Imagem", "Publicar"
    - Implementar ações: Editar Slide → EditSlideModal, Publicar → SelectNetworksScreen
    - _Requirements: 11.7, 11.8, 11.9, 11.10, 11.11_

- [x] 37. Implementar SavedCarouselsScreen
  - Criar `app/(tabs)/library/saved-carousels.tsx`
  - Exibir lista de carrosséis usando FlatList
  - Criar componente CarouselCard para cada carrossel (preview do primeiro slide, título, número de slides)
  - Adicionar FAB "Criar novo" que navega para CarouselGenerationScreen
  - Adicionar ações em cada carrossel: "Editar", "Publicar", "Excluir"
  - _Requirements: 13.9, 13.10, 13.11, 13.12_

- [x] 38. Checkpoint - Validar carrosséis
  - Testar fluxo completo: gerar carrossel → visualizar slides → editar → salvar
  - Validar que swiper funciona corretamente
  - Validar que lista de carrosséis salvos exibe todos os carrosséis
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 11: Publicação

- [x] 39. Implementar Posts Service
  - Criar `src/services/posts.ts`
  - Implementar métodos: list(), schedule(data), publish(data), delete(id)
  - Definir tipos TypeScript para requests e responses
  - _Requirements: 16.9, 16.11_


- [x] 40. Implementar fluxo de publicação
  - [x] 40.1 Implementar SelectNetworksScreen
    - Criar `app/(tabs)/assistant/select-networks.tsx`
    - Exibir checkboxes de redes sociais (Instagram, TikTok, Facebook, YouTube, LinkedIn)
    - Exibir preview de cada rede
    - Adicionar botão "Próximo"
    - Navegar para CaptionHashtagsScreen ao clicar
    - _Requirements: 12.1, 12.2, 12.3, 12.4_
  
  - [x] 40.2 Implementar CaptionHashtagsScreen
    - Criar `app/(tabs)/assistant/caption-hashtags.tsx`
    - Adicionar textarea de legenda
    - Adicionar tag input de hashtags
    - Adicionar botão "Gerar legenda com IA"
    - Implementar ação: Gerar legenda → chamar API e preencher textarea
    - Adicionar botão "Próximo"
    - Navegar para SchedulePostScreen ao clicar
    - _Requirements: 12.5, 12.6, 12.7, 12.8, 12.9_
  
  - [x] 40.3 Implementar SchedulePostScreen
    - Criar `app/(tabs)/assistant/schedule-post.tsx`
    - Adicionar radio buttons "Publicar agora" ou "Agendar"
    - Exibir DateTimePicker quando "Agendar" é selecionado
    - Adicionar botão "Publicar"
    - Chamar postsService.schedule() ou postsService.publish() ao clicar
    - Navegar para PostConfirmationScreen após sucesso
    - _Requirements: 12.10, 12.11, 12.12, 12.13, 12.14_
  
  - [x] 40.4 Implementar PostConfirmationScreen
    - Criar `app/(tabs)/assistant/post-confirmation.tsx`
    - Exibir ícone de sucesso animado (Lottie ou animação customizada)
    - Exibir lista de redes publicadas
    - Adicionar botão "Ver Analytics"
    - Navegar para AnalyticsScreen ao clicar
    - _Requirements: 12.15, 12.16, 12.17_

- [x] 41. Checkpoint - Validar publicação
  - Testar fluxo completo: selecionar redes → adicionar legenda → agendar → confirmar
  - Validar que geração de legenda com IA funciona
  - Validar que DateTimePicker aparece quando "Agendar" é selecionado
  - Validar que confirmação exibe redes corretas
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 12: Biblioteca

- [x] 42. Implementar LibraryScreen com tabs internas
  - Criar `app/(tabs)/library/index.tsx`
  - Implementar tabs internas: "Roteiros", "Vídeos", "Carrosséis"
  - Integrar SavedScriptsScreen, SavedVideosScreen, SavedCarouselsScreen
  - Aplicar Design System
  - _Requirements: 13.1_

- [x] 43. Implementar componentes de cards
  - Criar `src/components/organisms/ScriptCard.tsx` (título, word count, duração, data, ações)
  - Criar `src/components/organisms/VideoCard.tsx` (thumbnail, duração, data, ações)
  - Criar `src/components/organisms/CarouselCard.tsx` (preview, título, número de slides, ações)
  - Aplicar Design System em todos
  - Adicionar accessibilityLabel em todos
  - _Requirements: 13.3, 13.6, 13.10_

- [x] 44. Implementar FABs (Floating Action Buttons)
  - Criar `src/components/organisms/FAB.tsx` (botão flutuante)
  - Adicionar FAB "Novo roteiro" em SavedScriptsScreen
  - Adicionar FAB "Gravar novo" em SavedVideosScreen
  - Adicionar FAB "Criar novo" em SavedCarouselsScreen
  - Aplicar Design System
  - _Requirements: 13.4, 13.7, 13.11_

- [x] 45. Checkpoint - Validar biblioteca
  - Testar navegação entre tabs internas
  - Validar que todos os cards exibem informações corretas
  - Validar que FABs abrem as telas corretas
  - Validar que ações (editar, publicar, excluir) funcionam
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 13: Configurações

- [x] 46. Implementar telas de configurações - Parte 1
  - [x] 46.1 Implementar SettingsScreen
    - Criar `app/(tabs)/settings/index.tsx`
    - Exibir lista de opções: Perfil, Business DNA, Redes Sociais, Assets de Marca, Notificações, Integrações
    - Criar componente SettingsItem para cada opção
    - Aplicar Design System
    - _Requirements: 14.1_


  - [x] 46.2 Implementar ProfileScreen
    - Criar `app/(tabs)/settings/profile.tsx`
    - Exibir avatar editável (image picker)
    - Adicionar inputs de nome e email
    - Adicionar botão "Alterar Senha"
    - Adicionar botão "Salvar"
    - Chamar authStore.updateProfile() ao salvar
    - _Requirements: 14.2, 14.3, 14.4, 14.5_
  
  - [x] 46.3 Implementar BusinessDNASettingsScreen
    - Criar `app/(tabs)/settings/business-dna.tsx`
    - Exibir card do Business DNA atual
    - Exibir campos: Nicho, Público, Tom de voz, Objetivos
    - Adicionar botão "Editar Business DNA"
    - Navegar para OnboardingScreen ao clicar
    - _Requirements: 14.6, 14.7, 14.8, 14.9_

- [x] 47. Implementar telas de configurações - Parte 2
  - [x] 47.1 Implementar SocialAccountsScreen
    - Criar `app/(tabs)/settings/social-accounts.tsx`
    - Exibir lista de contas conectadas
    - Criar componente SocialNetworkCard (avatar, username, status)
    - Adicionar FAB "Adicionar Rede"
    - Implementar OAuth flow (preparação para integração futura)
    - _Requirements: 14.10, 14.11, 14.12_
  
  - [x] 47.2 Implementar NotificationsSettingsScreen
    - Criar `app/(tabs)/settings/notifications.tsx`
    - Adicionar toggles de preferências: Push, Email, Horário de Silêncio
    - Salvar preferências no AsyncStorage
    - _Requirements: 14.13_
  
  - [x] 47.3 Implementar IntegrationsScreen
    - Criar `app/(tabs)/settings/integrations.tsx`
    - Exibir cards de integrações externas
    - Exibir status de cada integração (conectado/desconectado)
    - _Requirements: 14.14, 14.15_

- [x] 48. Checkpoint - Validar configurações
  - Testar navegação entre todas as telas de configurações
  - Validar que edição de perfil funciona
  - Validar que Business DNA pode ser editado
  - Validar que preferências de notificações são salvas
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 14: Assets de Marca

- [x] 49. Implementar gerenciamento de assets
  - [x] 49.1 Implementar BrandAssetsScreen
    - Criar `app/(tabs)/settings/brand-assets.tsx`
    - Exibir lista de assets: Logo, Intro, Outro, Watermark
    - Criar componente AssetCard (preview, status, botões)
    - Exibir status "Configurado" ou "Não configurado" para cada asset
    - Adicionar botões "Adicionar" ou "Editar" para cada asset
    - _Requirements: 15.1, 15.2, 15.3_
  
  - [x] 49.2 Implementar UploadAssetModal
    - Criar `app/modals/upload-asset.tsx`
    - Exibir image picker usando Expo Image Picker
    - Exibir preview do asset selecionado
    - Adicionar botões "Cancelar" e "Upload"
    - Fazer upload do asset ao clicar em "Upload"
    - _Requirements: 15.4, 15.5, 15.6, 15.7, 15.8_
  
  - [x] 49.3 Implementar ConfigureAssetModal
    - Criar `app/modals/configure-asset.tsx`
    - Exibir preview do vídeo com asset aplicado
    - Adicionar dropdown de posição (top-left, top-right, bottom-left, bottom-right, center)
    - Adicionar sliders de opacidade (0-100) e duração (segundos)
    - Adicionar toggle "Aplicar automaticamente"
    - Adicionar botões "Cancelar" e "Salvar"
    - _Requirements: 15.9, 15.10, 15.11, 15.12, 15.13, 15.14_

- [x] 50. Checkpoint - Validar assets de marca
  - Testar fluxo completo: adicionar asset → configurar → salvar
  - Validar que preview do asset funciona
  - Validar que configurações são salvas corretamente
  - Validar que assets aparecem nos vídeos quando aplicados
  - Perguntar ao usuário se há ajustes necessários

---

### CICLO 15: Analytics, Testes e Otimização

- [x] 51. Implementar Analytics Stack
  - [x] 51.1 Implementar AnalyticsScreen
    - Criar `app/analytics/index.tsx`
    - Exibir métricas gerais: Total de posts, Views, Likes, Comments, Shares
    - Criar componente MetricCard para cada métrica
    - Exibir lista de posts recentes com PostCard
    - Adicionar ação "Ver Detalhes" em cada post
    - Navegar para PostDetailsScreen ao clicar
    - _Requirements: 4.8_


  - [x] 51.2 Implementar PostDetailsScreen
    - Criar `app/analytics/post-details.tsx`
    - Exibir preview do post (vídeo ou carrossel)
    - Exibir métricas detalhadas por rede social
    - Exibir gráfico de performance ao longo do tempo
    - Adicionar botão "Analisar URL"
    - Navegar para URLAnalysisModal ao clicar
    - _Requirements: 4.8_
  
  - [x] 51.3 Implementar URLAnalysisModal
    - Criar `app/analytics/url-analysis.tsx`
    - Adicionar input de URL
    - Adicionar botão "Analisar"
    - Exibir métricas da URL analisada
    - _Requirements: 4.8_

- [x] 52. Completar testes unitários
  - [x]* 52.1 Adicionar testes faltantes para componentes base
    - Completar testes para todos os 14 átomos
    - Garantir cobertura de casos extremos e condições de erro
    - _Requirements: 20.1, 20.5, 20.6_
  
  - [x]* 52.2 Adicionar testes para hooks customizados
    - Completar testes para useAudioRecording, useTextToSpeech, useCamera
    - Testar casos de erro (permissão negada, falha de gravação)
    - _Requirements: 20.2, 20.5, 20.6_
  
  - [x]* 52.3 Adicionar testes de snapshot
    - Criar snapshots para todos os componentes visuais
    - Validar que snapshots detectam mudanças não intencionais
    - _Requirements: 20.7_

- [x] 53. Otimizar performance
  - [x] 53.1 Implementar lazy loading
    - Adicionar lazy loading para telas não críticas usando React.lazy()
    - Implementar lazy loading para imagens usando expo-image
    - _Requirements: 19.4, 19.5_
  
  - [x] 53.2 Otimizar renderização
    - Adicionar React.memo em componentes que não precisam re-renderizar
    - Usar useMemo e useCallback onde apropriado
    - Garantir que listas usam FlatList (não ScrollView com .map())
    - _Requirements: 19.2, 19.3, 19.8_
  
  - [x] 53.3 Otimizar bundle size
    - Configurar Hermes engine
    - Analisar bundle size com `npx expo-bundle-visualizer`
    - Remover dependências não utilizadas
    - Validar que bundle size < 50MB
    - _Requirements: 19.7, 19.10_

- [x] 54. Validar acessibilidade
  - Testar navegação com VoiceOver (iOS) e TalkBack (Android)
  - Validar que todos os elementos interativos têm accessibilityLabel
  - Validar que touch targets têm mínimo de 48x48px
  - Validar contraste de cores (4.5:1 para texto normal, 3:1 para texto grande)
  - Testar ajuste de tamanho de fonte do sistema
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 18.8, 18.9, 18.10_

- [x] 55. Testar em dispositivos reais
  - Testar em iPhone (iOS 16+)
  - Testar em Android (Android 12+)
  - Validar que todas as funcionalidades funcionam em ambas as plataformas
  - Validar que animações são suaves (60fps)
  - Validar que tempo de carregamento inicial < 2 segundos
  - _Requirements: 19.1, 19.6, 19.9_

- [x] 56. Checkpoint final - Validar aplicativo completo
  - Executar todos os testes e garantir que passam
  - Testar fluxo completo end-to-end: cadastro → onboarding → criar roteiro → gravar vídeo → editar → publicar
  - Validar que todas as 51 telas estão implementadas e funcionais
  - Validar que navegação funciona corretamente em todos os fluxos
  - Validar que integração com backend está preparada (services implementados)
  - Validar que acessibilidade está completa
  - Validar que performance está otimizada
  - Perguntar ao usuário se há ajustes finais necessários

---

## Notas Finais

### Organização dos Ciclos

Os 15 ciclos estão organizados para permitir entregas incrementais:

1. **Ciclos 1-3:** Fundação (setup, design system, componentes base, navegação)
2. **Ciclos 4-5:** Autenticação e onboarding
3. **Ciclos 6-7:** Assistente IA (chat híbrido e geração de roteiros)
4. **Ciclos 8-9:** Gravação e edição de vídeo
5. **Ciclos 10-11:** Carrosséis e publicação
6. **Ciclos 12-13:** Biblioteca e configurações
7. **Ciclo 14:** Assets de marca
8. **Ciclo 15:** Analytics, testes e otimização

### Tasks Opcionais (marcadas com `*`)

Tasks marcadas com `*` são opcionais e podem ser puladas para acelerar o MVP:
- Testes unitários de componentes e hooks
- Testes de snapshot
- Algumas otimizações de performance

### Checkpoints

Checkpoints estão distribuídos ao longo dos ciclos para garantir validação incremental e permitir ajustes antes de prosseguir.

### Integração com Backend

Todos os services estão preparados para integração com o backend FastAPI. Quando o backend estiver pronto, basta configurar a variável de ambiente `EXPO_PUBLIC_API_URL` e os services funcionarão automaticamente.

### Próximos Passos

Após a conclusão deste plano de implementação:
1. Build de produção para iOS e Android
2. Testes beta com usuários reais
3. Publicação nas lojas (App Store e Google Play)
4. Monitoramento de métricas e feedback

---

**Versão:** 1.0.0  
**Data:** 08/03/2026  
**Status:** ✅ TASK LIST COMPLETO  
**Total de Tasks:** 56 tasks principais (com sub-tasks)  
**Total de Telas:** 51 telas implementadas  
**Ciclos:** 15 ciclos incrementais
