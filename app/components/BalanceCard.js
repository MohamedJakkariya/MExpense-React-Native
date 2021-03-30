import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { useSelector } from 'react-redux';

import { getBalance } from '../redux/reducers/balanceReducer';

import LogoutIcon from '../../assets/icons/log-out.svg';
import MoneyIcon from '../../assets/icons/money.svg';

import color from '../constants/color';
import AddBalance from './AddBalance';
import deviceStorage from '../services/deviceStorage';

const BalanceCard = ({ navigation }) => {
  const initialBalance = useSelector(getBalance);

  const handleLogout = async () => {
    // TODO: clear local storage
    await deviceStorage.removeData('auth_token');

    await navigation.navigate('Login');
  };

  return (
    <View
      style={{
        flex: 0.4
      }}
    >
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomText}>
          Hello
          <Text style={styles.welcomTextHighLight}> user,</Text>
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <LogoutIcon style={styles.UserIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceBox}>
        <View style={styles.balanceBoxTop}>
          <Text
            style={{
              color: color.white,
              fontWeight: 'bold',
              fontSize: 22,
              paddingLeft: 15
            }}
          >
            Balance
          </Text>
          <AddBalance navigation={navigation} />
        </View>

        <View style={[styles.balanceBoxTop, styles.balanceBoxBottom]}>
          <Text
            style={{
              paddingLeft: 15,
              paddingBottom: 15
            }}
          >
            <MoneyIcon width={20} height={20} />
            <Text
              style={{
                fontSize: 40,
                color: color.white,
                fontWeight: 'bold'
              }}
            >
              {initialBalance.toFixed(2)}
            </Text>
          </Text>

          <View
            style={{
              paddingRight: 15,
              paddingBottom: 15
            }}
          >
            <Text
              style={{
                color: color.white,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 25,
                width: '100%'
              }}
            >
              {new Date().getDate()}
            </Text>
            <Text
              style={{
                color: color.white,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {moment().format('MMM').toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  balanceBox: {
    backgroundColor: color.primary,
    borderRadius: 12,
    marginHorizontal: 10,
    paddingTop: 15
  },
  balanceBoxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  welcomeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  welcomText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 15,
    fontStyle: 'italic',
    color: color.primary,
    paddingVertical: 15
  },
  welcomTextHighLight: {
    color: color.green
  },

  UserIcon: {
    marginRight: 15
  }
});
