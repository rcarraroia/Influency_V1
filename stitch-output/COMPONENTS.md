# 🧩 BIBLIOTECA DE COMPONENTES - INFLUENCY V1

**Versão:** 1.0.0  
**Data:** 08/03/2026  
**Total de Componentes:** 35+ componentes identificados

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Átomos (Atomic Components)](#átomos-atomic-components)
3. [Moléculas (Molecular Components)](#moléculas-molecular-components)
4. [Organismos (Organisms)](#organismos-organisms)
5. [Templates](#templates)
6. [Guia de Uso](#guia-de-uso)

---

## 🎯 Visão Geral

Esta biblioteca documenta todos os componentes reutilizáveis identificados nas 51 telas do Influency V1. Os componentes seguem a metodologia **Atomic Design** de Brad Frost, organizados em:

- **Átomos:** Componentes básicos e indivisíveis
- **Moléculas:** Combinações simples de átomos
- **Organismos:** Componentes complexos compostos por moléculas
- **Templates:** Layouts de tela completos

---

## ⚛️ Átomos (Atomic Components)

### 1. Button

Botão básico com variações de estilo.

**Variações:**
- `primary` - Botão primário roxo
- `secondary` - Botão secundário teal
- `outline` - Botão com borda
- `text` - Botão sem fundo
- `icon` - Botão circular com ícone

**Props:**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'text' | 'icon';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  onPress: () => void;
  children: ReactNode;
}
```

**Exemplo de Uso:**
```tsx
<Button variant="primary" onPress={handleSubmit}>
  Entrar
</Button>

<Button variant="outline" icon={<PlusIcon />} onPress={handleAdd}>
  Adicionar
</Button>
```

---

### 2. Input

Campo de entrada de texto.

**Variações:**
- `text` - Texto simples
- `password` - Senha com toggle de visibilidade
- `email` - Email com validação
- `multiline` - Textarea

**Props:**
```typescript
interface InputProps {
  type: 'text' | 'password' | 'email' | 'multiline';
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  icon?: ReactNode;
  maxLength?: number;
  rows?: number; // para multiline
}
```

**Exemplo de Uso:**
```tsx
<Input
  type="email"
  placeholder="seu@email.com"
  value={email}
  onChangeText={setEmail}
  error={emailError}
/>

<Input
  type="multiline"
  placeholder="Digite seu roteiro..."
  value={script}
  onChangeText={setScript}
  rows={10}
/>
```

---

### 3. Card

Container com elevação ou borda.

**Variações:**
- `elevated` - Com sombra
- `outlined` - Com borda
- `filled` - Com fundo colorido

**Props:**
```typescript
interface CardProps {
  variant: 'elevated' | 'outlined' | 'filled';
  padding?: number;
  onPress?: () => void;
  children: ReactNode;
}
```

**Exemplo de Uso:**
```tsx
<Card variant="elevated" padding={16}>
  <Text>Conteúdo do card</Text>
</Card>
```

---

### 4. Chip

Tag ou filtro pequeno.

**Props:**
```typescript
interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: ReactNode;
  onDelete?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<Chip label="Instagram" selected={true} />
<Chip label="#viral" onDelete={handleDelete} />
```

---

### 5. Badge

Indicador numérico pequeno.

**Props:**
```typescript
interface BadgeProps {
  count: number;
  max?: number; // máximo antes de mostrar "99+"
  variant?: 'default' | 'error' | 'success';
}
```

**Exemplo de Uso:**
```tsx
<Badge count={5} />
<Badge count={150} max={99} /> {/* Mostra "99+" */}
```

---

### 6. Avatar

Imagem circular de perfil.

**Props:**
```typescript
interface AvatarProps {
  source: string | { uri: string };
  size?: number;
  fallback?: string; // iniciais
  onPress?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<Avatar source={{ uri: user.avatar }} size={48} />
<Avatar fallback="RC" size={40} />
```

---

### 7. Icon

Ícone SVG.

**Props:**
```typescript
interface IconProps {
  name: string; // nome do ícone Lucide
  size?: number;
  color?: string;
}
```

**Exemplo de Uso:**
```tsx
<Icon name="message-circle" size={24} color="#6200EE" />
```

---

### 8. Loading

Spinner de carregamento.

**Variações:**
- `spinner` - Spinner circular
- `dots` - Três pontos animados
- `skeleton` - Placeholder de conteúdo

**Props:**
```typescript
interface LoadingProps {
  variant: 'spinner' | 'dots' | 'skeleton';
  size?: number;
  color?: string;
}
```

**Exemplo de Uso:**
```tsx
<Loading variant="spinner" size={40} />
```

---

### 9. ProgressBar

Barra de progresso.

**Props:**
```typescript
interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  showLabel?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<ProgressBar progress={75} showLabel={true} />
```

---

### 10. Switch

Toggle on/off.

**Props:**
```typescript
interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<Switch value={enabled} onValueChange={setEnabled} />
```

---

### 11. Checkbox

Caixa de seleção.

**Props:**
```typescript
interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<Checkbox
  checked={agreed}
  onCheckedChange={setAgreed}
  label="Aceito os termos"
/>
```

---

### 12. Radio

Botão de opção única.

**Props:**
```typescript
interface RadioProps {
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  label: string;
  disabled?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<Radio
  value="now"
  selected={publishTime === 'now'}
  onSelect={setPublishTime}
  label="Publicar agora"
/>
```

---

### 13. Slider

Controle deslizante.

**Props:**
```typescript
interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  showValue?: boolean;
  unit?: string;
}
```

**Exemplo de Uso:**
```tsx
<Slider
  value={duration}
  onValueChange={setDuration}
  min={30}
  max={300}
  step={10}
  showValue={true}
  unit="s"
/>
```

---

### 14. Divider

Linha divisória.

**Props:**
```typescript
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  margin?: number;
}
```

**Exemplo de Uso:**
```tsx
<Divider orientation="horizontal" margin={16} />
```

---

## 🧬 Moléculas (Molecular Components)

### 15. VoiceButton

Botão de gravação de voz com animação de pulso.

**Props:**
```typescript
interface VoiceButtonProps {
  recording: boolean;
  onPress: () => void;
  disabled?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<VoiceButton
  recording={isRecording}
  onPress={toggleRecording}
/>
```

**Comportamento:**
- Pulsa quando `recording={true}`
- Cor vermelha quando gravando
- Cor primária quando em repouso

---

### 16. ChatBubble

Balão de mensagem de chat.

**Variações:**
- `user` - Mensagem do usuário (direita, roxo)
- `assistant` - Mensagem do assistente (esquerda, cinza)

**Props:**
```typescript
interface ChatBubbleProps {
  type: 'user' | 'assistant';
  message: string;
  timestamp?: string;
  avatar?: string;
}
```

**Exemplo de Uso:**
```tsx
<ChatBubble
  type="user"
  message="Como criar um roteiro viral?"
  timestamp="14:30"
/>

<ChatBubble
  type="assistant"
  message="Vou te ajudar a criar um roteiro incrível!"
  avatar={assistantAvatar}
/>
```

---

### 17. VideoPlayer

Player de vídeo com controles.

**Props:**
```typescript
interface VideoPlayerProps {
  source: string | { uri: string };
  thumbnail?: string;
  autoPlay?: boolean;
  controls?: boolean;
  onPlaybackStatusUpdate?: (status: any) => void;
}
```

**Exemplo de Uso:**
```tsx
<VideoPlayer
  source={{ uri: videoUrl }}
  thumbnail={thumbnailUrl}
  controls={true}
/>
```

---

### 18. TeleprompterView

Visualização de teleprompter com scroll automático.

**Props:**
```typescript
interface TeleprompterViewProps {
  text: string;
  scrollSpeed: number; // pixels por segundo
  fontSize: number;
  scrollMode: 'auto' | 'manual' | 'voice';
  onScrollEnd?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<TeleprompterView
  text={scriptText}
  scrollSpeed={50}
  fontSize={24}
  scrollMode="auto"
/>
```

---

### 19. SearchBar

Barra de busca com ícone.

**Props:**
```typescript
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder="Buscar roteiros..."
  onClear={handleClear}
/>
```

---

### 20. DateTimePicker

Seletor de data e hora.

**Props:**
```typescript
interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  mode: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
}
```

**Exemplo de Uso:**
```tsx
<DateTimePicker
  value={scheduledDate}
  onChange={setScheduledDate}
  mode="datetime"
  minimumDate={new Date()}
/>
```

---

### 21. TagInput

Input de tags/hashtags.

**Props:**
```typescript
interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}
```

**Exemplo de Uso:**
```tsx
<TagInput
  tags={hashtags}
  onTagsChange={setHashtags}
  placeholder="Adicionar hashtag..."
  maxTags={30}
/>
```

---

### 22. ColorPicker

Seletor de cor.

**Props:**
```typescript
interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  presetColors?: string[];
}
```

**Exemplo de Uso:**
```tsx
<ColorPicker
  color={textColor}
  onColorChange={setTextColor}
  presetColors={['#FFFFFF', '#000000', '#6200EE']}
/>
```

---

### 23. SocialNetworkCard

Card de rede social com status de conexão.

**Props:**
```typescript
interface SocialNetworkCardProps {
  network: 'instagram' | 'tiktok' | 'facebook' | 'youtube';
  connected: boolean;
  username?: string;
  avatar?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<SocialNetworkCard
  network="instagram"
  connected={true}
  username="@meuusuario"
  avatar={avatarUrl}
  onDisconnect={handleDisconnect}
/>
```

---

### 24. MetricCard

Card de métrica com ícone e valor.

**Props:**
```typescript
interface MetricCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}
```

**Exemplo de Uso:**
```tsx
<MetricCard
  label="Total de Views"
  value="125.4K"
  icon={<EyeIcon />}
  trend="up"
  trendValue="+12%"
/>
```

---

## 🏗️ Organismos (Organisms)

### 25. Header

Cabeçalho de tela com título e ações.

**Props:**
```typescript
interface HeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  onBack?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<Header
  title="Assistente IA"
  leftAction={<MenuIcon />}
  rightAction={<HistoryIcon />}
  onBack={navigation.goBack}
/>
```

---

### 26. BottomNavigationBar

Barra de navegação inferior com 3 tabs.

**Props:**
```typescript
interface BottomNavigationBarProps {
  activeTab: 'assistant' | 'library' | 'settings';
  onTabChange: (tab: string) => void;
}
```

**Exemplo de Uso:**
```tsx
<BottomNavigationBar
  activeTab="assistant"
  onTabChange={handleTabChange}
/>
```

**Tabs:**
- Assistente (MessageCircle icon)
- Biblioteca (Folder icon)
- Configurações (Settings icon)

---

### 27. ChatInput

Input de chat com botão de voz e envio.

**Props:**
```typescript
interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onVoicePress: () => void;
  recording?: boolean;
  disabled?: boolean;
}
```

**Exemplo de Uso:**
```tsx
<ChatInput
  value={message}
  onChangeText={setMessage}
  onSend={handleSend}
  onVoicePress={handleVoice}
  recording={isRecording}
/>
```

---

### 28. ScriptCard

Card de roteiro com preview e ações.

**Props:**
```typescript
interface ScriptCardProps {
  title: string;
  content: string;
  wordCount: number;
  duration: number;
  createdAt: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onUse?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<ScriptCard
  title="Como viralizar no Instagram"
  content="Hoje vou te ensinar..."
  wordCount={250}
  duration={60}
  createdAt="2026-03-08"
  onEdit={handleEdit}
  onDelete={handleDelete}
  onUse={handleUse}
/>
```

---

### 29. VideoCard

Card de vídeo com thumbnail e ações.

**Props:**
```typescript
interface VideoCardProps {
  thumbnail: string;
  title?: string;
  duration: number;
  createdAt: string;
  onPress?: () => void;
  onEdit?: () => void;
  onPublish?: () => void;
  onDelete?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<VideoCard
  thumbnail={thumbnailUrl}
  title="Meu vídeo viral"
  duration={45}
  createdAt="2026-03-08"
  onPress={handlePlay}
  onEdit={handleEdit}
  onPublish={handlePublish}
  onDelete={handleDelete}
/>
```

---

### 30. CarouselCard

Card de carrossel com preview de slides.

**Props:**
```typescript
interface CarouselCardProps {
  title: string;
  slideCount: number;
  thumbnail: string;
  createdAt: string;
  onPress?: () => void;
  onEdit?: () => void;
  onPublish?: () => void;
  onDelete?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<CarouselCard
  title="10 Dicas de Marketing"
  slideCount={10}
  thumbnail={firstSlideUrl}
  createdAt="2026-03-08"
  onPress={handleView}
  onEdit={handleEdit}
  onPublish={handlePublish}
  onDelete={handleDelete}
/>
```

---

### 31. PostCard

Card de post publicado com métricas.

**Props:**
```typescript
interface PostCardProps {
  thumbnail: string;
  caption: string;
  networks: ('instagram' | 'tiktok' | 'facebook' | 'youtube')[];
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  publishedAt: string;
  onPress?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<PostCard
  thumbnail={thumbnailUrl}
  caption="Confira essas dicas incríveis!"
  networks={['instagram', 'tiktok']}
  metrics={{
    views: 12500,
    likes: 850,
    comments: 45,
    shares: 120
  }}
  publishedAt="2026-03-07"
  onPress={handleViewDetails}
/>
```

---

### 32. SettingsItem

Item de lista de configurações.

**Props:**
```typescript
interface SettingsItemProps {
  icon: ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: ReactNode; // Switch, Badge, etc.
}
```

**Exemplo de Uso:**
```tsx
<SettingsItem
  icon={<UserIcon />}
  label="Perfil"
  value="João Silva"
  onPress={handleEditProfile}
/>

<SettingsItem
  icon={<BellIcon />}
  label="Notificações"
  rightElement={<Switch value={enabled} onValueChange={setEnabled} />}
/>
```

---

### 33. AssetCard

Card de asset de marca (logo, intro, outro).

**Props:**
```typescript
interface AssetCardProps {
  type: 'logo' | 'intro' | 'outro' | 'watermark';
  configured: boolean;
  thumbnail?: string;
  onConfigure?: () => void;
  onEdit?: () => void;
}
```

**Exemplo de Uso:**
```tsx
<AssetCard
  type="logo"
  configured={true}
  thumbnail={logoUrl}
  onEdit={handleEditLogo}
/>

<AssetCard
  type="intro"
  configured={false}
  onConfigure={handleConfigureIntro}
/>
```

---

### 34. ChartCard

Card com gráfico de métricas.

**Props:**
```typescript
interface ChartCardProps {
  title: string;
  data: Array<{ date: string; value: number }>;
  type: 'line' | 'bar' | 'pie';
  color?: string;
}
```

**Exemplo de Uso:**
```tsx
<ChartCard
  title="Views ao longo do tempo"
  data={viewsData}
  type="line"
  color="#6200EE"
/>
```

---

### 35. FAB (Floating Action Button)

Botão de ação flutuante.

**Props:**
```typescript
interface FABProps {
  icon: ReactNode;
  label?: string;
  onPress: () => void;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  extended?: boolean; // mostra label
}
```

**Exemplo de Uso:**
```tsx
<FAB
  icon={<PlusIcon />}
  label="Novo Roteiro"
  onPress={handleNewScript}
  position="bottom-right"
  extended={true}
/>
```

---

## 📐 Templates

### AuthTemplate

Template para telas de autenticação.

**Estrutura:**
- Header com logo
- Formulário centralizado
- Footer com links

**Usado em:**
- LoginScreen
- RegisterScreen
- ForgotPasswordScreen

---

### MainTemplate

Template principal com bottom navigation.

**Estrutura:**
- Header
- Content area
- BottomNavigationBar

**Usado em:**
- AssistantScreen
- LibraryScreen
- SettingsScreen

---

### ModalTemplate

Template para modais.

**Estrutura:**
- Header com título e botão fechar
- Content scrollable
- Footer com ações

**Usado em:**
- ScriptGenerationModal
- EditScriptModal
- EditSlideModal
- SubtitlesCustomizationModal

---

### FullscreenTemplate

Template para telas fullscreen.

**Estrutura:**
- Content fullscreen
- Overlay controls

**Usado em:**
- RecordingActiveScreen
- SplashScreen

---

## 📚 Guia de Uso

### Importação de Componentes

```typescript
// Átomos
import { Button, Input, Card, Chip, Badge } from '@/components/atoms';

// Moléculas
import { VoiceButton, ChatBubble, VideoPlayer } from '@/components/molecules';

// Organismos
import { Header, BottomNavigationBar, ChatInput } from '@/components/organisms';

// Templates
import { MainTemplate, ModalTemplate } from '@/components/templates';
```

### Composição de Componentes

```tsx
// Exemplo: Tela de Chat
<MainTemplate>
  <Header
    title="Assistente IA"
    rightAction={<Icon name="history" />}
  />
  
  <ScrollView>
    <ChatBubble type="user" message="Olá!" />
    <ChatBubble type="assistant" message="Como posso ajudar?" />
  </ScrollView>
  
  <ChatInput
    value={message}
    onChangeText={setMessage}
    onSend={handleSend}
    onVoicePress={handleVoice}
  />
</MainTemplate>
```

### Customização de Componentes

Todos os componentes aceitam props de estilo customizadas:

```tsx
<Button
  variant="primary"
  style={{ marginTop: 16 }}
  onPress={handleSubmit}
>
  Enviar
</Button>
```

### Temas

Os componentes usam o Design System automaticamente através de tokens:

```typescript
import { useTheme } from '@/hooks/useTheme';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ color: theme.colors.onPrimary }}>
        Texto
      </Text>
    </View>
  );
};
```

---

## 🔗 Referências

- [Design System](./DESIGN.md)
- [Conversion Guide](./CONVERSION-GUIDE.md)
- [Navigation](./NAVIGATION.md)
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)

---

**Versão:** 1.0.0  
**Última Atualização:** 08/03/2026  
**Total de Componentes:** 35+ componentes documentados
