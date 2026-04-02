# BLOCO 04 - CORREÇÃO VISUAL: VÍDEO

## ⚠️ REGRA INVIOLÁVEL

**Antes de corrigir qualquer tela, leia o HTML correspondente em `stitch-export/organized/`.**

O HTML é a fonte de verdade absoluta — textos, cores, tamanhos, componentes e layout devem ser implementados de forma idêntica ao HTML. **Nunca corrija uma tela sem ter lido o HTML primeiro.**

---

## 📋 ESCOPO DO BLOCO

**Total de telas:** 7 telas do módulo de vídeo (gravação, edição, preview)

---

## 🎯 TELAS A CORRIGIR

### 1. Teleprompter Settings
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/teleprompter-settings.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/teleprompter-settings.html`
- **Status:** ⚠️ Inconsistência — HTML mostra tela "Roteiro Gerado" (diferente do TSX). Já coberto por `script-generated.tsx`. Aguardando decisão.

### 2. Recording Active Screen
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/recording-active.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/recording-active-screen.html`
- **Status:** ✅ Concluído

### 3. Processing Video Loading
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/processing-video.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/processing-video-loading.html`
- **Status:** ✅ Concluído

### 4. Video Preview Screen
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/video-preview.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/video-preview-screen.html`
- **Status:** ✅ Concluído

### 5. Video Edit Screen
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/video-edit.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/video-edit-screen.html`
- **Status:** ✅ Concluído

### 6. Subtitles Customization Modal
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/subtitles-customization.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/subtitles-customization-modal.html`
- **Status:** ✅ Concluído

### 7. Video Final Preview
- **Arquivo TSX:** `influency-mobile/app/(tabs)/assistant/video-final-preview.tsx`
- **HTML Referência:** `stitch-export/organized/04-assistant-stack/video-final-preview.html`
- **Status:** ✅ Concluído

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
- [ ] Controles de vídeo (play, pause, seek)
- [ ] Timeline de edição visual
- [ ] Preview de legendas em tempo real

---

## 📊 PROGRESSO

- **Telas Concluídas:** 6/7 (1 com inconsistência pendente)
- **Percentual:** 86%

---

## 📝 OBSERVAÇÕES

- Fluxo completo de criação de vídeo
- Validar controles de gravação (start, stop, pause)
- Testar ferramentas de edição (trim, cut, filters)
- Verificar preview de legendas customizadas
- Validar estados de processamento com progress bars

---

**Criado em:** 10/03/2026  
**Última Atualização:** 10/03/2026 — 6 telas implementadas, 1 com inconsistência de mapeamento HTML
