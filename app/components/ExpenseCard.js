import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import color from '../constants/color';

import CoffeeIcon from '../../assets/icons/coffee.svg';
import TagIcon from '../../assets/icons/tag.svg';
import BookMarkIcon from '../../assets/icons/bookmark.svg';
import TruckIcon from '../../assets/icons/truck.svg';
import CardIcon from '../../assets/icons/credit-card.svg';
import CartIcon from '../../assets/icons/shopping-cart.svg';
import BagIcon from '../../assets/icons/shopping-bag.svg';
import MinusIcon from '../../assets/icons/minus.svg';
import MoneyIcon from '../../assets/icons/money_red.svg';

const ExpenseCard = ({ icon, amount, time, notes }) => {
  // TODO: Set icon selector
  const iconSelector = {
    coffee: <CoffeeIcon />,
    bag: <BagIcon />,
    default: <BookMarkIcon />,
    bookmark: <BookMarkIcon />,
    tag: <TagIcon />,
    truck: <TruckIcon />,
    card: <CardIcon />,
    shopping: <CartIcon />
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.coffeeIcon}>{iconSelector[icon.toLowerCase()]}</View>

      <View style={styles.minusAmount}>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              color: color.red,
              // marginLeft: 15,
              textAlign: 'center'
            }}
          >
            <MinusIcon />
            <MoneyIcon width={20} height={20} />
            {amount}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: color.white,
              opacity: 0.5,
              textAlign: 'center',
              paddingLeft: 15
            }}
          >
            {notes}
          </Text>
        </View>
      </View>

      <View style={styles.timeText}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: color.white
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,
    backgroundColor: color.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  coffeeIcon: {
    flex: 0.5,
    paddingLeft: 25
  },
  timeText: {
    flex: 1.4,
    textAlign: 'right'
  },
  minusAmount: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
