# Documento de Design Técnico - Influency v1 Screens

## Introdução

Este documento especifica o design técnico para a geração de todas as 51 telas do aplicativo Influency v2 usando o Stitch MCP server. O projeto visa criar interfaces mobile-first profissionais, consistentes e prontas para implementação em React Native + Expo.

## Glossário

- **Stitch MCP**: Model Context Protocol server para geração de interfaces web/mobile
- **Design System**: Conjunto de padrões visuais (cores, tipografia, espaçamento, componentes)
- **Material Design 3**: Sistema de design do Google, versão 3
- **Prompt Engineering**: Técnica de otimização de prompts para IA
- **Component Library**: Biblioteca de componentes reutilizáveis
- **Atomic Design**: Metodologia de design de componentes (átomos, moléculas, organismos)
- **Mobile-First**: Abordagem de design que prioriza dispositivos móveis
- **Touch Target**: Área mínima de toque para elementos interativos (44x44px)
- **Viewport**: Área visível da tela (390x844px para iPhone 14)

## Visão Geral da Arquitetura

### Objetivo do Projeto

Gerar 51 telas mobile-first do Influency v2 usando Stitch MCP, organizadas em 11 categorias funcionais, seguindo Material Design 3 e prontas para conversão em React Native.

### Fluxo de Trabalho

```
1. PREPARAÇÃO
   └── Criar projeto Stitch
   └── Configurar design system base
   └── Definir componentes reutilizáveis

2. GERAÇÃO POR CATEGORIA
   └── Auth & Onboarding (11 telas)
   └── Assistente IA (3 telas)
   └── Scripts (5 telas)
   └── Gravação (4 telas)
   └── Edição (4 telas)
   └── Carrosséis (4 telas)
   └── Publicação (5 telas)
   └── Biblioteca (3 telas)
   └── Assets (3 telas)
   └── Configurações (6 telas)
   └── Analytics (3 telas)

3. VALIDAÇÃO
   └── Verificar consistência visual
   └── Validar acessibilidade
   └── Testar responsividade

4. EXPORTAÇÃO
   └── Exportar HTML/CSS
   └── Gerar screenshots
   └── Documentar componentes
   └── Criar guia de conversão


### Arquitetura de Componentes

```
Design System
├── Tokens (Cores, Tipografia, Espaçamento)
├── Componentes Base (Átomos)
│   ├── Button
│   ├── Input
│   ├── Card
│   ├── Badge
│   ├── Chip
│   └── Loading
├── Componentes Compostos (Moléculas)
│   ├── VoiceButton
│   ├── ChatBubble
│   ├── VideoPlayer
│   ├── TeleprompterView
│   └── ProgressBar
└── Componentes de Tela (Organismos)
    ├── Header
    ├── Footer
    ├── BottomNavigation
    └── Modal
```

### Tecnologias e Ferramentas

| Ferramenta | Versão | Uso |
|---|---|---|
| Stitch MCP | Latest | Geração de telas |
| Material Design 3 | 2024 | Sistema de design base |
| Inter Font | Variable | Tipografia |
| Lucide Icons | Latest | Ícones |
| React Native | 0.73+ | Target de conversão |
| Expo | 50+ | Framework mobile |

## Estratégia de Geração com Stitch MCP

### Fase 1: Configuração do Projeto Stitch

#### 1.1 Criar Projeto

```bash
# Comando MCP
stitch.create_project({
  name: "influency-v1-screens",
  description: "51 telas mobile-first do Influency v2",
  viewport: { width: 390, height: 844 }
})
```

#### 1.2 Configurar Design System Base

Criar arquivo `design-system.json` no projeto Stitch com tokens de design:

```json
{
  "colors": {
    "primary": "#6200EE",
    "primaryLight": "#7F39FB",
    "primaryDark": "#5300CC",
    "secondary": "#03DAC6",
    "secondaryLight": "#66FFF9",
    "secondaryDark": "#00A896",
    "success": "#00C853",
    "error": "#B00020",
    "warning": "#FF9800",
    "background": "#FFFFFF",
    "surface": "#F5F5F5",
    "textPrimary": "#111827",
    "textSecondary": "#6B7280"
  },
  "typography": {
    "fontFamily": "Inter",
    "fontSize": {
      "xxl": "28px",
      "xl": "24px",
      "lg": "20px",
      "base": "16px",
      "sm": "14px",
      "xs": "12px"
    }
  },
  "spacing": {
    "xs": "8px",
    "sm": "12px",
    "base": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "full": "9999px"
  }
}
```


### Fase 2: Prompts Otimizados por Tipo de Tela

#### 2.1 Template de Prompt Base

Todos os prompts devem seguir esta estrutura:

```
Crie uma tela mobile [NOME_DA_TELA] para o app Influency v2.

CONTEXTO:
- App para criadoras de conteúdo gerarem vídeos virais
- Público: Mulheres empreendedoras, 25-45 anos
- Tom: Profissional, empoderador, moderno

ESPECIFICAÇÕES TÉCNICAS:
- Viewport: 390x844px (iPhone 14)
- Design System: Material Design 3
- Paleta: Primary #6200EE, Secondary #03DAC6
- Fonte: Inter (Regular, Medium, SemiBold, Bold)
- Espaçamento base: 16px
- Border radius: 8px (botões), 12px (cards)
- Touch targets mínimos: 44x44px

COMPONENTES DA TELA:
[LISTA DE COMPONENTES ESPECÍFICOS]

COMPORTAMENTO:
[INTERAÇÕES E ESTADOS]

ACESSIBILIDADE:
- Contraste mínimo 4.5:1 para texto
- Labels descritivos em todos os elementos interativos
- Touch targets de 44x44px mínimo

REFERÊNCIAS VISUAIS:
- Material Design 3: https://m3.material.io/
- Inspiração: Instagram, TikTok (interfaces modernas de criação de conteúdo)
```

#### 2.2 Prompts por Categoria

##### Auth & Onboarding (11 telas)

**Prompt para SplashScreen:**
```
Crie uma tela mobile SplashScreen para o app Influency v2.

CONTEXTO:
- Primeira tela que o usuário vê ao abrir o app
- Deve transmitir profissionalismo e inovação
- Tempo de exibição: 2-3 segundos

