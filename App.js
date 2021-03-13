import React from 'react';
import AppLoading from 'expo-app-loading';

import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';

import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';

// import WelcomScreen from './app/screens/WelcomScreen';
// import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignupScreen';

import color from './app/constants/color';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: color.white,
    accent: color.white
  }
};

export default function App() {
  const [fontsLoaded] = useFonts({
    poetsen: require('./assets/fonts/poetsenOne/PoetsenOne.ttf')
  });

  StatusBar.setBarStyle('light-content', true);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={theme}>
      <SignupScreen />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
