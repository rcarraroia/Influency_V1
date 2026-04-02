# 📱 ESPECIFICAÇÃO DE TELAS - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Total de Telas:** 51 telas  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA  
**Projeto Stitch ID:** 15962214627344849757  
**Telas Geradas:** 51/51 (100%)  
**Arquivos Organizados:** [stitch-export/organized/](../stitch-export/organized/)

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Auth & Onboarding (8 telas)](#auth--onboarding-8-telas)
3. [Assistente IA (3 telas)](#assistente-ia-3-telas)
4. [Scripts (5 telas)](#scripts-5-telas)
5. [Gravação (4 telas)](#gravação-4-telas)
6. [Edição (4 telas)](#edição-4-telas)
7. [Carrosséis (4 telas)](#carrosséis-4-telas)
8. [Publicação (5 telas)](#publicação-5-telas)
9. [Biblioteca (3 telas)](#biblioteca-3-telas)
10. [Assets (3 telas)](#assets-3-telas)
11. [Configurações (6 telas)](#configurações-6-telas)

---

## 🎯 VISÃO GERAL

### Princípios de Design

1. **Mobile-First:** Otimizado para telas 390x844px (iPhone 14)
2. **Material Design 3:** Componentes e padrões do MD3
3. **Acessibilidade:** Touch targets mínimos de 44x44px
4. **Feedback Visual:** Loading states, animações suaves
5. **Consistência:** Mesmos componentes em todas as telas

### Componentes Base

- **Button:** Primary, Secondary, Outline
- **Card:** Elevated, Flat
- **Input:** Text, TextArea, Dropdown
- **Loading:** Spinner, Skeleton, Progress Bar
- **Modal:** Bottom Sheet, Dialog

---

## 🔐 AUTH & ONBOARDING (8 telas)

### 1. SplashScreen

**Componentes:**
- Logo do Influency (centralizado)
- Loading spinner
- Versão do app (rodapé)

**Comportamento:**
- Verifica token JWT
- Se autenticado → MainTabs
- Se não → LoginScreen

```typescript
// src/screens/auth/SplashScreen.tsx
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} />
      <ActivityIndicator color={Colors.primary} />
      <Text style={styles.version}>v2.0.0</Text>
    </View>
  );
}
```

### 2. LoginScreen

**Componentes:**
- Logo
- Input: Email
- Input: Senha
- Button: "Entrar"
- Link: "Esqueci minha senha"
- Link: "Criar conta"

**API:** `POST /auth/login`

### 3. RegisterScreen

**Componentes:**
- Input: Nome
- Input: Email
- Input: Senha
- Input: Confirmar senha
- Button: "Criar conta"

**API:** `POST /auth/register`

### 4. WelcomeScreen

**Componentes:**
- Título: "Bem-vinda ao Influency!"
- Subtítulo: "Vou te ajudar a criar conteúdo viral"
- Ilustração
- Button: "Começar"

**Navegação:** → OnboardingScreen

### 5-9. OnboardingScreen (5 perguntas)

**Estrutura comum:**
- Progress bar (1/5, 2/5, etc.)
- Pergunta do assistente (texto + áudio)
- Input de resposta (voz + texto)
- Button: "Próxima"

**Perguntas:**
1. Nicho/Negócio
2. Público-alvo
3. Tom de voz
4. Objetivos
5. Produtos/Serviços

**API:** `POST /business-dna` (pergunta 1), `PUT /business-dna` (demais)

### 10. ConnectSocialNetworksScreen

**Componentes:**
- Título: "Conecte suas redes sociais"
- Cards de redes:
  - Instagram (botão OAuth)
  - TikTok (botão OAuth)
  - Facebook (botão OAuth)
- Button: "Pular por enquanto"

**API:** `POST /social-accounts/connect`

### 11. OnboardingCompleteScreen

**Componentes:**
- Ícone de sucesso (checkmark)
- Título: "Tudo pronto!"
- Subtítulo: "Seu Business DNA está configurado"
- Button: "Criar meu primeiro roteiro"

**Navegação:** → AssistantScreen

---

## 🤖 ASSISTENTE IA (3 telas)

### 12. AssistantScreen

**Componentes:**
- Header: "Assistente IA"
- ScrollView: Histórico de mensagens
  - ChatBubble (usuário)
  - ChatBubble (assistente)
- Footer:
  - VoiceButton (microfone)
  - TextInput
  - SendButton

**Comportamento:**
- Usuário pode falar OU digitar
- Assistente responde em texto
- Se usuário usou voz → assistente fala resposta

**API:** `POST /assistant/send`

```typescript
// src/screens/assistant/AssistantScreen.tsx
export default function AssistantScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const { startListening, stopListening, isListening } = useVoiceRecognition();
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        {messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <VoiceButton
          isListening={isListening}
          onPress={() => isListening ? stopListening() : startListening()}
        />
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite ou fale..."
        />
        <SendButton onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}
```

### 13. ConversationHistoryScreen

**Componentes:**
- Header: "Conversas"
- FlatList: Lista de conversas
  - Card: Título + última mensagem + data
- FAB: Nova conversa

**API:** `GET /assistant/conversations`

### 14. AssistantSettingsScreen

**Componentes:**
- Toggle: "Respostas em áudio"
- Dropdown: "Velocidade da voz" (0.8x - 1.2x)
- Toggle: "Sugestões proativas"
- Button: "Limpar histórico"

---

## 📝 SCRIPTS (5 telas)

### 15. ScriptGenerationScreen

**Componentes:**
- Input: "Sobre o que você quer falar?"
- Slider: Duração (30-300 segundos)
- Button: "Gerar Roteiro"

**API:** `POST /scripts/generate`

### 16. GeneratingScriptScreen (Loading)

**Componentes:**
- Animação de loading
- Texto: "Buscando tendências..."
- Texto: "Gerando roteiro viral..."
- Progress: 0-100%

### 17. ScriptGeneratedScreen

**Componentes:**
- Card: Roteiro
  - Título
  - Conteúdo (scrollable)
  - Word count
  - Duração estimada
- Buttons:
  - "Editar"
  - "Usar para Gravar"
  - "Salvar"

### 18. EditScriptScreen

**Componentes:**
- Input: Título
- TextArea: Conteúdo
- Word counter (live)
- Duration estimator (live)
- Buttons:
  - "Cancelar"
  - "Salvar"

**API:** `PUT /scripts/{script_id}`

### 19. SavedScriptsScreen

**Componentes:**
- Header: "Meus Roteiros"
- FlatList: Lista de roteiros
  - Card: Título + preview + data
- FAB: Novo roteiro

**API:** `GET /scripts`

---

## 🎥 GRAVAÇÃO (4 telas)

### 20. ChooseScriptScreen

**Componentes:**
- Header: "Escolha um roteiro"
- FlatList: Lista de roteiros
- Button: "Gravar sem roteiro"

### 21. TeleprompterSettingsScreen

**Componentes:**
- Dropdown: "Modo de scroll"
  - Manual
  - Automático
  - Sincronizado por voz
- Slider: Velocidade (se automático)
- Slider: Tamanho da fonte
- Button: "Testar"
- Button: "Começar Gravação"

### 22. RecordingActiveScreen

**Componentes:**
- Camera preview (fullscreen)
- Teleprompter overlay (semi-transparente)
- Botão REC (pulsando)
- Timer
- Botões:
  - Pausar/Retomar
  - Parar

### 23. VideoPreviewScreen

**Componentes:**
- Video player
- Duração
- Buttons:
  - "Regravar"
  - "Salvar e Editar"
  - "Salvar sem Editar"

**API:** `POST /videos/upload`

---

## ✂️ EDIÇÃO (4 telas)

### 24. VideoEditScreen

**Componentes:**
- Video preview (thumbnail)
- Checkboxes:
  - ✅ Adicionar legendas
  - ✅ Adicionar música
  - ✅ Aplicar assets
  - ✅ Cortes automáticos
- Dropdowns:
  - Estilo de legenda
  - Modo de corte
- Slider: Volume da música
- Button: "Processar Vídeo"

**API:** `POST /videos/{video_id}/edit`

### 25. ProcessingVideoScreen (Loading)

**Componentes:**
- Animação de loading
- Progress bar com etapas:
  - Transcrevendo áudio... 25%
  - Aplicando legendas... 50%
  - Adicionando música... 75%
  - Finalizando... 100%

### 26. VideoFinalPreviewScreen

**Componentes:**
- Video player (editado)
- Toggle: "Ver antes/depois"
- Buttons:
  - "Baixar"
  - "Publicar"
  - "Salvar na Biblioteca"

### 27. SubtitlesCustomizationScreen (Modal)

**Componentes:**
- Preview de legenda
- Dropdown: Estilo (default/bold/minimal)
- Color picker: Cor do texto
- Color picker: Cor do fundo
- Slider: Tamanho da fonte
- Button: "Aplicar"

---

## 🎨 CARROSSÉIS (4 telas)

### 28. CarouselGenerationScreen

**Componentes:**
- Input: "Tema do carrossel"
- Slider: Número de slides (3-10)
- Button: "Gerar Carrossel"

**API:** `POST /carousels/generate`

### 29. GeneratingCarouselScreen (Loading)

**Componentes:**
- Animação
- Texto: "Gerando tópicos..."
- Texto: "Buscando imagens..."

### 30. CarouselPreviewScreen

**Componentes:**
- Swiper: Slides do carrossel
- Indicador de página (1/5)
- Buttons:
  - "Editar Slide"
  - "Trocar Imagem"
  - "Publicar"

### 31. EditSlideScreen (Modal)

**Componentes:**
- Image preview
- Input: Título
- TextArea: Conteúdo
- Button: "Salvar"

**API:** `PUT /carousels/{carousel_id}`

---

## 📤 PUBLICAÇÃO (5 telas)

### 32. SelectNetworksScreen

**Componentes:**
- Título: "Onde publicar?"
- Checkboxes:
  - Instagram
  - TikTok
  - Facebook
  - YouTube
- Button: "Continuar"

### 33. CaptionHashtagsScreen

**Componentes:**
- TextArea: Legenda (gerada por IA)
- TagInput: Hashtags
- Button: "Gerar legenda com IA"
- Button: "Continuar"

**API:** `POST /posts/generate-caption`

### 34. SchedulePostScreen

**Componentes:**
- Radio buttons:
  - Publicar agora
  - Agendar para...
- DateTimePicker (se agendar)
- Preview do post
- Button: "Confirmar"

**API:** `POST /posts`

### 35. PostConfirmationScreen

**Componentes:**
- Ícone de sucesso
- Título: "Post publicado!"
- Lista de redes:
  - ✅ Instagram (link)
  - ✅ TikTok (link)
- Buttons:
  - "Ver Métricas"
  - "Criar Novo Conteúdo"

### 36. ScheduledPostsScreen

**Componentes:**
- Header: "Posts Agendados"
- FlatList: Lista de posts
  - Card: Preview + data + redes
- Ações:
  - Editar
  - Cancelar

**API:** `GET /posts?status=scheduled`

---

## 📚 BIBLIOTECA (3 telas)

### 37. LibraryScreen

**Componentes:**
- Tabs:
  - Roteiros
  - Vídeos
  - Carrosséis
- Grid de cards

### 38. SavedVideosScreen

**Componentes:**
- FlatList: Grid de vídeos
  - Thumbnail
  - Duração
  - Data
- FAB: Gravar novo

**API:** `GET /videos`

### 39. SavedCarouselsScreen

**Componentes:**
- FlatList: Lista de carrosséis
  - Preview do primeiro slide
  - Título
  - Número de slides
- FAB: Criar novo

**API:** `GET /carousels`

---

## 🖼️ ASSETS (3 telas)

### 40. BrandAssetsScreen

**Componentes:**
- Lista de assets:
  - Logo
  - Intro
  - Outro
  - Watermark
- Status: Configurado/Não configurado
- Buttons: "Adicionar" ou "Editar"

**API:** `GET /assets`

### 41. UploadAssetScreen

**Componentes:**
- Image picker
- Preview
- Button: "Upload"

**API:** `POST /assets/upload`

### 42. ConfigureAssetScreen

**Componentes:**
- Preview do vídeo com asset
- Dropdown: Posição
- Slider: Opacidade
- Slider: Duração (intro/outro)
- Toggle: "Aplicar automaticamente"
- Button: "Salvar"

**API:** `PUT /assets/{asset_id}`

---

## ⚙️ CONFIGURAÇÕES (6 telas)

### 43. SettingsScreen

**Componentes:**
- Lista de opções:
  - Perfil
  - Business DNA
  - Redes Sociais
  - Assets
  - Notificações
  - Sobre

### 44. ProfileScreen

**Componentes:**
- Avatar (editável)
- Input: Nome
- Input: Email (readonly)
- Button: "Salvar"
- Button: "Alterar Senha"

**API:** `PUT /users/profile`

### 45. BusinessDNASettingsScreen

**Componentes:**
- Card: Business DNA atual
  - Nicho
  - Público
  - Tom de voz
  - Objetivos
- Button: "Editar"

**API:** `GET /business-dna`, `PUT /business-dna`

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ COMPLETO (Parte 1/2)


---

## 📱 ESPECIFICAÇÃO DE TELAS - PARTE 2

### 46. SocialAccountsScreen

**Componentes:**
- Header: "Redes Sociais Conectadas"
- FlatList: Lista de contas
  - Card por rede social:
    - Avatar da conta
    - Nome da rede (Instagram, TikTok, etc.)
    - Username (@usuario)
    - Status: Conectada/Desconectada
    - Botão: "Gerenciar" ou "Conectar"
- FAB: "Adicionar Rede"

**API:** `GET /social-accounts`

**Comportamento:**
- Se conta conectada → mostra "Gerenciar" (pode desconectar)
- Se conta não conectada → mostra "Conectar" (OAuth)
- FAB abre modal com lista de redes disponíveis

```typescript
// src/screens/settings/SocialAccountsScreen.tsx
export default function SocialAccountsScreen() {
  const { data: accounts, isLoading } = useSocialAccounts();
  
  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <Card style={styles.accountCard}>
            <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.platform}>{item.platform}</Text>
              <Text style={styles.username}>@{item.username}</Text>
            </View>
            <Badge 
              text={item.is_active ? 'Conectada' : 'Desconectada'}
              color={item.is_active ? Colors.success : Colors.error}
            />
            <Button
              title={item.is_active ? 'Gerenciar' : 'Conectar'}
              variant="outline"
              size="small"
              onPress={() => handleManage(item)}
            />
          </Card>
        )}
      />
      <FAB icon="plus" onPress={() => navigation.navigate('AddSocialAccount')} />
    </View>
  );
}
```

---

### 47. NotificationsSettingsScreen

**Componentes:**
- Header: "Notificações"
- Section: "Push Notifications"
  - Toggle: "Ativar notificações"
  - Toggle: "Post publicado"
  - Toggle: "Vídeo processado"
  - Toggle: "Script gerado"
  - Toggle: "Métricas semanais"
- Section: "Email"
  - Toggle: "Resumo semanal"
  - Toggle: "Novidades do produto"
- Section: "Horário de Silêncio"
  - TimePicker: "Das 22h às 8h"
- Button: "Salvar Preferências"

**API:** `GET /users/preferences`, `PUT /users/preferences`

```typescript
// src/screens/settings/NotificationsSettingsScreen.tsx
export default function NotificationsSettingsScreen() {
  const [preferences, setPreferences] = useState({
    push_enabled: true,
    post_published: true,
    video_processed: true,
    script_generated: false,
    weekly_metrics: true,
    email_weekly: true,
    email_news: false,
    quiet_hours: { start: '22:00', end: '08:00' },
  });
  
  return (
    <ScrollView style={styles.container}>
      <Section title="Push Notifications">
        <Toggle
          label="Ativar notificações"
          value={preferences.push_enabled}
          onValueChange={(value) => setPreferences({ ...preferences, push_enabled: value })}
        />
        <Toggle
          label="Post publicado"
          value={preferences.post_published}
          disabled={!preferences.push_enabled}
        />
        {/* ... outros toggles */}
      </Section>
      
      <Section title="Email">
        <Toggle label="Resumo semanal" value={preferences.email_weekly} />
        <Toggle label="Novidades do produto" value={preferences.email_news} />
      </Section>
      
      <Section title="Horário de Silêncio">
        <TimePicker
          label="Das"
          value={preferences.quiet_hours.start}
          onChange={(time) => setPreferences({
            ...preferences,
            quiet_hours: { ...preferences.quiet_hours, start: time }
          })}
        />
        <TimePicker
          label="Até"
          value={preferences.quiet_hours.end}
          onChange={(time) => setPreferences({
            ...preferences,
            quiet_hours: { ...preferences.quiet_hours, end: time }
          })}
        />
      </Section>
      
      <Button
        title="Salvar Preferências"
        onPress={handleSave}
        fullWidth
      />
    </ScrollView>
  );
}
```

---

### 48. AnalyticsScreen

**Componentes:**
- Header: "Analytics"
- DateRangePicker: "Últimos 30 dias"
- Cards de Métricas:
  - Total de Posts
  - Total de Views
  - Total de Likes
  - Engajamento Médio
- Chart: Gráfico de linha (views ao longo do tempo)
- Section: "Top Posts"
  - FlatList: Top 5 posts por engajamento
    - Thumbnail
    - Título
    - Métricas (views, likes, comments)
    - Viral Score
- Button: "Atualizar Métricas"

**API:** `GET /analytics/summary`, `GET /analytics/viral-posts`

```typescript
// src/screens/analytics/AnalyticsScreen.tsx
export default function AnalyticsScreen() {
  const [dateRange, setDateRange] = useState({ start: '2026-02-07', end: '2026-03-07' });
  const { data: summary, isLoading } = useAnalyticsSummary(dateRange);
  const { data: topPosts } = useViralPosts();
  
  return (
    <ScrollView style={styles.container}>
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
      />
      
      <View style={styles.metricsGrid}>
        <MetricCard
          title="Posts"
          value={summary?.total_posts}
          icon="file-text"
        />
        <MetricCard
          title="Views"
          value={formatNumber(summary?.total_views)}
          icon="eye"
        />
        <MetricCard
          title="Likes"
          value={formatNumber(summary?.total_likes)}
          icon="heart"
        />
        <MetricCard
          title="Engajamento"
          value={`${summary?.avg_engagement}%`}
          icon="trending-up"
        />
      </View>
      
      <Card style={styles.chartCard}>
        <Text style={styles.chartTitle}>Views ao Longo do Tempo</Text>
        <LineChart
          data={summary?.views_over_time}
          width={Dimensions.get('window').width - 64}
          height={220}
        />
      </Card>
      
      <Section title="Top Posts">
        <FlatList
          data={topPosts}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onPress={() => navigation.navigate('PostDetails', { postId: item.id })}
            />
          )}
        />
      </Section>
      
      <Button
        title="Atualizar Métricas"
        variant="outline"
        onPress={handleRefresh}
        fullWidth
      />
    </ScrollView>
  );
}
```

---

### 49. PostDetailsScreen

**Componentes:**
- Header: "Detalhes do Post"
- Video/Image preview
- Section: "Métricas por Rede"
  - Tabs: Instagram, TikTok, Facebook
  - Cards de métricas:
    - Views
    - Likes
    - Comments
    - Shares
    - Saves
    - Reach
    - Impressions
- Section: "Viral Score"
  - Progress bar circular
  - Score: 0.85 (85%)
  - Badge: "🔥 Viral"
- Section: "Legenda"
  - Texto completo
  - Hashtags
- Section: "Publicado em"
  - Data e hora
  - Redes sociais
- Buttons:
  - "Ver no Instagram" (deep link)
  - "Ver no TikTok" (deep link)
  - "Duplicar Post"

**API:** `GET /posts/{post_id}`, `GET /analytics/posts/{post_id}`

```typescript
// src/screens/analytics/PostDetailsScreen.tsx
export default function PostDetailsScreen({ route }) {
  const { postId } = route.params;
  const { data: post } = usePost(postId);
  const { data: analytics } = usePostAnalytics(postId);
  
  return (
    <ScrollView style={styles.container}>
      {post?.video_id ? (
        <VideoPlayer uri={post.video.edited_video_url} />
      ) : (
        <Image source={{ uri: post?.carousel?.slides[0]?.image_url }} />
      )}
      
      <Section title="Métricas por Rede">
        <Tabs>
          {post?.networks.map(network => (
            <Tab key={network} label={network}>
              <MetricsGrid metrics={analytics?.metrics[network]} />
            </Tab>
          ))}
        </Tabs>
      </Section>
      
      <Section title="Viral Score">
        <View style={styles.viralScoreContainer}>
          <CircularProgress
            value={analytics?.viral_score * 100}
            size={120}
            color={getViralScoreColor(analytics?.viral_score)}
          />
          <Text style={styles.viralScoreText}>
            {(analytics?.viral_score * 100).toFixed(0)}%
          </Text>
          {analytics?.viral_score > 0.7 && (
            <Badge text="🔥 Viral" color={Colors.error} />
          )}
        </View>
      </Section>
      
      <Section title="Legenda">
        <Text style={styles.caption}>{post?.caption}</Text>
        <View style={styles.hashtags}>
          {post?.hashtags.map(tag => (
            <Chip key={tag} text={`#${tag}`} />
          ))}
        </View>
      </Section>
      
      <Section title="Publicado em">
        <Text>{formatDate(post?.published_at)}</Text>
        <View style={styles.networks}>
          {post?.networks.map(network => (
            <Chip key={network} text={network} icon={getNetworkIcon(network)} />
          ))}
        </View>
      </Section>
      
      <View style={styles.actions}>
        {post?.external_post_ids?.instagram && (
          <Button
            title="Ver no Instagram"
            icon="instagram"
            onPress={() => openInstagramPost(post.external_post_ids.instagram)}
          />
        )}
        {post?.external_post_ids?.tiktok && (
          <Button
            title="Ver no TikTok"
            icon="music"
            onPress={() => openTikTokPost(post.external_post_ids.tiktok)}
          />
        )}
        <Button
          title="Duplicar Post"
          variant="outline"
          onPress={handleDuplicate}
        />
      </View>
    </ScrollView>
  );
}
```

---

### 50. IntegrationsScreen

**Componentes:**
- Header: "Integrações"
- Section: "Redes Sociais"
  - Card: Mixpost
    - Status: Conectado
    - Descrição: "Publicação multi-rede"
    - Botão: "Gerenciar"
- Section: "IA e Processamento"
  - Card: OpenRouter (Claude)
    - Status: Ativo
    - Descrição: "Geração de roteiros e assistente"
    - Badge: "RENUM gerenciado"
  - Card: Whisper
    - Status: Ativo
    - Descrição: "Transcrição de áudio"
    - Badge: "RENUM gerenciado"
- Section: "Busca e Imagens"
  - Card: Tavily
    - Status: Ativo
    - Descrição: "Busca de tendências"
  - Card: Pexels/Unsplash
    - Status: Ativo
    - Descrição: "Banco de imagens"
- Section: "Storage"
  - Card: Cloudflare R2
    - Status: Ativo
    - Descrição: "Armazenamento de vídeos"
    - Uso: "2.5 GB / 10 GB"

**API:** `GET /users/integrations`

```typescript
// src/screens/settings/IntegrationsScreen.tsx
export default function IntegrationsScreen() {
  const { data: integrations } = useIntegrations();
  
  return (
    <ScrollView style={styles.container}>
      <Section title="Redes Sociais">
        <IntegrationCard
          name="Mixpost"
          description="Publicação multi-rede"
          status="connected"
          icon="share-2"
          onPress={() => navigation.navigate('SocialAccounts')}
        />
      </Section>
      
      <Section title="IA e Processamento">
        <IntegrationCard
          name="OpenRouter (Claude)"
          description="Geração de roteiros e assistente"
          status="active"
          icon="cpu"
          badge="RENUM gerenciado"
        />
        <IntegrationCard
          name="Whisper"
          description="Transcrição de áudio"
          status="active"
          icon="mic"
          badge="RENUM gerenciado"
        />
      </Section>
      
      <Section title="Busca e Imagens">
        <IntegrationCard
          name="Tavily"
          description="Busca de tendências"
          status="active"
          icon="search"
        />
        <IntegrationCard
          name="Pexels/Unsplash"
          description="Banco de imagens"
          status="active"
          icon="image"
        />
      </Section>
      
      <Section title="Storage">
        <IntegrationCard
          name="Cloudflare R2"
          description="Armazenamento de vídeos"
          status="active"
          icon="hard-drive"
          usage="2.5 GB / 10 GB"
        />
      </Section>
    </ScrollView>
  );
}
```

---

### 51. URLAnalysisScreen

**Componentes:**
- Header: "Analisar URL"
- Input: URL do vídeo
  - Placeholder: "Cole a URL do YouTube, TikTok ou Instagram"
  - Validação: URL válida
- Dropdown: Duração do roteiro (30-300s)
- Button: "Analisar e Gerar Roteiro"
- Loading state: "Baixando vídeo..."
- Loading state: "Transcrevendo áudio..."
- Loading state: "Gerando roteiro autoral..."

**API:** `POST /scripts/from-url`

```typescript
// src/screens/scripts/URLAnalysisScreen.tsx
export default function URLAnalysisScreen() {
  const [url, setUrl] = useState('');
  const [duration, setDuration] = useState(60);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState({ step: '', percent: 0 });
  
  const handleAnalyze = async () => {
    if (!isValidURL(url)) {
      Alert.alert('Erro', 'URL inválida');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Simula progresso
      setProgress({ step: 'Baixando vídeo...', percent: 0 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProgress({ step: 'Transcrevendo áudio...', percent: 33 });
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setProgress({ step: 'Gerando roteiro autoral...', percent: 66 });
      const response = await scriptsService.generateFromURL(url, duration);
      
      setProgress({ step: 'Concluído!', percent: 100 });
      
      // Navega para roteiro gerado
      navigation.navigate('ScriptGenerated', { scriptId: response.id });
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analisar Vídeo de URL</Text>
      <Text style={styles.subtitle}>
        Cole a URL de um vídeo público e vou criar um roteiro autoral inspirado nele
      </Text>
      
      <Input
        label="URL do Vídeo"
        value={url}
        onChangeText={setUrl}
        placeholder="https://youtube.com/watch?v=..."
        autoCapitalize="none"
        keyboardType="url"
      />
      
      <Dropdown
        label="Duração do Roteiro"
        value={duration}
        onChange={setDuration}
        options={[
          { label: '30 segundos', value: 30 },
          { label: '60 segundos', value: 60 },
          { label: '90 segundos', value: 90 },
          { label: '2 minutos', value: 120 },
          { label: '3 minutos', value: 180 },
        ]}
      />
      
      {isAnalyzing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>{progress.step}</Text>
          <ProgressBar progress={progress.percent / 100} />
        </View>
      ) : (
        <Button
          title="Analisar e Gerar Roteiro"
          onPress={handleAnalyze}
          fullWidth
          disabled={!url}
        />
      )}
      
      <View style={styles.supportedPlatforms}>
        <Text style={styles.supportedTitle}>Plataformas suportadas:</Text>
        <View style={styles.platformIcons}>
          <Icon name="youtube" size={32} />
          <Icon name="tiktok" size={32} />
          <Icon name="instagram" size={32} />
        </View>
      </View>
    </View>
  );
}
```

---

## 📊 RESUMO FINAL

### Total de Telas Especificadas: 51 telas

| Categoria | Quantidade |
|---|---|
| Auth & Onboarding | 11 telas |
| Assistente IA | 3 telas |
| Scripts | 5 telas |
| Gravação | 4 telas |
| Edição | 4 telas |
| Carrosséis | 4 telas |
| Publicação | 5 telas |
| Biblioteca | 3 telas |
| Assets | 3 telas |
| Configurações | 6 telas |
| **Parte 2 (novas)** | **3 telas** |
| **TOTAL** | **51 telas** |

### Telas da Parte 2

46. SocialAccountsScreen - Gerenciar redes sociais conectadas
47. NotificationsSettingsScreen - Configurar notificações push e email
48. AnalyticsScreen - Dashboard de métricas e insights
49. PostDetailsScreen - Detalhes e métricas de um post específico
50. IntegrationsScreen - Status de todas as integrações externas
51. URLAnalysisScreen - Analisar URL e gerar roteiro autoral

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ COMPLETO (Parte 1 + Parte 2)
