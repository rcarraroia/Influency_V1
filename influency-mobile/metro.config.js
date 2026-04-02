const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Desabilitar Nova Arquitetura para compatibilidade com Expo Go SDK 54
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
