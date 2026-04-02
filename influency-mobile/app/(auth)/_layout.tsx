import { Stack } from 'expo-router';

/**
 * Auth Stack Layout
 * 
 * Stack de autenticação com 4 telas:
 * - Splash
 * - Login
 * - Register
 * - Forgot Password
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="splash" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
