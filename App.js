import React from 'react';
import AppLoading from 'expo-app-loading';

import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';

import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import WelcomScreen from './app/screens/WelcomScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignupScreen';
import IndexScreen from './app/screens';

import color from './app/constants/color';

import store from './app/redux/store';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: color.white,
    accent: color.white
  }
};

const Stack = createStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    poetsen: require('./assets/fonts/poetsenOne/PoetsenOne.ttf')
  });

  StatusBar.setBarStyle('light-content', true);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StatusBar animated={true} backgroundColor={color.primary_light_1} />

        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        >
          <Stack.Screen name='Welcome' component={WelcomScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Index' component={IndexScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
