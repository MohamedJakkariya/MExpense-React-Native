import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddPopUp from '../components/AddPopUp';

const SettingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red'
      }}
    >
      <AddPopUp />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
