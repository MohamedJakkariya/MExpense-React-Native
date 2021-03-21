import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import color from '../constants/color';

import UserIcon from '../../assets/icons/User Icon.svg';
import MoneyIcon from '../../assets/icons/money.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import ExpenseCard from '../components/ExpenseCard';
import { useSelector } from 'react-redux';
import { getExpenses } from '../redux/reducers/expenseReducer';

export default function HomeScreen() {
  const expenses = useSelector(getExpenses);

  return (
    <ScrollView style={styles.wrapper}>
      <StatusBar backgroundColor={color.primary} />
      <View style={styles.topContainer}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomText}>
            Hello
            <Text style={styles.welcomTextHighLight}> MD</Text>,
          </Text>
          <TouchableOpacity>
            <UserIcon style={styles.UserIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceBox}>
          <View style={styles.balanceBoxTop}>
            <Text
              style={{
                color: color.white,
                fontWeight: 'bold',
                fontSize: 22,
                paddingLeft: 15
              }}
            >
              Balance
            </Text>
            <TouchableOpacity>
              <PlusIcon
                style={{
                  marginRight: 15
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.balanceBoxTop, styles.balanceBoxBottom]}>
            <Text
              style={{
                paddingLeft: 15,
                paddingBottom: 15
              }}
            >
              <MoneyIcon width={20} height={20} />
              <Text
                style={{
                  fontSize: 50,
                  color: color.white,
                  fontWeight: 'bold'
                }}
              >
                100.00
              </Text>
            </Text>

            <View
              style={{
                paddingRight: 15,
                paddingBottom: 15
              }}
            >
              <Text
                style={{
                  color: color.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 22
                }}
              >
                02
              </Text>
              <Text
                style={{
                  color: color.white,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                FEB
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text
          style={[
            styles.fontBasic,
            {
              color: color.primary,
              fontSize: 22,
              paddingBottom: 15
            }
          ]}
        >
          Recent expense
        </Text>
        {expenses.today.map(expense => (
          <ExpenseCard
            icon={expense.icon}
            key={expense.id}
            amount={expense.amount}
            time={expense.time}
            notes={expense.notes}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 2,
    backgroundColor: color.white,
    margin: 10,
    marginTop: 20
  },
  balanceBox: {
    backgroundColor: color.primary,
    borderRadius: 12,
    marginHorizontal: 10,
    paddingTop: 15
  },
  balanceBoxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  balanceBoxBottom: {
    flex: 1
  },

  fontBasic: {
    color: color.white,
    fontWeight: 'bold'
  },

  topContainer: {
    flex: 1
  },

  UserIcon: {
    marginRight: 15
  },

  welcomeBox: {
    flex: 1,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  welcomText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 15,
    fontStyle: 'italic',
    color: color.primary,
    paddingVertical: 15
  },
  welcomTextHighLight: {
    color: color.green
  },
  wrapper: {
    flex: 1,
    backgroundColor: color.white
  }
});
