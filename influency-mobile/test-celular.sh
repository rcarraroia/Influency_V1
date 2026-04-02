#!/bin/bash

# 🚀 SCRIPT DE TESTE NO CELULAR - INFLUENCY MOBILE
# Resolve o problema de login e inicia o servidor corretamente

echo "📱 INICIANDO TESTE NO CELULAR..."
echo ""
echo "⚙️ Configurando ambiente..."

# Limpar cache do Expo
echo "🧹 Limpando cache..."
npx expo start --clear --no-dev --minify

echo ""
echo "✅ Servidor iniciado!"
echo ""
echo "📱 INSTRUÇÕES:"
echo "1. Abra o Expo Go no seu celular"
echo "2. Escaneie o QR code que apareceu acima"
echo "3. Aguarde o download do bundle (pode demorar 2-3 minutos na primeira vez)"
echo ""
echo "⚠️ IMPORTANTE:"
echo "- Certifique-se de que PC e celular estão na MESMA rede WiFi"
echo "- Se pedir login, escolha 'Proceed anonymously'"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
