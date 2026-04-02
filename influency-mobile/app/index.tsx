import { Redirect } from 'expo-router';

/**
 * Index Screen
 *
 * Tela de entrada do app que redireciona para o splash.
 */
export default function Index() {
  return <Redirect href="/(auth)/splash" />;
}
