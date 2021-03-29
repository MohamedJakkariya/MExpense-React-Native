import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import BackArrowIcon from '../../assets/icons/arrow-left-circle.svg';
import ExpenseCard from '../components/ExpenseCard';
import StaticAddButton from '../components/StaticAddButton';

import { getExpenses, removeExpense } from '../redux/reducers/expenseReducer';

import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import { showMessage } from 'react-native-flash-message';
import deviceStorage from '../services/deviceStorage';

const HistroyScreen = ({ navigation }) => {
  const data = useSelector(getExpenses);

  const dispatch = useDispatch();

  const handleRemoveExpenseAction = async key => {
    const result = await deviceStorage.removeExpenseFromLocal(key);

    if (result) dispatch(removeExpense(key, 'expenses/removeExpenses'));

    showMessage({
      message: 'Successfully removed.',
      type: 'success'
    });
  };

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
        data={data}
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
            <TouchableOpacity
              onPress={() => alert('edited')}
              style={{
                zIndex: 10,
                padding: 10
              }}
            >
              <EditIcon />
            </TouchableOpacity>
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
