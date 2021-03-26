import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Modal, Text, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import RupeeRedIcon from '../../assets/icons/money_red.svg';
import PlusIcon from '../../assets/icons/plus.svg';

import color from '../constants/color';
import { addBalance, getBalance, resetBalance } from '../redux/reducers/balanceReducer';

import uri from '../constants';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

const AddBalance = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState(null);
  const [balanceButtonText, setBalanceButtonText] = useState('CANCEL');

  const existBalance = useSelector(getBalance);
  const dispatch = useDispatch();

  const hanldeAddBalanceButton = async () => {
    // TODO: Close the modal
    setModalVisible(!modalVisible);

    // TODO: Made updated balance
    const updated_balance = existBalance + +balance;

    // TODO: Update the new balance
    dispatch(addBalance(updated_balance, 'balances/addBalance'));

    try {
      const token = await deviceStorage.getData('auth_token');
      const response = await axios({
        method: 'post',
        url: `${uri.DEVELOPMENT_URL}/balance/update`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        data: JSON.stringify({
          balance: updated_balance
        })
      });

      if (response.data.result)
        showMessage({
          message: response.data.message,
          type: 'success'
        });
    } catch (e) {
      console.log(e);
      showMessage({
        message: e.response.data.message,
        type: 'warning'
      });
    }

    // TODO: reset amount
    setBalance(null);
  };

  const hanldeResetBalanceButton = async () => {
    // TODO: Update the new balance
    dispatch(resetBalance(0, 'balances/resetBalance'));

    // TODO: Close the modal
    setModalVisible(!modalVisible);

    try {
      const token = await deviceStorage.getData('auth_token');
      const response = await axios({
        method: 'post',
        url: `${uri.DEVELOPMENT_URL}/balance/update`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        data: JSON.stringify({
          balance: 0
        })
      });

      if (response.data.result)
        showMessage({
          message: response.data.message,
          type: 'success'
        });
    } catch (e) {
      console.log(e);
      showMessage({
        message: e.response.data.message,
        type: 'warning'
      });
    }

    // TODO: reset amount
    setBalance(null);
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
                position: 'relative',
                width: '70%'
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
                value={balance}
                onChangeText={e => {
                  setBalance(e);
                  e.length > 0 ? setBalanceButtonText('ADD') : setBalanceButtonText('CANCEL');
                }}
                keyboardType='number-pad'
                autoFocus={!!modalVisible}
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
                onPress={hanldeResetBalanceButton}
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
                onPress={hanldeAddBalanceButton}
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
