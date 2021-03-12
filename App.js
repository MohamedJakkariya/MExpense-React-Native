import React from 'react';
import WelcomScreen from './app/screens/WelcomScreen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    poetsen: require('./assets/fonts/poetsenOne/PoetsenOne.ttf')
  });

  StatusBar.setBarStyle('light-content', true);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <WelcomScreen />;
}
