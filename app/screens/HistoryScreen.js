import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import BackArrowIcon from '../../assets/icons/arrow-left-circle.svg';
import ExpenseCard from '../components/ExpenseCard';
import StaticAddButton from '../components/StaticAddButton';

import { getExpenses } from '../redux/reducers/expenseReducer';

const HistroyScreen = ({ navigation }) => {
  const expenses = useSelector(getExpenses);

  return (
    <View style={styles.screen_wrapper}>
      <StaticAddButton />

      <TouchableOpacity style={styles.back_button} onPress={() => navigation.goBack()}>
        <BackArrowIcon />
      </TouchableOpacity>

      <ScrollView style={styles.history_wrapper}>
        {expenses.map((expense, index) => {
          return (
            <View style={styles.day_wrapper} key={index}>
              <ExpenseCard
                icon={expense.icon}
                amount={expense.amount}
                when={expense.when}
                description={expense.description}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HistroyScreen;

const styles = StyleSheet.create({
  back_button: {
    paddingTop: 15,
    paddingLeft: 10
  },
  day_wrapper: {},
  history_wrapper: {
    margin: 10
  },
  screen_wrapper: {
    flex: 10,
    zIndex: -1
  }
});
