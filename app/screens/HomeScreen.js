import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';

import color from '../constants/color';

import ExpenseCard from '../components/ExpenseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, setExpense } from '../redux/reducers/expenseReducer';
import { setBalance } from '../redux/reducers/balanceReducer';

import StaticAddButton from '../components/StaticAddButton';
import BalanceCard from '../components/BalanceCard';
import Spinner from 'react-native-loading-spinner-overlay';
import deviceStorage from '../services/deviceStorage';

// import axios from 'axios';
// import uri from '../constants';

export default function HomeScreen({ navigation }) {
  // const [data, setData] = useState({
  //   summary: {
  //     balance_amount: 0
  //   },
  //   expenses: []
  // });

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    deviceStorage.getData('auth_token').then(token => {
      if (!token) {
        showMessage({
          message: 'Login to continue.',
          type: 'info'
        });
        return navigation.navigate('Login');
      }

      deviceStorage
        .getData('balance')
        .then(balance => {
          deviceStorage.getDataObject('expenses').then(expenses => {
            dispatch(
              setExpense(
                {
                  summary: {
                    balance_amount: +balance
                  },
                  expenses: !expenses ? [] : expenses
                },
                'expenses/setExpense'
              )
            );

            dispatch(setBalance(+balance, 'balances/setBalance'));

            // TODO: Redirect to home page
            navigation.navigate('Index', { screen: 'Home' });
          });
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  const data = useSelector(getExpenses);

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
          {data &&
            data.expenses.map(expense => (
              <ExpenseCard
                icon={expense.icon}
                key={expense.expense_id}
                amount={expense.amount}
                when={expense.when}
                description={expense.description}
                navigation={navigation}
              />
            ))}
        </View>
      </ScrollView>
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
