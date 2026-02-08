import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import routes from '../../const/Routes';
import { useAuth } from '../context/AuthContext';
import { PrivateTabParamList, Routes } from '../types/navigation';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

const PrivateNavigator: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'home';
          if (route.name === 'home') {
            iconName = 'home';
          } else if (route.name === 'profile') {
            iconName = 'person';
          } else if (route.name === 'cart') {
            iconName = 'shopping-cart';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerTitle(props) {
          return <Text>Mujicam Segurity </Text>;
        },
        headerRight: () => (
          <View style={styles.viewHeadrs}>
            <TouchableOpacity style={styles.iconButton}>
              <View>
                <MaterialIcons name="notifications" size={22} color="#007AFF" />
                <View style={styles.badge} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={logout}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="logout" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )
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

const styles = StyleSheet.create({
  viewHeadrs: {
    flexDirection: "row"
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  }
});

export default PrivateNavigator;
