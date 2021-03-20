import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';

import BackArrowIcon from '../../assets/icons/arrow-left-circle.svg';
import ExpenseCard from '../components/HomeScreen/ExpenseCard';

import color from '../constants/color';

const HistroyScreen = ({ navigation }) => {
  return (
    <View style={styles.screen_wrapper}>
      <TouchableOpacity style={styles.back_button} onPress={() => navigation.goBack()}>
        <BackArrowIcon />
      </TouchableOpacity>

      <ScrollView style={styles.history_wrapper}>
        <View style={styles.day_wrapper}>
          <Text
            style={[
              styles.fontBasic,
              {
                color: color.primary,
                fontSize: 22,
                textAlign: 'right',
                fontWeight: 'bold',
                paddingRight: 5
              }
            ]}
          >
            Today
          </Text>
          <ExpenseCard icon='coffee' amount={41.0} time='11.06' notes='cafe bar-hostel' />
          <ExpenseCard icon='bag' amount={20.0} time='10.02' notes='online order-cake' />
          <ExpenseCard icon='cart' amount={24.0} time='9.30' notes='shipping eye-glasses' />
          <ExpenseCard icon='bag' amount={15.5} time='7.12' notes='night dinner' />
        </View>

        <View style={styles.day_wrapper}>
          <Text
            style={[
              styles.fontBasic,
              {
                color: color.primary,
                fontSize: 22,
                // paddingBottom: 10,
                textAlign: 'right',
                fontWeight: 'bold',
                paddingRight: 5
                // backgroundColor: 'red'
              }
            ]}
          >
            Yesterday
          </Text>
          <ExpenseCard icon='coffee' amount={41.0} time='11.06' notes='' />
          <ExpenseCard icon='bag' amount={20.0} time='10.02' notes='online order-cake' />
        </View>
      </ScrollView>
    </View>
  );
};

export default HistroyScreen;

const styles = StyleSheet.create({
  back_button: {
    // backgroundColor: 'red',
    paddingTop: 15,
    paddingLeft: 10
  },
  day_wrapper: {},
  history_wrapper: {
    margin: 10
  },
  screen_wrapper: {
    flex: 10
  }
});
