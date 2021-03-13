import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import color from '../constants/color';
import Logo from '../../assets/Logo.svg';
import { TextInput } from 'react-native-paper';

// * Welcome screen Component
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundFirstAngle} />
      <View style={styles.backgroundSecondAngle} />
      <Logo style={styles.logoImage} />

      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 45
        }}
      >
        {/* Input box container  */}
        <View
          style={{
            width: '100%'
          }}
        >
          <TextInput
            selectionColor={color.white}
            mode='outlined'
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: color.green,
              fontSize: 18
            }}
            label='Email'
            value={email}
            dense={false}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            selectionColor={color.white}
            mode='outlined'
            secureTextEntry={true}
            autoCorrect={false}
            style={{
              width: '90%',
              right: 20,
              alignSelf: 'flex-end',
              backgroundColor: color.green,
              color: color.white,
              fontSize: 18,
              paddingTop: 10
            }}
            label='Password'
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        {/* Input box bottom  */}
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 20

            // backgroundColor: color.white
          }}
        >
          <CheckBox
            value={isSelected}
            tintColors={{ true: color.green, false: color.white }}
            onValueChange={setSelection}
            style={styles.checkbox}
          />

          <TouchableOpacity
            style={{
              flex: 1
            }}
          >
            <Text style={[styles.buttonText, styles.forgotPasswordText]}>FORGOT PASSWORD</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

// TODO: Make styles with StyleSheet API
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.green
  },

  button: {
    backgroundColor: color.white,
    width: 120,
    height: 40,
    borderRadius: 7,
    top: 15
  },
  buttonText: {
    color: color.primary,
    paddingTop: 8,
    flex: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold'
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
    right: 20,
    bottom: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: color.green,
    color: color.white
  },

  forgotPasswordText: {
    color: color.white,
    textDecorationLine: 'underline',
    textAlign: 'right',
    right: 10
  },

  logoImage: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    width: 100,
    height: 100
  }
});
