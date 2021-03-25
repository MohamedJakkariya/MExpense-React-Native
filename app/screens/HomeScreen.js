import React from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';

import color from '../constants/color';

import ExpenseCard from '../components/ExpenseCard';
import { useSelector } from 'react-redux';
import { getExpenses } from '../redux/reducers/expenseReducer';
import StaticAddButton from '../components/StaticAddButton';
import BalanceCard from '../components/BalanceCard';

export default function HomeScreen() {
  const expenses = useSelector(getExpenses);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: -1
      }}
    >
      <StaticAddButton />
      <ScrollView style={styles.wrapper}>
        <StatusBar backgroundColor={color.primary} />

        <BalanceCard />

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
          {expenses.data.today.map(expense => (
            <ExpenseCard
              icon={expense.icon}
              key={expense.id}
              amount={expense.amount}
              when={expense.when}
              notes={expense.notes}
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
