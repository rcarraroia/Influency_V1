# 🔄 GUIA DE CONVERSÃO - HTML/CSS → REACT NATIVE

**Versão:** 1.0.0  
**Data:** 08/03/2026  
**Projeto:** Influency V1 Screens

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Estrutura de Arquivos](#estrutura-de-arquivos)
4. [Mapeamento de Elementos](#mapeamento-de-elementos)
5. [Mapeamento de Estilos](#mapeamento-de-estilos)
6. [Componentes UI](#componentes-ui)
7. [Navegação](#navegação)
8. [Exemplos Práticos](#exemplos-práticos)
9. [Bibliotecas Recomendadas](#bibliotecas-recomendadas)
10. [Checklist de Conversão](#checklist-de-conversão)

---

## 🎯 Visão Geral

Este guia documenta o processo de conversão das 51 telas HTML/CSS geradas no Stitch para componentes React Native + Expo.

**Princípios de Conversão:**
- **Mobile-First:** Otimizado para iOS e Android
- **TypeScript:** Tipagem forte em todos os componentes
- **Componentização:** Reutilização máxima de componentes
- **Performance:** Otimização de renderização e bundle size
- **Acessibilidade:** Suporte a screen readers e navegação por teclado

---

## 🛠️ Stack Tecnológica

### Core
- **React Native:** 0.73+
- **Expo:** 50+ (SDK)
- **TypeScript:** 5.0+
- **Node.js:** 18+ LTS

### UI & Styling
- **React Native Paper:** 5.x (Material Design 3)
- **React Native Vector Icons:** Lucide icons
- **React Native Reanimated:** 3.x (animações)

### Navegação
- **React Navigation:** 6.x
  - Stack Navigator
  - Bottom Tabs Navigator
  - Modal presentation

### Mídia & Câmera
- **Expo AV:** Vídeo/áudio playback
- **Expo Camera:** Gravação de vídeo
- **Expo Image Picker:** Seleção de imagens

### Estado & Dados
- **Zustand:** Estado global leve
- **React Query:** Server state management
- **AsyncStorage:** Persistência local


---

## 📁 Estrutura de Arquivos

### Estrutura Recomendada

```
influency-mobile/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Auth Stack
│   │   ├── _layout.tsx
│   │   ├── splash.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (onboarding)/             # Onboarding Stack
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── business-dna.tsx
│   │   ├── connect-social.tsx
│   │   └── complete.tsx
│   ├── (tabs)/                   # Main App (Bottom Tabs)
│   │   ├── _layout.tsx
│   │   ├── assistant.tsx         # AssistantTab
│   │   ├── library.tsx           # LibraryTab
│   │   └── settings.tsx          # SettingsTab
│   └── _layout.tsx               # Root layout
├── src/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── atoms/                # Componentes básicos
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ...
│   │   ├── molecules/            # Componentes compostos
│   │   │   ├── VoiceButton.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   └── ...
│   │   └── organisms/            # Componentes complexos
│   │       ├── Header.tsx
│   │       ├── BottomNav.tsx
│   │       └── ...
│   ├── hooks/                    # Custom hooks
│   │   ├── useTheme.ts
│   │   ├── useAuth.ts
│   │   └── ...
│   ├── services/                 # API services
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── ...
│   ├── store/                    # Zustand stores
│   │   ├── authStore.ts
│   │   ├── scriptStore.ts
│   │   └── ...
│   ├── types/                    # TypeScript types
│   │   ├── index.ts
│   │   └── ...
│   ├── utils/                    # Utilitários
│   │   ├── constants.ts
│   │   └── ...
│   └── theme/                    # Design system
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       └── index.ts
├── assets/                       # Assets estáticos
│   ├── images/
│   ├── fonts/
│   └── icons/
├── app.json                      # Expo config
├── package.json
└── tsconfig.json
```


---

## 🔀 Mapeamento de Elementos

### Elementos HTML → React Native

| HTML | React Native | Notas |
|------|--------------|-------|
| `<div>` | `<View>` | Container básico |
| `<span>` | `<Text>` | Texto inline |
| `<p>` | `<Text>` | Parágrafo |
| `<h1>` - `<h6>` | `<Text>` | Com style de heading |
| `<button>` | `<Pressable>` ou `<TouchableOpacity>` | Elemento clicável |
| `<input>` | `<TextInput>` | Campo de texto |
| `<textarea>` | `<TextInput multiline>` | Texto multilinha |
| `<img>` | `<Image>` | Imagem |
| `<video>` | `<Video>` (Expo AV) | Player de vídeo |
| `<ul>` / `<ol>` | `<FlatList>` ou `<SectionList>` | Listas |
| `<li>` | `<View>` | Item de lista |
| `<a>` | `<Pressable>` + `Linking` | Link externo |
| `<form>` | `<View>` | Container de formulário |
| `<label>` | `<Text>` | Label de input |
| `<select>` | `<Picker>` (React Native Picker) | Dropdown |
| `<checkbox>` | `<Checkbox>` (React Native Paper) | Checkbox |
| `<radio>` | `<RadioButton>` (React Native Paper) | Radio button |

### Exemplo de Conversão Básica

**HTML:**
```html
<div class="container">
  <h1 class="title">Bem-vindo</h1>
  <p class="description">Crie conteúdo viral</p>
  <button class="btn-primary">Começar</button>
</div>
```

**React Native:**
```tsx
<View style={styles.container}>
  <Text style={styles.title}>Bem-vindo</Text>
  <Text style={styles.description}>Crie conteúdo viral</Text>
  <Pressable style={styles.btnPrimary} onPress={handleStart}>
    <Text style={styles.btnText}>Começar</Text>
  </Pressable>
</View>
```


---

## 🎨 Mapeamento de Estilos

### CSS → StyleSheet

React Native usa JavaScript objects para estilos ao invés de CSS.

#### Propriedades CSS → React Native

| CSS | React Native | Notas |
|-----|--------------|-------|
| `display: flex` | `display: 'flex'` | Padrão no RN |
| `flex-direction: row` | `flexDirection: 'row'` | camelCase |
| `justify-content: center` | `justifyContent: 'center'` | camelCase |
| `align-items: center` | `alignItems: 'center'` | camelCase |
| `margin: 16px` | `margin: 16` | Sem unidade |
| `padding: 8px 16px` | `paddingVertical: 8, paddingHorizontal: 16` | Separado |
| `background-color: #6200EE` | `backgroundColor: '#6200EE'` | camelCase |
| `color: #FFFFFF` | `color: '#FFFFFF'` | Igual |
| `font-size: 16px` | `fontSize: 16` | Sem unidade |
| `font-weight: bold` | `fontWeight: 'bold'` | String |
| `border-radius: 8px` | `borderRadius: 8` | Sem unidade |
| `border: 1px solid #000` | `borderWidth: 1, borderColor: '#000'` | Separado |
| `box-shadow` | `shadowColor, shadowOffset, shadowOpacity, shadowRadius` | Complexo |
| `width: 100%` | `width: '100%'` | String com % |
| `height: 50px` | `height: 50` | Sem unidade |

#### Propriedades NÃO Suportadas

- `float` - Use flexbox
- `position: fixed` - Use `position: 'absolute'`
- `z-index` - Funciona, mas ordem de renderização importa
- `transform: rotate()` - Use `transform: [{ rotate: '45deg' }]`
- `box-shadow` - Use `elevation` (Android) ou shadow props (iOS)

### Exemplo de Conversão de Estilos

**CSS:**
```css
.card {
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #1C1B1F;
  margin-bottom: 8px;
}
```

**React Native StyleSheet:**
```tsx
const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow Android
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1B1F',
    marginBottom: 8,
  },
});
```


---

## 🧩 Componentes UI

### React Native Paper (Material Design 3)

Use React Native Paper para componentes prontos que seguem Material Design 3.

#### Mapeamento de Componentes

| Componente HTML | React Native Paper | Import |
|-----------------|-------------------|--------|
| Button | `<Button>` | `import { Button } from 'react-native-paper'` |
| Input | `<TextInput>` | `import { TextInput } from 'react-native-paper'` |
| Card | `<Card>` | `import { Card } from 'react-native-paper'` |
| Chip | `<Chip>` | `import { Chip } from 'react-native-paper'` |
| Badge | `<Badge>` | `import { Badge } from 'react-native-paper'` |
| Switch | `<Switch>` | `import { Switch } from 'react-native-paper'` |
| Checkbox | `<Checkbox>` | `import { Checkbox } from 'react-native-paper'` |
| Radio | `<RadioButton>` | `import { RadioButton } from 'react-native-paper'` |
| FAB | `<FAB>` | `import { FAB } from 'react-native-paper'` |
| Dialog | `<Dialog>` | `import { Dialog } from 'react-native-paper'` |
| Snackbar | `<Snackbar>` | `import { Snackbar } from 'react-native-paper'` |

#### Exemplo: Button Component

**HTML:**
```html
<button class="btn-primary">Entrar</button>
```

**React Native Paper:**
```tsx
import { Button } from 'react-native-paper';

<Button 
  mode="contained" 
  onPress={handleLogin}
  style={styles.button}
>
  Entrar
</Button>
```

#### Exemplo: TextInput Component

**HTML:**
```html
<input 
  type="email" 
  placeholder="seu@email.com" 
  class="input"
/>
```

**React Native Paper:**
```tsx
import { TextInput } from 'react-native-paper';

<TextInput
  mode="outlined"
  label="Email"
  placeholder="seu@email.com"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
  style={styles.input}
/>
```


---

## 🧭 Navegação

### React Navigation 6.x

#### Tipos de Navegadores

1. **Stack Navigator** - Navegação empilhada (push/pop)
2. **Bottom Tabs Navigator** - Tabs na parte inferior
3. **Drawer Navigator** - Menu lateral
4. **Modal** - Apresentação modal

#### Estrutura de Navegação do Influency

```tsx
// app/_layout.tsx (Root Layout)
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
```

```tsx
// app/(tabs)/_layout.tsx (Bottom Tabs)
import { Tabs } from 'expo-router';
import { MessageCircle, Folder, Settings } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistente',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color, size }) => (
            <Folder color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
```

#### Navegação entre Telas

```tsx
import { router } from 'expo-router';

// Navegar para outra tela
router.push('/login');

// Navegar com parâmetros
router.push({
  pathname: '/script/[id]',
  params: { id: '123' }
});

// Voltar
router.back();

// Substituir tela atual
router.replace('/home');

// Apresentar modal
router.push({
  pathname: '/edit-script',
  params: { mode: 'modal' }
});
```


---

## 💡 Exemplos Práticos

### Exemplo 1: LoginScreen

**HTML (Stitch):**
```html
<div class="screen">
  <div class="header">
    <img src="logo.png" class="logo" />
    <h1>Bem-vinda de volta!</h1>
  </div>
  <form class="form">
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Senha" />
    <a href="#" class="link">Esqueci minha senha</a>
    <button class="btn-primary">Entrar</button>
  </form>
  <p class="footer-text">
    Não tem conta? <a href="#">Criar conta</a>
  </p>
</div>
```

**React Native:**
```tsx
import { View, Image, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Lógica de login
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image 
          source={require('@/assets/logo.png')} 
          style={styles.logo}
        />
        <Text variant="headlineMedium" style={styles.title}>
          Bem-vinda de volta!
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        
        <TextInput
          mode="outlined"
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Button 
          mode="text" 
          onPress={() => router.push('/forgot-password')}
        >
          Esqueci minha senha
        </Button>

        <Button 
          mode="contained" 
          onPress={handleLogin}
          style={styles.btnPrimary}
        >
          Entrar
        </Button>
      </View>

      <View style={styles.footer}>
        <Text>Não tem conta? </Text>
        <Button 
          mode="text" 
          onPress={() => router.push('/register')}
        >
          Criar conta
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  btnPrimary: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
});
```


### Exemplo 2: Card Component

**HTML (Stitch):**
```html
<div class="card">
  <h3 class="card-title">Como viralizar no Instagram</h3>
  <p class="card-description">Hoje vou te ensinar...</p>
  <div class="card-footer">
    <span class="word-count">250 palavras</span>
    <span class="duration">60s</span>
  </div>
  <div class="card-actions">
    <button class="btn-icon">Editar</button>
    <button class="btn-icon">Excluir</button>
  </div>
</div>
```

**React Native Component:**
```tsx
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

interface ScriptCardProps {
  title: string;
  content: string;
  wordCount: number;
  duration: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function ScriptCard({
  title,
  content,
  wordCount,
  duration,
  onEdit,
  onDelete,
}: ScriptCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <Text 
          variant="bodyMedium" 
          numberOfLines={2}
          style={styles.description}
        >
          {content}
        </Text>
        
        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.meta}>
            {wordCount} palavras
          </Text>
          <Text variant="bodySmall" style={styles.meta}>
            {duration}s
          </Text>
        </View>
      </Card.Content>

      <Card.Actions>
        <IconButton icon="pencil" onPress={onEdit} />
        <IconButton icon="delete" onPress={onDelete} />
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    color: '#49454F',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
  },
  meta: {
    color: '#79747E',
  },
});
```


### Exemplo 3: Lista com FlatList

**HTML (Stitch):**
```html
<div class="list">
  <div class="list-item">Item 1</div>
  <div class="list-item">Item 2</div>
  <div class="list-item">Item 3</div>
</div>
```

**React Native:**
```tsx
import { FlatList, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Script {
  id: string;
  title: string;
  content: string;
}

export default function ScriptsListScreen() {
  const [scripts, setScripts] = useState<Script[]>([]);

  return (
    <FlatList
      data={scripts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ScriptCard
          title={item.title}
          content={item.content}
          onEdit={() => handleEdit(item.id)}
          onDelete={() => handleDelete(item.id)}
        />
      )}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text>Nenhum roteiro encontrado</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
  },
});
```


---

## 📦 Bibliotecas Recomendadas

### Essenciais

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.4.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "react-native-paper": "^5.12.0",
    "react-native-safe-area-context": "4.8.0",
    "react-native-screens": "~3.29.0"
  }
}
```

### UI & Styling

```bash
# React Native Paper (Material Design 3)
npx expo install react-native-paper

# Ícones
npx expo install lucide-react-native

# Animações
npx expo install react-native-reanimated

# Gestos
npx expo install react-native-gesture-handler
```

### Navegação

```bash
# Expo Router (file-based routing)
npx expo install expo-router

# React Navigation (se não usar Expo Router)
npm install @react-navigation/native
npm install @react-navigation/stack
npm install @react-navigation/bottom-tabs
```

### Mídia & Câmera

```bash
# Vídeo e Áudio
npx expo install expo-av

# Câmera
npx expo install expo-camera

# Image Picker
npx expo install expo-image-picker

# Image Manipulator
npx expo install expo-image-manipulator
```

### Estado & Dados

```bash
# Zustand (estado global)
npm install zustand

# React Query (server state)
npm install @tanstack/react-query

# AsyncStorage (persistência)
npx expo install @react-native-async-storage/async-storage

# Axios (HTTP client)
npm install axios
```

### Formulários & Validação

```bash
# React Hook Form
npm install react-hook-form

# Zod (validação)
npm install zod
```

### Utilitários

```bash
# Date manipulation
npm install date-fns

# UUID
npm install uuid
npm install --save-dev @types/uuid
```


---

## ✅ Checklist de Conversão

### Por Tela

- [ ] **Estrutura**
  - [ ] Criar arquivo `.tsx` na pasta correta
  - [ ] Importar componentes necessários
  - [ ] Definir tipos TypeScript
  - [ ] Implementar layout básico

- [ ] **Componentes**
  - [ ] Converter elementos HTML para React Native
  - [ ] Usar componentes do React Native Paper quando possível
  - [ ] Criar componentes customizados se necessário
  - [ ] Adicionar props e tipos

- [ ] **Estilos**
  - [ ] Converter CSS para StyleSheet
  - [ ] Aplicar design system (cores, tipografia, espaçamento)
  - [ ] Adicionar sombras (iOS e Android)
  - [ ] Testar responsividade

- [ ] **Funcionalidade**
  - [ ] Implementar navegação
  - [ ] Adicionar event handlers
  - [ ] Integrar com estado global (Zustand)
  - [ ] Integrar com API (React Query)

- [ ] **Acessibilidade**
  - [ ] Adicionar `accessibilityLabel` em elementos interativos
  - [ ] Adicionar `accessibilityHint` quando necessário
  - [ ] Testar com screen reader
  - [ ] Garantir touch targets mínimos (48x48)

- [ ] **Performance**
  - [ ] Usar `React.memo` quando apropriado
  - [ ] Otimizar listas com `FlatList`
  - [ ] Lazy load de imagens
  - [ ] Evitar re-renders desnecessários

- [ ] **Testes**
  - [ ] Testar em iOS
  - [ ] Testar em Android
  - [ ] Testar diferentes tamanhos de tela
  - [ ] Testar modo escuro (se aplicável)

### Por Componente

- [ ] **Criação**
  - [ ] Criar arquivo em `src/components/[atoms|molecules|organisms]/`
  - [ ] Definir interface de props
  - [ ] Implementar componente
  - [ ] Adicionar estilos

- [ ] **Documentação**
  - [ ] Adicionar comentários JSDoc
  - [ ] Documentar props
  - [ ] Adicionar exemplos de uso

- [ ] **Testes**
  - [ ] Criar testes unitários
  - [ ] Testar variações de props
  - [ ] Testar estados (loading, error, etc.)


---

## 🎯 Ordem de Conversão Recomendada

### Fase 1: Fundação
1. **Setup do projeto**
   - Criar projeto Expo
   - Instalar dependências
   - Configurar TypeScript
   - Configurar Expo Router

2. **Design System**
   - Criar theme (cores, tipografia, espaçamento)
   - Configurar React Native Paper
   - Criar tokens de design

3. **Componentes Base (Átomos)**
   - Button
   - Input
   - Card
   - Chip
   - Badge
   - Loading
   - ProgressBar

### Fase 2: Auth & Onboarding
4. **Auth Stack**
   - SplashScreen
   - LoginScreen
   - RegisterScreen
   - ForgotPasswordScreen

5. **Onboarding Stack**
   - WelcomeScreen
   - OnboardingScreen (Business DNA)
   - ConnectSocialNetworksScreen
   - OnboardingCompleteScreen

### Fase 3: Componentes Compostos
6. **Moléculas**
   - VoiceButton
   - ChatBubble
   - VideoPlayer
   - TeleprompterView
   - SearchBar
   - DateTimePicker

7. **Organismos**
   - Header
   - BottomNavigationBar
   - ChatInput
   - ScriptCard
   - VideoCard

### Fase 4: Telas Principais
8. **AssistantStack** (16 telas)
   - AssistantScreen
   - ConversationHistoryScreen
   - ScriptGenerationModal
   - RecordingActiveScreen
   - VideoEditScreen
   - etc.

9. **LibraryStack** (3 telas)
   - LibraryScreen
   - SavedVideosScreen
   - SavedCarouselsScreen

10. **SettingsStack** (6 telas)
    - SettingsScreen
    - ProfileScreen
    - BusinessDNASettingsScreen
    - etc.

### Fase 5: Features Avançadas
11. **Carousels** (4 telas)
12. **Publication** (5 telas)
13. **Analytics** (3 telas)
14. **Assets** (3 telas)

### Fase 6: Integração & Testes
15. **Integração com Backend**
    - Configurar API client
    - Implementar autenticação
    - Integrar endpoints

16. **Testes**
    - Testes unitários
    - Testes de integração
    - Testes E2E

17. **Otimização**
    - Performance profiling
    - Bundle size optimization
    - Lazy loading

---

## 🔗 Recursos Adicionais

### Documentação Oficial
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Router](https://docs.expo.dev/router/introduction/)

### Guias Relacionados
- [DESIGN.md](./DESIGN.md) - Design System completo
- [COMPONENTS.md](./COMPONENTS.md) - Biblioteca de componentes
- [NAVIGATION.md](./NAVIGATION.md) - Fluxos de navegação

### Ferramentas
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/)
- [Expo Dev Tools](https://docs.expo.dev/workflow/debugging/)

---

**Versão:** 1.0.0  
**Última Atualização:** 08/03/2026  
**Mantido por:** Equipe Influency

