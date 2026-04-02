# BLOCO 02 - CORREÇÃO VISUAL: ONBOARDING

## ⚠️ REGRA INVIOLÁVEL

**Antes de corrigir qualquer tela, leia o HTML correspondente em `stitch-export/organized/`.**

O HTML é a fonte de verdade absoluta — textos, cores, tamanhos, componentes e layout devem ser implementados de forma idêntica ao HTML. **Nunca corrija uma tela sem ter lido o HTML primeiro.**

---

## 📋 ESCOPO DO BLOCO

**Total de telas:** 4 telas do módulo de onboarding

---

## 🎯 TELAS A CORRIGIR

### 1. Welcome Screen
- **Arquivo TSX:** `influency-mobile/app/(onboarding)/welcome.tsx`
- **HTML Referência:** `stitch-export/organized/03-onboarding/welcome-screen.html`
- **Status:** ✅ CONCLUÍDO

### 2. Business DNA Screen
- **Arquivo TSX:** `influency-mobile/app/(onboarding)/business-dna.tsx`
- **HTML Referência:** `stitch-export/organized/03-onboarding/onboarding-screen.html`
- **Status:** ✅ CONCLUÍDO

### 3. Connect Social Networks
- **Arquivo TSX:** `influency-mobile/app/(onboarding)/connect-social.tsx`
- **HTML Referência:** `stitch-export/organized/03-onboarding/connect-social-networks.html`
- **Status:** ✅ CONCLUÍDO

### 4. Onboarding Complete
- **Arquivo TSX:** `influency-mobile/app/(onboarding)/complete.tsx`
- **HTML Referência:** `stitch-export/organized/03-onboarding/onboarding-complete.html`
- **Status:** ✅ CONCLUÍDO

---

## ✅ CHECKLIST DE CORREÇÃO (POR TELA)

Para cada tela, verificar:

- [x] HTML lido e analisado completamente
- [x] Textos idênticos ao HTML (incluindo capitalização)
- [x] Cores exatas conforme HTML (hex codes)
- [x] Tamanhos de fonte corretos
- [x] Espaçamentos (padding/margin) idênticos
- [x] Componentes UI corretos (Button, Input, etc.)
- [x] Layout e estrutura visual idênticos
- [x] Ícones corretos (se aplicável)
- [x] Estados visuais (hover, focus, disabled)
- [x] Responsividade mantida
- [x] SafeAreaView do react-native-safe-area-context aplicado para respeitar a safe area do Android e iOS
- [x] Indicadores de progresso (steps) corretos
- [x] Animações de transição entre etapas

---

## 📊 PROGRESSO

- **Telas Concluídas:** 4/4
- **Percentual:** 100%

---

## 📝 OBSERVAÇÕES

- Fluxo sequencial: Welcome → Business DNA → Connect Social → Complete
- Manter indicadores de progresso visíveis
- Validar navegação forward/backward
- Testar skip de etapas opcionais (se aplicável)

---

**Criado em:** 10/03/2026  
**Última Atualização:** 10/03/2026
