# Requirements Document - Fase 2: Conversão para React Native

## Introdução

Este documento especifica os requisitos para a Fase 2 do projeto Influency V1: conversão das 51 telas HTML/CSS geradas no Stitch para um aplicativo mobile funcional usando React Native + Expo.

**Contexto:**
- Fase 0 (Geração Stitch): ✅ CONCLUÍDA - 51 telas geradas e validadas
- Fase 1 (Backend): Será implementada em paralelo ou depois
- **Fase 2 (Frontend Mobile)**: ESTA SPEC - Conversão para React Native + Expo

**Objetivo Principal:**
Criar um aplicativo mobile nativo (iOS e Android) com todas as 51 telas funcionais (incluindo 3 telas de Analytics), navegação completa, componentes reutilizáveis, design system aplicado e integração com backend preparada.

**Diferencial:**
- Assistente IA com interface híbrida (voz + texto)
- Arquitetura mobile-first otimizada
- Componentes reutilizáveis baseados em Material Design 3
- Performance e acessibilidade como prioridades

---

## Glossário

- **App**: Aplicativo mobile Influency V1
- **Tela**: Componente React Native que representa uma página do aplicativo
- **Stack**: Conjunto de telas organizadas em navegação hierárquica
- **Tab**: Aba da navegação inferior (Bottom Tabs)
- **Modal**: Tela apresentada como modal sobre a tela atual
- **Componente**: Elemento reutilizável da interface (Button, Card, Input, etc.)
- **Design_System**: Conjunto de tokens de design (cores, tipografia, espaçamento)
- **Navegação**: Sistema de transição entre telas usando React Navigation
- **Assistente_IA**: Interface conversacional híbrida (voz + texto)
- **Business_DNA**: Perfil do usuário capturado no onboarding
- **Roteiro**: Script gerado pela IA para criação de vídeo
- **Teleprompter**: Tela de gravação com texto rolante
- **Carrossel**: Conjunto de imagens para publicação em redes sociais
- **Asset**: Elemento de marca (logo, intro, outro, watermark)
- **Backend**: API FastAPI que será integrada posteriormente
- **Expo**: Framework e toolchain para React Native
- **TypeScript**: Linguagem de programação com tipagem estática

---

## Requirements


### Requirement 1: Setup do Projeto Expo + TypeScript

**User Story:** Como desenvolvedor, eu quero configurar o projeto Expo com TypeScript, para que eu tenha uma base sólida para desenvolvimento mobile.

#### Acceptance Criteria

1. THE Setup_Script SHALL criar um novo projeto Expo usando o template TypeScript
2. THE Setup_Script SHALL instalar todas as dependências essenciais (React Native Paper, React Navigation, Zustand, React Query)
3. THE Setup_Script SHALL configurar o arquivo `app.json` com as configurações corretas do projeto
4. THE Setup_Script SHALL configurar o `tsconfig.json` com regras estritas de TypeScript
5. THE Setup_Script SHALL criar a estrutura de pastas padrão (`src/components`, `src/screens`, `src/hooks`, `src/services`, `src/store`, `src/theme`)
6. WHEN o projeto é criado, THE Setup_Script SHALL executar `npx expo start` sem erros
7. THE Setup_Script SHALL configurar o Expo Router para navegação baseada em arquivos
8. THE Setup_Script SHALL adicionar scripts no `package.json` para desenvolvimento, build e testes

---

### Requirement 2: Implementação do Design System

**User Story:** Como desenvolvedor, eu quero implementar o Design System completo, para que todas as telas tenham consistência visual.

#### Acceptance Criteria

1. THE Design_System SHALL definir todas as cores primárias, secundárias e semânticas conforme `stitch-output/DESIGN.md`
2. THE Design_System SHALL definir a escala tipográfica completa (Display, Headline, Title, Body, Label)
3. THE Design_System SHALL definir a escala de espaçamento baseada em múltiplos de 8px
4. THE Design_System SHALL definir os valores de border radius (xs, sm, md, lg, xl, full)
5. THE Design_System SHALL definir as elevações e sombras (0dp a 5dp) para iOS e Android
6. THE Design_System SHALL exportar todos os tokens como constantes TypeScript
7. THE Design_System SHALL configurar o tema do React Native Paper com as cores customizadas
8. WHEN um componente usa o Design System, THE App SHALL aplicar os estilos consistentemente

