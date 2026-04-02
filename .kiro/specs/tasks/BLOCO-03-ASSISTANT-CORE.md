# BLOCO 03 - CORREÇÃO VISUAL: ASSISTENTE CORE

## ⚠️ REGRA INVIOLÁVEL

**Antes de corrigir qualquer tela, leia o HTML correspondente em `stitch-export/organized/`.**

O HTML é a fonte de verdade absoluta — textos, cores, tamanhos, componentes e layout devem ser implementados de forma idêntica ao HTML. **Nunca corrija uma tela sem ter lido o HTML primeiro.**

---

## 📋 ESCOPO DO BLOCO

**Total de telas:** 8 telas do módulo assistente (core + scripts)

---

## 🎯 TELAS A CORRIGIR

### 1. Assistant Home Screen
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/index.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/assistant-screen.html`
- **Status:** ✅ CONCLUÍDO

### 2. Assistant Settings
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/assistant-settings.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/assistant-settings.html`
- **Status:** ✅ CONCLUÍDO

### 3. Conversation History
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/history.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/conversation-history.html`
- **Status:** ✅ CONCLUÍDO

### 4. Choose Script Screen
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/choose-script.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/choose-script-screen.html`
- **Status:** ✅ CONCLUÍDO

### 5. Generating Script Loading
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/generating-script.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/generating-script-loading.html`
- **Status:** ✅ CONCLUÍDO

### 6. Script Results Screen
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/script-generated.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/script-results-screen.html`
- **Status:** ✅ CONCLUÍDO

### 7. Script Generation Modal
- **Arquivo TSX:** `influency-mobile/app/modals/script-generation.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/script-generation-modal.html`
- **Status:** ✅ CONCLUÍDO

### 8. Edit Script Modal
- **Arquivo TSX:** `influency-mobile/app/modals/edit-script.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/edit-script-modal.html`
- **Status:** ✅ CONCLUÍDO

---

## ✅ CHECKLIST DE CORREÇÃO (POR TELA)

Para cada tela, verificar:

- [ ] HTML lido e analisado completamente
- [ ] Textos idênticos ao HTML (incluindo capitalização)
- [ ] Cores exatas conforme HTML (hex codes)
- [ ] Tamanhos de fonte corretos
- [ ] Espaçamentos (padding/margin) idênticos
- [ ] Componentes UI corretos (Button, Input, etc.)
- [ ] Layout e estrutura visual idênticos
- [ ] Ícones corretos (se aplicável)
- [ ] Estados visuais (hover, focus, disabled)
- [ ] Responsividade mantida
- [ ] SafeAreaView do react-native-safe-area-context aplicado para respeitar a safe area do Android e iOS
- [ ] Loading states com animações corretas
- [ ] Modais com backdrop e animações de entrada/saída

---

## 📊 PROGRESSO

- **Telas Concluídas:** 8/8
- **Percentual:** 100%

---

## 📝 OBSERVAÇÕES

- Fluxo principal do assistente de IA
- Validar interações com modais
- Testar estados de loading (skeleton screens)
- Verificar transições entre telas do fluxo de scripts

---

## ⚠️ PENDÊNCIAS IDENTIFICADAS

### P1. Bottom Sheet "Editar Roteiro" (não implementado)
- **Arquivo a criar:** `app/modals/edit-script-inline.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/teleprompter-settings.html`
- **Descrição:** Bottom sheet que cobre 92% da tela com campos de edição do roteiro:
  - Campo **Título** (input text)
  - Campo **Conteúdo do Roteiro** (textarea min-h 400px, contador "245 palavras")
  - Footer com botões **Cancelar** (outline) e **Salvar** (primary)
  - Background: tela "Roteiro Gerado" com overlay black/40
- **Contexto:** HTML mapeado erroneamente para `teleprompter-settings.tsx` no Bloco 04. Conteúdo real é tela separada ainda não implementada.
- **Status:** ⏳ Pendente

---

**Criado em:** 10/03/2026
**Última Atualização:** 10/03/2026 — Pendência P1 adicionada
