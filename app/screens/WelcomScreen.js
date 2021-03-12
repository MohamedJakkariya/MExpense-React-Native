import React from 'react';
import { StyleSheet, Image, View, Svg } from 'react-native';
import color from '../constants/color';
import logo from '../../assets/Logo.svg';

// * Welcome screen Component
const WelcomScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundFirstAngle} />
      <View style={styles.backgroundSecondAngle} />
      <Image source={logo} style={styles.logoImage} />
    </View>
  );
};

export default WelcomScreen;

// TODO: Make styles with StyleSheet API
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    transform: [{ rotate: '17deg' }],
    backfaceVisibility: 'hidden'
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
    width: 200,
    height: 200
  }
});
