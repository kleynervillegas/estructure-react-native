import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types/navigation';
import PrivateNavigator from './PrivateNavigator';
import PublicNavigator from './PublicNavigator';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // rutas privadas
        <Stack.Screen name="Private" component={PrivateNavigator} />
      ) : (
        // rutas públicas
        <Stack.Screen name="Public" component={PublicNavigator} />
      )}
    </Stack.Navigator>
  );
};


export default AppNavigator;
