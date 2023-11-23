import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { auth } from './config'; // Import 'auth' from your modified 'config.js' for user authentication

import FlashMessage from "react-native-flash-message";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Navigation from './Navigation';
import DestinationScreen from './components/DestinationScreen';
import ChooseLocation from './components/ChooseLocation';
import Interest from './screens/Interest';
import RatingScreen from './components/RatingScreen';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null); // Change the initial value to null

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged); // Use 'auth' for user authentication
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name='MainNavigation' component={Navigation} options={{ headerShown: false }}  />
      <Stack.Screen name="Interest" component={Interest} options={{headerShown: false}} />
      <Stack.Screen name='DestinationScreen' component={DestinationScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ChooseLocation' component={ChooseLocation} />
     <Stack.Screen name='RatingScreen' component={RatingScreen} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