---

### Requirement 3: Criação de Componentes Base (Átomos)

**User Story:** Como desenvolvedor, eu quero criar componentes base reutilizáveis, para que eu possa construir telas rapidamente.

#### Acceptance Criteria

1. THE Component_Library SHALL implementar o componente Button com variantes (primary, secondary, outline, text)
2. THE Component_Library SHALL implementar o componente TextInput com suporte a label, placeholder e validação
3. THE Component_Library SHALL implementar o componente Card com variantes (elevated, outlined, filled)
4. THE Component_Library SHALL implementar o componente Chip com estados (default, selected)
5. THE Component_Library SHALL implementar o componente Badge para notificações
6. THE Component_Library SHALL implementar o componente Loading com spinner animado
7. THE Component_Library SHALL implementar o componente ProgressBar com animação suave
8. WHEN um componente é usado, THE Component SHALL aceitar props tipadas com TypeScript
9. WHEN um componente é renderizado, THE Component SHALL seguir o Design System
10. FOR ALL componentes base, THE Component SHALL ter acessibilidade (accessibilityLabel, accessibilityHint)

---

### Requirement 4: Implementação da Navegação

**User Story:** Como usuário, eu quero navegar entre as telas do app, para que eu possa acessar todas as funcionalidades.

#### Acceptance Criteria

1. THE Navigation_System SHALL implementar o RootNavigator com Stack Navigator
2. THE Navigation_System SHALL implementar o AuthStack com 4 telas (Splash, Login, Register, ForgotPassword)
3. THE Navigation_System SHALL implementar o OnboardingStack com 4 telas (Welcome, BusinessDNA, ConnectSocial, Complete)
4. THE Navigation_System SHALL implementar o MainStack com Bottom Tabs (3 tabs: Assistant, Library, Settings)
5. THE Navigation_System SHALL implementar o AssistantStack com 16 telas
6. THE Navigation_System SHALL implementar o LibraryStack com 3 telas
7. THE Navigation_System SHALL implementar o SettingsStack com 9 telas
8. THE Navigation_System SHALL implementar o AnalyticsStack com 3 telas (AnalyticsScreen, PostDetailsScreen, URLAnalysisModal)
9. THE Navigation_System SHALL implementar 2 modais globais (ScriptGeneration, EditScript)
10. WHEN o usuário não está autenticado, THE Navigation_System SHALL mostrar o AuthStack
11. WHEN o usuário está autenticado, THE Navigation_System SHALL mostrar o MainStack
12. WHEN o usuário navega, THE Navigation_System SHALL preservar o estado das telas
13. THE Navigation_System SHALL suportar deep links no formato `influency://[rota]`

---

### Requirement 5: Telas de Autenticação

**User Story:** Como usuário, eu quero fazer login no app, para que eu possa acessar minhas funcionalidades.

#### Acceptance Criteria

1. THE LoginScreen SHALL exibir inputs de email e senha
2. THE LoginScreen SHALL validar o formato do email antes de enviar
3. THE LoginScreen SHALL exibir mensagens de erro quando a validação falhar
4. THE LoginScreen SHALL ter um botão "Entrar" que chama a API de autenticação
5. THE LoginScreen SHALL ter links para "Esqueci minha senha" e "Criar conta"
6. WHEN o login é bem-sucedido, THE LoginScreen SHALL navegar para OnboardingStack (primeira vez) ou MainStack (usuário existente)
7. THE RegisterScreen SHALL exibir inputs de nome, email, senha e confirmação de senha
8. THE RegisterScreen SHALL validar que a senha e confirmação são iguais
9. WHEN o cadastro é bem-sucedido, THE RegisterScreen SHALL navegar para OnboardingStack
10. THE ForgotPasswordScreen SHALL exibir input de email e botão "Enviar link"
11. WHEN o link é enviado, THE ForgotPasswordScreen SHALL exibir mensagem de confirmação

