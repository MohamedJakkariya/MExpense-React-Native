import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import color from '../constants/color';

import ExpenseCard from '../components/ExpenseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses, removeExpense, setExpense } from '../redux/reducers/expenseReducer';
import { setRootBalance } from '../redux/reducers/balanceReducer';

import StaticAddButton from '../components/StaticAddButton';
import BalanceCard from '../components/BalanceCard';
import Spinner from 'react-native-loading-spinner-overlay';
import deviceStorage from '../services/deviceStorage';

import TrashIcon from '../../assets/icons/trash.svg';
import { showMessage } from 'react-native-flash-message';

import EditExpenseIcon from '../components/EditExpenseIcon';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const allExpense = useSelector(getExpenses);

  useEffect(() => {
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
            dispatch(setExpense(!expenses ? [] : expenses, 'expenses/setExpense'));
            dispatch(setRootBalance(+balance, 'balances/setRootBalance'));

            // TODO: Redirect to home page
            navigation.navigate('Index', { screen: 'Home' });
          });
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  const handleRemoveExpenseAction = async key => {
    const result = await deviceStorage.removeExpenseFromLocal(key);

    if (result) dispatch(removeExpense(key, 'expenses/removeExpenses'));

    showMessage({
      message: 'Successfully removed.',
      type: 'success'
    });
  };

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

      <View style={styles.wrapper}>
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

          <SwipeListView
            data={allExpense}
            renderItem={(data, rowMap) => (
              <View>
                <ExpenseCard
                  keyExtractor={data.item.expense_id}
                  icon={data.item.icon}
                  amount={data.item.amount}
                  when={data.item.when}
                  description={data.item.description}
                  navigation={navigation}
                />
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View
                keyExtractor={data.item.expense_id}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 10
                }}
              >
                <TouchableOpacity
                  onPress={() => handleRemoveExpenseAction(data.item.key)}
                  style={{
                    padding: 10
                  }}
                >
                  <TrashIcon />
                </TouchableOpacity>
                <EditExpenseIcon data={data} />
              </View>
            )}
            rightOpenValue={-50}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
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
