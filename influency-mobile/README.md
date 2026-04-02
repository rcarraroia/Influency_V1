# Influency V1 - Mobile App

Aplicativo mobile para criadores de conteúdo, desenvolvido com React Native + Expo.

## 🚀 Stack Tecnológico

- **React Native:** 0.83+
- **Expo:** 55+
- **TypeScript:** 5.9+
- **React Native Paper:** 5.x (Material Design 3)
- **Expo Router:** File-based routing
- **Zustand:** Estado global
- **React Query:** Server state management
- **Axios:** HTTP client

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Executar no Android
npm run android

# Executar no iOS (requer macOS)
npm run ios
```

## 📁 Estrutura de Pastas

```
influency-mobile/
├── app/                    # Expo Router (file-based routing)
│   ├── _layout.tsx         # Root layout
│   └── index.tsx           # Tela inicial
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── atoms/          # Componentes básicos
│   │   ├── molecules/      # Componentes compostos
│   │   └── organisms/      # Componentes complexos
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── store/              # Zustand stores
│   ├── theme/              # Design system
│   ├── types/              # TypeScript types
│   └── utils/              # Utilitários
├── assets/                 # Assets estáticos
├── app.json                # Configuração do Expo
├── package.json
└── tsconfig.json
```

## 🎨 Design System

O projeto segue os princípios do **Material Design 3** com uma identidade visual moderna:

- **Cores Primárias:** Roxo (#6200EE) e Teal (#03DAC6)
- **Tipografia:** Roboto
- **Espaçamento:** Múltiplos de 8px
- **Componentes:** React Native Paper

## 🧪 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento com cache limpo
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa no navegador
- `npm test` - Executa os testes
- `npm run lint` - Executa o linter
- `npm run type-check` - Verifica tipos TypeScript

## 📱 Requisitos

- Node.js 18+ LTS
- npm ou yarn
- Expo Go app (para testar em dispositivo físico)
- Android Studio (para emulador Android)
- Xcode (para emulador iOS - apenas macOS)

## 🔗 Links Úteis

- [Documentação do Expo](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo Router](https://docs.expo.dev/router/introduction/)

## 📄 Licença

Propriedade de RENUM - Todos os direitos reservados.