---

### Requirement 6: Fluxo de Onboarding (Business DNA)

**User Story:** Como novo usuário, eu quero completar o onboarding, para que o app conheça meu perfil e personalize a experiência.

#### Acceptance Criteria

1. THE OnboardingScreen SHALL exibir 5 perguntas sequenciais sobre o Business DNA
2. THE OnboardingScreen SHALL exibir uma progress bar indicando a pergunta atual (1/5, 2/5, etc.)
3. THE OnboardingScreen SHALL permitir input híbrido (voz + texto) para cada resposta
4. THE OnboardingScreen SHALL ter botões "Voltar" e "Próximo" para navegação
5. WHEN o usuário responde a última pergunta, THE OnboardingScreen SHALL navegar para ConnectSocialNetworksScreen
6. THE ConnectSocialNetworksScreen SHALL exibir cards de redes sociais (Instagram, TikTok, Facebook)
7. THE ConnectSocialNetworksScreen SHALL ter botões de conexão OAuth para cada rede
8. THE ConnectSocialNetworksScreen SHALL ter botão "Pular por enquanto"
9. WHEN o usuário conecta ou pula, THE ConnectSocialNetworksScreen SHALL navegar para OnboardingCompleteScreen
10. THE OnboardingCompleteScreen SHALL exibir mensagem de sucesso e botão "Começar a Criar"
11. WHEN o usuário clica em "Começar a Criar", THE OnboardingCompleteScreen SHALL navegar para MainStack (AssistantTab)

---

### Requirement 7: Assistente IA Híbrido (Voz + Texto)

**User Story:** Como usuário, eu quero conversar com o assistente IA usando voz ou texto, para que eu possa criar conteúdo de forma natural.

#### Acceptance Criteria

1. THE AssistantScreen SHALL exibir um chat com histórico de mensagens
2. THE AssistantScreen SHALL exibir um botão de microfone para gravação de voz
3. THE AssistantScreen SHALL exibir um input de texto para digitação
4. WHEN o usuário pressiona o botão de microfone, THE AssistantScreen SHALL iniciar reconhecimento de voz
5. WHEN o reconhecimento de voz detecta fala, THE AssistantScreen SHALL transcrever em tempo real
6. WHEN o usuário para de falar, THE AssistantScreen SHALL enviar a mensagem para a API
7. WHEN o usuário digita e envia, THE AssistantScreen SHALL enviar a mensagem para a API
8. WHEN a API responde, THE AssistantScreen SHALL exibir a resposta no chat
9. IF o usuário usou voz, THEN THE AssistantScreen SHALL reproduzir a resposta em áudio (TTS)
10. THE AssistantScreen SHALL permitir alternar entre voz e texto a qualquer momento
11. THE AssistantScreen SHALL exibir indicadores visuais de "ouvindo", "processando" e "falando"

---

### Requirement 8: Geração de Roteiros com IA

**User Story:** Como usuário, eu quero gerar roteiros personalizados com IA, para que eu tenha conteúdo de qualidade para meus vídeos.

#### Acceptance Criteria

1. THE ScriptGenerationModal SHALL exibir um textarea "Sobre o que você quer falar?"
2. THE ScriptGenerationModal SHALL exibir um slider de duração (30-300 segundos)
3. THE ScriptGenerationModal SHALL exibir um card de dica com sugestões
4. THE ScriptGenerationModal SHALL ter um botão "Gerar Roteiro"
5. WHEN o usuário clica em "Gerar Roteiro", THE ScriptGenerationModal SHALL navegar para GeneratingScriptScreen
6. THE GeneratingScriptScreen SHALL exibir uma animação de loading
7. THE GeneratingScriptScreen SHALL exibir o texto "Gerando roteiro..."
8. WHEN a API retorna o roteiro, THE GeneratingScriptScreen SHALL navegar para ScriptGeneratedScreen
9. THE ScriptGeneratedScreen SHALL exibir o título e conteúdo do roteiro
10. THE ScriptGeneratedScreen SHALL exibir word count e duração estimada
11. THE ScriptGeneratedScreen SHALL ter botões "Editar", "Salvar" e "Usar para Gravar"
12. WHEN o usuário clica em "Editar", THE ScriptGeneratedScreen SHALL abrir EditScriptModal
13. WHEN o usuário clica em "Salvar", THE ScriptGeneratedScreen SHALL salvar o roteiro e navegar para SavedScriptsScreen
14. WHEN o usuário clica em "Usar para Gravar", THE ScriptGeneratedScreen SHALL navegar para TeleprompterSettingsScreen

