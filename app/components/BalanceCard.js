import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

import { getBalance, setBalance } from '../redux/reducers/balanceReducer';

import UserIcon from '../../assets/icons/User Icon.svg';
import MoneyIcon from '../../assets/icons/money.svg';
import PlusIcon from '../../assets/icons/plus.svg';

import color from '../constants/color';
import { getExpenses } from '../redux/reducers/expenseReducer';

const BalanceCard = () => {
  const expenses = useSelector(getExpenses);
  const initialBalance = useSelector(getBalance);

  const dispatch = useDispatch();

  // TODO: Set balance amount
  useEffect(() => {
    dispatch(setBalance(expenses.summary.balance_amount, 'balance/setBalance'));
  }, []);

  return (
    <View style={styles.topContainer}>
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomText}>
          Hello
          <Text style={styles.welcomTextHighLight}> MD</Text>,
        </Text>
        <TouchableOpacity>
          <UserIcon style={styles.UserIcon} />
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
          <TouchableOpacity>
            <PlusIcon
              style={{
                marginRight: 15
              }}
            />
          </TouchableOpacity>
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
                fontSize: 50,
                color: color.white,
                fontWeight: 'bold'
              }}
            >
              {initialBalance}
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
  topContainer: {
    flex: 1
  },
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
  balanceBoxBottom: {
    flex: 1
  },

  welcomeBox: {
    flex: 1,
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
