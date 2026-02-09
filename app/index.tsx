import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './src/context/AuthContext';
import { DatabaseProvider } from './src/context/SQLiteContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <DatabaseProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </DatabaseProvider>

  );
}

