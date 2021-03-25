import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { validateEmail } from '../utility';

import deviceStorage from '../services/deviceStorage';

import FlashMessage from 'react-native-flash-message';

import Logo from '../../assets/Logo.svg';
import UserIcon from '../../assets/icons/user.svg';
import EyeOffIcon from '../../assets/icons/eye-off.svg';
import EyeIcon from '../../assets/icons/eye.svg';

import color from '../constants/color';

import axios from 'axios';

// * Welcome screen Component
const SignupScreen = ({ navigation }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    c_password: '',
    eye_view_password: true,
    eye_view_c_password: true
  });

  const handleRegisterUser = async () => {
    // ! Validation
    if (!(await validateEmail(state.email)))
      return showMessage({
        message: 'Please enter correct email.',
        type: 'warning'
      });

    if (!state.password || !state.c_password)
      return showMessage({
        message: 'Password and confirm password are needed.',
        type: 'warning'
      });

    if (!state.password.match(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
      return showMessage({
        message: 'Give some strong password(8 min).',
        type: 'warning'
      });

    if (state.password !== state.c_password)
      return showMessage({
        message: 'Passwords are mismatch.',
        type: 'warning'
      });

    // try {
    //   const response = await axios.post('http://localhost:4000/v1/user/register', {
    //     email: state.email,
    //     password: state.password,
    //     c_password: state.c_password
    //   });
    //   console.log(response);
    // } catch (e) {
    //   console.log(e);
    // }

    // Redirect to home page
    await navigation.navigate('Index', { screen: 'Home' });
  };

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
          bottom: 30
        }}
      >
        <View
          style={{
            width: '100%'
          }}
        >
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <TextInput
              selectionColor={color.white}
              mode='outlined'
              style={{
                width: '90%',
                backgroundColor: color.green,
                fontSize: 16,
                color: color.white
              }}
              label='Email'
              value={state.email}
              dense={false}
              onChangeText={e =>
                setState({
                  ...state,
                  email: e
                })
              }
            />
            <UserIcon style={styles.UserIcon} />
          </View>

          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <TextInput
              selectionColor={color.white}
              mode='outlined'
              secureTextEntry={state.eye_view_password}
              autoCorrect={false}
              style={{
                width: '90%',
                backgroundColor: color.green,
                fontSize: 16
              }}
              label='Password'
              value={state.password}
              onChangeText={e =>
                setState({
                  ...state,
                  password: e
                })
              }
            />
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                zIndex: 1,
                color: color.white,
                right: 25,
                top: 10,
                padding: 17
              }}
              onPress={() =>
                setState({
                  ...state,
                  eye_view_password: !state.eye_view_password
                })
              }
            >
              {state.eye_view_password ? (
                <EyeOffIcon
                  style={{
                    bottom: 5
                  }}
                />
              ) : (
                <EyeIcon
                  style={{
                    bottom: 5
                  }}
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <TextInput
              selectionColor={color.white}
              mode='outlined'
              secureTextEntry={state.eye_view_c_password}
              autoCorrect={false}
              style={{
                width: '90%',
                backgroundColor: color.green,
                fontSize: 16
              }}
              label='Confirm Password'
              value={state.c_password}
              onChangeText={e =>
                setState({
                  ...state,
                  c_password: e
                })
              }
            />
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                zIndex: 1,
                color: color.white,
                right: 25,
                top: 10,
                padding: 17
              }}
              onPress={() =>
                setState({
                  ...state,
                  eye_view_c_password: !state.eye_view_c_password
                })
              }
            >
              {state.eye_view_c_password ? (
                <EyeOffIcon
                  style={{
                    bottom: 5
                  }}
                />
              ) : (
                <EyeIcon
                  color='white'
                  style={{
                    bottom: 5
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleRegisterUser} style={styles.button}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('Clicked login!')} style={styles.signupButton}>
          <Text style={[styles.buttonText, styles.signupButtonText]}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 25,
          padding: 0,
          height: 20
        }}
      >
        <Text
          style={{
            flex: 1,
            width: '100%',
            padding: 0,
            borderRadius: 20
          }}
        >
          {/* Setting up Flashmessage component  */}
          <FlashMessage
            position='bottom'
            style={{
              padding: 0,
              margin: 0,
              borderRadius: 10,
              width: '100%'
            }}
            duration={1500}
          />
          {/* <--- here as last component */}
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;

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
    top: 30
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
    right: 10,
    fontSize: 12
  },

  logoImage: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    width: 100,
    height: 100
  },

  UserIcon: {
    position: 'absolute',
    backgroundColor: color.green,
    zIndex: 1,
    color: color.white,
    right: 30,
    top: 18,
    padding: 15
  },

  signupButton: {
    width: 120,
    height: 40,
    top: 30
  },
  signupButtonText: {
    fontSize: 13,
    color: color.white,
    textDecorationLine: 'underline'
  }
});