---

### Requirement 9: Gravação de Vídeo com Teleprompter

**User Story:** Como usuário, eu quero gravar vídeos com teleprompter, para que eu possa seguir o roteiro facilmente.

#### Acceptance Criteria

1. THE TeleprompterSettingsScreen SHALL exibir dropdown de modo de scroll (Auto, Manual, Voz)
2. THE TeleprompterSettingsScreen SHALL exibir sliders de velocidade e tamanho de fonte
3. THE TeleprompterSettingsScreen SHALL exibir preview do teleprompter
4. THE TeleprompterSettingsScreen SHALL ter botão "Iniciar Gravação"
5. WHEN o usuário clica em "Iniciar Gravação", THE TeleprompterSettingsScreen SHALL navegar para RecordingActiveScreen
6. THE RecordingActiveScreen SHALL exibir preview da câmera em fullscreen
7. THE RecordingActiveScreen SHALL exibir overlay do teleprompter sobre a câmera
8. THE RecordingActiveScreen SHALL exibir timer de gravação
9. THE RecordingActiveScreen SHALL exibir botão REC pulsando
10. WHEN o usuário clica em REC, THE RecordingActiveScreen SHALL iniciar gravação de vídeo
11. WHEN o modo é "Auto", THE RecordingActiveScreen SHALL rolar o texto automaticamente
12. WHEN o modo é "Voz", THE RecordingActiveScreen SHALL rolar o texto sincronizado com a fala
13. THE RecordingActiveScreen SHALL ter botões Pause e Stop
14. WHEN o usuário clica em Stop, THE RecordingActiveScreen SHALL parar a gravação e navegar para VideoPreviewScreen

---

### Requirement 10: Edição de Vídeo

**User Story:** Como usuário, eu quero editar meus vídeos automaticamente, para que eles fiquem profissionais sem esforço.

#### Acceptance Criteria

1. THE VideoEditScreen SHALL exibir preview do vídeo (thumbnail)
2. THE VideoEditScreen SHALL exibir checkboxes para: Legendas, Música, Assets, Cortes automáticos
3. THE VideoEditScreen SHALL exibir dropdowns para: Estilo de legenda, Modo de corte
4. THE VideoEditScreen SHALL exibir slider de volume da música
5. THE VideoEditScreen SHALL ter botão "Processar Vídeo"
6. WHEN o usuário clica em "Processar Vídeo", THE VideoEditScreen SHALL navegar para ProcessingVideoScreen
7. THE ProcessingVideoScreen SHALL exibir progress bar de etapas (Transcrevendo, Legendas, Música, Finalizando)
8. WHEN o processamento é concluído, THE ProcessingVideoScreen SHALL navegar para VideoFinalPreviewScreen
9. THE VideoFinalPreviewScreen SHALL exibir video player do vídeo editado
10. THE VideoFinalPreviewScreen SHALL ter toggle "Ver antes/depois"
11. THE VideoFinalPreviewScreen SHALL ter botões "Editar Novamente" e "Publicar"
12. WHEN o usuário clica em "Publicar", THE VideoFinalPreviewScreen SHALL navegar para SelectNetworksScreen

---

### Requirement 11: Geração de Carrosséis

**User Story:** Como usuário, eu quero gerar carrosséis de imagens, para que eu possa criar conteúdo visual rapidamente.

#### Acceptance Criteria

