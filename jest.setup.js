// Mock de expo antes que nada
jest.mock('expo', () => ({}));
jest.mock('expo-modules-core', () => ({}));
jest.mock('expo-constants', () => ({
  manifest: { extra: {} },
  default: { manifest: { extra: {} } },
}));

// Mock de react-native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return Object.setPrototypeOf({
    NativeModules: {
      ...RN.NativeModules,
    },
  }, RN);
});

import '@testing-library/jest-native/extend-expect';