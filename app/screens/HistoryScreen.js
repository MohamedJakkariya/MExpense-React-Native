import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert, Modal, Text, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import ModalDropdown from 'react-native-modal-dropdown';

import BackArrowIcon from '../../assets/icons/arrow-left-circle.svg';
import ExpenseCard from '../components/ExpenseCard';
import StaticAddButton from '../components/StaticAddButton';

import { getExpenses, removeExpense, updateExpense } from '../redux/reducers/expenseReducer';

import { showMessage } from 'react-native-flash-message';
import deviceStorage from '../services/deviceStorage';

import { IconViewOption } from '../utility';

import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import RupeeRedIcon from '../../assets/icons/money_red.svg';

import color from '../constants/color';

import icon from '../constants/icons';

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

const HistroyScreen = ({ navigation }) => {
  const [state, setState] = useState({
    amount: null,
    note: '',
    icon: dropdownOption[0],
    modalVisible: false
  });

  const allExpense = useSelector(getExpenses);

  const dispatch = useDispatch();

  /**
   * @param key - string key of the expense to be removed
   */
  const handleRemoveExpenseAction = async key => {
    const result = await deviceStorage.removeExpenseFromLocal(key);

    if (result) dispatch(removeExpense(key, 'expenses/removeExpenses'));

    showMessage({
      message: 'Successfully removed.',
      type: 'success'
    });
  };

  /**
   * @param data - object of the expense to be updated
   */
  const handleExpenseEditAction = async data => {
    const findExpense = allExpense[data.index];

    // setState({
    //   amount: `${findExpense.amount}`,
    //   note: findExpense.description,
    //   icon: findExpense.icon
    // });

    const updatedExpense = {
      key: findExpense.key,
      icon: state.icon,
      amount: +state.amount,
      when: findExpense.when,
      description: state.note
    };

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
            <TouchableOpacity
              onPress={() => handleRemoveExpenseAction(data.item.key)}
              style={{
                padding: 10
              }}
            >
              <TrashIcon />
            </TouchableOpacity>
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
                        renderRightComponent={() =>
                          IconViewOption.filter(i => i.value === state.icon.toUpperCase())[0].icon
                        }
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
                        onPress={() => handleExpenseEditAction(data)}
                      >
                        <Text style={styles.textStyle}>UPDATE</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
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
  },

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
