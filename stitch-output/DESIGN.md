# 🎨 DESIGN SYSTEM - INFLUENCY V1

**Versão:** 1.0.0  
**Data:** 08/03/2026  
**Projeto Stitch ID:** 15962214627344849757

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Paleta de Cores](#paleta-de-cores)
3. [Tipografia](#tipografia)
4. [Espaçamento](#espaçamento)
5. [Border Radius](#border-radius)
6. [Elevação e Sombras](#elevação-e-sombras)
7. [Componentes Base](#componentes-base)
8. [Ícones](#ícones)
9. [Animações](#animações)
10. [Acessibilidade](#acessibilidade)

---

## 🎯 Visão Geral

O Design System do Influency V1 segue os princípios do **Material Design 3** com uma identidade visual moderna e vibrante. O sistema foi projetado para garantir consistência visual em todas as 51 telas do aplicativo mobile.

**Princípios de Design:**
- **Mobile-First:** Otimizado para telas de 390x844px (iPhone 14)
- **Acessibilidade:** WCAG 2.1 Level AA compliance
- **Consistência:** Componentes reutilizáveis e padronizados
- **Performance:** Design leve e responsivo

---

## 🎨 Paleta de Cores

### Cores Primárias

```css
/* Primary - Roxo Vibrante */
--primary: #6200EE;
--primary-light: #7F39FB;
--primary-dark: #5300CC;
--primary-container: #EADDFF;
--on-primary: #FFFFFF;
--on-primary-container: #21005E;

/* Secondary - Teal */
--secondary: #03DAC6;
--secondary-light: #66FFF9;
--secondary-dark: #00A896;
--secondary-container: #B2F7EF;
--on-secondary: #000000;
--on-secondary-container: #002020;
```

### Cores de Superfície

```css
/* Background */
--background: #FFFFFF;
--background-dark: #1C1B1F;

/* Surface */
--surface: #FFFFFF;
--surface-variant: #E7E0EC;
--on-surface: #1C1B1F;
--on-surface-variant: #49454F;

/* Outline */
--outline: #79747E;
--outline-variant: #CAC4D0;
```

### Cores Semânticas

```css
/* Success */
--success: #4CAF50;
--success-container: #C8E6C9;
--on-success: #FFFFFF;

/* Warning */
--warning: #FF9800;
--warning-container: #FFE0B2;
--on-warning: #000000;

/* Error */
--error: #B3261E;
--error-container: #F9DEDC;
--on-error: #FFFFFF;

/* Info */
--info: #2196F3;
--info-container: #BBDEFB;
--on-info: #FFFFFF;
```

### Cores de Texto

```css
/* Text Colors */
--text-primary: rgba(0, 0, 0, 0.87);
--text-secondary: rgba(0, 0, 0, 0.60);
--text-disabled: rgba(0, 0, 0, 0.38);
--text-hint: rgba(0, 0, 0, 0.38);

/* Text Colors (Dark Mode) */
--text-primary-dark: rgba(255, 255, 255, 0.87);
--text-secondary-dark: rgba(255, 255, 255, 0.60);
--text-disabled-dark: rgba(255, 255, 255, 0.38);
```

### Gradientes

```css
/* Gradient - Splash Screen */
--gradient-primary: linear-gradient(135deg, #6200EE 0%, #7F39FB 100%);

/* Gradient - Cards */
--gradient-card: linear-gradient(180deg, rgba(98, 0, 238, 0.05) 0%, rgba(98, 0, 238, 0) 100%);
```

---

## ✍️ Tipografia

### Família de Fontes

```css
--font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Pesos de Fonte

```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Escala Tipográfica

```css
/* Display */
--font-size-display-large: 57px;
--line-height-display-large: 64px;
--font-weight-display: 400;

--font-size-display-medium: 45px;
--line-height-display-medium: 52px;

--font-size-display-small: 36px;
--line-height-display-small: 44px;

/* Headline */
--font-size-headline-large: 32px;
--line-height-headline-large: 40px;
--font-weight-headline: 400;

--font-size-headline-medium: 28px;
--line-height-headline-medium: 36px;

--font-size-headline-small: 24px;
--line-height-headline-small: 32px;

/* Title */
--font-size-title-large: 22px;
--line-height-title-large: 28px;
--font-weight-title: 500;

--font-size-title-medium: 16px;
--line-height-title-medium: 24px;
--letter-spacing-title-medium: 0.15px;

--font-size-title-small: 14px;
--line-height-title-small: 20px;
--letter-spacing-title-small: 0.1px;

/* Body */
--font-size-body-large: 16px;
--line-height-body-large: 24px;
--letter-spacing-body-large: 0.5px;
--font-weight-body: 400;

--font-size-body-medium: 14px;
--line-height-body-medium: 20px;
--letter-spacing-body-medium: 0.25px;

--font-size-body-small: 12px;
--line-height-body-small: 16px;
--letter-spacing-body-small: 0.4px;

/* Label */
--font-size-label-large: 14px;
--line-height-label-large: 20px;
--letter-spacing-label-large: 0.1px;
--font-weight-label: 500;

--font-size-label-medium: 12px;
--line-height-label-medium: 16px;
--letter-spacing-label-medium: 0.5px;

--font-size-label-small: 11px;
--line-height-label-small: 16px;
--letter-spacing-label-small: 0.5px;
```

### Exemplos de Uso

```css
/* Título de Tela */
.screen-title {
  font-family: var(--font-family);
  font-size: var(--font-size-headline-medium);
  line-height: var(--line-height-headline-medium);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

/* Corpo de Texto */
.body-text {
  font-family: var(--font-family);
  font-size: var(--font-size-body-medium);
  line-height: var(--line-height-body-medium);
  letter-spacing: var(--letter-spacing-body-medium);
  color: var(--text-secondary);
}

/* Label de Botão */
.button-label {
  font-family: var(--font-family);
  font-size: var(--font-size-label-large);
  line-height: var(--line-height-label-large);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-label-large);
  text-transform: uppercase;
}
```

---

## 📏 Espaçamento

O sistema de espaçamento segue múltiplos de **8px** para garantir consistência e alinhamento perfeito.

### Escala de Espaçamento

```css
--spacing-0: 0px;
--spacing-1: 4px;   /* 0.5x */
--spacing-2: 8px;   /* 1x - Base */
--spacing-3: 12px;  /* 1.5x */
--spacing-4: 16px;  /* 2x */
--spacing-5: 20px;  /* 2.5x */
--spacing-6: 24px;  /* 3x */
--spacing-8: 32px;  /* 4x */
--spacing-10: 40px; /* 5x */
--spacing-12: 48px; /* 6x */
--spacing-16: 64px; /* 8x */
--spacing-20: 80px; /* 10x */
```

### Uso Recomendado

| Espaçamento | Uso |
|-------------|-----|
| 4px | Espaçamento interno mínimo, gaps entre ícones |
| 8px | Padding interno de componentes pequenos |
| 12px | Espaçamento entre elementos relacionados |
| 16px | Padding padrão de cards e containers |
| 24px | Espaçamento entre seções |
| 32px | Margens laterais de tela |
| 40px | Espaçamento entre grupos de conteúdo |
| 48px+ | Espaçamento vertical entre seções principais |

### Exemplos de Uso

```css
/* Card Padding */
.card {
  padding: var(--spacing-4); /* 16px */
}

/* Section Margin */
.section {
  margin-bottom: var(--spacing-6); /* 24px */
}

/* Screen Padding */
.screen-container {
  padding: var(--spacing-4) var(--spacing-8); /* 16px 32px */
}
```

---

## 🔲 Border Radius

```css
--radius-none: 0px;
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Uso Recomendado

| Radius | Uso |
|--------|-----|
| 4px | Chips, badges pequenos |
| 8px | Botões, inputs, cards pequenos |
| 12px | Cards médios, modais |
| 16px | Cards grandes, bottom sheets |
| 20px+ | Elementos decorativos |
| 9999px | Botões circulares, avatares |

---

## 🌑 Elevação e Sombras

Seguindo Material Design 3, usamos elevações de 0dp a 5dp.

```css
/* Elevation 0 - No shadow */
--elevation-0: none;

/* Elevation 1 - 2dp */
--elevation-1: 0px 1px 2px rgba(0, 0, 0, 0.3),
               0px 1px 3px 1px rgba(0, 0, 0, 0.15);

/* Elevation 2 - 4dp */
--elevation-2: 0px 1px 2px rgba(0, 0, 0, 0.3),
               0px 2px 6px 2px rgba(0, 0, 0, 0.15);

/* Elevation 3 - 8dp */
--elevation-3: 0px 1px 3px rgba(0, 0, 0, 0.3),
               0px 4px 8px 3px rgba(0, 0, 0, 0.15);

/* Elevation 4 - 12dp */
--elevation-4: 0px 2px 3px rgba(0, 0, 0, 0.3),
               0px 6px 10px 4px rgba(0, 0, 0, 0.15);

/* Elevation 5 - 16dp */
--elevation-5: 0px 4px 4px rgba(0, 0, 0, 0.3),
               0px 8px 12px 6px rgba(0, 0, 0, 0.15);
```

### Uso Recomendado

| Elevação | Uso |
|----------|-----|
| 0dp | Superfícies planas, backgrounds |
| 1dp | Cards em repouso |
| 2dp | Botões elevados, chips |
| 3dp | FABs em repouso, cards hover |
| 4dp | Modais, dialogs |
| 5dp | Navigation drawer, bottom sheets |

---

## 🧩 Componentes Base

### Botões

#### Primary Button
```css
.button-primary {
  background: var(--primary);
  color: var(--on-primary);
  padding: 10px 24px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-label-large);
  font-weight: var(--font-weight-medium);
  min-height: 48px;
  box-shadow: var(--elevation-2);
}

.button-primary:hover {
  background: var(--primary-dark);
  box-shadow: var(--elevation-3);
}

.button-primary:disabled {
  background: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.38);
  box-shadow: none;
}
```

#### Secondary Button
```css
.button-secondary {
  background: var(--secondary);
  color: var(--on-secondary);
  padding: 10px 24px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-label-large);
  font-weight: var(--font-weight-medium);
  min-height: 48px;
  box-shadow: var(--elevation-2);
}
```

#### Outline Button
```css
.button-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--outline);
  padding: 10px 24px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-label-large);
  font-weight: var(--font-weight-medium);
  min-height: 48px;
}
```

#### Text Button
```css
.button-text {
  background: transparent;
  color: var(--primary);
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-label-large);
  font-weight: var(--font-weight-medium);
  min-height: 48px;
}
```

### Cards

#### Elevated Card
```css
.card-elevated {
  background: var(--surface);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  box-shadow: var(--elevation-1);
}
```

#### Outlined Card
```css
.card-outlined {
  background: var(--surface);
  border: 1px solid var(--outline-variant);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}
```

#### Filled Card
```css
.card-filled {
  background: var(--surface-variant);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}
```

### Inputs

#### Text Input
```css
.input-text {
  background: var(--surface-variant);
  border: 1px solid var(--outline);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: var(--font-size-body-large);
  color: var(--text-primary);
  min-height: 56px;
}

.input-text:focus {
  border-color: var(--primary);
  outline: 2px solid var(--primary);
  outline-offset: -1px;
}

.input-text::placeholder {
  color: var(--text-hint);
}
```

#### Text Area
```css
.input-textarea {
  background: var(--surface-variant);
  border: 1px solid var(--outline);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: var(--font-size-body-large);
  color: var(--text-primary);
  min-height: 120px;
  resize: vertical;
}
```

### Chips

```css
.chip {
  display: inline-flex;
  align-items: center;
  background: var(--surface-variant);
  border-radius: var(--radius-xs);
  padding: 6px 12px;
  font-size: var(--font-size-label-small);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  gap: 4px;
}

.chip-selected {
  background: var(--secondary-container);
  color: var(--on-secondary-container);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--error);
  color: var(--on-error);
  border-radius: var(--radius-full);
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: var(--font-weight-medium);
}
```

### Loading Spinner

```css
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--surface-variant);
  border-top-color: var(--primary);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Progress Bar

