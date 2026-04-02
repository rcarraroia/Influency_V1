// Mock do AsyncStorage
require('@react-native-async-storage/async-storage/jest/async-storage-mock');

// Mock do Expo modules
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('expo-av', () => ({
  Audio: {
    setAudioModeAsync: jest.fn(),
    Recording: jest.fn(),
  },
}));

jest.mock('expo-camera', () => ({
  Camera: {
    requestCameraPermissionsAsync: jest.fn(),
    requestMicrophonePermissionsAsync: jest.fn(),
  },
}));

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
}));

// Mock do React Native Paper
jest.mock('react-native-paper', () => {
  const RealModule = jest.requireActual('react-native-paper');
  const MockedModule = {
    ...RealModule,
    Provider: ({ children }) => children,
  };
  return MockedModule;
});

// Suprimir warnings específicos
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args) => {
    const arg = args[0];
    if (
      typeof arg === 'string' &&
      (arg.includes('Animated:') ||
        arg.includes('componentWillReceiveProps') ||
        arg.includes('componentWillMount'))
    ) {
      return;
    }
    originalWarn(...args);
  };

  console.error = (...args) => {
    const arg = args[0];
    if (
      typeof arg === 'string' &&
      (arg.includes('Warning: ReactDOM.render') ||
        arg.includes('Not implemented: HTMLFormElement'))
    ) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
