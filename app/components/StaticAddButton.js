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
        bottom: 25,
        right: 25,
        elevation: 1
        // bottom: 20,
        // right: 20
      }}
    >
      <TouchableOpacity>
        <AddStaticIcon />
      </TouchableOpacity>
    </View>
  );
};

export default StaticAddButton;

const styles = StyleSheet.create({});
