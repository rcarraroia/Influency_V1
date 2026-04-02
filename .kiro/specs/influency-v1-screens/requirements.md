# Documento de Requisitos - Influency v1 Screens

## Introdução

Este documento especifica os requisitos para a criação de todas as 51 telas do aplicativo Influency v2 usando o Stitch MCP server. O projeto visa gerar interfaces mobile-first profissionais, consistentes e prontas para implementação em React Native + Expo.

O Influency é um aplicativo mobile que auxilia criadoras de conteúdo a produzir vídeos virais através de um assistente IA híbrido (voz + texto), geração automática de roteiros, teleprompter inteligente, edição automatizada e publicação multi-rede.

## Glossário

- **Stitch**: Ferramenta de geração de interfaces web/mobile via MCP server
- **MCP Server**: Model Context Protocol server que permite integração com ferramentas externas
- **Tela**: Interface visual completa que representa um estado da aplicação
- **Stack**: Conjunto de telas organizadas em uma hierarquia de navegação
- **Modal**: Tela apresentada sobre outra, geralmente para ações rápidas
- **Bottom Tabs**: Navegação principal com abas na parte inferior da tela
- **Design System**: Conjunto de padrões visuais (cores, tipografia, espaçamento, componentes)
- **Material Design 3**: Sistema de design do Google, versão 3
- **Assistente_IA**: Sistema conversacional híbrido que aceita entrada por voz ou texto
- **Business_DNA**: Perfil personalizado do negócio do usuário (nicho, público, tom de voz)
- **Teleprompter**: Componente que exibe roteiro durante gravação com scroll automático
- **Carrossel**: Conjunto de slides para publicação em redes sociais
- **Viral_Score**: Métrica de 0 a 1 que indica potencial viral de um post
- **OAuth**: Protocolo de autenticação para conectar redes sociais
- **OTA_Update**: Over-The-Air update, atualização sem passar pelas lojas
- **EAS**: Expo Application Services, plataforma de build e deploy

## Requisitos

### Requisito 1: Criar Projeto Stitch

**User Story:** Como desenvolvedor, quero criar um projeto Stitch novo, para que eu possa gerar todas as telas do Influency v2 de forma organizada.

#### Acceptance Criteria

1. WHEN o projeto é criado, THE Stitch_MCP SHALL criar uma estrutura de projeto vazia
2. THE Stitch_MCP SHALL configurar o projeto com nome "influency-v1-screens"
3. THE Stitch_MCP SHALL permitir acesso completo para leitura e escrita de arquivos
4. THE Stitch_MCP SHALL manter histórico de todas as telas geradas

### Requisito 2: Aplicar Design System Consistente

