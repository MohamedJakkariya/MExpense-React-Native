import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Modal, Text, Pressable, TextInput } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';

import AddStaticIcon from '../../assets/icons/static_add_button.svg';
import RupeeRedIcon from '../../assets/icons/money_red.svg';

import color from '../constants/color';

import { IconViewOption } from '../utility';
import { addExpense } from '../redux/reducers/expenseReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addBalance, getBalance } from '../redux/reducers/balanceReducer';

// TODO: Define dropdown options
const dropdownOption = ['Default', 'Coffee', 'Tag', 'Bookmark', 'Truck', 'Card', 'Shopping', 'Bag'];

const StaticAddButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(null);
  const [notes, setNotes] = useState('');
  const [iconOption, setIconOption] = useState(dropdownOption[0]);

  const existBalance = useSelector(getBalance);
  const dispatch = useDispatch();

  const hanldeAddExpenseButton = () => {
    dispatch(
      addExpense(
        {
          id: Math.random(3),
          icon: iconOption,
          amount: +amount,
          time: moment().format('LT'),
          notes
        },
        'balance/addExpense'
      )
    );

    // TODO: Update the new balance
    dispatch(addBalance(existBalance - +amount, 'balance/addBalance'));

    // TODO: Close the modal
    setModalVisible(!modalVisible);

    // TODO: reset Text, amount, iconOption
    setNotes('');
    setAmount(null);
    setIconOption('Default');
  };

  return (
    <View
      style={{
        width: 55,
        height: 55,
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
        right: 20
      }}
    >
      <View
        style={{
          width: 55,
          height: 55,
          position: 'absolute',
          zIndex: 1,
          bottom: 20,
          right: 20
        }}
      >
        <TouchableOpacity
          style={{
            elevation: 6,
            borderRadius: 100,
            paddingTop: 2,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setModalVisible(true)}
        >
          <AddStaticIcon style={{}} />
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
            // backgroundColor: 'rbga(20, 69, 107, 0.2)',
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
                onPress={hanldeAddExpenseButton}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StaticAddButton;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 300,
    // height: ,
    padding: 15,
    // alignItems: 'center',
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
