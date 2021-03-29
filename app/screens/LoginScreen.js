import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import Spinner from 'react-native-loading-spinner-overlay';

import color from '../constants/color';

import Logo from '../../assets/Logo.svg';
import UserIcon from '../../assets/icons/user.svg';
import EyeOffIcon from '../../assets/icons/eye-off.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import uri from '../constants';
import deviceStorage from '../services/deviceStorage';
import { setExpense } from '../redux/reducers/expenseReducer';

// * Welcome screen Component
const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    isSelected: false,
    loading: false,
    eye_view_password: true,

    error: ''
  });

  const dispatch = useDispatch();

  const handleLoginUser = async () => {
    setState({
      ...state,
      loading: true
    });

    try {
      const response = await axios({
        url: `${uri.BASE_URL}/user/login`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          email: state.email,
          password: state.password
        })
      });

      setState({
        ...state,
        loading: false
      });

      if (response.data.result) {
        // TODO: store the token into local storage
        await deviceStorage.storeData('auth_token', `Bearer ${response.data.token}`);

        // TODO: set expense state
        dispatch(
          setExpense({ summary: response.data.summary, expenses: response.data.expenses }, 'expenses/setExpense')
        );

        // TODO: Redirect to home page
        await navigation.navigate('Index', { screen: 'Home' });
      }
    } catch (e) {
      if (!e.response.data.result)
        showMessage({
          message: e.response.data.message,
          type: 'warning'
        });
    } finally {
      setState({
        ...state,
        loading: false
      });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={state.loading}
        textStyle={{
          color: color.white
        }}
      />

      <Logo style={styles.logoImage} width={84} height={84} />

      <View
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Input box container  */}
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
              position: 'relative',
              marginBottom: 15
            }}
          >
            <TextInput
              selectionColor={color.white}
              mode='outlined'
              selectionColor='white'
              style={{
                width: '90%',
                backgroundColor: color.primary,
                fontSize: 16,
                color: color.white
              }}
              label='Email'
              value={state.email}
              dense={false}
              autoFocus={true}
              onChangeText={text =>
                setState({
                  ...state,
                  email: text
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
              position: 'relative',
              marginBottom: 5
            }}
          >
            <TextInput
              selectionColor={color.white}
              mode='outlined'
              secureTextEntry={state.eye_view_password}
              autoCorrect={false}
              style={{
                width: '90%',
                backgroundColor: color.primary,
                fontSize: 18
              }}
              label='Password'
              value={state.password}
              onChangeText={text =>
                setState({
                  ...state,
                  password: text
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
          }}
        >
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CheckBox
              value={state.isSelected}
              tintColors={{ true: color.green, false: color.white }}
              onValueChange={e =>
                setState({
                  ...state,
                  isSelected: !state.isSelected
                })
              }
            />
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                color: color.white
              }}
            >
              Remember me
            </Text>
          </View>

          <TouchableOpacity
            style={{
              flex: 1
            }}
          >
            <Text style={[styles.buttonText, styles.forgotPasswordText]}>FORGOT PASSWORD</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLoginUser} style={styles.button}>
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
    backgroundColor: color.primary
  },

  button: {
    width: 120,
    height: 40,
    borderRadius: 7,
    top: 15,
    backgroundColor: color.white
  },

  buttonText: {
    color: color.primary,
    paddingTop: 8,
    flex: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  emailInput: {
    width: '70%',
    right: 20,
    bottom: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
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
    top: 120,
    alignSelf: 'center',
    width: 100
  },

  UserIcon: {
    position: 'absolute',
    backgroundColor: color.primary,
    zIndex: 1,
    right: 30,
    top: 18,
    padding: 15
  }
});
