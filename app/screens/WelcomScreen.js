import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import color from '../constants/color';
import Logo from '../../assets/Logo.svg';
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
      <View style={styles.backgroundFirstAngle} />
      <View style={styles.backgroundSecondAngle} />
      <Logo style={styles.logoImage} />

      <Text style={styles.mainTitle}>MANAGE YOUR EXPENSE</Text>

      <Text style={styles.quoteText}>How it's work ?</Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.button}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    backgroundColor: color.green
  },

  // TODO: Rotate background color angle
  backgroundFirstAngle: {
    top: -150,
    left: -280,
    width: '100%',
    height: '150%',
    backgroundColor: color.primary,
    position: 'absolute',
    transform: [{ rotate: '17deg' }]
  },
  backgroundSecondAngle: {
    top: -200,
    left: 100,
    width: 300,
    height: 500,
    backgroundColor: color.primary,
    position: 'absolute',
    transform: [{ rotateX: '45deg' }, { rotateZ: '25deg' }]
  },
  logoImage: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    width: 100,
    height: 100
  },

  // TODO: Text styles
  mainTitle: {
    fontSize: 30,
    elevation: 1,
    alignSelf: 'baseline',
    textAlign: 'right',
    bottom: 100,
    right: 45,
    fontWeight: 'bold',
    color: color.white,
    fontFamily: 'poetsenOne'
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
    bottom: 80
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
