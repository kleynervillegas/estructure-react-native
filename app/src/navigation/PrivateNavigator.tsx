import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { routes } from '../const/Routes';
import { PrivateTabParamList, Routes } from '../types/navigation';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

const PrivateNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      {
        routes.filter(route => route.private).map((route: Routes, key: number) => (
          <Tab.Screen
            key={key}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))
      } 
    </Tab.Navigator>
  );
};

export default PrivateNavigator;
