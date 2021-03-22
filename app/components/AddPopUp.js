import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import color from '../constants/color';

import RupeeRedIcon from '../../assets/icons/money_red.svg';
import { IconViewOption } from '../utility';

// TODO: Define dropdown options
const dropdownOption = ['Default', 'Coffee', 'Tag', 'Bookmark', 'Truck', 'Card', 'Shopping', 'Bag'];

const AddPopUp = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [amount, setAmount] = useState(null);
  const [notes, setNotes] = useState('');
  const [iconOption, setIconOption] = useState(dropdownOption[0]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
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
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },

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

export default AddPopUp;
