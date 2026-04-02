# 🧭 NAVEGAÇÃO - INFLUENCY V1

**Versão:** 1.0.0  
**Data:** 08/03/2026  
**Total de Telas:** 51 telas

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Diagrama de Navegação](#diagrama-de-navegação)
3. [AuthStack](#authstack)
4. [OnboardingStack](#onboardingstack)
5. [MainStack (Bottom Tabs)](#mainstack-bottom-tabs)
6. [AnalyticsStack](#analyticsstack)
7. [Modais Globais](#modais-globais)
8. [Fluxos de Navegação](#fluxos-de-navegação)
9. [Parâmetros de Navegação](#parâmetros-de-navegação)
10. [Deep Links](#deep-links)

---

## 🎯 Visão Geral

O aplicativo Influency V1 possui uma arquitetura de navegação hierárquica com 5 stacks principais:

1. **AuthStack** - Autenticação (4 telas)
2. **OnboardingStack** - Onboarding inicial (4 telas)
3. **MainStack** - App principal com Bottom Tabs (3 tabs, 32 telas)
   - AssistantTab (16 telas)
   - LibraryTab (3 telas)
   - SettingsTab (9 telas, incluindo 3 de Assets)
4. **AnalyticsStack** - Métricas e análises (3 telas)
5. **Modais Globais** - Modais que podem ser abertos de qualquer lugar (2 telas)

**Total:** 51 telas organizadas em navegação lógica e intuitiva.

---

## 📊 Diagrama de Navegação

```
┌─────────────────────────────────────────────────────────────────┐
│                         ROOT NAVIGATOR                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
        │  AuthStack   │ │ Onboarding│ │  MainStack  │
        │   (4 telas)  │ │  (4 telas)│ │  (29 telas) │
        └──────────────┘ └───────────┘ └─────────────┘
                                              │
                        ┌─────────────────────┼─────────────────────┐
                        │                     │                     │
                ┌───────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
                │ AssistantTab   │  │   LibraryTab    │  │  SettingsTab    │
                │   (16 telas)   │  │    (3 telas)    │  │    (9 telas)    │
                └────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      MODAIS GLOBAIS (2)                         │
│  • ScriptGenerationModal                                        │
│  • EditScriptModal                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    ANALYTICS STACK (3)                          │
│  • AnalyticsScreen                                              │
│  • PostDetailsScreen                                            │
│  • URLAnalysisModal                                             │
└─────────────────────────────────────────────────────────────────┘
```


---

## 🔐 AuthStack

**Total:** 4 telas  
**Tipo:** Stack Navigator  
**Apresentação:** Fullscreen

### Telas

1. **SplashScreen** (`/splash`)
   - Tela inicial do app
   - Logo animado + loading
   - Verifica autenticação
   - **Navegação:**
     - → LoginScreen (se não autenticado)
     - → MainStack (se autenticado)

2. **LoginScreen** (`/login`)
   - Formulário de login (email + senha)
   - Link "Esqueci minha senha"
   - Link "Criar conta"
   - **Navegação:**
     - → ForgotPasswordScreen
     - → RegisterScreen
     - → OnboardingStack (após login bem-sucedido, primeira vez)
     - → MainStack (após login bem-sucedido, usuário existente)

3. **RegisterScreen** (`/register`)
   - Formulário de cadastro (nome, email, senha, confirmação)
   - Link "Já tenho conta"
   - **Navegação:**
     - ← LoginScreen
     - → OnboardingStack (após cadastro bem-sucedido)

4. **ForgotPasswordScreen** (`/forgot-password`)
   - Input de email
   - Botão "Enviar link de recuperação"
   - Mensagem de confirmação
   - **Navegação:**
     - ← LoginScreen

### Fluxo de Autenticação

```
SplashScreen
    │
    ├─ Não autenticado → LoginScreen
    │                        │
    │                        ├─ Esqueci senha → ForgotPasswordScreen
    │                        │                      │
    │                        │                      └─ Voltar → LoginScreen
    │                        │
    │                        ├─ Criar conta → RegisterScreen
    │                        │                    │
    │                        │                    └─ Login bem-sucedido → OnboardingStack
    │                        │
    │                        └─ Login bem-sucedido
    │                               │
    │                               ├─ Primeira vez → OnboardingStack
    │                               └─ Usuário existente → MainStack
    │
    └─ Autenticado → MainStack
```


---

## 🎓 OnboardingStack

**Total:** 4 telas  
**Tipo:** Stack Navigator  
**Apresentação:** Fullscreen

### Telas

1. **WelcomeScreen** (`/onboarding/welcome`)
   - Ilustração de boas-vindas
   - Título e subtítulo explicativo
   - Botão "Começar"
   - **Navegação:**
     - → OnboardingScreen (Business DNA)

2. **OnboardingScreen** (`/onboarding/business-dna`)
   - 5 perguntas do Business DNA (multi-step)
   - Progress bar (1/5, 2/5, etc.)
   - Input híbrido (voz + texto)
   - Botões "Voltar" e "Próximo"
   - **Perguntas:**
     1. Qual é o seu nicho?
     2. Quem é o seu público-alvo?
     3. Qual é o tom de voz da sua marca?
     4. Quais são seus objetivos?
     5. Quais são seus diferenciais?
   - **Navegação:**
     - ← Pergunta anterior
     - → Próxima pergunta
     - → ConnectSocialNetworksScreen (após última pergunta)

3. **ConnectSocialNetworksScreen** (`/onboarding/connect-social`)
   - Cards de redes sociais (Instagram, TikTok, Facebook)
   - Botões de conexão OAuth
   - Botão "Pular por enquanto"
   - **Navegação:**
     - → OnboardingCompleteScreen

4. **OnboardingCompleteScreen** (`/onboarding/complete`)
   - Ícone de sucesso animado
   - Mensagem de conclusão
   - Botão "Começar a Criar"
   - **Navegação:**
     - → MainStack (AssistantTab)

### Fluxo de Onboarding

```
WelcomeScreen
    │
    └─ Começar → OnboardingScreen (Business DNA)
                     │
                     ├─ Pergunta 1/5 → Pergunta 2/5 → ... → Pergunta 5/5
                     │
                     └─ Concluído → ConnectSocialNetworksScreen
                                        │
                                        ├─ Conectar redes sociais
                                        │
                                        └─ Pular/Concluir → OnboardingCompleteScreen
                                                                │
                                                                └─ Começar a Criar → MainStack
```


---

## 📱 MainStack (Bottom Tabs)

**Total:** 29 telas (3 tabs)  
**Tipo:** Bottom Tabs Navigator  
**Tabs:** AssistantTab, LibraryTab, SettingsTab

### Bottom Navigation Bar

```
┌─────────────────────────────────────────────────────────┐
│                    Screen Content                       │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  💬 Assistente  │  📁 Biblioteca  │  ⚙️ Configurações  │
│     (ativo)     │                 │                     │
└─────────────────────────────────────────────────────────┘
```

---

## 💬 AssistantTab

**Total:** 16 telas  
**Tipo:** Stack Navigator

### Telas Principais

1. **AssistantScreen** (`/assistant`)
   - Chat com assistente IA
   - ScrollView com ChatBubbles
   - Input de chat (voz + texto)
   - **Navegação:**
     - → ConversationHistoryScreen (ícone histórico)
     - → AssistantSettingsScreen (ícone configurações)
     - → ScriptGenerationModal (botão "Gerar Roteiro")

2. **ConversationHistoryScreen** (`/assistant/history`)
   - Lista de conversas anteriores
   - Preview da última mensagem
   - Timestamp
   - FAB "Nova conversa"
   - **Navegação:**
     - ← AssistantScreen
     - → AssistantScreen (selecionar conversa)

3. **AssistantSettingsScreen** (`/assistant/settings`)
   - Toggles de configuração de voz
   - Velocidade de fala, Tom de voz, Auto-play
   - Botão "Salvar"
   - **Navegação:**
     - ← AssistantScreen

### Fluxo de Scripts

4. **SavedScriptsScreen** (`/assistant/scripts`)
   - Lista de roteiros salvos
   - Preview (título, word count, data)
   - FAB "Novo roteiro"
   - **Navegação:**
     - → ScriptGenerationModal (FAB)
     - → EditScriptModal (editar roteiro)
     - → ChooseScriptScreen (usar roteiro)

5. **ChooseScriptScreen** (`/assistant/choose-script`)
   - Lista de roteiros disponíveis
   - Preview de cada roteiro
   - Botão "Gravar sem roteiro"
   - **Navegação:**
     - → TeleprompterSettingsScreen (selecionar roteiro)
     - → RecordingActiveScreen (gravar sem roteiro)

6. **TeleprompterSettingsScreen** (`/assistant/teleprompter-settings`)
   - Dropdown de modo de scroll (Auto, Manual, Voz)
   - Sliders de velocidade e tamanho de fonte
   - Preview do teleprompter
   - Botão "Iniciar Gravação"
   - **Navegação:**
     - → RecordingActiveScreen

### Fluxo de Gravação

7. **RecordingActiveScreen** (`/assistant/recording`)
   - **Apresentação:** Fullscreen
   - Camera preview fullscreen
   - Overlay do teleprompter
   - Timer de gravação
   - Botão REC pulsando
   - Botões Pause e Stop
   - **Navegação:**
     - → VideoPreviewScreen (após parar gravação)

8. **VideoPreviewScreen** (`/assistant/video-preview`)
   - Video player com controles
   - Botões "Regravar", "Salvar e Editar", "Salvar sem Editar"
   - **Navegação:**
     - ← RecordingActiveScreen (regravar)
     - → VideoEditScreen (salvar e editar)
     - → LibraryTab (salvar sem editar)

### Fluxo de Edição

9. **VideoEditScreen** (`/assistant/video-edit`)
   - Video preview (thumbnail)
   - Checkboxes: Legendas, Música, Assets, Cortes automáticos
   - Dropdowns: Estilo de legenda, Modo de corte
   - Slider: Volume da música
   - Botão "Processar Vídeo"
   - **Navegação:**
     - → SubtitlesCustomizationModal (customizar legendas)
     - → ProcessingVideoScreen (processar)

10. **ProcessingVideoScreen** (`/assistant/processing`)
    - **Apresentação:** Loading fullscreen
    - Progress bar de etapas
    - Etapas: Transcrevendo, Legendas, Música, Finalizando
    - **Navegação:**
      - → VideoFinalPreviewScreen (após processamento)

11. **VideoFinalPreviewScreen** (`/assistant/video-final`)
    - Video player do vídeo editado
    - Toggle "Ver antes/depois"
    - Botões "Editar Novamente" e "Publicar"
    - **Navegação:**
      - ← VideoEditScreen (editar novamente)
      - → SelectNetworksScreen (publicar)

### Fluxo de Carrosséis

12. **CarouselGenerationScreen** (`/assistant/carousel-generation`)
    - Input "Tema do carrossel"
    - Slider de número de slides (3-10)
    - Botão "Gerar Carrossel"
    - **Navegação:**
      - → GeneratingCarouselScreen

13. **GeneratingCarouselScreen** (`/assistant/carousel-generating`)
    - **Apresentação:** Loading
    - Animação de loading
    - Texto "Gerando carrossel..."
    - **Navegação:**
      - → CarouselPreviewScreen

14. **CarouselPreviewScreen** (`/assistant/carousel-preview`)
    - Swiper de slides
    - Indicador de página (1/5)
    - Botões "Editar Slide", "Trocar Imagem", "Publicar"
    - **Navegação:**
      - → EditSlideModal (editar slide)
      - → SelectNetworksScreen (publicar)

### Fluxo de Publicação

15. **SelectNetworksScreen** (`/assistant/select-networks`)
    - Checkboxes de redes sociais
    - Preview de cada rede
    - Botão "Próximo"
    - **Navegação:**
      - → CaptionHashtagsScreen

16. **CaptionHashtagsScreen** (`/assistant/caption-hashtags`)
    - Textarea de legenda
    - Tag input de hashtags
    - Botão "Gerar legenda com IA"
    - Botão "Próximo"
    - **Navegação:**
      - → SchedulePostScreen


17. **SchedulePostScreen** (`/assistant/schedule-post`)
    - Radio buttons "Publicar agora" ou "Agendar"
    - DateTimePicker (quando "Agendar" selecionado)
    - Botão "Publicar"
    - **Navegação:**
      - → PostConfirmationScreen (publicar agora)
      - → ScheduledPostsScreen (agendar)

18. **PostConfirmationScreen** (`/assistant/post-confirmation`)
    - Ícone de sucesso animado
    - Lista de redes publicadas
    - Links para cada rede social
    - Botão "Ver Analytics"
    - **Navegação:**
      - → AnalyticsScreen (ver analytics)
      - → AssistantScreen (voltar ao início)

19. **ScheduledPostsScreen** (`/assistant/scheduled-posts`)
    - Lista de posts agendados
    - Preview (thumbnail, legenda, data)
    - Ações "Editar" e "Cancelar"
    - **Navegação:**
      - → SchedulePostScreen (editar)

### Fluxo Completo do AssistantTab

```
AssistantScreen (Chat)
    │
    ├─ Histórico → ConversationHistoryScreen
    ├─ Configurações → AssistantSettingsScreen
    │
    └─ Gerar Roteiro → ScriptGenerationModal
                           │
                           └─ Roteiro gerado → SavedScriptsScreen
                                                   │
                                                   └─ Usar roteiro → ChooseScriptScreen
                                                                         │
                                                                         └─ Configurar → TeleprompterSettingsScreen
                                                                                             │
                                                                                             └─ Gravar → RecordingActiveScreen
                                                                                                             │
                                                                                                             └─ Preview → VideoPreviewScreen
                                                                                                                             │
                                                                                                                             ├─ Regravar → RecordingActiveScreen
                                                                                                                             │
                                                                                                                             └─ Editar → VideoEditScreen
                                                                                                                                             │
                                                                                                                                             └─ Processar → ProcessingVideoScreen
                                                                                                                                                                 │
                                                                                                                                                                 └─ Preview Final → VideoFinalPreviewScreen
                                                                                                                                                                                         │
                                                                                                                                                                                         └─ Publicar → SelectNetworksScreen
                                                                                                                                                                                                         │
                                                                                                                                                                                                         └─ Legenda → CaptionHashtagsScreen
                                                                                                                                                                                                                         │
                                                                                                                                                                                                                         └─ Agendar → SchedulePostScreen
                                                                                                                                                                                                                                         │
                                                                                                                                                                                                                                         └─ Confirmar → PostConfirmationScreen
```


---

## 📁 LibraryTab

**Total:** 3 telas  
**Tipo:** Stack Navigator

### Telas

1. **LibraryScreen** (`/library`)
   - Tabs internas: "Roteiros", "Vídeos", "Carrosséis"
   - Navegação entre tabs
   - **Navegação:**
     - → SavedScriptsScreen (tab Roteiros)
     - → SavedVideosScreen (tab Vídeos)
     - → SavedCarouselsScreen (tab Carrosséis)

2. **SavedVideosScreen** (`/library/videos`)
   - Grid de vídeos (thumbnail, duração, data)
   - FAB "Gravar novo"
   - Ações: Editar, Publicar, Excluir
   - **Navegação:**
     - → RecordingActiveScreen (FAB)
     - → VideoEditScreen (editar)
     - → SelectNetworksScreen (publicar)

3. **SavedCarouselsScreen** (`/library/carousels`)
   - Lista de carrosséis
   - Preview do primeiro slide, título, número de slides
   - FAB "Criar novo"
   - Ações: Editar, Publicar, Excluir
   - **Navegação:**
     - → CarouselGenerationScreen (FAB)
     - → CarouselPreviewScreen (editar)
     - → SelectNetworksScreen (publicar)

### Fluxo do LibraryTab

```
LibraryScreen (Tabs)
    │
    ├─ Tab Roteiros → SavedScriptsScreen
    │                     │
    │                     └─ Novo roteiro → ScriptGenerationModal
    │
    ├─ Tab Vídeos → SavedVideosScreen
    │                   │
    │                   ├─ Gravar novo → RecordingActiveScreen
    │                   ├─ Editar → VideoEditScreen
    │                   └─ Publicar → SelectNetworksScreen
    │
    └─ Tab Carrosséis → SavedCarouselsScreen
                            │
                            ├─ Criar novo → CarouselGenerationScreen
                            ├─ Editar → CarouselPreviewScreen
                            └─ Publicar → SelectNetworksScreen
```


---

## ⚙️ SettingsTab

**Total:** 9 telas (6 principais + 3 Assets)  
**Tipo:** Stack Navigator

### Telas

1. **SettingsScreen** (`/settings`)
   - Lista de opções:
     - Perfil
     - Business DNA
     - Redes Sociais
     - Assets de Marca
     - Notificações
     - Sobre
   - **Navegação:**
     - → ProfileScreen
     - → BusinessDNASettingsScreen
     - → SocialAccountsScreen
     - → BrandAssetsScreen
     - → NotificationsSettingsScreen
     - → IntegrationsScreen

2. **ProfileScreen** (`/settings/profile`)
   - Avatar editável
   - Inputs de nome e email
   - Botão "Alterar Senha"
   - Botão "Salvar"
   - **Navegação:**
     - ← SettingsScreen

3. **BusinessDNASettingsScreen** (`/settings/business-dna`)
   - Card do Business DNA atual
   - Campos: Nicho, Público, Tom de voz, Objetivos
   - Botão "Editar Business DNA"
   - **Navegação:**
     - ← SettingsScreen
     - → OnboardingScreen (editar Business DNA)

4. **SocialAccountsScreen** (`/settings/social-accounts`)
   - Lista de contas conectadas
   - Avatar, username, status
   - Botão de gerenciar
   - FAB "Adicionar Rede"
   - **Navegação:**
     - ← SettingsScreen
     - → ConnectSocialNetworksScreen (adicionar rede)

5. **NotificationsSettingsScreen** (`/settings/notifications`)
   - Toggles de preferências
   - Seções: Push Notifications, Email, Horário de Silêncio
   - Botão "Salvar"
   - **Navegação:**
     - ← SettingsScreen

6. **IntegrationsScreen** (`/settings/integrations`)
   - Cards de integrações externas
   - Status de cada integração
   - Botões de conectar/desconectar
   - **Navegação:**
     - ← SettingsScreen

### Telas de Assets (Sub-stack)

7. **BrandAssetsScreen** (`/settings/assets`)
   - Lista de assets: Logo, Intro, Outro, Watermark
   - Status "Configurado" ou "Não configurado"
   - Botões "Adicionar" ou "Editar"
   - **Navegação:**
     - → UploadAssetModal (adicionar)
     - → ConfigureAssetModal (editar)

8. **UploadAssetModal** (`/settings/assets/upload`)
   - **Apresentação:** Modal
   - Image picker
   - Preview do asset
   - Botões "Cancelar" e "Upload"
   - **Navegação:**
     - ← BrandAssetsScreen

9. **ConfigureAssetModal** (`/settings/assets/configure`)
   - **Apresentação:** Modal
   - Preview do vídeo com asset
   - Dropdown de posição
   - Sliders de opacidade e duração
   - Toggle "Aplicar automaticamente"
   - Botões "Cancelar" e "Salvar"
   - **Navegação:**
     - ← BrandAssetsScreen

### Fluxo do SettingsTab

```
SettingsScreen (Menu)
    │
    ├─ Perfil → ProfileScreen
    │
    ├─ Business DNA → BusinessDNASettingsScreen
    │                     │
    │                     └─ Editar → OnboardingScreen
    │
    ├─ Redes Sociais → SocialAccountsScreen
    │                       │
    │                       └─ Adicionar → ConnectSocialNetworksScreen
    │
    ├─ Assets → BrandAssetsScreen
    │               │
    │               ├─ Adicionar → UploadAssetModal
    │               └─ Editar → ConfigureAssetModal
    │
    ├─ Notificações → NotificationsSettingsScreen
    │
    └─ Integrações → IntegrationsScreen
```


---

## 🎭 Modais Globais

**Total:** 2 modais  
**Apresentação:** Modal (podem ser abertos de qualquer tela)

### 1. ScriptGenerationModal

**Rota:** `/modals/script-generation`  
**Apresentação:** Modal bottom sheet

**Conteúdo:**
- Input "Sobre o que você quer falar?" (textarea)
- Slider de duração (30-300s)
- Card de dica com ícone de lâmpada
- Botão "Gerar Roteiro"

**Navegação:**
- → GeneratingScriptScreen (loading)
- → ScriptGeneratedScreen (resultado)

**Pode ser aberto de:**
- AssistantScreen
- SavedScriptsScreen
- LibraryScreen (tab Roteiros)

---

### 2. EditScriptModal

**Rota:** `/modals/edit-script`  
**Apresentação:** Modal fullscreen

**Conteúdo:**
- Input de título
- Textarea de conteúdo
- Word counter em tempo real
- Duration estimator em tempo real
- Botões "Cancelar" e "Salvar"

**Navegação:**
- ← Fechar modal (cancelar)
- ← Fechar modal (salvar)

**Pode ser aberto de:**
- ScriptGeneratedScreen
- SavedScriptsScreen
- LibraryScreen (tab Roteiros)

---

## 📊 AnalyticsStack

**Total:** 3 telas  
**Tipo:** Stack Navigator  
**Apresentação:** Pode ser acessado de várias telas do app

### Telas

1. **AnalyticsScreen** (`/analytics`)
   - Dashboard principal de métricas
   - DateRangePicker ("Últimos 30 dias")
   - Cards de métricas:
     - Total de Posts
     - Total de Views
     - Total de Likes
     - Engajamento Médio
   - Gráfico de linha (views ao longo do tempo)
   - Seção "Top Posts" com lista de posts por engajamento
   - Botão "Atualizar Métricas"
   - **Navegação:**
     - → PostDetailsScreen (selecionar post)

2. **PostDetailsScreen** (`/analytics/post/:postId`)
   - Detalhes e métricas de um post específico
   - Video/Image preview
   - Tabs de métricas por rede (Instagram, TikTok, Facebook)
   - Cards de métricas por rede:
     - Views, Likes, Comments
     - Shares, Saves
     - Reach, Impressions
   - Seção "Viral Score":
     - Progress bar circular
     - Score percentual (0-100%)
     - Badge "🔥 Viral" (se score > 70%)
   - Seção "Legenda":
     - Texto completo
     - Hashtags
   - Seção "Publicado em":
     - Data e hora
     - Redes sociais
   - Botões:
     - "Ver no Instagram" (deep link)
     - "Ver no TikTok" (deep link)
     - "Duplicar Post"
   - **Navegação:**
     - ← AnalyticsScreen

3. **URLAnalysisModal** (`/analytics/url-analysis`)
   - **Apresentação:** Modal bottom sheet
   - Input de URL do vídeo
   - Placeholder: "Cole a URL do YouTube, TikTok ou Instagram"
   - Validação de URL
   - Dropdown de duração do roteiro (30-300s)
   - Botão "Analisar e Gerar Roteiro"
   - Loading states:
     - "Baixando vídeo..." (0%)
     - "Transcrevendo áudio..." (33%)
     - "Gerando roteiro autoral..." (66%)
     - "Concluído!" (100%)
   - Progress bar de 0-100%
   - Seção "Plataformas suportadas":
     - Instagram
     - TikTok
     - YouTube
   - **Navegação:**
     - → GeneratingScriptScreen (loading)
     - → ScriptGeneratedScreen (resultado)
   - **Pode ser aberto de:**
     - AssistantScreen (botão flutuante)
     - AnalyticsScreen
     - Qualquer tela do app (ação global)

### Fluxo do AnalyticsStack

```
AnalyticsScreen (Dashboard)
    │
    ├─ Selecionar post → PostDetailsScreen
    │                        │
    │                        ├─ Ver no Instagram → Deep link
    │                        ├─ Ver no TikTok → Deep link
    │                        └─ Duplicar Post → SelectNetworksScreen
    │
    └─ Analisar URL → URLAnalysisModal
                          │
                          └─ Analisar → GeneratingScriptScreen
                                            │
                                            └─ Resultado → ScriptGeneratedScreen
```

---

### 3. URLAnalysisModal

**Rota:** `/modals/url-analysis`  
**Apresentação:** Modal bottom sheet

**Conteúdo:**
- Input de URL
- Dropdown de duração do roteiro (30-300s)
- Botão "Analisar e Gerar Roteiro"
- Loading states: "Baixando vídeo", "Transcrevendo", "Gerando roteiro"
- Progress bar de 0-100%
- Seção "Plataformas suportadas" (Instagram, TikTok, YouTube)

**Navegação:**
- → GeneratingScriptScreen (loading)
- → ScriptGeneratedScreen (resultado)

**Pode ser aberto de:**
- AssistantScreen (botão flutuante)
- Qualquer tela do app (ação global)

---

### Fluxo de Modais

```
Qualquer Tela
    │
    ├─ Gerar Roteiro → ScriptGenerationModal
    │                      │
    │                      └─ Gerar → GeneratingScriptScreen
    │                                     │
    │                                     └─ Resultado → ScriptGeneratedScreen
    │                                                         │
    │                                                         └─ Editar → EditScriptModal
    │
    └─ Editar Roteiro → EditScriptModal
                            │
                            └─ Salvar → Fechar modal
```


---

## 🔄 Fluxos de Navegação

### Fluxo 1: Primeiro Acesso

```
SplashScreen
    │
    └─ Não autenticado → LoginScreen
                             │
                             └─ Criar conta → RegisterScreen
                                                 │
                                                 └─ Cadastro → OnboardingStack
                                                                   │
                                                                   ├─ WelcomeScreen
                                                                   ├─ OnboardingScreen (Business DNA)
                                                                   ├─ ConnectSocialNetworksScreen
                                                                   └─ OnboardingCompleteScreen
                                                                           │
                                                                           └─ MainStack (AssistantTab)
```

### Fluxo 2: Criar Vídeo Completo

```
AssistantScreen
    │
    └─ Gerar Roteiro → ScriptGenerationModal
                           │
                           └─ Roteiro gerado → SavedScriptsScreen
                                                   │
                                                   └─ Usar → ChooseScriptScreen
                                                                 │
                                                                 └─ Configurar → TeleprompterSettingsScreen
                                                                                     │
                                                                                     └─ Gravar → RecordingActiveScreen
                                                                                                     │
                                                                                                     └─ Preview → VideoPreviewScreen
                                                                                                                     │
                                                                                                                     └─ Editar → VideoEditScreen
                                                                                                                                     │
                                                                                                                                     └─ Processar → ProcessingVideoScreen
                                                                                                                                                         │
                                                                                                                                                         └─ Preview Final → VideoFinalPreviewScreen
                                                                                                                                                                                 │
                                                                                                                                                                                 └─ Publicar → SelectNetworksScreen
                                                                                                                                                                                                 │
                                                                                                                                                                                                 └─ Legenda → CaptionHashtagsScreen
                                                                                                                                                                                                                 │
                                                                                                                                                                                                                 └─ Agendar → SchedulePostScreen
                                                                                                                                                                                                                                 │
                                                                                                                                                                                                                                 └─ Confirmar → PostConfirmationScreen
```

### Fluxo 3: Criar Carrossel

```
LibraryScreen (Tab Carrosséis)
    │
    └─ Criar novo → CarouselGenerationScreen
                        │
                        └─ Gerar → GeneratingCarouselScreen
                                       │
                                       └─ Preview → CarouselPreviewScreen
                                                        │
                                                        ├─ Editar slide → EditSlideModal
                                                        │
                                                        └─ Publicar → SelectNetworksScreen
                                                                          │
                                                                          └─ Legenda → CaptionHashtagsScreen
                                                                                          │
                                                                                          └─ Agendar → SchedulePostScreen
                                                                                                          │
                                                                                                          └─ Confirmar → PostConfirmationScreen
```

### Fluxo 4: Gerenciar Configurações

```
SettingsScreen
    │
    ├─ Perfil → ProfileScreen
    │               │
    │               └─ Alterar dados → Salvar
    │
    ├─ Business DNA → BusinessDNASettingsScreen
    │                     │
    │                     └─ Editar → OnboardingScreen (re-onboarding)
    │
    ├─ Redes Sociais → SocialAccountsScreen
    │                       │
    │                       ├─ Adicionar → ConnectSocialNetworksScreen
    │                       └─ Gerenciar → Desconectar/Reconectar
    │
    └─ Assets → BrandAssetsScreen
                    │
                    ├─ Adicionar → UploadAssetModal
                    └─ Editar → ConfigureAssetModal
```


---

## 📦 Parâmetros de Navegação

### Tipos de Parâmetros

#### 1. ID de Recursos

```typescript
// Navegar para tela de edição de roteiro
router.push({
  pathname: '/assistant/edit-script',
  params: { scriptId: '123' }
});

// Navegar para preview de vídeo
router.push({
  pathname: '/assistant/video-preview',
  params: { videoId: '456' }
});
```

#### 2. Modo de Apresentação

```typescript
// Abrir como modal
router.push({
  pathname: '/modals/script-generation',
  params: { mode: 'modal' }
});

// Abrir como fullscreen
router.push({
  pathname: '/assistant/recording',
  params: { mode: 'fullscreen' }
});
```

#### 3. Dados de Contexto

```typescript
// Passar dados do roteiro para gravação
router.push({
  pathname: '/assistant/recording',
  params: {
    scriptId: '123',
    scriptText: 'Texto do roteiro...',
    duration: 60
  }
});

// Passar configurações do teleprompter
router.push({
  pathname: '/assistant/recording',
  params: {
    scrollMode: 'auto',
    scrollSpeed: 50,
    fontSize: 24
  }
});
```

#### 4. Flags de Estado

```typescript
// Indicar que é primeira vez
router.push({
  pathname: '/onboarding/welcome',
  params: { isFirstTime: true }
});

// Indicar que vem de edição
router.push({
  pathname: '/assistant/video-preview',
  params: { fromEdit: true }
});
```

### Exemplos de Uso

```typescript
// Receber parâmetros na tela
import { useLocalSearchParams } from 'expo-router';

export default function VideoPreviewScreen() {
  const { videoId, fromEdit } = useLocalSearchParams();
  
  // Usar parâmetros
  const video = useVideo(videoId);
  const showEditButton = !fromEdit;
  
  return (
    <View>
      <VideoPlayer source={video.url} />
      {showEditButton && (
        <Button onPress={() => router.push('/assistant/video-edit')}>
          Editar
        </Button>
      )}
    </View>
  );
}
```


---

## 🔗 Deep Links

### Esquema de Deep Links

**Formato:** `influency://[rota]?[params]`

### Exemplos de Deep Links

#### 1. Abrir tela específica

```
influency://assistant
influency://library
influency://settings
```

#### 2. Abrir tela com parâmetros

```
influency://assistant/script/123
influency://library/video/456
influency://settings/profile
```

#### 3. Abrir modal

```
influency://modals/script-generation
influency://modals/url-analysis?url=https://instagram.com/p/abc123
```

#### 4. Ações diretas

```
influency://assistant/record
influency://assistant/generate-script
influency://library/create-carousel
```

### Configuração de Deep Links

```typescript
// app.json
{
  "expo": {
    "scheme": "influency",
    "ios": {
      "bundleIdentifier": "com.renum.influency",
      "associatedDomains": ["applinks:influency.app"]
    },
    "android": {
      "package": "com.renum.influency",
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "influency"
            },
            {
              "scheme": "https",
              "host": "influency.app"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### Universal Links (iOS) e App Links (Android)

```
https://influency.app/assistant
https://influency.app/library/video/123
https://influency.app/settings/profile
```

### Handling Deep Links

```typescript
// app/_layout.tsx
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';

export default function RootLayout() {
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { path, queryParams } = Linking.parse(event.url);
      
      if (path) {
        router.push({
          pathname: path,
          params: queryParams
        });
      }
    };

    // Listen for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if app was opened with a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <Stack />;
}
```


---

## 📊 Resumo de Navegação

### Contagem de Telas por Stack

| Stack | Telas | Tipo |
|-------|-------|------|
| **AuthStack** | 4 | Stack Navigator |
| **OnboardingStack** | 4 | Stack Navigator |
| **MainStack** | 32 | Bottom Tabs + Stack |
| ├─ AssistantTab | 16 | Stack Navigator |
| ├─ LibraryTab | 3 | Stack Navigator |
| └─ SettingsTab | 9 | Stack Navigator |
| **├─ Assets (sub-stack)** | 3 | Modal |
| **Modais Globais** | 2 | Modal |
| **AnalyticsStack** | 3 | Stack Navigator |
| **Carousels (sub-stack)** | 4 | Stack Navigator |
| **Publication (sub-stack)** | 5 | Stack Navigator |
| **TOTAL** | **51** | - |

### Tipos de Apresentação

| Tipo | Quantidade | Exemplos |
|------|------------|----------|
| **Stack** | 43 | LoginScreen, AssistantScreen, LibraryScreen, AnalyticsScreen |
| **Modal** | 5 | ScriptGenerationModal, EditScriptModal, UploadAssetModal |
| **Fullscreen** | 3 | SplashScreen, RecordingActiveScreen, ProcessingVideoScreen |

### Navegadores Utilizados

1. **Stack Navigator** - Navegação empilhada (push/pop)
   - AuthStack
   - OnboardingStack
   - AssistantTab
   - LibraryTab
   - SettingsTab

2. **Bottom Tabs Navigator** - Tabs na parte inferior
   - MainStack (3 tabs)

3. **Modal Presentation** - Apresentação modal
   - ScriptGenerationModal
   - EditScriptModal
   - URLAnalysisModal (Analytics)
   - UploadAssetModal
   - ConfigureAssetModal
   - EditSlideModal

---

## 🎯 Boas Práticas de Navegação

### 1. Navegação Consistente
- Use sempre `router.push()` para navegar para frente
- Use `router.back()` para voltar
- Use `router.replace()` para substituir a tela atual

### 2. Parâmetros Tipados
```typescript
// Definir tipos de parâmetros
type VideoPreviewParams = {
  videoId: string;
  fromEdit?: boolean;
};

// Usar com type safety
const params: VideoPreviewParams = {
  videoId: '123',
  fromEdit: true
};

router.push({
  pathname: '/assistant/video-preview',
  params
});
```

### 3. Navegação Condicional
```typescript
// Verificar autenticação antes de navegar
if (isAuthenticated) {
  router.push('/assistant');
} else {
  router.push('/login');
}
```

### 4. Prevenção de Navegação
```typescript
// Prevenir navegação se há mudanças não salvas
const hasUnsavedChanges = true;

if (hasUnsavedChanges) {
  Alert.alert(
    'Descartar alterações?',
    'Você tem alterações não salvas.',
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Descartar', onPress: () => router.back() }
    ]
  );
} else {
  router.back();
}
```

### 5. Loading States
```typescript
// Mostrar loading durante navegação
const [isNavigating, setIsNavigating] = useState(false);

const handleNavigate = async () => {
  setIsNavigating(true);
  await saveData();
  router.push('/next-screen');
  setIsNavigating(false);
};
```

---

## 🔗 Recursos Adicionais

### Documentação Relacionada
- [DESIGN.md](./DESIGN.md) - Design System completo
- [COMPONENTS.md](./COMPONENTS.md) - Biblioteca de componentes
- [CONVERSION-GUIDE.md](./CONVERSION-GUIDE.md) - Guia de conversão HTML → React Native

### Documentação Oficial
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [Deep Linking](https://docs.expo.dev/guides/linking/)

---

**Versão:** 1.1.0  
**Última Atualização:** 08/03/2026  
**Mantido por:** Equipe Influency

**Changelog v1.1.0:**
- Corrigido: SettingsTab agora mostra 9 telas (6 principais + 3 Assets)
- Adicionado: Seção AnalyticsStack detalhando as 3 telas (AnalyticsScreen, PostDetailsScreen, URLAnalysisModal)
- Movido: URLAnalysisModal de Modais Globais para AnalyticsStack
- Atualizado: Modais Globais agora tem 2 telas (ScriptGenerationModal, EditScriptModal)
- Atualizado: Diagrama de navegação e tabela de resumo refletem as contagens corretas

