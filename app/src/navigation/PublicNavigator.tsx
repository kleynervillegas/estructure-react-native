import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { routes } from '../../const/Routes';
import { PublicStackParamList, Routes } from '../types/navigation';

const Stack = createNativeStackNavigator<PublicStackParamList>();

const PublicNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {
        routes.filter(route => !route.private).map((route: Routes, key: number) => (
          <Stack.Screen
            key={key}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))
      }
    </Stack.Navigator>
  );
};

export default PublicNavigator;
