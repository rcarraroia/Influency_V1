/**
 * Secure Storage Wrapper
 * 
 * Abstração para armazenamento seguro que funciona tanto no mobile quanto no web.
 * - Mobile: usa expo-secure-store (criptografado)
 * - Web: usa AsyncStorage (localStorage)
 */

import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Salva um valor de forma segura
 */
export async function setItemAsync(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    // No web, usar AsyncStorage (localStorage)
    await AsyncStorage.setItem(key, value);
  } else {
    // No mobile, usar SecureStore (criptografado)
    await SecureStore.setItemAsync(key, value);
  }
}

/**
 * Recupera um valor armazenado
 */
export async function getItemAsync(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    // No web, usar AsyncStorage (localStorage)
    return await AsyncStorage.getItem(key);
  } else {
    // No mobile, usar SecureStore (criptografado)
    return await SecureStore.getItemAsync(key);
  }
}

/**
 * Remove um valor armazenado
 */
export async function deleteItemAsync(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    // No web, usar AsyncStorage (localStorage)
    await AsyncStorage.removeItem(key);
  } else {
    // No mobile, usar SecureStore (criptografado)
    await SecureStore.deleteItemAsync(key);
  }
}
