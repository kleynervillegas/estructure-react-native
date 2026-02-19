import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import routes from '../../const/Routes';
import { useAuth } from '../context/AuthContext';
import { Routes } from '../types/navigation';

const Tab = createBottomTabNavigator<any>();
const Stack = createNativeStackNavigator<any>();

const TabsNavigator: React.FC = () => {
  const { logout } = useAuth();
  const tabRoutes = routes.filter(route => route.private && route.tabs);
  const navigation = useNavigation();

  const toNavigate = (path: string) => navigation.navigate(path as never);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {

          let iconName: any = 'Tienda';

          if (route.name === 'Tienda') {
            iconName = 'store';
          } else if (route.name === 'Orders') {
            iconName = 'auto-stories';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Quotation') {
            iconName = 'build';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#0a1329' },
        headerShown: true,
        headerStyle: {
          backgroundColor: "#0a1329",
        },
        headerTitle(props) {
          return <Text style={{ color: '#fff', fontWeight: 'bold' }} >Mujicam Segurity</Text>;
        },
        headerRight: () => (
          <View style={styles.viewHeadrs}>
            <TouchableOpacity
              onPress={() => toNavigate("profile")}
              style={{ marginRight: 5 }}
            >
              <View>
                <MaterialIcons name="notifications" size={24} color="#007AFF" />
                <View style={styles.badge} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toNavigate("notifications")}
              style={{ marginRight: 5 }}
            >
              <View>
                <MaterialIcons name="person" size={24} color="#007AFF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={logout}
              style={{ marginRight: 10 }}
            >
              <MaterialIcons name="logout" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )
      })}
    >
      {tabRoutes.map((route: Routes, key: number) => (
        <Tab.Screen
          key={key}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  );
};

const PrivateNavigator: React.FC = () => {

  const nonTabRoutes = routes.filter(route => route.private && !route.tabs);

  return (
    <Stack.Navigator>
      {/* Rutas privadas que van en tabs */}
      <Stack.Screen
        name="back"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />

      {/* Rutas privadas que no están en tabs */}
      {nonTabRoutes.map((route: Routes, key: number) => (
        <Stack.Screen
          key={`stack-${key}`}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
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
  },
  iconPersonButton: {
    // marginLeft: 12,
    // padding: 4,
  }
});

export default PrivateNavigator;