1. THE CarouselGenerationScreen SHALL exibir input "Tema do carrossel"
2. THE CarouselGenerationScreen SHALL exibir slider de número de slides (3-10)
3. THE CarouselGenerationScreen SHALL ter botão "Gerar Carrossel"
4. WHEN o usuário clica em "Gerar Carrossel", THE CarouselGenerationScreen SHALL navegar para GeneratingCarouselScreen
5. THE GeneratingCarouselScreen SHALL exibir animação de loading
6. WHEN a API retorna o carrossel, THE GeneratingCarouselScreen SHALL navegar para CarouselPreviewScreen
7. THE CarouselPreviewScreen SHALL exibir swiper de slides
8. THE CarouselPreviewScreen SHALL exibir indicador de página (1/5)
9. THE CarouselPreviewScreen SHALL ter botões "Editar Slide", "Trocar Imagem", "Publicar"
10. WHEN o usuário clica em "Editar Slide", THE CarouselPreviewScreen SHALL abrir EditSlideModal
11. WHEN o usuário clica em "Publicar", THE CarouselPreviewScreen SHALL navegar para SelectNetworksScreen

---

### Requirement 12: Publicação em Redes Sociais

**User Story:** Como usuário, eu quero publicar meu conteúdo em múltiplas redes sociais, para que eu alcance mais pessoas.

#### Acceptance Criteria

1. THE SelectNetworksScreen SHALL exibir checkboxes de redes sociais (Instagram, TikTok, Facebook, YouTube, LinkedIn)
2. THE SelectNetworksScreen SHALL exibir preview de cada rede
3. THE SelectNetworksScreen SHALL ter botão "Próximo"
4. WHEN o usuário clica em "Próximo", THE SelectNetworksScreen SHALL navegar para CaptionHashtagsScreen
5. THE CaptionHashtagsScreen SHALL exibir textarea de legenda
6. THE CaptionHashtagsScreen SHALL exibir tag input de hashtags
7. THE CaptionHashtagsScreen SHALL ter botão "Gerar legenda com IA"
8. WHEN o usuário clica em "Gerar legenda com IA", THE CaptionHashtagsScreen SHALL chamar a API e preencher a legenda
9. THE CaptionHashtagsScreen SHALL ter botão "Próximo"
10. WHEN o usuário clica em "Próximo", THE CaptionHashtagsScreen SHALL navegar para SchedulePostScreen
11. THE SchedulePostScreen SHALL exibir radio buttons "Publicar agora" ou "Agendar"
12. WHEN "Agendar" é selecionado, THE SchedulePostScreen SHALL exibir DateTimePicker
13. THE SchedulePostScreen SHALL ter botão "Publicar"
14. WHEN o usuário clica em "Publicar", THE SchedulePostScreen SHALL enviar para a API e navegar para PostConfirmationScreen
15. THE PostConfirmationScreen SHALL exibir ícone de sucesso animado
16. THE PostConfirmationScreen SHALL exibir lista de redes publicadas
17. THE PostConfirmationScreen SHALL ter botão "Ver Analytics"

---

### Requirement 13: Biblioteca de Conteúdo

**User Story:** Como usuário, eu quero acessar minha biblioteca de conteúdo, para que eu possa reutilizar roteiros, vídeos e carrosséis.

#### Acceptance Criteria

1. THE LibraryScreen SHALL exibir tabs internas: "Roteiros", "Vídeos", "Carrosséis"
2. THE SavedScriptsScreen SHALL exibir lista de roteiros salvos
3. THE SavedScriptsScreen SHALL exibir preview (título, word count, data) de cada roteiro
4. THE SavedScriptsScreen SHALL ter FAB "Novo roteiro"
5. THE SavedScriptsScreen SHALL ter ações "Editar", "Usar para Gravar", "Excluir" em cada roteiro
6. THE SavedVideosScreen SHALL exibir grid de vídeos (thumbnail, duração, data)
7. THE SavedVideosScreen SHALL ter FAB "Gravar novo"
8. THE SavedVideosScreen SHALL ter ações "Editar", "Publicar", "Excluir" em cada vídeo
9. THE SavedCarouselsScreen SHALL exibir lista de carrosséis
10. THE SavedCarouselsScreen SHALL exibir preview do primeiro slide, título, número de slides
11. THE SavedCarouselsScreen SHALL ter FAB "Criar novo"
12. THE SavedCarouselsScreen SHALL ter ações "Editar", "Publicar", "Excluir" em cada carrossel

