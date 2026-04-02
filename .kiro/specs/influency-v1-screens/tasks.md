# Plano de Implementação: Influency v1 Screens

## Visão Geral

Este plano detalha a implementação completa de 51 telas mobile-first do aplicativo Influency v2 usando Stitch MCP. O projeto será executado em 8 dias úteis, seguindo a ordem de dependências de navegação e garantindo consistência visual através de um design system rigoroso.

## Tarefas

- [x] 1. Configurar projeto Stitch e design system base
  - Criar projeto Stitch "influency-v1-screens" com viewport 390x844px
  - Configurar arquivo design-system.json com tokens (cores, tipografia, espaçamento)
  - Validar configuração inicial do projeto
  - _Requisitos: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3_

- [x] 2. Criar biblioteca de componentes reutilizáveis
  - [x] 2.1 Criar componentes base (átomos)
    - Implementar Button (primary, secondary, outline, text)
    - Implementar Card (elevated, outlined, flat)
    - Implementar Input (text, password, multiline)
    - Implementar Badge, Chip, Loading, ProgressBar
    - _Requisitos: 2.4, 2.5, 2.6, 17.1, 17.2_
  
  - [x] 2.2 Criar componentes compostos (moléculas)
    - Implementar VoiceButton com animação de pulso
    - Implementar ChatBubble (usuário e assistente)
    - Implementar VideoPlayer com controles
    - Implementar TeleprompterView com scroll
    - _Requisitos: 4.2, 4.4, 6.6, 17.3_
  
  - [x] 2.3 Validar componentes base
    - Verificar design system aplicado (cores, tipografia, espaçamento)
    - Validar touch targets mínimos de 44x44px
    - Validar contraste de cores (mínimo 4.5:1)
    - _Requisitos: 18.1, 18.2, 18.3_

- [x] 3. Checkpoint - Validar fundação do projeto
  - Garantir que todos os componentes base estão funcionais e consistentes. Perguntar ao usuário se há dúvidas ou ajustes necessários antes de prosseguir.

