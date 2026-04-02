import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '../src/theme';

// Criar QueryClient para React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos (anteriormente cacheTime)
      retry: 2,
    },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Tela inicial */}
            <Stack.Screen name="index" />
            
            {/* Auth Stack (4 telas) */}
            <Stack.Screen name="(auth)" />
            
            {/* Onboarding Stack (4 telas) */}
            <Stack.Screen name="(onboarding)" />
            
            {/* Main Tabs (32 telas: 16 Assistant + 3 Library + 9 Settings + 4 Assets) */}
            <Stack.Screen name="(tabs)" />
            
            {/* Analytics Stack (3 telas) */}
            <Stack.Screen name="analytics" />
            
            {/* Modais Globais (2 telas) */}
            <Stack.Screen 
              name="modals" 
              options={{ 
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }} 
            />
            
            {/* Showcase de componentes (dev only) */}
            <Stack.Screen name="components-showcase" />
          </Stack>
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
