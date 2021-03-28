import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import Logo from '../../assets/Logo.svg';

import color from '../constants/color';
import deviceStorage from '../services/deviceStorage';

// * Welcome screen Component
const WelcomScreen = ({ navigation }) => {
  useEffect(() => {
    deviceStorage.getData('auth_token').then(token => {
      if (token) return navigation.navigate('Index', { screen: 'Home' });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center'
        }}
      >
        <Logo style={styles.logoImage} width={84} height={84} />

        <Text style={styles.mainTitle}>MANAGE YOUR EXPENSE</Text>
      </View>

      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.button}>
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.quoteText}>How it's work ?</Text>
      </View>
    </View>
  );
};

export default WelcomScreen;

// TODO: Make styles with StyleSheet API
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: color.primary
  },
  logoImage: {
    alignSelf: 'center'
  },

  // TODO: Text styles
  mainTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: color.white,
    fontFamily: 'poetsenOne',
    width: '60%',
    alignSelf: 'center',
    paddingTop: 20
  },
  quoteText: {
    color: color.white,
    textDecorationLine: 'underline'
  },

  // TODO: Button styles
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 30
  },
  button: {
    backgroundColor: color.white,
    width: 120,
    height: 40,
    borderRadius: 7
  },
  buttonText: {
    color: color.primary,
    paddingTop: 8,
    flex: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
