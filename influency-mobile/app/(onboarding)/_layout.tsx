import { Stack } from 'expo-router';

/**
 * Onboarding Stack Layout
 * 
 * Stack de onboarding com 4 telas:
 * - Welcome
 * - Business DNA (5 perguntas)
 * - Connect Social Networks
 * - Complete
 */
export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="business-dna" />
      <Stack.Screen name="connect-social" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
