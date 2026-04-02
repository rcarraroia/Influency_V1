import { Stack } from 'expo-router';

/**
 * Library Stack Layout
 * 
 * Stack da Biblioteca com 3 telas:
 * - Library (tabs internas: Roteiros, Vídeos, Carrosséis)
 * - Saved Scripts
 * - Saved Videos
 * - Saved Carousels
 */
export default function LibraryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="scripts" />
      <Stack.Screen name="videos" />
      <Stack.Screen name="carousels" />
    </Stack>
  );
}
