import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import color from '../constants/color';
import Logo from '../../assets/Logo.svg';
import { TextInput } from 'react-native-paper';

// * Welcome screen Component
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.backgroundFirstAngle} />
      <View style={styles.backgroundSecondAngle} />
      <Logo style={styles.logoImage} />

      <View
        style={{
          width: '100%',
          bottom: 200
        }}
      >
        <TextInput
          selectionColor={color.white}
          mode='outlined'
          style={{
            width: '70%',
            right: 20,
            justifyContent: 'center',
            alignSelf: 'flex-end',
            backgroundColor: color.green,
            color: color.white
          }}
          label='Email'
          value={email}
          dense={false}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          selectionColor={color.white}
          mode='outlined'
          style={{
            width: '70%',
            right: 20,
            alignSelf: 'flex-end',
            backgroundColor: color.green,
            color: color.white
          }}
          label='Password'
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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

  emailInput: {
    width: '70%',
    // bottom: 200,
    right: 20,
    bottom: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: color.green,
    color: color.white
  },

  logoImage: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    width: 100,
    height: 100
  },

  button: {
    backgroundColor: color.white,
    width: 120,
    height: 40,
    borderRadius: 7,
    bottom: 100
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
