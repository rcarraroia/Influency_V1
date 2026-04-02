import { Stack } from 'expo-router';

export default function AnalyticsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="post-details" />
      <Stack.Screen
        name="url-analysis"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
