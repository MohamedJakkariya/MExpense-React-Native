import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Modal, Text, Pressable, TextInput } from 'react-native';

import AddStaticIcon from '../../assets/icons/static_add_button.svg';
import RupeeRedIcon from '../../assets/icons/money_red.svg';

import color from '../constants/color';

const SettingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [balance, setBalance] = useState(null);

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
          <AddStaticIcon />
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
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
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
                  onChangeText={setBalance}
                  keyboardType='number-pad'
                  autoFocus={!!modalVisible}
                />
              </View>
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
                    width: 80
                  }
                ]}
                onPress={() => console.log('reset clicked')}
              >
                <Text style={styles.textStyle}>RESET</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  styles.addButton,
                  {
                    width: 80
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
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 200,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center'
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
