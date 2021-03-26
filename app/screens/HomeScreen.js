import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';

import color from '../constants/color';

import ExpenseCard from '../components/ExpenseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, setExpense } from '../redux/reducers/expenseReducer';
import { setBalance } from '../redux/reducers/balanceReducer';
import { showMessage } from 'react-native-flash-message';

import StaticAddButton from '../components/StaticAddButton';
import BalanceCard from '../components/BalanceCard';
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import deviceStorage from '../services/deviceStorage';

import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const data = useSelector(getExpenses);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    deviceStorage.getData('auth_token').then(token => {
      axios({
        url: 'http://192.168.43.19:4000/v1/expense/view',
        method: 'get',
        headers: { Authorization: token }
      })
        .then(response => {
          if (response.data.result) {
            // TODO: set expense state
            dispatch(
              setExpense({ summary: response.data.summary, expenses: response.data.expenses }, 'expenses/setExpense')
            );

            dispatch(setBalance(+response.data.summary.balance, 'balances/setBalance'));

            // TODO: Redirect to home page
            navigation.navigate('Index', { screen: 'Home' });
          }
        })
        .catch(e => {
          navigation.navigate('Login');
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: -1
      }}
    >
      <Spinner
        visible={loading}
        textStyle={{
          color: color.white
        }}
      />
      <StaticAddButton />
      <ScrollView style={styles.wrapper}>
        <StatusBar backgroundColor={color.primary} />

        <BalanceCard navigation={navigation} />

        <View style={styles.bottomContainer}>
          <Text
            style={[
              styles.fontBasic,
              {
                color: color.primary,
                fontSize: 22,
                paddingBottom: 15
              }
            ]}
          >
            Recent expense
          </Text>
          {data.expenses.map(expense => (
            <ExpenseCard
              icon={expense.icon}
              key={expense._id}
              amount={expense.amount}
              when={expense.when}
              description={expense.description}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>

      {/* Setting up Flashmessage component  */}
      <FlashMessage
        position='top'
        style={{
          width: '100%'
        }}
        duration={1500}
      />
      {/* <--- here as last component */}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 2,
    margin: 10,
    marginTop: 20
  },
  fontBasic: {
    fontWeight: 'bold'
  },
  wrapper: {
    flex: 1,
    position: 'relative'
  }
});
