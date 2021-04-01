import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Modal, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { updateExpense, getExpenses } from '../redux/reducers/expenseReducer';
import ModalDropdown from 'react-native-modal-dropdown';
import { showMessage } from 'react-native-flash-message';

import { IconViewOption } from '../utility';

import RupeeRedIcon from '../../assets/icons/money_red.svg';
import EditIcon from '../../assets/icons/edit.svg';

import icon from '../constants/icons';
import color from '../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import deviceStorage from '../services/deviceStorage';

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

const EditExpenseIcon = ({ data }) => {
  const [state, setState] = useState({
    amount: `${data.amount}`,
    note: data.item.description,
    icon: data.item.icon,
    modalVisible: false
  });

  const dispatch = useDispatch();
  const allExpense = useSelector(getExpenses);

  /**
   * @param data - object of the expense to be updated
   */
  const handleExpenseEditAction = async () => {
    const findExpense = allExpense[data.index];

    const updatedExpense = {
      key: findExpense.key,
      icon: state.icon,
      amount: +state.amount,
      when: findExpense.when,
      description: state.note
    };

    // console.log('update :: ', findExpense);

    dispatch(updateExpense(updatedExpense, 'expenses/updateExpense'));

    const result = await deviceStorage.updateExpenseFromLocal(updatedExpense);

    if (result)
      showMessage({
        message: 'Successfully updated.',
        type: 'success'
      });

    // TODO: Close the modal
    setState({
      ...state,
      modalVisible: false
    });
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
          onPress={() =>
            setState({
              amount: `${data.item.amount}`,
              icon: data.item.icon,
              note: data.item.description,
              modalVisible: !state.modalVisible
            })
          }
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setState({
            ...state,
            modalVisible: !state.modalVisible
          });
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
                  value={state.amount}
                  onChangeText={e =>
                    setState({
                      ...state,
                      amount: e
                    })
                  }
                  keyboardType='number-pad'
                  autoFocus={!!state.modalVisible}
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
                defaultValue={state.icon}
                onSelect={e => setState({ ...state, icon: dropdownOption[e] })}
                textStyle={{
                  fontSize: 16
                }}
                renderRightComponent={() => IconViewOption.filter(i => i.value === state.icon)[0].icon}
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
                value={state.note}
                onChangeText={e =>
                  setState({
                    ...state,
                    note: e
                  })
                }
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
                onPress={() => setState({ ...state, modalVisible: !state.modalVisible })}
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
                onPress={handleExpenseEditAction}
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

export default EditExpenseIcon;

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