---

### Requirement 14: Configurações do Usuário

**User Story:** Como usuário, eu quero gerenciar minhas configurações, para que eu possa personalizar o app.

#### Acceptance Criteria

1. THE SettingsScreen SHALL exibir lista de opções: Perfil, Business DNA, Redes Sociais, Assets de Marca, Notificações, Integrações
2. THE ProfileScreen SHALL exibir avatar editável
3. THE ProfileScreen SHALL exibir inputs de nome e email
4. THE ProfileScreen SHALL ter botão "Alterar Senha"
5. THE ProfileScreen SHALL ter botão "Salvar"
6. THE BusinessDNASettingsScreen SHALL exibir card do Business DNA atual
7. THE BusinessDNASettingsScreen SHALL exibir campos: Nicho, Público, Tom de voz, Objetivos
8. THE BusinessDNASettingsScreen SHALL ter botão "Editar Business DNA"
9. WHEN o usuário clica em "Editar Business DNA", THE BusinessDNASettingsScreen SHALL navegar para OnboardingScreen
10. THE SocialAccountsScreen SHALL exibir lista de contas conectadas
11. THE SocialAccountsScreen SHALL exibir avatar, username, status de cada conta
12. THE SocialAccountsScreen SHALL ter FAB "Adicionar Rede"
13. THE NotificationsSettingsScreen SHALL exibir toggles de preferências (Push, Email, Horário de Silêncio)
14. THE IntegrationsScreen SHALL exibir cards de integrações externas
15. THE IntegrationsScreen SHALL exibir status de cada integração

---

### Requirement 15: Gerenciamento de Assets de Marca

**User Story:** Como usuário, eu quero gerenciar meus assets de marca, para que meus vídeos tenham identidade visual.

#### Acceptance Criteria

1. THE BrandAssetsScreen SHALL exibir lista de assets: Logo, Intro, Outro, Watermark
2. THE BrandAssetsScreen SHALL exibir status "Configurado" ou "Não configurado" para cada asset
3. THE BrandAssetsScreen SHALL ter botões "Adicionar" ou "Editar" para cada asset
4. WHEN o usuário clica em "Adicionar", THE BrandAssetsScreen SHALL abrir UploadAssetModal
5. THE UploadAssetModal SHALL exibir image picker
6. THE UploadAssetModal SHALL exibir preview do asset
7. THE UploadAssetModal SHALL ter botões "Cancelar" e "Upload"
8. WHEN o usuário clica em "Upload", THE UploadAssetModal SHALL fazer upload e fechar o modal
9. WHEN o usuário clica em "Editar", THE BrandAssetsScreen SHALL abrir ConfigureAssetModal
10. THE ConfigureAssetModal SHALL exibir preview do vídeo com asset
11. THE ConfigureAssetModal SHALL exibir dropdown de posição
12. THE ConfigureAssetModal SHALL exibir sliders de opacidade e duração
13. THE ConfigureAssetModal SHALL exibir toggle "Aplicar automaticamente"
14. THE ConfigureAssetModal SHALL ter botões "Cancelar" e "Salvar"

---

### Requirement 16: Integração com Backend (Preparação)

**User Story:** Como desenvolvedor, eu quero preparar a integração com o backend, para que o app possa consumir a API quando ela estiver pronta.

#### Acceptance Criteria

