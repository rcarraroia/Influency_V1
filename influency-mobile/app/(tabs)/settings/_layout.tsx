import { Stack } from 'expo-router';

/**
 * Settings Stack Layout
 * 
 * Stack de Configurações com 9 telas:
 * - Settings (menu principal)
 * - Profile
 * - Business DNA Settings
 * - Social Accounts
 * - Brand Assets (+ 3 sub-telas)
 * - Notifications Settings
 * - Integrations
 */
export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="business-dna-settings" />
      <Stack.Screen name="social-accounts" />
      <Stack.Screen name="brand-assets" />
      <Stack.Screen name="upload-asset" options={{ presentation: 'modal' }} />
      <Stack.Screen name="configure-asset" options={{ presentation: 'modal' }} />
      <Stack.Screen name="notifications-settings" />
      <Stack.Screen name="integrations" />
    </Stack>
  );
}
