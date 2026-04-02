#!/bin/bash

echo "🔧 Corrigindo dependências do Expo SDK 54..."

# Remove node_modules e lock files
rm -rf node_modules package-lock.json

# Instala dependências corretas para SDK 54
npm install --legacy-peer-deps \
  expo@~54.0.0 \
  expo-linking@~7.0.0 \
  react-dom@18.3.1 \
  react-native-svg@15.8.0 \
  @expo/metro-runtime@~4.0.0

echo "✅ Dependências corrigidas!"
echo "🚀 Iniciando servidor..."

npx expo start --web