1. THE API_Client SHALL ser implementado usando Axios
2. THE API_Client SHALL ter configuração de base URL (variável de ambiente)
3. THE API_Client SHALL ter interceptors para adicionar token JWT em todas as requisições
4. THE API_Client SHALL ter interceptors para refresh de token quando expirar
5. THE API_Client SHALL ter tratamento de erros global
6. THE Auth_Service SHALL ter métodos: login, register, logout, refreshToken
7. THE Scripts_Service SHALL ter métodos: list, generate, update, delete
8. THE Videos_Service SHALL ter métodos: list, upload, update, delete
9. THE Posts_Service SHALL ter métodos: list, schedule, publish, delete
10. THE Carousels_Service SHALL ter métodos: list, generate, update, delete
11. FOR ALL services, THE Service SHALL retornar tipos TypeScript para requests e responses
12. WHEN a API não está disponível, THE App SHALL exibir mensagem de erro amigável

---

### Requirement 17: Gerenciamento de Estado

**User Story:** Como desenvolvedor, eu quero gerenciar o estado do app de forma eficiente, para que a experiência do usuário seja fluida.

#### Acceptance Criteria

1. THE Auth_Store SHALL gerenciar estado de autenticação (user, isAuthenticated)
2. THE Auth_Store SHALL persistir tokens no SecureStore (criptografado)
3. THE Auth_Store SHALL persistir dados do usuário no AsyncStorage
4. THE Assistant_Store SHALL gerenciar estado do assistente (messages, isListening, isSpeaking)
5. THE Script_Store SHALL gerenciar estado de roteiros (scripts, currentScript)
6. THE Video_Store SHALL gerenciar estado de vídeos (videos, currentVideo)
7. THE React_Query SHALL gerenciar cache de dados do servidor
8. THE React_Query SHALL ter configuração de staleTime e cacheTime
9. WHEN o usuário faz logout, THE App SHALL limpar todos os stores
10. WHEN o app é fechado e reaberto, THE App SHALL restaurar o estado de autenticação

---

### Requirement 18: Acessibilidade

**User Story:** Como usuário com deficiência, eu quero usar o app com tecnologias assistivas, para que eu possa criar conteúdo também.

#### Acceptance Criteria

1. FOR ALL elementos interativos, THE Component SHALL ter accessibilityLabel descritivo
2. FOR ALL elementos interativos, THE Component SHALL ter accessibilityHint quando necessário
3. FOR ALL botões, THE Component SHALL ter touch target mínimo de 48x48px
4. FOR ALL inputs, THE Component SHALL ter label associado
5. FOR ALL imagens, THE Component SHALL ter accessibilityLabel descritivo
6. THE App SHALL suportar navegação por teclado (quando aplicável)
7. THE App SHALL suportar screen readers (VoiceOver no iOS, TalkBack no Android)
8. THE App SHALL ter contraste de cores mínimo de 4.5:1 para texto normal
9. THE App SHALL ter contraste de cores mínimo de 3:1 para texto grande (18px+)
10. THE App SHALL permitir ajuste de tamanho de fonte do sistema

---

### Requirement 19: Performance

**User Story:** Como usuário, eu quero que o app seja rápido e responsivo, para que eu possa criar conteúdo sem frustrações.

#### Acceptance Criteria

1. THE App SHALL carregar a tela inicial em menos de 2 segundos
2. THE App SHALL renderizar listas com FlatList para otimização
3. THE App SHALL usar React.memo em componentes que não precisam re-renderizar
4. THE App SHALL usar lazy loading para imagens
5. THE App SHALL usar lazy loading para telas não críticas
6. THE App SHALL ter animações suaves (60fps)
7. THE App SHALL ter bundle size otimizado (< 50MB)
8. WHEN o usuário navega entre telas, THE App SHALL preservar o estado das telas anteriores
9. WHEN o usuário rola listas longas, THE App SHALL manter 60fps
10. THE App SHALL usar Hermes engine para melhor performance

---

### Requirement 20: Testes

**User Story:** Como desenvolvedor, eu quero ter testes automatizados, para que eu possa garantir a qualidade do código.

#### Acceptance Criteria

1. THE Test_Suite SHALL ter testes unitários para todos os componentes base
2. THE Test_Suite SHALL ter testes unitários para todos os hooks customizados
3. THE Test_Suite SHALL usar Jest como test runner
4. THE Test_Suite SHALL usar React Native Testing Library para testes de componentes
5. WHEN os testes são executados, THE Test_Suite SHALL passar sem erros
6. WHEN um componente é modificado, THE Test_Suite SHALL detectar regressões
7. THE Test_Suite SHALL ter testes de snapshot para componentes visuais

