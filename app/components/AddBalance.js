import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Modal, Text, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import RupeeRedIcon from '../../assets/icons/money_red.svg';
import PlusIcon from '../../assets/icons/plus.svg';

import color from '../constants/color';
import { getBalance, setRootBalance } from '../redux/reducers/balanceReducer';

import deviceStorage from '../services/deviceStorage';
import { customAlphabet } from 'nanoid/non-secure';
import { addExpense } from '../redux/reducers/expenseReducer';
import icon from '../constants/icons';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

const AddBalance = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState(null);
  const [hints, setHints] = useState(null);
  const [balanceButtonText, setBalanceButtonText] = useState('CANCEL');

  const existBalance = useSelector(getBalance);
  const dispatch = useDispatch();

  const showAlert = () =>
    Alert.alert('Confirmation', 'Did you want to reset your balance ?', [
      {
        text: 'OK',
        onPress: async () => await hanldeBalanceButton(0, 'RESET'),
        style: 'default'
      },
      {
        text: 'CANCEL',
        style: 'cancel'
      }
    ]);

  const hanldeBalanceButton = async (updated_balance, mode) => {
    // TODO: Close the modal
    setModalVisible(!modalVisible);

    if (balanceButtonText === 'CANCEL' && mode === 'UPDATE') return;

    try {
      const token = await deviceStorage.getData('auth_token');

      if (!token) {
        showMessage({
          message: 'Login to continue.',
          type: 'info'
        });
        return navigation.navigate('Login');
      }

      // ! Validation
      if (+updated_balance > 100000)
        return showMessage({
          message: 'Amoung should be less than a lack.',
          type: 'warning'
        });

      // TODO: Update the new balance
      dispatch(setRootBalance(updated_balance, 'balances/setRootBalance'));

      await deviceStorage.storeData('balance', `${updated_balance}`);

      // TODO: Only add the card when adding balance
      if (mode !== 'RESET') {
        const newExpense = {
          key: nanoid().toUpperCase(),
          icon: icon.CARD,
          amount: +balance,
          when: new Date().toISOString(),
          description: hints
        };

        dispatch(addExpense(newExpense, 'expenses/addExpense'));

        await deviceStorage.addExpenseToLocal(newExpense);
      }

      showMessage({
        message: 'Successfully updated.',
        type: 'success'
      });
    } catch (err) {
      showMessage({
        message: "Can't update the balance.",
        type: 'warning'
      });
    }

    // TODO: reset amount
    setBalance(null);
    setBalanceButtonText('CANCEL');
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <PlusIcon
            style={{
              marginRight: 15
            }}
          />
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
                position: 'relative'
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
                  fontSize: 25,
                  fontWeight: 'bold',
                  width: 200,
                  textAlign: 'left'
                }}
                placeholder='0.00'
                value={balance}
                onChangeText={e => {
                  setBalance(e);
                  e.length > 0 ? setBalanceButtonText('ADD') : setBalanceButtonText('CANCEL');
                }}
                keyboardType='number-pad'
                autoFocus={!!modalVisible}
              />
            </View>

            <View>
              <TextInput
                style={{
                  borderColor: color.primary,
                  borderWidth: 1,
                  padding: 5,
                  width: 200,
                  height: 40,
                  marginTop: 10
                }}
                value={hints}
                onChangeText={setHints}
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
                onPress={showAlert}
              >
                <Text style={styles.textStyle}>RESET</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  styles.addButton,
                  {
                    width: 100,
                    marginLeft: 10
                  }
                ]}
                onPress={() => hanldeBalanceButton(existBalance + +balance, 'UPDATE')}
              >
                <Text style={styles.textStyle}>{balanceButtonText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddBalance;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 250,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
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
