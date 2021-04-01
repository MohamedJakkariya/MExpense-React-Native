import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';

import deviceStorage from '../services/deviceStorage';

import { removeExpense } from '../redux/reducers/expenseReducer';

import TrashIcon from '../../assets/icons/trash.svg';

const DeleteExpenseIcon = ({ data }) => {
  const dispatch = useDispatch();

  const showAlert = key =>
    Alert.alert('Confirmation', 'Did you want to delete your expense ?', [
      {
        text: 'OK',
        onPress: async () => await handleRemoveExpenseAction(key),
        style: 'default'
      },
      {
        text: 'CANCEL',
        style: 'cancel'
      }
    ]);

  const handleRemoveExpenseAction = async key => {
    const result = await deviceStorage.removeExpenseFromLocal(key);

    if (result) dispatch(removeExpense(key, 'expenses/removeExpenses'));

    showMessage({
      message: 'Successfully removed.',
      type: 'success'
    });
  };

  return (
    <TouchableOpacity
      onPress={() => showAlert(data.item.key)}
      style={{
        padding: 10
      }}
    >
      <TrashIcon />
    </TouchableOpacity>
  );
};

export default DeleteExpenseIcon;
