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
import PlusIcon from '../../assets/icons/plus.svg';
import MoneyRedIcon from '../../assets/icons/money_red.svg';
import MoneyGreenIcon from '../../assets/icons/money_green.svg';
import InfoIcon from '../../assets/icons/info.svg';
import moment from 'moment';
import icons from '../constants/icons';

const ExpenseCard = ({ icon, amount, when, description }) => {
  // TODO: Set icon selector
  const iconSelector = {
    coffee: <CoffeeIcon />,
    bag: <BagIcon />,
    default: <BookMarkIcon />,
    bookmark: <BookMarkIcon />,
    tag: <TagIcon />,
    truck: <TruckIcon />,
    card: <CardIcon />,
    shopping: <CartIcon />,
    info: <InfoIcon />
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
              color: icon === icons.CARD ? color.green : color.red,
              textAlign: 'center'
            }}
          >
            {icon === icons.CARD ? <PlusIcon /> : <MinusIcon />}
            {icon === icons.CARD ? <MoneyGreenIcon widht={20} height={20} /> : <MoneyRedIcon width={20} height={20} />}

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
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.timeText}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 13,
            color: color.white,
            textAlign: 'center',
            paddingHorizontal: 10
          }}
        >
          {moment(new Date(when)).startOf('m').fromNow()}
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
    flex: 1.3
  },
  minusAmount: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
