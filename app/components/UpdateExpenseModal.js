import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Modal, Text, Pressable, TextInput } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { showMessage } from 'react-native-flash-message';

import RupeeRedIcon from '../../assets/icons/money_red.svg';

import color from '../constants/color';

import { IconViewOption } from '../utility';
import { useDispatch } from 'react-redux';
import { updateExpense } from '../redux/reducers/expenseReducer';
import icon from '../constants/icons';
import deviceStorage from '../services/deviceStorage';

import EditIcon from '../../assets/icons/edit.svg';

// TODO: Define dropdown options
const dropdownOption = [
  icon.DEFAULT,
  icon.COFFEE,
  icon.TAG,
  icon.BOOKMARK,
  icon.TRUCK,
  icon.CARD,
  icon.SHOPPING,
  icon.BAG
];

const UpdateExpenseModal = ({ expense }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(expense.amount);
  const [notes, setNotes] = useState(expense.description);
  const [iconOption, setIconOption] = useState(expense.icon);

  const dispatch = useDispatch();

  const handleUpdateExpenseButton = async () => {
    if (!amount) return;

    // TODO: Update the new balance
    // dispatch(subtractBalance(updated_balance, 'balances/subtractBalance'));
    // deviceStorage.storeData('balance', `${updated_balance}`);

    try {
      const token = await deviceStorage.getData('auth_token');

      if (!token) {
        showMessage({
          message: 'Login to continue.',
          type: 'info'
        });
        return navigation.navigate('Login');
      }

      const updatedExpense = {
        key: expense.key,
        icon: iconOption,
        amount: +amount,
        when: expense.when,
        description: notes
      };

      dispatch(updateExpense(updatedExpense, 'expenses/updateExpense'));

      const result = await deviceStorage.updateExpenseFromLocal(updatedExpense);

      if (result)
        showMessage({
          message: 'Successfully updated.',
          type: 'success'
        });
    } catch (e) {
      console.log('err :: ', e);
      showMessage({
        message: 'Something went wrong.',
        type: 'warning'
      });
    }
    // TODO: Close the modal
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          style={{
            borderRadius: 100,
            paddingTop: 2,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setModalVisible(true)}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            height: '100%',
            justifyContent: 'center'
          }}
        >
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  position: 'relative',
                  width: '50%'
                }}
              >
                <RupeeRedIcon
                  style={{
                    position: 'absolute',
                    top: 15,
                    left: 15,
                    color: 'red'
                  }}
                />
                <TextInput
                  inlineImageLeft='search-icon'
                  style={{
                    borderColor: color.primary,
                    borderWidth: 1,
                    padding: 10,
                    paddingLeft: 40,
                    fontSize: 22,
                    fontWeight: 'bold',
                    width: '100%',
                    textAlign: 'left'
                  }}
                  placeholder='0.00'
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType='number-pad'
                  autoFocus={!!modalVisible}
                />
              </View>

              <ModalDropdown
                options={dropdownOption}
                style={{
                  width: '48.5%',
                  height: 55,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                defaultValue={iconOption}
                onSelect={e => setIconOption(dropdownOption[e])}
                textStyle={{
                  fontSize: 16
                }}
                renderRightComponent={() => IconViewOption.filter(i => i.value === iconOption.toUpperCase())[0].icon}
                defaultIndex={0}
                dropdownTextHighlightStyle={{
                  color: color.red
                }}
              />
            </View>

            <View>
              <TextInput
                style={{
                  borderColor: color.primary,
                  borderWidth: 1,
                  padding: 5,
                  width: '100%',
                  marginVertical: 3
                }}
                value={notes}
                onChangeText={setNotes}
                placeholder='Enter hints ...'
                multiline={true}
                numberOfLines={3}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-around'
              }}
            >
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  {
                    width: 100
                  }
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>CANCEL</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  styles.addButton,
                  {
                    width: 100
                  }
                ]}
                onPress={handleUpdateExpenseButton}
              >
                <Text style={styles.textStyle}>UPDATE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateExpenseModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 300,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: color.red
  },
  addButton: {
    backgroundColor: color.green
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
