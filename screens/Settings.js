import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SettingsScreen from './SettingsScreen';
import FAQ from '../components/FAQ';
import About from '../components/About';


const Stack = createStackNavigator();

const Settings = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='SettingsScreen' component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FAQ" component={FAQ} options={{headerShown: false }} />
    <Stack.Screen name="About" component={About} options={{headerShown: false }} />
  </Stack.Navigator>
  )
}

export default Settings;