ESPECIFICAÇÕES TÉCNICAS:
- Viewport: 390x844px
- Background: Gradiente roxo (#6200EE → #7F39FB)
- Fonte: Inter Bold

COMPONENTES DA TELA:
1. Logo do Influency (centralizado verticalmente)
   - Tamanho: 120x120px
   - Cor: Branco (#FFFFFF)
2. Loading spinner (abaixo do logo)
   - Tamanho: 32px
   - Cor: Branco (#FFFFFF)
   - Animação: Rotação suave
3. Versão do app (rodapé)
   - Texto: "v2.0.0"
   - Fonte: Inter Regular 12px
   - Cor: Branco com 70% opacidade
   - Posição: 24px do bottom

COMPORTAMENTO:
- Logo aparece com fade in (300ms)
- Spinner inicia após logo aparecer
- Após verificar autenticação, navega para LoginScreen ou MainTabs

ACESSIBILIDADE:
- accessibilityLabel: "Carregando Influency"
```


**Prompt para LoginScreen:**
```
Crie uma tela mobile LoginScreen para o app Influency v2.

CONTEXTO:
- Tela de autenticação principal
- Deve ser simples e direta
- Foco em conversão (usuária quer entrar rápido)

ESPECIFICAÇÕES TÉCNICAS:
- Viewport: 390x844px
- Background: Branco (#FFFFFF)
- Padding horizontal: 24px

COMPONENTES DA TELA:
1. Header (topo)
   - Logo pequeno (60x60px)
   - Título: "Bem-vinda de volta!"
   - Subtítulo: "Entre para criar conteúdo viral"
   - Espaçamento: 32px do topo

2. Form (centro)
   - Input: Email
     * Label: "Email"
     * Placeholder: "seu@email.com"
     * Type: email
     * Border: 1px solid #E0E0E0
     * Border radius: 8px
     * Height: 48px
     * Padding: 12px 16px
   - Input: Senha
     * Label: "Senha"
     * Placeholder: "••••••••"
     * Type: password
     * Ícone de olho para mostrar/ocultar
   - Link: "Esqueci minha senha"
     * Cor: #6200EE
     * Fonte: Inter Medium 14px
     * Alinhamento: direita

3. Actions (bottom)
   - Button: "Entrar"
     * Background: #6200EE
     * Cor do texto: #FFFFFF
     * Height: 52px
     * Border radius: 8px
     * Fonte: Inter SemiBold 16px
     * Width: 100%
   - Divider: "ou"
     * Linha horizontal com texto no centro
   - Link: "Criar conta"
     * Cor: #6200EE
     * Fonte: Inter Medium 16px
     * Alinhamento: centro

COMPORTAMENTO:
- Validação de email em tempo real
- Botão "Entrar" desabilitado se campos vazios
- Loading state no botão durante autenticação
- Erro exibido abaixo do campo correspondente

ACESSIBILIDADE:
- Labels visíveis em todos os inputs
- Mensagens de erro descritivas
- Touch targets de 48px mínimo
```

##### Assistente IA (3 telas)

**Prompt para AssistantScreen:**
```
Crie uma tela mobile AssistantScreen para o app Influency v2.

CONTEXTO:
- Tela principal do assistente IA híbrido (voz + texto)
- Interface conversacional estilo chat
- Usuária pode falar OU digitar
- Assistente responde em texto (e fala se usuária usou voz)

ESPECIFICAÇÕES TÉCNICAS:
- Viewport: 390x844px
- Background: #F5F5F5
- Layout: KeyboardAvoidingView

COMPONENTES DA TELA:
1. Header (fixo no topo)
   - Título: "Assistente IA"
   - Ícone: Menu (esquerda)
   - Ícone: Histórico (direita)
   - Height: 56px
   - Background: #FFFFFF
   - Shadow: 0 2px 4px rgba(0,0,0,0.1)

2. Chat Area (scrollable)
   - ScrollView com mensagens
   - ChatBubble (usuário):
     * Background: #6200EE
     * Cor do texto: #FFFFFF
     * Border radius: 12px 12px 4px 12px
     * Padding: 12px 16px
     * Max width: 80%
     * Alinhamento: direita
     * Ícone de microfone se foi voz
   - ChatBubble (assistente):
     * Background: #FFFFFF
     * Cor do texto: #111827
     * Border radius: 12px 12px 12px 4px
     * Padding: 12px 16px
     * Max width: 80%
     * Alinhamento: esquerda
   - Espaçamento entre mensagens: 12px

3. Input Footer (fixo no bottom)
   - VoiceButton (esquerda):
     * Tamanho: 56x56px
     * Border radius: 28px (circular)
     * Background: #6200EE
     * Ícone: Microfone (branco)
     * Shadow: 0 4px 8px rgba(98,0,238,0.3)
     * Estado ativo: Background #B00020 (vermelho) + pulsando
   - TextInput (centro):
     * Placeholder: "Digite ou fale..."
     * Background: #FFFFFF
     * Border: 1px solid #E0E0E0
     * Border radius: 24px
     * Height: 48px
     * Padding: 12px 16px
     * Flex: 1
   - SendButton (direita):
     * Tamanho: 48x48px
     * Border radius: 24px
     * Background: #6200EE (se texto não vazio)
     * Background: #E0E0E0 (se texto vazio)
     * Ícone: Seta para cima (branco)
   - Padding: 16px
   - Background: #FFFFFF
   - Border top: 1px solid #E0E0E0

COMPORTAMENTO:
- Scroll automático para última mensagem
- VoiceButton pulsa quando gravando
- TextInput expande até 4 linhas
- SendButton só ativo se há texto
- Loading indicator enquanto assistente responde

ACESSIBILIDADE:
- VoiceButton: "Gravar mensagem de voz"
- SendButton: "Enviar mensagem"
- ChatBubbles com timestamps para screen readers
```


##### Scripts (5 telas)

**Prompt para ScriptGenerationScreen:**
```
Crie uma tela mobile ScriptGenerationScreen para o app Influency v2.

CONTEXTO:
- Tela para gerar roteiros virais automaticamente
- Usuária informa o tema e duração desejada
- IA gera roteiro otimizado para viralização

ESPECIFICAÇÕES TÉCNICAS:
- Viewport: 390x844px
- Background: #FFFFFF
- Padding: 24px

COMPONENTES DA TELA:
1. Header
   - Título: "Gerar Roteiro"
   - Subtítulo: "Vou criar um roteiro viral para você"
   - Ícone: Voltar (esquerda)

2. Form
   - Input: Tema
     * Label: "Sobre o que você quer falar?"
     * Placeholder: "Ex: Como aumentar vendas no Instagram"
     * Type: textarea
     * Min height: 120px
     * Max length: 500 caracteres
     * Counter: "0/500"
   - Slider: Duração
     * Label: "Duração do vídeo"
     * Range: 30-300 segundos
     * Step: 30
     * Valor exibido: "60 segundos"
     * Marcadores: 30s, 60s, 90s, 120s, 180s, 300s
   - Card de Dica:
     * Background: #F5F5F5
     * Border left: 4px solid #03DAC6
     * Padding: 16px
     * Ícone: Lâmpada
     * Texto: "Dica: Seja específica! Quanto mais detalhes, melhor o roteiro."

3. Actions
   - Button: "Gerar Roteiro"
     * Background: #6200EE
     * Cor: #FFFFFF
     * Height: 52px
     * Width: 100%
     * Disabled se tema vazio

COMPORTAMENTO:
- Contador de caracteres atualiza em tempo real
- Slider mostra valor em segundos
- Botão desabilitado se tema < 10 caracteres
- Ao clicar, navega para GeneratingScriptScreen

ACESSIBILIDADE:
- Label "Duração do vídeo: 60 segundos"
- Slider com incrementos de 30 segundos
```

##### Gravação (4 telas)

**Prompt para RecordingActiveScreen:**
```
Crie uma tela mobile RecordingActiveScreen para o app Influency v2.

CONTEXTO:
- Tela de gravação de vídeo com teleprompter
- Fullscreen com camera preview
- Teleprompter overlay semi-transparente
- Controles de gravação

ESPECIFICAÇÕES TÉCNICAS:
- Viewport: 390x844px
- Layout: Fullscreen (sem header)
- Orientação: Portrait

COMPONENTES DA TELA:
1. Camera Preview (background)
   - Fullscreen
   - Aspect ratio: 9:16
   - Camera frontal por padrão

2. Teleprompter Overlay (centro)
   - Background: rgba(0, 0, 0, 0.7)
   - Padding: 32px
   - Texto do roteiro:
     * Cor: #FFFFFF
     * Fonte: Inter Regular
     * Tamanho: 20px (ajustável)
     * Line height: 1.8
     * Text align: center
   - Scroll automático ou manual
   - Indicador de progresso (barra fina no topo)

3. Recording Controls (bottom)
   - Timer (topo dos controles):
     * Formato: "00:00"
     * Cor: #FFFFFF
     * Fonte: Inter Medium 16px
     * Background: rgba(0, 0, 0, 0.5)
     * Padding: 8px 16px
     * Border radius: 16px
   - REC Button (centro):
     * Tamanho: 72x72px
     * Border: 4px solid #FFFFFF
     * Background: #B00020 (vermelho)
     * Border radius: 36px (circular)
     * Animação: Pulsando
     * Ícone: Quadrado branco (quando gravando)
   - Pause Button (esquerda):
     * Tamanho: 48x48px
     * Background: rgba(255, 255, 255, 0.3)
     * Ícone: Pause (branco)
     * Border radius: 24px
   - Stop Button (direita):
     * Tamanho: 48x48px
     * Background: rgba(255, 255, 255, 0.3)
     * Ícone: Stop (branco)
     * Border radius: 24px
   - Padding bottom: 48px

4. Settings Button (topo direito)
   - Tamanho: 44x44px
   - Background: rgba(0, 0, 0, 0.5)
   - Ícone: Engrenagem (branco)
   - Border radius: 22px
   - Posição: 16px do topo, 16px da direita

COMPORTAMENTO:
- Teleprompter scroll sincronizado com gravação
- Timer inicia ao pressionar REC
- Pause congela timer e teleprompter
- Stop finaliza e navega para VideoPreviewScreen
- Settings abre modal de configurações do teleprompter

ACESSIBILIDADE:
- REC Button: "Iniciar gravação"
- Pause Button: "Pausar gravação"
- Stop Button: "Parar gravação"
- Timer anunciado a cada minuto
```


### Fase 3: Ordem de Criação das Telas

#### Princípio: Dependências de Navegação

Criar telas na ordem que respeita o fluxo de navegação do usuário:

```
ORDEM DE CRIAÇÃO (51 telas):

1. FUNDAÇÃO (3 telas)
   ├── SplashScreen
   ├── LoginScreen
   └── RegisterScreen

2. ONBOARDING (8 telas)
   ├── WelcomeScreen
   ├── OnboardingScreen (5 perguntas)
   ├── ConnectSocialNetworksScreen
   └── OnboardingCompleteScreen

3. NAVEGAÇÃO PRINCIPAL (1 tela)
   └── BottomNavigation (componente)

4. ASSISTENTE IA (3 telas)
   ├── AssistantScreen
   ├── ConversationHistoryScreen
   └── AssistantSettingsScreen

5. SCRIPTS (5 telas)
   ├── ScriptGenerationScreen
   ├── GeneratingScriptScreen (loading)
   ├── ScriptGeneratedScreen
   ├── EditScriptScreen
   └── SavedScriptsScreen

6. GRAVAÇÃO (4 telas)
   ├── ChooseScriptScreen
   ├── TeleprompterSettingsScreen
   ├── RecordingActiveScreen
   └── VideoPreviewScreen

7. EDIÇÃO (4 telas)
   ├── VideoEditScreen
   ├── ProcessingVideoScreen (loading)
   ├── VideoFinalPreviewScreen
   └── SubtitlesCustomizationScreen

8. CARROSSÉIS (4 telas)
   ├── CarouselGenerationScreen
   ├── GeneratingCarouselScreen (loading)
   ├── CarouselPreviewScreen
   └── EditSlideScreen

9. PUBLICAÇÃO (5 telas)
   ├── SelectNetworksScreen
   ├── CaptionHashtagsScreen
   ├── SchedulePostScreen
   ├── PostConfirmationScreen
   └── ScheduledPostsScreen

10. BIBLIOTECA (3 telas)
    ├── LibraryScreen
    ├── SavedVideosScreen
    └── SavedCarouselsScreen

11. ASSETS (3 telas)
    ├── BrandAssetsScreen
    ├── UploadAssetScreen
    └── ConfigureAssetScreen

12. CONFIGURAÇÕES (6 telas)
    ├── SettingsScreen
    ├── ProfileScreen
    ├── BusinessDNASettingsScreen
    ├── SocialAccountsScreen
    ├── NotificationsSettingsScreen
    └── IntegrationsScreen

13. ANALYTICS (3 telas)
    ├── AnalyticsScreen
    ├── PostDetailsScreen
    └── URLAnalysisScreen
```

#### Justificativa da Ordem

1. **Fundação primeiro**: Telas de autenticação são o ponto de entrada
2. **Onboarding em sequência**: Fluxo linear de configuração inicial
3. **Navegação principal**: Base para todas as outras telas
4. **Fluxos por categoria**: Cada categoria é um fluxo completo
5. **Dependências respeitadas**: Telas que referenciam outras vêm depois

## Design System Técnico

### Implementação de Cores

```css
/* colors.css */
:root {
  /* Primary */
  --color-primary: #6200EE;
  --color-primary-light: #7F39FB;
  --color-primary-dark: #5300CC;
  --color-primary-container: #EADDFF;
  --color-on-primary: #FFFFFF;
  
  /* Secondary */
  --color-secondary: #03DAC6;
  --color-secondary-light: #66FFF9;
  --color-secondary-dark: #00A896;
  --color-secondary-container: #B2F7EF;
  --color-on-secondary: #FFFFFF;
  
  /* Functional */
  --color-success: #00C853;
  --color-error: #B00020;
  --color-warning: #FF9800;
  
  /* Neutral */
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-outline: #E0E0E0;
  
  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-disabled: #9CA3AF;
}
```

### Sistema de Tipografia

```css
/* typography.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Font Sizes */
  --font-size-xxl: 28px;
  --font-size-xl: 24px;
  --font-size-lg: 20px;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-xs: 12px;
  
  /* Line Heights */
  --line-height-xxl: 34px;
  --line-height-xl: 30px;
  --line-height-lg: 26px;
  --line-height-base: 24px;
  --line-height-sm: 20px;
  --line-height-xs: 16px;
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/* Type Scale */
.display {
  font-family: var(--font-family);
  font-size: var(--font-size-xxl);
  line-height: var(--line-height-xxl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.heading-1 {
  font-family: var(--font-family);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.heading-2 {
  font-family: var(--font-family);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
}

.caption {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.label {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```


### Sistema de Espaçamento

```css
/* spacing.css */
:root {
  /* Base: 8px */
  --spacing-xxs: 4px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-base: 16px;
  --spacing-md: 20px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 40px;
  --spacing-xxxl: 48px;
}

/* Utility Classes */
.p-xs { padding: var(--spacing-xs); }
.p-sm { padding: var(--spacing-sm); }
.p-base { padding: var(--spacing-base); }
.p-lg { padding: var(--spacing-lg); }
.p-xl { padding: var(--spacing-xl); }

.m-xs { margin: var(--spacing-xs); }
.m-sm { margin: var(--spacing-sm); }
.m-base { margin: var(--spacing-base); }
.m-lg { margin: var(--spacing-lg); }
.m-xl { margin: var(--spacing-xl); }

.gap-xs { gap: var(--spacing-xs); }
.gap-sm { gap: var(--spacing-sm); }
.gap-base { gap: var(--spacing-base); }
.gap-lg { gap: var(--spacing-lg); }
```

### Border Radius

```css
/* border-radius.css */
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-xxl: 24px;
  --radius-full: 9999px;
}

/* Utility Classes */
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-full { border-radius: var(--radius-full); }
```

### Componentes Base

#### Button

```css
/* button.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  min-height: 48px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
}

.button-primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.button-primary:hover {
  background-color: var(--color-primary-dark);
}

.button-primary:active {
  transform: scale(0.98);
}

.button-secondary {
  background-color: var(--color-secondary);
  color: var(--color-on-secondary);
}

.button-outline {
  background-color: transparent;
  border: 1.5px solid var(--color-primary);
  color: var(--color-primary);
}

.button-text {
  background-color: transparent;
  color: var(--color-primary);
}

.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-full-width {
  width: 100%;
}

.button-small {
  padding: var(--spacing-xs) var(--spacing-base);
  min-height: 36px;
  font-size: var(--font-size-sm);
}

.button-large {
  padding: var(--spacing-base) var(--spacing-lg);
  min-height: 52px;
}
```

#### Card

```css
/* card.css */
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-base);
}

.card-elevated {
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-outlined {
  background-color: #FFFFFF;
  border: 1px solid var(--color-outline);
}

.card-flat {
  background-color: var(--color-surface);
}

.card-interactive {
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-interactive:active {
  transform: translateY(0);
}
```

#### Input

```css
/* input.css */
.input-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-base);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-base);
  border: 1px solid var(--color-outline);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background-color: #FFFFFF;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(98, 0, 238, 0.1);
}

.input::placeholder {
  color: var(--color-text-disabled);
}

.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(176, 0, 32, 0.1);
}

.input-error-message {
  font-size: var(--font-size-xs);
  color: var(--color-error);
}

.input-multiline {
  min-height: 100px;
  resize: vertical;
}
```

## Estrutura de Navegação

### Diagrama de Navegação Completo

```
RootNavigator
│
├── AuthStack (11 telas)
│   ├── Splash
│   ├── Login
│   ├── Register
│   ├── Welcome
│   ├── Onboarding (5 perguntas)
│   ├── ConnectSocialNetworks
│   └── OnboardingComplete
│
└── MainTabs (3 tabs)
    │
    ├── AssistantTab (14 telas)
    │   ├── Assistant ⭐ (tela principal)
    │   ├── ConversationHistory
    │   ├── AssistantSettings
    │   ├── ScriptGeneration (modal)
    │   ├── GeneratingScript (loading)
    │   ├── ScriptGenerated
    │   ├── EditScript (modal)
    │   ├── ChooseScript
    │   ├── TeleprompterSettings
    │   ├── RecordingActive (fullscreen)
    │   ├── VideoPreview
    │   ├── VideoEdit
    │   ├── ProcessingVideo (loading)
    │   └── VideoFinalPreview
    │
    ├── LibraryTab (13 telas)
    │   ├── Library ⭐ (tela principal)
    │   ├── SavedScripts
    │   ├── SavedVideos
    │   ├── SavedCarousels
    │   ├── CarouselGeneration (modal)
    │   ├── GeneratingCarousel (loading)
    │   ├── CarouselPreview
    │   ├── EditSlide (modal)
    │   ├── SelectNetworks
    │   ├── CaptionHashtags
    │   ├── SchedulePost
    │   ├── PostConfirmation
    │   └── ScheduledPosts
    │
    └── SettingsTab (10 telas)
        ├── Settings ⭐ (tela principal)
        ├── Profile
        ├── BusinessDNASettings
        ├── SocialAccounts
        ├── BrandAssets
        ├── UploadAsset (modal)
        ├── ConfigureAsset (modal)
        ├── NotificationsSettings
        ├── Integrations
        └── SubtitlesCustomization (modal)

Modais Globais (3 telas)
├── Analytics
├── PostDetails
└── URLAnalysis
```

### Tipos de Apresentação

| Tipo | Uso | Características |
|---|---|---|
| **Stack** | Navegação padrão | Push/pop, header com voltar |
| **Modal** | Ações rápidas | Slide up, pode fechar com swipe down |
| **Fullscreen** | Imersão total | Sem header, controles customizados |
| **Bottom Sheet** | Opções contextuais | Overlay parcial, swipe to dismiss |

### Transições de Navegação

```css
/* transitions.css */
.transition-slide-right {
  animation: slideRight 0.3s ease;
}

@keyframes slideRight {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.transition-slide-up {
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.transition-fade {
  animation: fade 0.2s ease;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```


## Componentização e Reutilização

### Hierarquia de Componentes (Atomic Design)

```
ÁTOMOS (Componentes Básicos)
├── Button
├── Input
├── Label
├── Icon
├── Badge
├── Chip
├── Avatar
├── Divider
├── Spinner
└── ProgressBar

MOLÉCULAS (Componentes Compostos)
├── InputField (Label + Input + Error)
├── SearchBar (Input + Icon)
├── VoiceButton (Button + Icon + Animation)
├── ChatBubble (Avatar + Text + Timestamp)
├── ScriptCard (Card + Title + Metadata + Actions)
├── VideoCard (Thumbnail + Duration + Title)
├── MetricCard (Icon + Value + Label)
└── SocialAccountCard (Avatar + Name + Status + Button)

ORGANISMOS (Seções Complexas)
├── Header (Logo + Title + Actions)
├── BottomNavigation (Tabs + Icons + Labels)
├── ChatInterface (ScrollView + ChatBubbles + InputFooter)
├── VideoPlayer (Video + Controls + Timeline)
├── TeleprompterView (ScrollView + Text + Controls)
├── FormSection (Title + Inputs + Actions)
└── SettingsList (Sections + Items + Toggles)

TEMPLATES (Layouts de Tela)
├── AuthLayout (Logo + Form + Footer)
├── MainLayout (Header + Content + BottomNav)
├── ModalLayout (Header + Content + Actions)
└── FullscreenLayout (Content + Overlay Controls)
```

### Componentes Reutilizáveis Críticos

#### 1. VoiceButton

**Uso:** AssistantScreen, OnboardingScreen

```html
<div class="voice-button" data-state="idle">
  <svg class="icon-mic" width="28" height="28">
    <!-- Ícone de microfone -->
  </svg>
</div>

<style>
.voice-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(98, 0, 238, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
}

.voice-button[data-state="listening"] {
  background-color: var(--color-error);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.voice-button:active {
  transform: scale(0.95);
}

.icon-mic {
  fill: white;
}
</style>
```

#### 2. ChatBubble

**Uso:** AssistantScreen, ConversationHistoryScreen

```html
<div class="chat-bubble" data-role="user">
  <div class="bubble-content">
    <p class="bubble-text">Como faço para aumentar minhas vendas?</p>
    <div class="bubble-metadata">
      <svg class="icon-mic-small" width="12" height="12"></svg>
      <span class="bubble-time">14:32</span>
    </div>
  </div>
</div>

<style>
.chat-bubble {
  display: flex;
  margin-bottom: var(--spacing-base);
}

.chat-bubble[data-role="user"] {
  justify-content: flex-end;
}

.chat-bubble[data-role="assistant"] {
  justify-content: flex-start;
}

.bubble-content {
  max-width: 80%;
  padding: var(--spacing-sm) var(--spacing-base);
  border-radius: var(--radius-lg);
}

.chat-bubble[data-role="user"] .bubble-content {
  background-color: var(--color-primary);
  color: white;
  border-bottom-right-radius: var(--radius-sm);
}

.chat-bubble[data-role="assistant"] .bubble-content {
  background-color: white;
  color: var(--color-text-primary);
  border-bottom-left-radius: var(--radius-sm);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.bubble-text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  margin: 0;
}

.bubble-metadata {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  opacity: 0.7;
}
</style>
```

#### 3. VideoPlayer

**Uso:** VideoPreviewScreen, VideoFinalPreviewScreen, PostDetailsScreen

```html
<div class="video-player">
  <div class="video-container">
    <video class="video-element" poster="thumbnail.jpg">
      <source src="video.mp4" type="video/mp4">
    </video>
    <div class="video-controls">
      <button class="control-button play-pause">
        <svg class="icon-play" width="24" height="24"></svg>
      </button>
      <div class="timeline">
        <div class="timeline-progress" style="width: 30%"></div>
      </div>
      <span class="video-time">0:45 / 2:30</span>
    </div>
  </div>
</div>

<style>
.video-player {
  width: 100%;
  aspect-ratio: 9 / 16;
  background-color: black;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
}

.video-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-base);
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.control-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.timeline {
  flex: 1;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
}

.timeline-progress {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.1s linear;
}

.video-time {
  font-size: var(--font-size-xs);
  color: white;
  font-weight: var(--font-weight-medium);
}
</style>
```

#### 4. ProgressBar

**Uso:** GeneratingScriptScreen, ProcessingVideoScreen, OnboardingScreen

```html
<div class="progress-bar-container">
  <div class="progress-bar-label">
    <span class="progress-text">Gerando roteiro...</span>
    <span class="progress-percentage">65%</span>
  </div>
  <div class="progress-bar">
    <div class="progress-fill" style="width: 65%"></div>
  </div>
</div>

<style>
.progress-bar-container {
  width: 100%;
}

.progress-bar-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.progress-percentage {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--color-surface);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}
</style>
```

### Mapeamento de Componentes por Tela

| Tela | Componentes Reutilizáveis |
|---|---|
| AssistantScreen | VoiceButton, ChatBubble, Input |
| ScriptGenerationScreen | Input, Slider, Button, Card |
| RecordingActiveScreen | VideoPlayer, ProgressBar, Button |
| VideoEditScreen | VideoPlayer, Checkbox, Dropdown, Slider |
| CarouselPreviewScreen | Swiper, Card, Button |
| AnalyticsScreen | MetricCard, Chart, Card |
| SettingsScreen | SettingsList, Toggle, Button |

## Plano de Exportação e Conversão

### Fase 1: Exportação do Stitch

#### Estrutura de Exportação

```
influency-v1-screens-export/
├── screens/
│   ├── auth/
│   │   ├── splash.html
│   │   ├── login.html
│   │   ├── register.html
│   │   └── ...
│   ├── assistant/
│   │   ├── assistant.html
│   │   ├── conversation-history.html
│   │   └── ...
│   ├── scripts/
│   ├── recording/
│   ├── editing/
│   ├── carousels/
│   ├── posting/
│   ├── library/
│   ├── assets/
│   ├── settings/
│   └── analytics/
├── components/
│   ├── button.html
│   ├── card.html
│   ├── input.html
│   ├── voice-button.html
│   ├── chat-bubble.html
│   └── ...
├── styles/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   ├── components.css
│   └── utilities.css
├── assets/
│   ├── icons/
│   └── images/
├── screenshots/
│   ├── auth/
│   ├── assistant/
│   └── ...
├── DESIGN.md
└── INDEX.md
```

#### Comando de Exportação

```bash
# Exportar projeto Stitch
stitch.export_project({
  project_id: "influency-v1-screens",
  output_dir: "./export",
  include_screenshots: true,
  include_components: true,
  include_styles: true
})
```


### Fase 2: Conversão para React Native

#### Mapeamento HTML/CSS → React Native

| HTML/CSS | React Native | Notas |
|---|---|---|
| `<div>` | `<View>` | Container básico |
| `<span>`, `<p>` | `<Text>` | Texto |
| `<button>` | `<TouchableOpacity>` | Botão interativo |
| `<input>` | `<TextInput>` | Input de texto |
| `<img>` | `<Image>` | Imagem |
| `<video>` | `<Video>` (expo-av) | Vídeo |
| `display: flex` | `flexbox` (padrão) | Layout |
| `padding`, `margin` | `padding`, `margin` | Espaçamento |
| `background-color` | `backgroundColor` | Cor de fundo |
| `border-radius` | `borderRadius` | Bordas arredondadas |
| `box-shadow` | `shadow*` props | Sombra |
| `position: fixed` | `position: 'absolute'` | Posicionamento |
| `overflow: scroll` | `<ScrollView>` | Scroll |
| `z-index` | `zIndex` | Camadas |

#### Exemplo de Conversão: Button

**HTML/CSS:**
```html
<button class="button button-primary">
  Entrar
</button>

<style>
.button {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

.button-primary {
  background-color: #6200EE;
  color: #FFFFFF;
}
</style>
```

**React Native:**
```typescript
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

<TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
  <Text style={styles.buttonText}>Entrar</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#6200EE',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
```

#### Exemplo de Conversão: ChatBubble

**HTML/CSS:**
```html
<div class="chat-bubble" data-role="user">
  <div class="bubble-content">
    <p class="bubble-text">Olá!</p>
  </div>
</div>

<style>
.chat-bubble[data-role="user"] {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.bubble-content {
  max-width: 80%;
  padding: 12px 16px;
  background-color: #6200EE;
  border-radius: 12px;
  border-bottom-right-radius: 4px;
}

.bubble-text {
  color: #FFFFFF;
  font-size: 16px;
}
</style>
```

**React Native:**
```typescript
import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
  message: string;
  role: 'user' | 'assistant';
}

export default function ChatBubble({ message, role }: ChatBubbleProps) {
  return (
    <View style={[styles.container, role === 'user' && styles.userContainer]}>
      <View style={[styles.bubble, role === 'user' ? styles.userBubble : styles.assistantBubble]}>
        <Text style={[styles.text, role === 'user' && styles.userText]}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: '#6200EE',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#111827',
  },
  userText: {
    color: '#FFFFFF',
  },
});
```

### Fase 3: Estrutura de Arquivos React Native

```
influency-mobile/src/
├── screens/
│   ├── auth/
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── ConnectSocialNetworksScreen.tsx
│   │   └── OnboardingCompleteScreen.tsx
│   ├── assistant/
│   │   ├── AssistantScreen.tsx
│   │   ├── ConversationHistoryScreen.tsx
│   │   └── AssistantSettingsScreen.tsx
│   ├── scripts/
│   │   ├── ScriptGenerationScreen.tsx
│   │   ├── GeneratingScriptScreen.tsx
│   │   ├── ScriptGeneratedScreen.tsx
│   │   ├── EditScriptScreen.tsx
│   │   └── SavedScriptsScreen.tsx
│   ├── recording/
│   │   ├── ChooseScriptScreen.tsx
│   │   ├── TeleprompterSettingsScreen.tsx
│   │   ├── RecordingActiveScreen.tsx
│   │   └── VideoPreviewScreen.tsx
│   ├── editing/
│   │   ├── VideoEditScreen.tsx
│   │   ├── ProcessingVideoScreen.tsx
│   │   ├── VideoFinalPreviewScreen.tsx
│   │   └── SubtitlesCustomizationScreen.tsx
│   ├── carousels/
│   │   ├── CarouselGenerationScreen.tsx
│   │   ├── GeneratingCarouselScreen.tsx
│   │   ├── CarouselPreviewScreen.tsx
│   │   └── EditSlideScreen.tsx
│   ├── posting/
│   │   ├── SelectNetworksScreen.tsx
│   │   ├── CaptionHashtagsScreen.tsx
│   │   ├── SchedulePostScreen.tsx
│   │   ├── PostConfirmationScreen.tsx
│   │   └── ScheduledPostsScreen.tsx
│   ├── library/
│   │   ├── LibraryScreen.tsx
│   │   ├── SavedVideosScreen.tsx
│   │   └── SavedCarouselsScreen.tsx
│   ├── assets/
│   │   ├── BrandAssetsScreen.tsx
│   │   ├── UploadAssetScreen.tsx
│   │   └── ConfigureAssetScreen.tsx
│   ├── settings/
│   │   ├── SettingsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── BusinessDNASettingsScreen.tsx
│   │   ├── SocialAccountsScreen.tsx
│   │   ├── NotificationsSettingsScreen.tsx
│   │   └── IntegrationsScreen.tsx
│   └── analytics/
│       ├── AnalyticsScreen.tsx
│       ├── PostDetailsScreen.tsx
│       └── URLAnalysisScreen.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Chip.tsx
│   │   ├── Loading.tsx
│   │   └── ProgressBar.tsx
│   ├── assistant/
│   │   ├── VoiceButton.tsx
│   │   ├── ChatBubble.tsx
│   │   └── SuggestionChips.tsx
│   ├── video/
│   │   ├── VideoPlayer.tsx
│   │   └── VideoTimeline.tsx
│   └── teleprompter/
│       ├── TeleprompterView.tsx
│       └── ScrollController.tsx
├── navigation/
│   ├── RootNavigator.tsx
│   ├── AuthStack.tsx
│   ├── MainTabs.tsx
│   ├── AssistantStack.tsx
│   ├── LibraryStack.tsx
│   └── SettingsStack.tsx
└── theme/
    ├── colors.ts
    ├── typography.ts
    ├── spacing.ts
    ├── borderRadius.ts
    └── index.ts
```

## Validação e Qualidade

### Checklist de Validação por Tela

Para cada tela gerada, validar:

#### Design System
- [ ] Cores seguem a paleta definida (#6200EE, #03DAC6)
- [ ] Tipografia usa Inter (Regular, Medium, SemiBold, Bold)
- [ ] Espaçamento segue múltiplos de 8px
- [ ] Border radius segue padrão (4px, 8px, 12px, 16px)
- [ ] Componentes seguem Material Design 3

#### Acessibilidade
- [ ] Touch targets mínimos de 44x44px
- [ ] Contraste de texto mínimo 4.5:1
- [ ] Labels descritivos em elementos interativos
- [ ] Textos legíveis sem zoom
- [ ] Ícones com contraste mínimo 3:1

#### Responsividade
- [ ] Tela otimizada para 390x844px (iPhone 14)
- [ ] Funciona em telas de 320px a 428px de largura
- [ ] Usa unidades relativas (%, vh, vw)
- [ ] Elementos não cortados em telas menores
- [ ] Scroll funciona corretamente

#### Funcionalidade
- [ ] Todos os botões têm ação definida
- [ ] Inputs têm validação apropriada
- [ ] Loading states implementados
- [ ] Error states implementados
- [ ] Navegação entre telas clara

#### Performance
- [ ] Imagens otimizadas
- [ ] Animações suaves (60fps)
- [ ] Sem elementos desnecessários
- [ ] CSS otimizado

### Ferramentas de Validação

#### 1. Contraste de Cores

Usar ferramenta online: https://webaim.org/resources/contrastchecker/

**Validações:**
- Texto normal (16px): Contraste mínimo 4.5:1
- Texto grande (18px+): Contraste mínimo 3:1
- Ícones: Contraste mínimo 3:1

#### 2. Touch Targets

Usar ferramenta de medição no Stitch ou navegador:

```javascript
// Script para validar touch targets
document.querySelectorAll('button, a, input').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.width < 44 || rect.height < 44) {
    console.warn('Touch target muito pequeno:', el, rect);
  }
});
```

#### 3. Responsividade

Testar em múltiplos viewports:
- iPhone SE (375x667px)
- iPhone 14 (390x844px)
- iPhone 14 Pro Max (428x926px)

### Critérios de Qualidade

#### Nível A (Mínimo Aceitável)
- Design system aplicado corretamente
- Acessibilidade básica (touch targets, contraste)
- Funcionalidade completa

#### Nível AA (Recomendado)
- Nível A +
- Animações suaves
- Loading states bem implementados
- Error handling completo

#### Nível AAA (Excelência)
- Nível AA +
- Micro-interações polidas
- Feedback visual rico
- Performance otimizada


## Riscos e Mitigações

### Risco 1: Inconsistência Visual entre Telas

**Descrição:** Telas geradas em momentos diferentes podem ter estilos ligeiramente diferentes.

**Probabilidade:** Alta  
**Impacto:** Médio

**Mitigação:**
1. Criar arquivo `design-system.json` no início do projeto
2. Referenciar o design system em TODOS os prompts
3. Gerar componentes base primeiro, depois telas
4. Fazer revisão visual a cada 10 telas geradas
5. Manter checklist de validação rigoroso

### Risco 2: Stitch MCP Não Gera Exatamente Como Esperado

**Descrição:** IA pode interpretar prompts de forma diferente do esperado.

**Probabilidade:** Média  
**Impacto:** Alto

**Mitigação:**
1. Usar prompts extremamente detalhados e específicos
2. Incluir referências visuais (links para Material Design 3)
3. Iterar em cada tela até atingir qualidade desejada
4. Manter biblioteca de prompts bem-sucedidos
5. Usar comando de "refinar" do Stitch para ajustes

### Risco 3: Conversão HTML/CSS → React Native Complexa

**Descrição:** Algumas propriedades CSS não têm equivalente direto em React Native.

**Probabilidade:** Alta  
**Impacto:** Médio

**Mitigação:**
1. Usar apenas propriedades CSS compatíveis com React Native
2. Evitar `position: fixed`, `box-shadow` complexo, `transform` avançado
3. Criar guia de conversão detalhado
4. Testar conversão em telas piloto antes de gerar todas
5. Usar bibliotecas como `react-native-shadow-2` quando necessário

### Risco 4: Acessibilidade Não Validada Automaticamente

**Descrição:** Stitch pode não garantir contraste e touch targets adequados.

**Probabilidade:** Média  
**Impacto:** Alto

**Mitigação:**
1. Incluir requisitos de acessibilidade em TODOS os prompts
2. Usar ferramentas de validação de contraste após geração
3. Medir touch targets manualmente
4. Criar script de validação automática
5. Fazer revisão manual de acessibilidade

### Risco 5: Tempo de Geração Maior que Esperado

**Descrição:** Gerar 51 telas pode levar mais tempo que o planejado.

**Probabilidade:** Média  
**Impacto:** Médio

**Mitigação:**
1. Priorizar telas críticas (Auth, Assistente, Scripts)
2. Gerar em lotes de 10 telas
3. Paralelizar geração quando possível
4. Ter buffer de tempo no cronograma
5. Aceitar qualidade "Nível A" para telas menos críticas

### Risco 6: Falta de Componentes Reutilizáveis

**Descrição:** Cada tela pode ter componentes duplicados ao invés de reutilizáveis.

**Probabilidade:** Alta  
**Impacto:** Alto

**Mitigação:**
1. Gerar componentes base ANTES das telas
2. Referenciar componentes existentes nos prompts
3. Fazer refatoração após geração inicial
4. Criar biblioteca de componentes documentada
5. Validar reutilização a cada 5 telas

## Cronograma de Execução

### Fase 1: Preparação (1 dia)

**Dia 1:**
- [ ] Criar projeto Stitch "influency-v1-screens"
- [ ] Configurar design system base (colors, typography, spacing)
- [ ] Gerar componentes base (Button, Card, Input, Loading)
- [ ] Validar componentes base
- [ ] Criar templates de prompt

### Fase 2: Geração de Telas (5 dias)

**Dia 2: Fundação e Onboarding (11 telas)**
- [ ] SplashScreen
- [ ] LoginScreen
- [ ] RegisterScreen
- [ ] WelcomeScreen
- [ ] OnboardingScreen (5 perguntas)
- [ ] ConnectSocialNetworksScreen
- [ ] OnboardingCompleteScreen
- [ ] Validação de consistência

**Dia 3: Assistente e Scripts (8 telas)**
- [ ] AssistantScreen
- [ ] ConversationHistoryScreen
- [ ] AssistantSettingsScreen
- [ ] ScriptGenerationScreen
- [ ] GeneratingScriptScreen
- [ ] ScriptGeneratedScreen
- [ ] EditScriptScreen
- [ ] SavedScriptsScreen
- [ ] Validação de consistência

**Dia 4: Gravação e Edição (8 telas)**
- [ ] ChooseScriptScreen
- [ ] TeleprompterSettingsScreen
- [ ] RecordingActiveScreen
- [ ] VideoPreviewScreen
- [ ] VideoEditScreen
- [ ] ProcessingVideoScreen
- [ ] VideoFinalPreviewScreen
- [ ] SubtitlesCustomizationScreen
- [ ] Validação de consistência

**Dia 5: Carrosséis e Publicação (9 telas)**
- [ ] CarouselGenerationScreen
- [ ] GeneratingCarouselScreen
- [ ] CarouselPreviewScreen
- [ ] EditSlideScreen
- [ ] SelectNetworksScreen
- [ ] CaptionHashtagsScreen
- [ ] SchedulePostScreen
- [ ] PostConfirmationScreen
- [ ] ScheduledPostsScreen
- [ ] Validação de consistência

**Dia 6: Biblioteca, Assets, Configurações e Analytics (15 telas)**
- [ ] LibraryScreen
- [ ] SavedVideosScreen
- [ ] SavedCarouselsScreen
- [ ] BrandAssetsScreen
- [ ] UploadAssetScreen
- [ ] ConfigureAssetScreen
- [ ] SettingsScreen
- [ ] ProfileScreen
- [ ] BusinessDNASettingsScreen
- [ ] SocialAccountsScreen
- [ ] NotificationsSettingsScreen
- [ ] IntegrationsScreen
- [ ] AnalyticsScreen
- [ ] PostDetailsScreen
- [ ] URLAnalysisScreen
- [ ] Validação de consistência

### Fase 3: Validação e Refinamento (2 dias)

**Dia 7: Validação Completa**
- [ ] Revisar todas as 51 telas
- [ ] Validar design system em todas as telas
- [ ] Validar acessibilidade (contraste, touch targets)
- [ ] Validar responsividade
- [ ] Identificar telas que precisam refinamento
- [ ] Refinar telas problemáticas

**Dia 8: Exportação e Documentação**
- [ ] Exportar projeto Stitch
- [ ] Gerar screenshots de todas as telas
- [ ] Criar DESIGN.md consolidado
- [ ] Criar INDEX.md com lista de telas
- [ ] Documentar componentes reutilizáveis
- [ ] Criar guia de conversão para React Native

### Total: 8 dias úteis

## Entregáveis

### 1. Telas Geradas (51 arquivos HTML)

```
screens/
├── auth/ (11 telas)
├── assistant/ (3 telas)
├── scripts/ (5 telas)
├── recording/ (4 telas)
├── editing/ (4 telas)
├── carousels/ (4 telas)
├── posting/ (5 telas)
├── library/ (3 telas)
├── assets/ (3 telas)
├── settings/ (6 telas)
└── analytics/ (3 telas)
```

### 2. Componentes Reutilizáveis (15+ componentes)

```
components/
├── ui/
│   ├── Button.html
│   ├── Card.html
│   ├── Input.html
│   ├── Badge.html
│   ├── Chip.html
│   ├── Loading.html
│   └── ProgressBar.html
├── assistant/
│   ├── VoiceButton.html
│   ├── ChatBubble.html
│   └── SuggestionChips.html
├── video/
│   ├── VideoPlayer.html
│   └── VideoTimeline.html
└── teleprompter/
    ├── TeleprompterView.html
    └── ScrollController.html
```

### 3. Design System (5 arquivos CSS)

```
styles/
├── colors.css
├── typography.css
├── spacing.css
├── components.css
└── utilities.css
```

### 4. Screenshots (51 imagens PNG)

```
screenshots/
├── auth/
│   ├── splash.png
│   ├── login.png
│   └── ...
├── assistant/
├── scripts/
├── recording/
├── editing/
├── carousels/
├── posting/
├── library/
├── assets/
├── settings/
└── analytics/
```

### 5. Documentação

```
docs/
├── DESIGN.md (design system consolidado)
├── INDEX.md (lista de todas as telas)
├── COMPONENTS.md (documentação de componentes)
├── CONVERSION-GUIDE.md (guia de conversão para React Native)
└── NAVIGATION.md (estrutura de navegação)
```

## Próximos Passos Após Geração

### 1. Conversão para React Native

- Converter HTML/CSS para componentes React Native
- Implementar navegação com React Navigation
- Integrar com backend (APIs)
- Adicionar lógica de negócio

### 2. Implementação de Funcionalidades

- Reconhecimento de voz (@react-native-voice/voice)
- Síntese de voz (expo-speech)
- Gravação de vídeo (expo-camera)
- Edição de vídeo (FFmpeg)
- Upload de arquivos (Cloudflare R2)

### 3. Testes

- Testes unitários (Jest)
- Testes de componentes (React Native Testing Library)
- Testes E2E (Detox)
- Testes de acessibilidade

### 4. Deploy

- Build iOS (EAS Build)
- Build Android (EAS Build)
- Submissão para App Store
- Submissão para Google Play

## Referências

### Documentação Técnica

- [Material Design 3](https://m3.material.io/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

### Design Inspiration

- [Dribbble - Mobile App Design](https://dribbble.com/tags/mobile-app)
- [Mobbin - Mobile Design Patterns](https://mobbin.com/)
- [Instagram Creator Studio](https://www.instagram.com/accounts/login/?next=/creator/)
- [TikTok Creator Portal](https://www.tiktok.com/creators/)

### Ferramentas

- [Stitch MCP](https://stitch.dev/)
- [Figma](https://www.figma.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Lucide Icons](https://lucide.dev/)

---

**Última Atualização:** 08/03/2026  
**Versão:** 1.0.0  
**Status:** ✅ DESIGN TÉCNICO COMPLETO  
**Autor:** Kiro AI Assistant  
**Projeto:** INFLUENCY by RENUM
