# 🔧 GAPS E MELHORIAS - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 08/03/2026  
**Status:** 📋 DOCUMENTAÇÃO DE GAPS IDENTIFICADOS

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Gaps Identificados](#gaps-identificados)
3. [Roadmap de Implementação](#roadmap-de-implementação)
4. [Priorização](#priorização)

---

## 🎯 VISÃO GERAL

Este documento registra os **gaps não críticos** identificados durante a análise cruzada da documentação v2. Esses gaps não impedem o início do desenvolvimento, mas devem ser endereçados nas fases apropriadas do projeto.

**Contexto:**
- A especificação atual cobre **100% dos fluxos principais**
- A especificação atual cobre **100% das funcionalidades críticas**
- Os gaps identificados são **melhorias de experiência** e **casos de borda**

---

## 🔍 GAPS IDENTIFICADOS

### **GAP 1: Tela de Erro Genérica**

**Descrição:**  
Não há especificação de uma tela de erro global para tratar erros inesperados da aplicação.

**Impacto:**  
- Severidade: 🟡 MÉDIA
- Frequência: Baixa (apenas em erros inesperados)
- UX: Importante para não deixar usuário "perdido"

**Casos de Uso:**
- Erro 500 do backend
- Erro de parsing de resposta
- Exceção não tratada no frontend
- Timeout de requisição

**Solução Proposta:**

```typescript
// src/screens/error/GenericErrorScreen.tsx
export default function GenericErrorScreen({ route }) {
  const { error, onRetry } = route.params;
  
  return (
    <View style={styles.container}>
      <Icon name="alert-circle" size={64} color={Colors.error} />
      <Text style={styles.title}>Algo deu errado</Text>
      <Text style={styles.message}>
        {error?.message || 'Ocorreu um erro inesperado. Tente novamente.'}
      </Text>
      
      <Button
        title="Tentar Novamente"
        onPress={onRetry}
        fullWidth
      />
      
      <Button
        title="Voltar ao Início"
        variant="outline"
        onPress={() => navigation.navigate('Home')}
        fullWidth
      />
      
      <TouchableOpacity onPress={() => navigation.navigate('Support')}>
        <Text style={styles.supportLink}>Precisa de ajuda? Fale conosco</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**Quando Implementar:**  
✅ **Fase 1 - Sprint 2** (Fundação do Frontend)

**Justificativa:**  
Deve ser implementado cedo para garantir que todos os fluxos tenham tratamento de erro desde o início.

---

### **GAP 2: Tela de Sem Conexão (Offline)**

**Descrição:**  
Não há especificação de como o app se comporta quando o usuário está offline.

**Impacto:**  
- Severidade: 🟡 MÉDIA
- Frequência: Média (usuários em trânsito, áreas sem sinal)
- UX: Crítico para não frustrar usuário

**Casos de Uso:**
- Usuário perde conexão durante uso
- Usuário abre app sem internet
- Requisição falha por timeout de rede

**Solução Proposta:**

```typescript
// src/screens/error/OfflineScreen.tsx
export default function OfflineScreen() {
  const netInfo = useNetInfo();
  
  useEffect(() => {
    if (netInfo.isConnected) {
      // Volta para tela anterior quando reconectar
      navigation.goBack();
    }
  }, [netInfo.isConnected]);
  
  return (
    <View style={styles.container}>
      <Icon name="wifi-off" size={64} color={Colors.textSecondary} />
      <Text style={styles.title}>Sem conexão</Text>
      <Text style={styles.message}>
        Verifique sua conexão com a internet e tente novamente.
      </Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Badge
          text={netInfo.isConnected ? 'Conectado' : 'Desconectado'}
          color={netInfo.isConnected ? Colors.success : Colors.error}
        />
      </View>
      
      <Button
        title="Tentar Novamente"
        onPress={() => netInfo.refresh()}
        fullWidth
      />
      
      <Text style={styles.tip}>
        💡 Algumas funcionalidades podem estar disponíveis offline
      </Text>
    </View>
  );
}
```

**Estratégia de Offline-First:**

1. **Funcionalidades Offline:**
   - Visualizar roteiros salvos
   - Visualizar vídeos salvos localmente
   - Visualizar carrosséis salvos
   - Editar perfil (sincroniza depois)

2. **Funcionalidades Online-Only:**
   - Gerar roteiros (IA)
   - Gerar carrosséis (IA)
   - Publicar posts
   - Atualizar analytics

3. **Sincronização:**
   - Fila de ações pendentes
   - Sincronização automática ao reconectar
   - Indicador visual de "pendente de sincronização"

**Quando Implementar:**  
✅ **Fase 1 - Sprint 3** (Funcionalidades Core)

**Justificativa:**  
Deve ser implementado após as funcionalidades principais, mas antes do MVP para garantir boa experiência offline.

---

### **GAP 3: Tela de Manutenção**

**Descrição:**  
Não há especificação de tela para quando o backend está em manutenção programada.

**Impacto:**  
- Severidade: 🟢 BAIXA
- Frequência: Muito baixa (apenas durante manutenções)
- UX: Importante para comunicar manutenções

**Casos de Uso:**
- Deploy de nova versão do backend
- Manutenção de banco de dados
- Atualização de infraestrutura

**Solução Proposta:**

```typescript
// src/screens/error/MaintenanceScreen.tsx
export default function MaintenanceScreen({ route }) {
  const { estimatedTime, message } = route.params;
  
  return (
    <View style={styles.container}>
      <Icon name="tool" size={64} color={Colors.primary} />
      <Text style={styles.title}>Estamos em manutenção</Text>
      <Text style={styles.message}>
        {message || 'Estamos melhorando o Influency para você. Voltamos em breve!'}
      </Text>
      
      {estimatedTime && (
        <View style={styles.timeContainer}>
          <Icon name="clock" size={20} color={Colors.textSecondary} />
          <Text style={styles.timeText}>
            Tempo estimado: {estimatedTime}
          </Text>
        </View>
      )}
      
      <Button
        title="Verificar Novamente"
        onPress={() => checkMaintenanceStatus()}
        fullWidth
      />
      
      <View style={styles.socialLinks}>
        <Text style={styles.socialText}>Acompanhe as novidades:</Text>
        <View style={styles.socialIcons}>
          <IconButton icon="instagram" onPress={() => openInstagram()} />
          <IconButton icon="twitter" onPress={() => openTwitter()} />
        </View>
      </View>
    </View>
  );
}
```

**Estratégia de Detecção:**

1. **Backend Response:**
   - HTTP 503 (Service Unavailable)
   - Header: `X-Maintenance-Mode: true`
   - Body: `{ "maintenance": true, "estimated_time": "30 minutos", "message": "..." }`

2. **Frontend Handling:**
   - Interceptor Axios detecta 503
   - Navega para MaintenanceScreen
   - Polling a cada 5 minutos para verificar se saiu de manutenção

**Quando Implementar:**  
✅ **Fase 2 - Sprint 5** (Polimento e Otimizações)

**Justificativa:**  
Pode ser implementado mais tarde, pois manutenções são raras e podem ser comunicadas por outros canais inicialmente.

---

### **GAP 4: Deep Linking**

**Descrição:**  
Não há especificação de como deep links são tratados (links externos que abrem telas específicas do app).

**Impacto:**  
- Severidade: 🟡 MÉDIA
- Frequência: Média (notificações push, emails, compartilhamentos)
- UX: Importante para marketing e retenção

**Casos de Uso:**
- Notificação push: "Seu vídeo foi processado" → VideoPreviewScreen
- Email: "Veja suas métricas semanais" → AnalyticsScreen
- Compartilhamento: "Veja este roteiro" → ScriptGeneratedScreen
- Campanha de marketing: "Crie seu primeiro vídeo" → AssistantScreen

**Solução Proposta:**

**1. Esquema de URLs:**

```
influency://
├── auth/
│   ├── login
│   └── register
├── assistant/
│   └── chat?conversation_id={id}
├── scripts/
│   ├── new
│   └── {script_id}
├── videos/
│   ├── new
│   └── {video_id}
├── carousels/
│   └── {carousel_id}
├── posts/
│   └── {post_id}
├── analytics/
│   └── overview
└── settings/
    ├── profile
    ├── dna
    └── social-accounts
```

**2. Configuração React Navigation:**

```typescript
// src/navigation/linking.ts
const linking = {
  prefixes: ['influency://', 'https://app.influency.com.br'],
  config: {
    screens: {
      // Auth
      Login: 'auth/login',
      Register: 'auth/register',
      
      // Main App
      MainTabs: {
        screens: {
          AssistantTab: {
            screens: {
              Assistant: 'assistant/chat',
              ConversationHistory: 'assistant/history',
            },
          },
          LibraryTab: {
            screens: {
              Library: 'library',
              SavedScripts: 'scripts',
              ScriptGenerated: 'scripts/:scriptId',
              SavedVideos: 'videos',
              VideoPreview: 'videos/:videoId',
              SavedCarousels: 'carousels',
              CarouselPreview: 'carousels/:carouselId',
            },
          },
          SettingsTab: {
            screens: {
              Settings: 'settings',
              Profile: 'settings/profile',
              BusinessDNASettings: 'settings/dna',
              SocialAccounts: 'settings/social-accounts',
            },
          },
        },
      },
      
      // Analytics
      Analytics: 'analytics',
      PostDetails: 'posts/:postId',
    },
  },
};

export default linking;
```

**3. Tratamento de Deep Links:**

```typescript
// src/hooks/useDeepLinking.ts
export function useDeepLinking() {
  useEffect(() => {
    // Deep link quando app está fechado
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });
    
    // Deep link quando app está aberto
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });
    
    return () => subscription.remove();
  }, []);
  
  const handleDeepLink = (url: string) => {
    // Verifica se usuário está autenticado
    const isAuthenticated = checkAuth();
    
    if (!isAuthenticated && !url.includes('/auth/')) {
      // Salva URL para redirecionar após login
      AsyncStorage.setItem('pendingDeepLink', url);
      navigation.navigate('Login');
      return;
    }
    
    // React Navigation trata automaticamente
    // Mas podemos adicionar analytics aqui
    analytics.track('deep_link_opened', { url });
  };
}
```

**4. Notificações Push com Deep Links:**

```typescript
// src/services/notifications.ts
export async function sendPushNotification(userId: string, type: string, data: any) {
  const deepLinks = {
    video_processed: `influency://videos/${data.video_id}`,
    script_generated: `influency://scripts/${data.script_id}`,
    post_published: `influency://posts/${data.post_id}`,
    weekly_metrics: `influency://analytics`,
  };
  
  await pushService.send({
    userId,
    title: getNotificationTitle(type),
    body: getNotificationBody(type, data),
    data: {
      deepLink: deepLinks[type],
    },
  });
}
```

**Quando Implementar:**  
✅ **Fase 1 - Sprint 4** (Integrações e Notificações)

**Justificativa:**  
Deve ser implementado junto com notificações push para garantir que usuários possam navegar diretamente para conteúdo relevante.

---

## 📅 ROADMAP DE IMPLEMENTAÇÃO

### **Fase 0: Design (Stitch) ✅ CONCLUÍDA**
- Nenhum gap precisa ser endereçado
- Status: ✅ 51 telas geradas e validadas

### **Fase 1: Fundação e MVP**

#### **Sprint 1: Setup**
- Nenhum gap precisa ser endereçado

#### **Sprint 2: Fundação do Frontend**
- ✅ **GAP 1: Tela de Erro Genérica**
  - Implementar ErrorBoundary
  - Criar GenericErrorScreen
  - Integrar com todos os fluxos

#### **Sprint 3: Funcionalidades Core**
- ✅ **GAP 2: Tela de Sem Conexão**
  - Implementar detecção de rede
  - Criar OfflineScreen
  - Implementar estratégia offline-first básica

#### **Sprint 4: Integrações e Notificações**
- ✅ **GAP 4: Deep Linking**
  - Configurar linking no React Navigation
  - Implementar tratamento de deep links
  - Integrar com notificações push

### **Fase 2: Polimento e Otimizações**

#### **Sprint 5: Polimento**
- ✅ **GAP 3: Tela de Manutenção**
  - Criar MaintenanceScreen
  - Implementar detecção de manutenção
  - Configurar polling de status

#### **Sprint 6: Otimizações**
- ✅ **Melhorias de Offline-First**
  - Implementar fila de sincronização
  - Adicionar indicadores visuais
  - Otimizar cache local

---

## 🎯 PRIORIZAÇÃO

### **Prioridade ALTA (Implementar na Fase 1)**

1. **GAP 1: Tela de Erro Genérica** 🔴
   - Essencial para UX
   - Previne usuário "perdido"
   - Baixo esforço de implementação

2. **GAP 2: Tela de Sem Conexão** 🔴
   - Caso comum em mobile
   - Impacta retenção
   - Médio esforço de implementação

3. **GAP 4: Deep Linking** 🟡
   - Importante para marketing
   - Necessário para notificações
   - Médio esforço de implementação

### **Prioridade MÉDIA (Implementar na Fase 2)**

4. **GAP 3: Tela de Manutenção** 🟢
   - Caso raro
   - Pode ser comunicado por outros canais
   - Baixo esforço de implementação

---

## 📊 ESTIMATIVAS DE ESFORÇO

| Gap | Esforço | Complexidade | Prioridade |
|---|---|---|---|
| GAP 1: Erro Genérica | 4 horas | Baixa | Alta |
| GAP 2: Sem Conexão | 8 horas | Média | Alta |
| GAP 3: Manutenção | 4 horas | Baixa | Média |
| GAP 4: Deep Linking | 12 horas | Média | Alta |
| **TOTAL** | **28 horas** | - | - |

**Observação:** Estimativas incluem implementação, testes e documentação.

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **GAP 1: Tela de Erro Genérica**
- [ ] Criar `GenericErrorScreen.tsx`
- [ ] Implementar `ErrorBoundary` component
- [ ] Adicionar tratamento de erro em serviços API
- [ ] Testar com erros simulados
- [ ] Documentar padrões de tratamento de erro

### **GAP 2: Tela de Sem Conexão**
- [ ] Instalar `@react-native-community/netinfo`
- [ ] Criar `OfflineScreen.tsx`
- [ ] Implementar `useNetInfo` hook
- [ ] Criar estratégia de cache offline
- [ ] Implementar fila de sincronização
- [ ] Testar em modo avião
- [ ] Documentar funcionalidades offline

### **GAP 3: Tela de Manutenção**
- [ ] Criar `MaintenanceScreen.tsx`
- [ ] Implementar detecção de HTTP 503
- [ ] Configurar polling de status
- [ ] Adicionar comunicação de manutenção no backend
- [ ] Testar fluxo completo
- [ ] Documentar processo de manutenção

### **GAP 4: Deep Linking**
- [ ] Configurar `linking` no React Navigation
- [ ] Implementar `useDeepLinking` hook
- [ ] Configurar esquema de URLs
- [ ] Integrar com notificações push
- [ ] Testar todos os deep links
- [ ] Documentar esquema de URLs
- [ ] Adicionar analytics de deep links

---

## 📝 NOTAS ADICIONAIS

### **Sobre Testes**

Todos os gaps devem incluir testes automatizados:

```typescript
// __tests__/screens/error/GenericErrorScreen.test.tsx
describe('GenericErrorScreen', () => {
  it('deve exibir mensagem de erro', () => {
    // ...
  });
  
  it('deve permitir retry', () => {
    // ...
  });
  
  it('deve permitir voltar ao início', () => {
    // ...
  });
});
```

### **Sobre Analytics**

Todos os gaps devem incluir tracking de eventos:

```typescript
// Erro genérico
analytics.track('error_screen_shown', { error_type, error_message });

// Offline
analytics.track('offline_screen_shown', { previous_screen });

// Manutenção
analytics.track('maintenance_screen_shown', { estimated_time });

// Deep link
analytics.track('deep_link_opened', { url, source });
```

### **Sobre Documentação**

Cada gap implementado deve ter:
- Documentação técnica (como funciona)
- Documentação de usuário (como usar)
- Exemplos de código
- Troubleshooting guide

---

## 🔄 PROCESSO DE REVISÃO

Este documento deve ser revisado:
- ✅ Após cada sprint (verificar se gaps foram implementados)
- ✅ Após feedback de usuários beta (identificar novos gaps)
- ✅ Antes de cada release (garantir que gaps críticos foram endereçados)

---

**Última Atualização:** 08/03/2026  
**Versão:** 1.0.0  
**Status:** ✅ DOCUMENTAÇÃO COMPLETA  
**Próxima Revisão:** Após Sprint 1 (Fase 1)
