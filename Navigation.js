import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
//import SettingsScreen from './screens/SettingsScreen';
import Settings from './screens/Settings';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const route = useRoute();
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#32AFA9',
          tabBarInactiveTintColor: '#666666',
          tabBarStyle: [
            {
              display: 'flex'
            },
            null
          ]
        }}
      >
        <Tab.Screen
          name="Home"
          initialParams={{ selectedInterests: route.params?.selectedInterests }}
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default Navigation;