**Nota:** Testes de integração, E2E e cobertura de código são considerados pós-MVP e serão implementados em fases futuras.

---

## Notas Técnicas

### Stack Tecnológico Completo

**Core:**
- React Native 0.73+
- Expo 50+ (SDK)
- TypeScript 5.0+
- Node.js 18+ LTS

**UI & Styling:**
- React Native Paper 5.x (Material Design 3)
- Lucide React Native (ícones)
- React Native Reanimated 3.x (animações)
- React Native Gesture Handler (gestos)

**Navegação:**
- Expo Router (file-based routing)
- React Navigation 6.x (stack, tabs, modals)

**Mídia & Câmera:**
- Expo AV (vídeo/áudio playback)
- Expo Camera (gravação de vídeo)
- Expo Image Picker (seleção de imagens)
- @react-native-voice/voice (reconhecimento de voz)
- expo-speech (síntese de voz TTS)

**Estado & Dados:**
- Zustand (estado global)
- React Query (server state)
- AsyncStorage (persistência local)
- SecureStore (tokens criptografados)

**Networking:**
- Axios (HTTP client)
- Socket.io (WebSocket para tempo real)

**Formulários & Validação:**
- React Hook Form
- Zod (validação de schemas)

**Testes:**
- Jest (test runner)
- React Native Testing Library

### Estrutura de Pastas

```
influency-mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Auth Stack
│   ├── (onboarding)/             # Onboarding Stack
│   ├── (tabs)/                   # Main App (Bottom Tabs)
│   └── _layout.tsx               # Root layout
├── src/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── atoms/                # Componentes básicos
│   │   ├── molecules/            # Componentes compostos
│   │   └── organisms/            # Componentes complexos
│   ├── hooks/                    # Custom hooks
│   ├── services/                 # API services
│   ├── store/                    # Zustand stores
│   ├── types/                    # TypeScript types
│   ├── utils/                    # Utilitários
│   └── theme/                    # Design system
├── assets/                       # Assets estáticos
├── app.json                      # Expo config
├── package.json
└── tsconfig.json
```

### Organização em Ciclos

A implementação será organizada em ciclos (não usar estimativas de tempo):

**Ciclo 1: Fundação**
- Setup do projeto
- Design System
- Componentes base

**Ciclo 2: Autenticação & Onboarding**
- Auth Stack
- Onboarding Stack

**Ciclo 3: Navegação & Estrutura**
- MainStack com Bottom Tabs
- Navegação completa

**Ciclo 4: Assistente IA**
- AssistantScreen
- Reconhecimento de voz
- Chat híbrido

**Ciclo 5: Geração de Roteiros**
- ScriptGenerationModal
- SavedScriptsScreen
- EditScriptModal

**Ciclo 6: Gravação de Vídeo**
- TeleprompterSettingsScreen
- RecordingActiveScreen
- VideoPreviewScreen

**Ciclo 7: Edição de Vídeo**
- VideoEditScreen
- ProcessingVideoScreen
- VideoFinalPreviewScreen

**Ciclo 8: Carrosséis**
- CarouselGenerationScreen
- CarouselPreviewScreen
- EditSlideModal

**Ciclo 9: Publicação**
- SelectNetworksScreen
- CaptionHashtagsScreen
- SchedulePostScreen

**Ciclo 10: Biblioteca & Configurações**
- LibraryScreen
- SettingsScreen
- BrandAssetsScreen

**Ciclo 11: Integração & Testes**
- API Client
- Services
- Testes automatizados

**Ciclo 12: Polimento & Otimização**
- Performance
- Acessibilidade
- Build de produção

---

**Versão:** 1.0.0  
**Data:** 08/03/2026  
**Status:** ✅ REQUIREMENTS COMPLETOS  
**Próximo Passo:** Revisão e aprovação do usuário