- [x] 4. Gerar telas de autenticação (Auth Stack - 4 telas principais)
  - [x] 4.1 Criar SplashScreen
    - Implementar background gradiente roxo (#6200EE → #7F39FB)
    - Adicionar logo centralizado (120x120px)
    - Adicionar loading spinner animado
    - Adicionar versão do app no rodapé
    - _Requisitos: 3.1, 19.1_
  
  - [x] 4.2 Criar LoginScreen
    - Implementar header com logo e título "Bem-vinda de volta!"
    - Adicionar inputs de email e senha com validação
    - Adicionar link "Esqueci minha senha"
    - Adicionar botão "Entrar" com loading state
    - Adicionar link "Criar conta"
    - _Requisitos: 3.2, 18.1, 19.4_
  
  - [x] 4.3 Criar ForgotPasswordScreen
    - Implementar header com título "Recuperar Senha"
    - Adicionar input de email com validação
    - Adicionar botão "Enviar link de recuperação"
    - Adicionar link "Voltar para login"
    - Adicionar mensagem de confirmação após envio
    - _Requisitos: 3.2, 18.1_
  
  - [x] 4.4 Criar RegisterScreen
    - Implementar form com inputs de nome, email, senha e confirmação
    - Adicionar validação em tempo real
    - Adicionar botão "Criar Conta" com loading state
    - Adicionar link "Já tenho conta"
    - _Requisitos: 3.3, 18.1_

- [x] 5. Gerar telas de onboarding (8 telas)
  - [x] 5.1 Criar WelcomeScreen
    - Implementar ilustração de boas-vindas
    - Adicionar título e subtítulo explicativo
    - Adicionar botão "Começar"
    - _Requisitos: 3.4_
  
  - [x] 5.2 Criar OnboardingScreen (5 perguntas do Business DNA)
    - Implementar progress bar (1/5, 2/5, etc.)
    - Adicionar input híbrido (voz + texto) para cada pergunta
    - Adicionar botões "Voltar" e "Próximo"
    - Perguntas: Nicho, Público-alvo, Tom de voz, Objetivos, Diferenciais
    - _Requisitos: 3.5, 3.6, 3.10_
  
  - [x] 5.3 Criar ConnectSocialNetworksScreen
    - Implementar cards de Instagram, TikTok e Facebook
    - Adicionar botões de conexão OAuth
    - Adicionar botão "Pular por enquanto"
    - _Requisitos: 3.7, 3.11_
  
  - [x] 5.4 Criar OnboardingCompleteScreen
    - Implementar ícone de sucesso animado
    - Adicionar mensagem de conclusão
    - Adicionar botão "Começar a Criar"
    - _Requisitos: 3.8_
  
  - [x] 5.5 Validar fluxo de onboarding
    - Verificar navegação sequencial entre telas
    - Validar progress bar atualiza corretamente
    - Verificar design system consistente
    - _Requisitos: 3.9, 19.1_

- [x] 6. Criar componente Bottom Navigation Bar
  - Implementar 3 tabs: Assistente, Biblioteca, Configurações
  - Adicionar ícones (chat, pasta, engrenagem)
  - Aplicar cor primária (#6200EE) para tab ativa
  - Aplicar cor cinza (#757575) para tabs inativas
  - Posicionar fixo na parte inferior
  - _Requisitos: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_

- [x] 7. Checkpoint - Validar fundação e navegação
  - Garantir que Auth Stack e Onboarding estão completos e navegação principal está funcional. Perguntar ao usuário se há ajustes necessários.

- [x] 8. Gerar telas do AssistantStack (16 telas completas)
  - [x] 8.1 Criar AssistantScreen (tela principal do chat)
    - Implementar header com título "Assistente IA" e ícones de menu/histórico
    - Adicionar ScrollView com ChatBubbles (usuário e assistente)
    - Implementar footer com VoiceButton, TextInput e SendButton
    - Adicionar KeyboardAvoidingView para iOS
    - Implementar scroll automático para última mensagem
    - _Requisitos: 4.1, 4.2, 4.3, 4.4, 4.7_
  
  - [x] 8.2 Criar ConversationHistoryScreen
    - Implementar lista de conversas anteriores
    - Adicionar preview da última mensagem
    - Adicionar timestamp de cada conversa
    - Adicionar FAB "Nova conversa"
    - _Requisitos: 4.5, 4.8_
  
  - [x] 8.3 Criar AssistantSettingsScreen
    - Implementar toggles de configuração de voz
    - Adicionar opções: Velocidade de fala, Tom de voz, Auto-play
    - Adicionar botão "Salvar"
    - _Requisitos: 4.6_
  
  - [x] 8.4 Criar ScriptGenerationScreen (modal)
    - Implementar input "Sobre o que você quer falar?" (textarea)
    - Adicionar slider de duração (30-300s) com marcadores
    - Adicionar card de dica com ícone de lâmpada
    - Adicionar botão "Gerar Roteiro" (desabilitado se tema < 10 chars)
    - _Requisitos: 5.1, 5.2_
  
  - [x] 8.5 Criar GeneratingScriptScreen (loading)
    - Implementar animação de loading
    - Adicionar progress bar de 0-100%
    - Adicionar texto "Gerando roteiro viral..."
    - _Requisitos: 5.3_
  
  - [x] 8.6 Criar ScriptGeneratedScreen
    - Implementar card de roteiro com título, conteúdo scrollable
    - Adicionar word count e duração estimada
    - Adicionar botões "Editar", "Usar para Gravar" e "Salvar"
    - _Requisitos: 5.4, 5.5, 5.6_
  
  - [x] 8.7 Criar EditScriptScreen (modal)
    - Implementar input de título
    - Adicionar textarea de conteúdo
    - Adicionar word counter e duration estimator em tempo real
    - Adicionar botões "Cancelar" e "Salvar"
    - _Requisitos: 5.7, 5.8_
  
  - [x] 8.8 Criar SavedScriptsScreen
    - Implementar FlatList de roteiros salvos
    - Adicionar preview de cada roteiro (título, word count, data)
    - Adicionar FAB "Novo roteiro"
    - _Requisitos: 5.9, 5.10_
  
  - [x] 8.9 Criar ChooseScriptScreen
    - Implementar lista de roteiros disponíveis
    - Adicionar preview de cada roteiro
    - Adicionar botão "Gravar sem roteiro"
    - _Requisitos: 6.1, 6.2_
  
  - [x] 8.10 Criar TeleprompterSettingsScreen
    - Implementar dropdown de modo de scroll (Auto, Manual, Voz)
    - Adicionar sliders de velocidade e tamanho de fonte
    - Adicionar preview do teleprompter
    - Adicionar botão "Iniciar Gravação"
    - _Requisitos: 6.3, 6.4_
  
  - [x] 8.11 Criar RecordingActiveScreen (fullscreen)
    - Implementar camera preview fullscreen
    - Adicionar overlay semi-transparente do teleprompter
    - Adicionar timer de gravação
    - Adicionar botão REC pulsando (vermelho)
    - Adicionar botões Pause e Stop
    - Adicionar botão Settings (topo direito)
    - _Requisitos: 6.5, 6.6, 6.7_
  
  - [x] 8.12 Criar VideoPreviewScreen
    - Implementar video player com controles
    - Adicionar botões "Regravar", "Salvar e Editar" e "Salvar sem Editar"
    - _Requisitos: 6.8, 6.9_
  
  - [x] 8.13 Criar VideoEditScreen
    - Implementar video preview (thumbnail)
    - Adicionar checkboxes: "Adicionar legendas", "Adicionar música", "Aplicar assets", "Cortes automáticos"
    - Adicionar dropdowns: "Estilo de legenda", "Modo de corte"
    - Adicionar slider "Volume da música"
    - Adicionar botão "Processar Vídeo"
    - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [x] 8.14 Criar ProcessingVideoScreen (loading)
    - Implementar progress bar de etapas
    - Adicionar etapas: "Transcrevendo", "Legendas", "Música", "Finalizando"
    - Adicionar animação de loading
    - _Requisitos: 7.6, 7.7_
  
  - [x] 8.15 Criar VideoFinalPreviewScreen
    - Implementar video player do vídeo editado
    - Adicionar toggle "Ver antes/depois"
    - Adicionar botões "Editar Novamente" e "Publicar"
    - _Requisitos: 7.8, 7.9_
  
  - [x] 8.16 Criar SubtitlesCustomizationScreen (modal)
    - Implementar preview de legenda
    - Adicionar color pickers (texto e fundo)
    - Adicionar slider de tamanho de fonte
    - Adicionar botões "Cancelar" e "Aplicar"
    - _Requisitos: 7.10, 7.11_

- [x] 9. Gerar telas de Carrosséis (4 telas)
  - [x] 9.1 Criar CarouselGenerationScreen
    - Implementar input "Tema do carrossel"
    - Adicionar slider de número de slides (3-10)
    - Adicionar botão "Gerar Carrossel"
    - _Requisitos: 8.1, 8.2_
  
  - [x] 9.2 Criar GeneratingCarouselScreen
    - Implementar animação de loading
    - Adicionar texto "Gerando carrossel..."
    - _Requisitos: 8.3_
  
  - [x] 9.3 Criar CarouselPreviewScreen
    - Implementar swiper de slides
    - Adicionar indicador de página (1/5)
    - Adicionar botões "Editar Slide", "Trocar Imagem" e "Publicar"
    - _Requisitos: 8.4, 8.5, 8.6_
  
  - [x] 9.4 Criar EditSlideScreen (modal)
    - Implementar image preview
    - Adicionar input de título
    - Adicionar textarea de conteúdo
    - Adicionar botões "Cancelar" e "Salvar"
    - _Requisitos: 8.7, 8.8_

- [x] 10. Checkpoint - Validar fluxo de criação de conteúdo
  - Garantir que fluxo Assistente → Scripts → Gravação → Edição → Carrosséis está completo e funcional. Perguntar ao usuário se há ajustes necessários.

- [x] 11. Gerar telas de Publicação (5 telas)
  - [x] 11.1 Criar SelectNetworksScreen
    - Implementar checkboxes de redes sociais (Instagram, TikTok, Facebook, YouTube)
    - Adicionar preview de cada rede
    - Adicionar botão "Próximo"
    - _Requisitos: 9.1, 9.2_
  
  - [x] 11.2 Criar CaptionHashtagsScreen
    - Implementar textarea de legenda
    - Adicionar tag input de hashtags
    - Adicionar botão "Gerar legenda com IA"
    - Adicionar botão "Próximo"
    - _Requisitos: 9.3, 9.4_
  
  - [x] 11.3 Criar SchedulePostScreen
    - Implementar radio buttons "Publicar agora" ou "Agendar"
    - Adicionar DateTimePicker (quando "Agendar" selecionado)
    - Adicionar botão "Publicar"
    - _Requisitos: 9.5, 9.6_
  
  - [x] 11.4 Criar PostConfirmationScreen
    - Implementar ícone de sucesso animado
    - Adicionar lista de redes publicadas
    - Adicionar links para cada rede social
    - Adicionar botão "Ver Analytics"
    - _Requisitos: 9.7, 9.8_
  
  - [x] 11.5 Criar ScheduledPostsScreen
    - Implementar FlatList de posts agendados
    - Adicionar preview de cada post (thumbnail, legenda, data)
    - Adicionar ações "Editar" e "Cancelar"
    - _Requisitos: 9.9, 9.10_

- [x] 12. Checkpoint - Validar fluxo de publicação
  - Garantir que fluxo Edição → Carrosséis → Publicação está completo. Perguntar ao usuário se há ajustes necessários.

- [x] 13. Gerar telas de Biblioteca (LibraryTab - 3 telas)
  - [x] 13.1 Criar LibraryScreen
    - Implementar tabs internas: "Roteiros", "Vídeos", "Carrosséis"
    - Adicionar navegação entre tabs
    - _Requisitos: 10.1_
  
  - [x] 13.2 Criar SavedVideosScreen
    - Implementar grid de vídeos (thumbnail, duração, data)
    - Adicionar FAB "Gravar novo"
    - Adicionar ações em cada vídeo (Editar, Publicar, Excluir)
    - _Requisitos: 10.2, 10.3_
  
  - [x] 13.3 Criar SavedCarouselsScreen
    - Implementar lista de carrosséis
    - Adicionar preview do primeiro slide, título e número de slides
    - Adicionar FAB "Criar novo"
    - Adicionar ações em cada carrossel (Editar, Publicar, Excluir)
    - _Requisitos: 10.4, 10.5, 10.6_

- [x] 14. Gerar telas de Assets (3 telas)
  - [x] 14.1 Criar BrandAssetsScreen
    - Implementar lista de assets: Logo, Intro, Outro, Watermark
    - Adicionar status "Configurado" ou "Não configurado"
    - Adicionar botões "Adicionar" ou "Editar"
    - _Requisitos: 11.1, 11.2, 11.3_
  
  - [x] 14.2 Criar UploadAssetScreen (modal)
    - Implementar image picker
    - Adicionar preview do asset
    - Adicionar botões "Cancelar" e "Upload"
    - _Requisitos: 11.4_
  
  - [x] 14.3 Criar ConfigureAssetScreen (modal)
    - Implementar preview do vídeo com asset
    - Adicionar dropdown de posição
    - Adicionar sliders de opacidade e duração
    - Adicionar toggle "Aplicar automaticamente"
    - Adicionar botões "Cancelar" e "Salvar"
    - _Requisitos: 11.5, 11.6, 11.7, 11.8_

- [x] 15. Gerar telas de Configurações (SettingsTab - 6 telas)
  - [x] 15.1 Criar SettingsScreen
    - Implementar lista de opções: Perfil, Business DNA, Redes Sociais, Assets, Notificações, Sobre
    - Adicionar ícones para cada opção
    - _Requisitos: 12.1, 12.2_
  
  - [x] 15.2 Criar ProfileScreen
    - Implementar avatar editável
    - Adicionar inputs de nome e email
    - Adicionar botão "Alterar Senha"
    - Adicionar botão "Salvar"
    - _Requisitos: 12.3, 12.4_
  
  - [x] 15.3 Criar BusinessDNASettingsScreen
    - Implementar card do Business DNA atual
    - Adicionar campos: Nicho, Público, Tom de voz, Objetivos
    - Adicionar botão "Editar Business DNA"
    - _Requisitos: 12.5, 12.6_
  
  - [x] 15.4 Criar SocialAccountsScreen
    - Implementar lista de contas conectadas
    - Adicionar avatar, username, status e botão de gerenciar
    - Adicionar FAB "Adicionar Rede"
    - _Requisitos: 12.7, 12.8, 12.9_
  
  - [x] 15.5 Criar NotificationsSettingsScreen
    - Implementar toggles de preferências
    - Adicionar seções: "Push Notifications", "Email", "Horário de Silêncio"
    - Adicionar botão "Salvar"
    - _Requisitos: 12.10, 12.11_
  
  - [x] 15.6 Criar IntegrationsScreen
    - Implementar cards de integrações externas
    - Adicionar status de cada integração
    - Adicionar botões de conectar/desconectar
    - _Requisitos: 12.12_

- [x] 16. Gerar telas de Analytics (3 telas) e modal global URLAnalysis
  - [x] 16.1 Criar AnalyticsScreen
    - Implementar DateRangePicker
    - Adicionar cards de métricas: Total de Posts, Views, Likes, Engajamento
    - Adicionar gráfico de linha de views ao longo do tempo
    - Adicionar seção "Top Posts" com FlatList dos 5 posts mais virais
    - _Requisitos: 13.1, 13.2, 13.3, 13.4_
  
  - [x] 16.2 Criar PostDetailsScreen
    - Implementar preview de vídeo/imagem
    - Adicionar tabs de métricas por rede social
    - Adicionar seção "Viral Score" com progress bar circular
    - Adicionar badge "🔥 Viral" se score > 0.7
    - Adicionar seção de legenda completa e hashtags
    - Adicionar botões de deep link para ver post em cada rede
    - _Requisitos: 13.5, 13.6, 13.7, 13.8, 13.9, 13.10_
  
  - [x] 16.3 Criar URLAnalysisScreen (modal global)
    - Implementar input de URL com placeholder
    - Adicionar dropdown de duração do roteiro (30-300s)
    - Adicionar botão "Analisar e Gerar Roteiro"
    - Adicionar loading states: "Baixando vídeo", "Transcrevendo", "Gerando roteiro"
    - Adicionar progress bar de 0-100%
    - Adicionar seção "Plataformas suportadas" com ícones
    - _Requisitos: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

- [x] 17. Checkpoint - Validar todas as telas geradas
  - Garantir que todas as 51 telas foram geradas. Perguntar ao usuário se há telas faltando ou que precisam de ajustes.

- [x] 18. Validar design system em todas as telas
  - Verificar paleta de cores (#6200EE, #03DAC6) aplicada consistentemente
  - Verificar tipografia Roboto (Regular, Medium, SemiBold, Bold)
  - Verificar espaçamento segue múltiplos de 8px
  - Verificar border radius segue padrão (4px, 8px, 12px, 16px)
  - Verificar componentes seguem Material Design 3
  - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x] 19. Validar acessibilidade em todas as telas
  - Verificar touch targets mínimos de 44x44px
  - Verificar contraste de texto mínimo 4.5:1
  - Verificar contraste de texto grande (18px+) mínimo 3:1
  - Verificar contraste de ícones mínimo 3:1
  - Verificar labels descritivos em elementos interativos
  - _Requisitos: 18.1, 18.2, 18.3, 18.4, 18.5_

- [x] 20. Validar responsividade em todas as telas
  - Verificar otimização para 390x844px (iPhone 14)
  - Testar em telas de 320px a 428px de largura
  - Verificar uso de unidades relativas (%, vh, vw)
  - Verificar textos legíveis sem zoom
  - Verificar elementos não cortados em telas menores
  - _Requisitos: 19.1, 19.2, 19.3, 19.4, 19.5_

- [x] 21. Refinar telas que não passaram na validação
  - Identificar telas com problemas de design system
  - Identificar telas com problemas de acessibilidade
  - Identificar telas com problemas de responsividade
  - Refinar cada tela problemática usando Stitch
  - Re-validar telas refinadas

- [x] 22. Checkpoint final - Validação completa
  - Garantir que todas as 51 telas passaram em todas as validações. Perguntar ao usuário se está satisfeito com a qualidade antes de exportar.

- [x] 23. Exportar projeto Stitch
  - Exportar arquivos HTML/CSS de todas as telas
  - Organizar telas em pastas por categoria
  - Gerar screenshots de todas as telas
  - _Requisitos: 16.1, 16.2, 16.4_

- [x] 24. Criar documentação consolidada
  - [x] 24.1 Criar arquivo INDEX.md
    - Listar todas as 51 telas com descrição
    - Incluir links para cada tela
    - Incluir screenshots
    - _Requisitos: 16.3_
  
  - [x] 24.2 Criar arquivo DESIGN.md
    - Consolidar design system (cores, tipografia, espaçamento)
    - Documentar componentes reutilizáveis
    - Incluir exemplos de uso
    - _Requisitos: 16.5_
  
  - [x] 24.3 Criar arquivo COMPONENTS.md
    - Documentar cada componente identificado
    - Incluir props esperadas
    - Incluir exemplos de uso
    - _Requisitos: 17.2, 17.3, 17.4, 17.5_
  
  - [x] 24.4 Criar arquivo CONVERSION-GUIDE.md
    - Documentar mapeamento HTML/CSS → React Native
    - Incluir exemplos de conversão
    - Incluir estrutura de arquivos React Native
    - Incluir guia de navegação
  
  - [x] 24.5 Criar arquivo NAVIGATION.md
    - Documentar diagrama de navegação completo
    - Documentar AuthStack (11 telas)
    - Documentar AssistantStack (14 telas)
    - Documentar LibraryStack (13 telas)
    - Documentar SettingsStack (10 telas)
    - Documentar modais globais (3 telas)
    - Incluir tipos de apresentação (stack, modal, fullscreen)
    - Incluir fluxos de navegação entre telas
    - _Requisitos: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8_

- [x] 25. Checkpoint final - Entrega completa
  - Garantir que todos os entregáveis estão prontos: 51 telas, componentes, design system, screenshots e documentação. Perguntar ao usuário se há algo mais necessário.

## Notas

- Tasks marcadas com `*` são opcionais e podem ser puladas para MVP mais rápido
- Cada task referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental e feedback do usuário
- Ordem de criação respeita dependências de navegação
- Design system deve ser validado a cada checkpoint
- Acessibilidade é não-negociável (touch targets, contraste)
- Responsividade deve funcionar em telas de 320px a 428px

## Cronograma Estimado

- Fase 1 (Tasks 1-3): 1 dia - Preparação
- Fase 2 (Tasks 4-7): 1 dia - Auth e Onboarding
- Fase 3 (Task 8): 2 dias - AssistantStack completo (14 telas)
- Fase 4 (Tasks 9-12): 1 dia - Carrosséis e Publicação
- Fase 5 (Tasks 13-17): 1 dia - Biblioteca, Assets, Configurações e Analytics
- Fase 6 (Tasks 18-22): 1 dia - Validação e Refinamento
- Fase 7 (Tasks 23-25): 1 dia - Exportação e Documentação

**Total: 8 dias úteis**

## Próximos Passos Após Conclusão

Após a conclusão deste plano, o próximo passo será a conversão das telas HTML/CSS para componentes React Native + Expo, seguindo o guia de conversão gerado. Isso será uma nova spec de implementação separada.
