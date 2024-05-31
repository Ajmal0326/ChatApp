/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import SignUp from './SignUp';
import Login from './Login';
import Main from './Main';
import Chat from './Chat';

const Stack = createStackNavigator();



function App(): React.JSX.Element {

  return (

    
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
        <Stack.Screen name='Chat' component={Chat} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}




export default App;