```css
.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--surface-variant);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--primary);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}
```

---

## 🎭 Ícones

### Biblioteca de Ícones
- **Fonte:** Lucide Icons (Material Design style)
- **Tamanho Padrão:** 24x24px
- **Tamanhos Disponíveis:** 16px, 20px, 24px, 32px, 40px

### Cores de Ícones

```css
--icon-primary: var(--text-primary);
--icon-secondary: var(--text-secondary);
--icon-disabled: var(--text-disabled);
--icon-on-primary: var(--on-primary);
--icon-on-secondary: var(--on-secondary);
```

### Ícones Principais Usados

| Ícone | Nome | Uso |
|-------|------|-----|
| 💬 | MessageCircle | Chat, Assistente |
| 📁 | Folder | Biblioteca |
| ⚙️ | Settings | Configurações |
| 🎤 | Mic | Gravação de voz |
| 📹 | Video | Gravação de vídeo |
| 📸 | Camera | Câmera |
| ➕ | Plus | Adicionar |
| ✏️ | Edit | Editar |
| 🗑️ | Trash | Excluir |
| ✓ | Check | Confirmar |
| ✕ | X | Fechar |
| ← | ArrowLeft | Voltar |
| → | ArrowRight | Avançar |
| ⋮ | MoreVertical | Menu |

