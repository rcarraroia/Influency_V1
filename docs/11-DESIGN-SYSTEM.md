# 🎨 DESIGN SYSTEM - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Framework:** Material Design 3  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA  
**Design System Validado:** [stitch-output/DESIGN.md](../stitch-output/DESIGN.md)  
**Projeto Stitch ID:** 15962214627344849757

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Cores](#cores)
3. [Tipografia](#tipografia)
4. [Espaçamento](#espaçamento)
5. [Border Radius](#border-radius)
6. [Componentes Base](#componentes-base)
7. [Ícones](#ícones)
8. [Animações](#animações)
9. [Acessibilidade](#acessibilidade)

---

## 🎯 VISÃO GERAL

### Filosofia de Design

O Influency v2 segue os princípios do Material Design 3 adaptados para criadoras de conteúdo:

1. **Profissional sem ser corporativo**
2. **Moderno sem ser frio**
3. **Empoderador e acessível**
4. **Focado em ação (CTAs claros)**

### Mood Board

- **Vibrant Purple (#6200EE):** Criatividade, inovação, empoderamento
- **Electric Teal (#03DAC6):** Energia, sucesso, crescimento
- **Soft Grays:** Profissionalismo, clareza, foco

---

## 🎨 CORES

### Paleta Principal

```typescript
// src/theme/colors.ts
export const Colors = {
  // Primary
  primary: '#6200EE',
  primaryLight: '#7F39FB',
  primaryDark: '#5300CC',
  primaryContainer: '#EADDFF',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#21005E',
  
  // Secondary
  secondary: '#03DAC6',
  secondaryLight: '#66FFF9',
  secondaryDark: '#00A896',
  secondaryContainer: '#B2F7EF',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#002020',
  
  // Tertiary
  tertiary: '#FF6B6B',
  tertiaryLight: '#FF9999',
  tertiaryDark: '#CC5555',
  
  // Error
  error: '#B00020',
  errorContainer: '#FFDAD6',
  onError: '#FFFFFF',
  onErrorContainer: '#410002',
  
  // Success
  success: '#00C853',
  successContainer: '#C8E6C9',
  onSuccess: '#FFFFFF',
  onSuccessContainer: '#002106',
  
  // Warning
  warning: '#FF9800',
  warningContainer: '#FFE0B2',
  onWarning: '#FFFFFF',
  onWarningContainer: '#2E1500',
  
  // Background
  background: '#FFFFFF',
  onBackground: '#1C1B1F',
  
  // Surface
  surface: '#FFFFFF',
  surfaceVariant: '#F5F5F5',
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#49454F',
  
  // Outline
  outline: '#E0E0E0',
  outlineVariant: '#CAC4D0',
  
  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  scrim: 'rgba(0, 0, 0, 0.32)',
};
```

### Uso das Cores

| Elemento | Cor | Uso |
|---|---|---|
| Botões primários | `primary` | CTAs principais |
| Botões secundários | `secondary` | Ações secundárias |
| Links | `primary` | Navegação |
| Erros | `error` | Mensagens de erro |
| Sucesso | `success` | Confirmações |
| Avisos | `warning` | Alertas |
| Texto principal | `textPrimary` | Títulos, corpo |
| Texto secundário | `textSecondary` | Labels, metadata |

---

## ✍️ TIPOGRAFIA

### Font Family

```typescript
// src/theme/typography.ts
export const Typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  
  fontSize: {
    xxl: 28,   // Display
    xl: 24,    // Heading 1
    lg: 20,    // Heading 2
    base: 16,  // Body
    sm: 14,    // Caption
    xs: 12,    // Fine print
  },
  
  lineHeight: {
    xxl: 34,   // 1.21x
    xl: 30,    // 1.25x
    lg: 26,    // 1.3x
    base: 24,  // 1.5x
    sm: 20,    // 1.43x
    xs: 16,    // 1.33x
  },
  
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};
```

### Type Scale

```typescript
// Exemplos de uso
const styles = StyleSheet.create({
  display: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xxl,
    lineHeight: Typography.lineHeight.xxl,
    color: Colors.textPrimary,
  },
  
  heading1: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    lineHeight: Typography.lineHeight.xl,
    color: Colors.textPrimary,
  },
  
  heading2: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    lineHeight: Typography.lineHeight.lg,
    color: Colors.textPrimary,
  },
  
  body: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.base,
    color: Colors.textPrimary,
  },
  
  caption: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.sm,
    color: Colors.textSecondary,
  },
  
  label: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.sm,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
```

---

## 📏 ESPAÇAMENTO

### Sistema de Espaçamento (8px base)

```typescript
// src/theme/spacing.ts
export const Spacing = {
  xxs: 4,    // Tight spacing
  xs: 8,     // Minimal spacing
  sm: 12,    // Compact spacing
  base: 16,  // Standard spacing (mais comum)
  md: 20,    // Comfortable spacing
  lg: 24,    // Generous spacing
  xl: 32,    // Section spacing
  xxl: 40,   // Major section breaks
  xxxl: 48,  // Hero spacing
};
```

### Uso do Espaçamento

| Contexto | Valor | Uso |
|---|---|---|
| Entre ícone e texto | `xs` (8px) | Botões, chips |
| Entre elementos relacionados | `sm` (12px) | Form fields |
| Padding padrão | `base` (16px) | Cards, containers |
| Entre seções | `lg` (24px) | Separação visual |
| Margens de tela | `xl` (32px) | Edge-to-edge |

---

## 🔲 BORDER RADIUS

```typescript
// src/theme/borderRadius.ts
export const BorderRadius = {
  none: 0,
  sm: 4,     // Inputs, chips
  md: 8,     // Buttons, small cards
  lg: 12,    // Cards, modals
  xl: 16,    // Large cards
  xxl: 24,   // Hero elements
  full: 9999, // Pills, avatars
};
```

---

## 🧩 COMPONENTES BASE

### Button

```typescript
// src/components/ui/Button.tsx
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ];
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : Colors.primary} />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={styles[`${variant}Text`]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  small: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.base,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 44,
  },
  large: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.lg,
    minHeight: 52,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.5,
  },
  
  icon: {
    marginRight: Spacing.xs,
  },
  
  // Text styles
  primaryText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
  },
  secondaryText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
  },
  outlineText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
  },
  textText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.semiBold,
  },
});
```

### Card

```typescript
// src/components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'flat' | 'outlined';
  padding?: keyof typeof Spacing;
  onPress?: () => void;
}

export default function Card({
  children,
  variant = 'elevated',
  padding = 'base',
  onPress,
}: CardProps) {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      style={[
        styles.card,
        styles[variant],
        { padding: Spacing[padding] },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
  },
  
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  flat: {
    backgroundColor: Colors.surfaceVariant,
  },
  
  outlined: {
    borderWidth: 1,
    borderColor: Colors.outline,
  },
});
```

### Input

```typescript
// src/components/ui/Input.tsx
interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  error,
  leftIcon,
  rightIcon,
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textDisabled}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  
  label: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.outline,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
  },
  
  input: {
    flex: 1,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.textPrimary,
  },
  
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: Spacing.sm,
  },
  
  inputError: {
    borderColor: Colors.error,
  },
  
  leftIcon: {
    marginRight: Spacing.xs,
  },
  
  rightIcon: {
    marginLeft: Spacing.xs,
  },
  
  error: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});
```

---

## 🎭 ÍCONES

### Biblioteca
**Lucide React Native** - Ícones consistentes e modernos

```bash
npm install lucide-react-native
```

### Uso

```typescript
import { Mic, Send, Camera, Settings } from 'lucide-react-native';

<Mic size={24} color={Colors.primary} />
<Send size={20} color={Colors.textSecondary} />
```

### Tamanhos Padrão

| Contexto | Tamanho |
|---|---|
| Ícones pequenos (inline) | 16px |
| Ícones médios (botões) | 20px |
| Ícones grandes (destaque) | 24px |
| Ícones hero | 32px |

---

## 🎬 ANIMAÇÕES

### Biblioteca
**React Native Reanimated 3** - Animações performáticas

### Exemplos

#### Fade In

```typescript
import Animated, { FadeIn } from 'react-native-reanimated';

<Animated.View entering={FadeIn.duration(300)}>
  <Text>Conteúdo</Text>
</Animated.View>
```

#### Slide In

```typescript
import Animated, { SlideInRight } from 'react-native-reanimated';

<Animated.View entering={SlideInRight.duration(300)}>
  <Card />
</Animated.View>
```

#### Scale

```typescript
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

const handlePress = () => {
  scale.value = withSpring(1.1);
};
```

---

## ♿ ACESSIBILIDADE

### Touch Targets

**Mínimo:** 44x44px (WCAG 2.1 Level AA)

```typescript
const styles = StyleSheet.create({
  touchTarget: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Contraste de Cores

| Elemento | Contraste Mínimo |
|---|---|
| Texto normal | 4.5:1 |
| Texto grande (18px+) | 3:1 |
| Ícones | 3:1 |

### Labels Acessíveis

```typescript
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Gravar vídeo"
  accessibilityHint="Abre a câmera para gravar um novo vídeo"
  accessibilityRole="button"
>
  <Camera size={24} />
</TouchableOpacity>
```

---

## 📚 REFERÊNCIAS

- [Material Design 3](https://m3.material.io/)
- [React Native Paper](https://reactnativepaper.com/)
- [Lucide Icons](https://lucide.dev/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ COMPLETO