**User Story:** Como designer, quero que todas as telas sigam o mesmo design system, para que o aplicativo tenha identidade visual consistente.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL aplicar a paleta de cores primária (#6200EE roxo) em todos os CTAs principais
2. THE Stitch_MCP SHALL aplicar a paleta de cores secundária (#03DAC6 teal) em ações secundárias
3. THE Stitch_MCP SHALL usar a fonte Roboto (Regular, Medium, SemiBold, Bold) em todas as telas
4. THE Stitch_MCP SHALL aplicar border radius de 4px (sm), 8px (md), 12px (lg), 16px (xl)
5. THE Stitch_MCP SHALL usar espaçamento base de 8px (xs=8, sm=12, base=16, lg=24, xl=32)
6. THE Stitch_MCP SHALL garantir touch targets mínimos de 44x44px para acessibilidade
7. THE Stitch_MCP SHALL aplicar Material Design 3 em todos os componentes

### Requisito 3: Gerar Telas de Autenticação e Onboarding

**User Story:** Como usuária nova, quero passar por um processo de autenticação e onboarding intuitivo, para que eu possa começar a usar o app rapidamente.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar SplashScreen com logo centralizado e loading spinner
2. THE Stitch_MCP SHALL gerar LoginScreen com inputs de email e senha
3. THE Stitch_MCP SHALL gerar RegisterScreen com inputs de nome, email, senha e confirmação
4. THE Stitch_MCP SHALL gerar WelcomeScreen com ilustração e botão "Começar"
5. THE Stitch_MCP SHALL gerar 5 telas de OnboardingScreen (perguntas do Business DNA)
6. WHEN cada pergunta de onboarding é exibida, THE Stitch_MCP SHALL incluir progress bar (1/5, 2/5, etc.)
7. THE Stitch_MCP SHALL gerar ConnectSocialNetworksScreen com cards de Instagram, TikTok e Facebook
8. THE Stitch_MCP SHALL gerar OnboardingCompleteScreen com ícone de sucesso e botão de conclusão
9. FOR ALL telas de autenticação, THE Stitch_MCP SHALL seguir o design system definido
10. THE Stitch_MCP SHALL incluir inputs híbridos (voz + texto) nas telas de onboarding
11. THE Stitch_MCP SHALL incluir botão "Pular por enquanto" na tela de conexão de redes sociais

### Requisito 4: Gerar Telas do Assistente IA

**User Story:** Como usuária, quero interagir com um assistente IA por voz ou texto, para que eu possa criar conteúdo de forma natural e conversacional.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar AssistantScreen com histórico de mensagens em ScrollView
2. WHEN AssistantScreen é exibida, THE Stitch_MCP SHALL incluir VoiceButton (microfone) no footer
3. WHEN AssistantScreen é exibida, THE Stitch_MCP SHALL incluir TextInput no footer
4. THE Stitch_MCP SHALL gerar ChatBubbles diferenciados para usuário (roxo) e assistente (cinza)
5. THE Stitch_MCP SHALL gerar ConversationHistoryScreen com lista de conversas anteriores
6. THE Stitch_MCP SHALL gerar AssistantSettingsScreen com toggles de configuração de voz
7. FOR ALL mensagens de voz, THE Stitch_MCP SHALL incluir ícone de microfone no ChatBubble
8. THE Stitch_MCP SHALL incluir FAB "Nova conversa" na ConversationHistoryScreen

### Requisito 5: Gerar Telas de Scripts

**User Story:** Como criadora de conteúdo, quero gerar roteiros virais automaticamente, para que eu economize tempo na criação de conteúdo.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar ScriptGenerationScreen com input "Sobre o que você quer falar?"
2. WHEN ScriptGenerationScreen é exibida, THE Stitch_MCP SHALL incluir slider de duração (30-300s)
3. THE Stitch_MCP SHALL gerar GeneratingScriptScreen com animação de loading e progress bar
4. THE Stitch_MCP SHALL gerar ScriptGeneratedScreen com card de roteiro completo
5. WHEN roteiro é exibido, THE Stitch_MCP SHALL incluir título, conteúdo scrollable, word count e duração
6. THE Stitch_MCP SHALL incluir botões "Editar", "Usar para Gravar" e "Salvar" no ScriptGeneratedScreen
7. THE Stitch_MCP SHALL gerar EditScriptScreen com input de título e textarea de conteúdo
8. WHEN EditScriptScreen é exibida, THE Stitch_MCP SHALL incluir word counter e duration estimator em tempo real
9. THE Stitch_MCP SHALL gerar SavedScriptsScreen com FlatList de roteiros salvos
10. THE Stitch_MCP SHALL incluir FAB "Novo roteiro" na SavedScriptsScreen

### Requisito 6: Gerar Telas de Gravação

**User Story:** Como criadora de conteúdo, quero gravar vídeos com teleprompter, para que eu possa seguir o roteiro sem decorar.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar ChooseScriptScreen com lista de roteiros disponíveis
2. THE Stitch_MCP SHALL incluir botão "Gravar sem roteiro" na ChooseScriptScreen
3. THE Stitch_MCP SHALL gerar TeleprompterSettingsScreen com dropdown de modo de scroll
4. WHEN TeleprompterSettingsScreen é exibida, THE Stitch_MCP SHALL incluir sliders de velocidade e tamanho de fonte
5. THE Stitch_MCP SHALL gerar RecordingActiveScreen com camera preview em fullscreen
6. WHEN RecordingActiveScreen é exibida, THE Stitch_MCP SHALL incluir overlay semi-transparente do teleprompter
7. THE Stitch_MCP SHALL incluir botão REC pulsando, timer e botões de pausar/parar
8. THE Stitch_MCP SHALL gerar VideoPreviewScreen com video player e botões de ação
9. THE Stitch_MCP SHALL incluir botões "Regravar", "Salvar e Editar" e "Salvar sem Editar"

### Requisito 7: Gerar Telas de Edição

**User Story:** Como criadora de conteúdo, quero editar vídeos automaticamente, para que eu não precise usar ferramentas complexas de edição.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar VideoEditScreen com video preview (thumbnail)
2. WHEN VideoEditScreen é exibida, THE Stitch_MCP SHALL incluir checkboxes de opções de edição
3. THE Stitch_MCP SHALL incluir opções: "Adicionar legendas", "Adicionar música", "Aplicar assets", "Cortes automáticos"
4. THE Stitch_MCP SHALL incluir dropdowns de "Estilo de legenda" e "Modo de corte"
5. THE Stitch_MCP SHALL incluir slider de "Volume da música"
6. THE Stitch_MCP SHALL gerar ProcessingVideoScreen com progress bar de etapas
7. WHEN ProcessingVideoScreen é exibida, THE Stitch_MCP SHALL mostrar etapas: "Transcrevendo", "Legendas", "Música", "Finalizando"
8. THE Stitch_MCP SHALL gerar VideoFinalPreviewScreen com video player do vídeo editado
9. THE Stitch_MCP SHALL incluir toggle "Ver antes/depois" no VideoFinalPreviewScreen
10. THE Stitch_MCP SHALL gerar SubtitlesCustomizationScreen como modal
11. WHEN SubtitlesCustomizationScreen é exibida, THE Stitch_MCP SHALL incluir preview de legenda, color pickers e slider de tamanho

### Requisito 8: Gerar Telas de Carrosséis

**User Story:** Como criadora de conteúdo, quero gerar carrosséis automaticamente, para que eu possa criar posts educativos rapidamente.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar CarouselGenerationScreen com input "Tema do carrossel"
2. WHEN CarouselGenerationScreen é exibida, THE Stitch_MCP SHALL incluir slider de número de slides (3-10)
3. THE Stitch_MCP SHALL gerar GeneratingCarouselScreen com animação de loading
4. THE Stitch_MCP SHALL gerar CarouselPreviewScreen com swiper de slides
5. WHEN CarouselPreviewScreen é exibida, THE Stitch_MCP SHALL incluir indicador de página (1/5)
6. THE Stitch_MCP SHALL incluir botões "Editar Slide", "Trocar Imagem" e "Publicar"
7. THE Stitch_MCP SHALL gerar EditSlideScreen como modal
8. WHEN EditSlideScreen é exibida, THE Stitch_MCP SHALL incluir image preview, input de título e textarea de conteúdo

### Requisito 9: Gerar Telas de Publicação

**User Story:** Como criadora de conteúdo, quero publicar em múltiplas redes sociais simultaneamente, para que eu economize tempo.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar SelectNetworksScreen com checkboxes de redes sociais
2. THE Stitch_MCP SHALL incluir opções: Instagram, TikTok, Facebook, YouTube
3. THE Stitch_MCP SHALL gerar CaptionHashtagsScreen com textarea de legenda e tag input de hashtags
4. WHEN CaptionHashtagsScreen é exibida, THE Stitch_MCP SHALL incluir botão "Gerar legenda com IA"
5. THE Stitch_MCP SHALL gerar SchedulePostScreen com radio buttons "Publicar agora" ou "Agendar"
6. WHEN "Agendar" é selecionado, THE Stitch_MCP SHALL exibir DateTimePicker
7. THE Stitch_MCP SHALL gerar PostConfirmationScreen com ícone de sucesso e lista de redes publicadas
8. THE Stitch_MCP SHALL incluir links para cada rede social no PostConfirmationScreen
9. THE Stitch_MCP SHALL gerar ScheduledPostsScreen com FlatList de posts agendados
10. THE Stitch_MCP SHALL incluir ações "Editar" e "Cancelar" em cada post agendado

### Requisito 10: Gerar Telas de Biblioteca

**User Story:** Como criadora de conteúdo, quero acessar todo meu conteúdo salvo, para que eu possa reutilizar e republicar.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar LibraryScreen com tabs internas: "Roteiros", "Vídeos", "Carrosséis"
2. THE Stitch_MCP SHALL gerar SavedVideosScreen com grid de vídeos (thumbnail, duração, data)
3. THE Stitch_MCP SHALL incluir FAB "Gravar novo" na SavedVideosScreen
4. THE Stitch_MCP SHALL gerar SavedCarouselsScreen com lista de carrosséis
5. WHEN SavedCarouselsScreen é exibida, THE Stitch_MCP SHALL mostrar preview do primeiro slide, título e número de slides
6. THE Stitch_MCP SHALL incluir FAB "Criar novo" na SavedCarouselsScreen

### Requisito 11: Gerar Telas de Assets

**User Story:** Como criadora de conteúdo, quero configurar meus assets de marca, para que eles sejam aplicados automaticamente nos vídeos.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar BrandAssetsScreen com lista de assets: Logo, Intro, Outro, Watermark
2. WHEN BrandAssetsScreen é exibida, THE Stitch_MCP SHALL mostrar status "Configurado" ou "Não configurado"
3. THE Stitch_MCP SHALL incluir botões "Adicionar" ou "Editar" para cada asset
4. THE Stitch_MCP SHALL gerar UploadAssetScreen como modal com image picker e preview
5. THE Stitch_MCP SHALL gerar ConfigureAssetScreen como modal
6. WHEN ConfigureAssetScreen é exibida, THE Stitch_MCP SHALL incluir preview do vídeo com asset
7. THE Stitch_MCP SHALL incluir dropdown de posição, sliders de opacidade e duração
8. THE Stitch_MCP SHALL incluir toggle "Aplicar automaticamente"

### Requisito 12: Gerar Telas de Configurações

**User Story:** Como usuária, quero configurar meu perfil e preferências, para que o app funcione do jeito que eu preciso.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar SettingsScreen com lista de opções de configuração
2. THE Stitch_MCP SHALL incluir opções: Perfil, Business DNA, Redes Sociais, Assets, Notificações, Sobre
3. THE Stitch_MCP SHALL gerar ProfileScreen com avatar editável e inputs de nome e email
4. THE Stitch_MCP SHALL incluir botão "Alterar Senha" no ProfileScreen
5. THE Stitch_MCP SHALL gerar BusinessDNASettingsScreen com card do Business DNA atual
6. WHEN BusinessDNASettingsScreen é exibida, THE Stitch_MCP SHALL mostrar nicho, público, tom de voz e objetivos
7. THE Stitch_MCP SHALL gerar SocialAccountsScreen com lista de contas conectadas
8. WHEN SocialAccountsScreen é exibida, THE Stitch_MCP SHALL mostrar avatar, username, status e botão de gerenciar
9. THE Stitch_MCP SHALL incluir FAB "Adicionar Rede" na SocialAccountsScreen
10. THE Stitch_MCP SHALL gerar NotificationsSettingsScreen com toggles de preferências
11. THE Stitch_MCP SHALL incluir seções: "Push Notifications", "Email", "Horário de Silêncio"
12. THE Stitch_MCP SHALL gerar IntegrationsScreen com cards de integrações externas

### Requisito 13: Gerar Telas de Analytics

**User Story:** Como criadora de conteúdo, quero ver métricas dos meus posts, para que eu entenda o que funciona melhor.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar AnalyticsScreen com DateRangePicker
2. WHEN AnalyticsScreen é exibida, THE Stitch_MCP SHALL incluir cards de métricas: Total de Posts, Views, Likes, Engajamento
3. THE Stitch_MCP SHALL incluir gráfico de linha de views ao longo do tempo
4. THE Stitch_MCP SHALL incluir seção "Top Posts" com FlatList dos 5 posts mais virais
5. THE Stitch_MCP SHALL gerar PostDetailsScreen com preview de vídeo/imagem
6. WHEN PostDetailsScreen é exibida, THE Stitch_MCP SHALL incluir tabs de métricas por rede social
7. THE Stitch_MCP SHALL incluir seção "Viral Score" com progress bar circular
8. WHEN Viral Score > 0.7, THE Stitch_MCP SHALL exibir badge "🔥 Viral"
9. THE Stitch_MCP SHALL incluir seção de legenda completa e hashtags
10. THE Stitch_MCP SHALL incluir botões de deep link para ver post em cada rede social

### Requisito 14: Gerar Tela de Análise de URL

**User Story:** Como criadora de conteúdo, quero analisar vídeos de outras pessoas, para que eu possa criar roteiros autorais inspirados neles.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar URLAnalysisScreen com input de URL
2. WHEN URLAnalysisScreen é exibida, THE Stitch_MCP SHALL incluir placeholder "Cole a URL do YouTube, TikTok ou Instagram"
3. THE Stitch_MCP SHALL incluir dropdown de duração do roteiro (30-300s)
4. THE Stitch_MCP SHALL incluir botão "Analisar e Gerar Roteiro"
5. WHEN análise está em progresso, THE Stitch_MCP SHALL exibir loading states: "Baixando vídeo", "Transcrevendo", "Gerando roteiro"
6. THE Stitch_MCP SHALL incluir progress bar de 0-100%
7. THE Stitch_MCP SHALL incluir seção "Plataformas suportadas" com ícones de YouTube, TikTok, Instagram

### Requisito 15: Gerar Bottom Navigation Bar

**User Story:** Como usuária, quero navegar facilmente entre as seções principais do app, para que eu acesse rapidamente o que preciso.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar Bottom Navigation Bar com 3 tabs
2. THE Stitch_MCP SHALL incluir tab "Assistente" com ícone de chat
3. THE Stitch_MCP SHALL incluir tab "Biblioteca" com ícone de pasta
4. THE Stitch_MCP SHALL incluir tab "Configurações" com ícone de engrenagem
5. WHEN uma tab está ativa, THE Stitch_MCP SHALL aplicar cor primária (#6200EE)
6. WHEN uma tab está inativa, THE Stitch_MCP SHALL aplicar cor cinza (#757575)
7. THE Stitch_MCP SHALL posicionar o Bottom Navigation Bar fixo na parte inferior da tela

### Requisito 16: Exportar Telas para Repositório

**User Story:** Como desenvolvedor, quero exportar todas as telas geradas, para que eu possa implementá-las no projeto React Native.

#### Acceptance Criteria

1. WHEN todas as telas são geradas, THE Stitch_MCP SHALL exportar arquivos HTML/CSS de cada tela
2. THE Stitch_MCP SHALL organizar telas em pastas por categoria (auth, assistant, scripts, etc.)
3. THE Stitch_MCP SHALL gerar arquivo de índice listando todas as telas
4. THE Stitch_MCP SHALL incluir screenshots de cada tela no export
5. THE Stitch_MCP SHALL gerar arquivo DESIGN.md com design system consolidado

### Requisito 17: Componentizar Telas

**User Story:** Como desenvolvedor, quero identificar componentes reutilizáveis, para que eu possa implementar o código de forma eficiente.

#### Acceptance Criteria

1. WHEN telas são exportadas, THE Stitch_MCP SHALL identificar componentes base: Button, Card, Input, Loading
2. THE Stitch_MCP SHALL identificar componentes específicos: VoiceButton, ChatBubble, VideoPlayer, TeleprompterView
3. THE Stitch_MCP SHALL gerar documentação de cada componente identificado
4. THE Stitch_MCP SHALL incluir props esperadas para cada componente
5. THE Stitch_MCP SHALL incluir exemplos de uso de cada componente

### Requisito 18: Validar Acessibilidade

**User Story:** Como usuária com necessidades especiais, quero que o app seja acessível, para que eu possa usá-lo sem barreiras.

#### Acceptance Criteria

1. FOR ALL botões e elementos interativos, THE Stitch_MCP SHALL garantir touch targets mínimos de 44x44px
2. FOR ALL textos, THE Stitch_MCP SHALL garantir contraste mínimo de 4.5:1 (WCAG AA)
3. FOR ALL textos grandes (18px+), THE Stitch_MCP SHALL garantir contraste mínimo de 3:1
4. FOR ALL ícones, THE Stitch_MCP SHALL garantir contraste mínimo de 3:1
5. THE Stitch_MCP SHALL incluir labels descritivos em todos os elementos interativos

### Requisito 19: Validar Responsividade Mobile

**User Story:** Como usuária, quero que o app funcione bem em diferentes tamanhos de tela, para que eu possa usar em qualquer dispositivo.

#### Acceptance Criteria

1. FOR ALL telas, THE Stitch_MCP SHALL otimizar para tela base de 390x844px (iPhone 14)
2. THE Stitch_MCP SHALL garantir que telas funcionem em telas de 320px a 428px de largura
3. THE Stitch_MCP SHALL usar unidades relativas (%, vh, vw) ao invés de pixels fixos
4. THE Stitch_MCP SHALL garantir que textos sejam legíveis sem zoom
5. THE Stitch_MCP SHALL garantir que elementos não sejam cortados em telas menores

### Requisito 20: Gerar Documentação de Navegação

**User Story:** Como desenvolvedor, quero entender a estrutura de navegação, para que eu possa implementar os navigators corretamente.

#### Acceptance Criteria

1. THE Stitch_MCP SHALL gerar diagrama de navegação completo
2. THE Stitch_MCP SHALL documentar AuthStack com 11 telas
3. THE Stitch_MCP SHALL documentar AssistantStack com 14 telas
4. THE Stitch_MCP SHALL documentar LibraryStack com 13 telas
5. THE Stitch_MCP SHALL documentar SettingsStack com 10 telas
6. THE Stitch_MCP SHALL documentar modais globais (3 telas)
7. THE Stitch_MCP SHALL incluir tipos de apresentação: stack, modal, fullscreen
8. THE Stitch_MCP SHALL incluir fluxos de navegação entre telas

---

**Última Atualização:** 08/03/2026  
**Versão:** 1.0.0  
**Status:** ✅ REQUISITOS COMPLETOS  
**Total de Requisitos:** 20 requisitos  
**Total de Critérios de Aceitação:** 150+ critérios
