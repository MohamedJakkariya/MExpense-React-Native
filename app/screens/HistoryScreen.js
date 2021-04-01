import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import BackArrowIcon from '../../assets/icons/arrow-left-circle.svg';
import ExpenseCard from '../components/ExpenseCard';
import StaticAddButton from '../components/StaticAddButton';

import { getExpenses } from '../redux/reducers/expenseReducer';

import EditExpenseIcon from '../components/EditExpenseIcon';
import DeleteExpenseIcon from '../components/DeleteExpenseIcon';

const HistroyScreen = ({ navigation }) => {
  const allExpense = useSelector(getExpenses);

  return (
    <View style={styles.screen_wrapper}>
      <StaticAddButton />

      <TouchableOpacity style={styles.back_button} onPress={() => navigation.goBack()}>
        <BackArrowIcon />
      </TouchableOpacity>

      <SwipeListView
        style={{
          marginTop: 10
        }}
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
            <DeleteExpenseIcon data={data} />
            <EditExpenseIcon data={data} />
          </View>
        )}
        rightOpenValue={-50}
      />
    </View>
  );
};

export default HistroyScreen;

const styles = StyleSheet.create({
  back_button: {
    paddingTop: 15,
    paddingLeft: 0
  },
  history_wrapper: {
    margin: 10
  },
  screen_wrapper: {
    flex: 10,
    zIndex: -1,
    padding: 10
  }
});