---

## 🎬 Animações

### Durações

```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Easing Functions

```css
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
```

### Animações Comuns

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse (Recording Button) */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}
```

---

## ♿ Acessibilidade

### Touch Targets
- **Mínimo:** 44x44px (iOS) / 48x48px (Android)
- **Recomendado:** 48x48px para todos os elementos interativos

### Contraste de Cores
- **Texto Normal:** Mínimo 4.5:1
- **Texto Grande (18px+):** Mínimo 3:1
- **Ícones:** Mínimo 3:1

### Estados de Foco

```css
.focusable:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.focusable:focus:not(:focus-visible) {
  outline: none;
}
```

### Labels Descritivos
- Todos os elementos interativos devem ter labels descritivos
- Usar `aria-label` quando o texto visual não é suficiente
- Usar `aria-describedby` para descrições adicionais

---

## 📱 Responsividade

### Breakpoints

```css
--breakpoint-xs: 320px;  /* iPhone SE */
--breakpoint-sm: 375px;  /* iPhone 12/13 */
--breakpoint-md: 390px;  /* iPhone 14 (base) */
--breakpoint-lg: 428px;  /* iPhone 14 Pro Max */
```

### Viewport Base
- **Largura:** 390px (iPhone 14)
- **Altura:** 844px (iPhone 14)

---

## 🔗 Referências

- [Material Design 3](https://m3.material.io/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://material.io/design)

---

**Versão:** 1.0.0  
**Última Atualização:** 08/03/2026  
**Mantido por:** Equipe Influency
