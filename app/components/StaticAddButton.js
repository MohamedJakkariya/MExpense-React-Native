import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import AddStaticIcon from '../../assets/icons/static_add_button.svg';

const StaticAddButton = () => {
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
      <TouchableOpacity
        style={{
          elevation: 6,
          borderRadius: 100,
          paddingTop: 2,

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => alert('clicked!')}
      >
        <AddStaticIcon style={{}} />
      </TouchableOpacity>
    </View>
  );
};

export default StaticAddButton;

const styles = StyleSheet.create({});
