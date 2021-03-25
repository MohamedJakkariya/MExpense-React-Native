import React from 'react';

import CoffeIcon from '../../assets/icons/coffee.svg';
import CarotIcon from '../../assets/icons/downCaret.svg';
import TagIcon from '../../assets/icons/tag.svg';
import BookMarkIcon from '../../assets/icons/bookmark.svg';
import TruckIcon from '../../assets/icons/truck.svg';
import CardIcon from '../../assets/icons/credit-card.svg';
import CartIcon from '../../assets/icons/shopping-cart.svg';
import BagIcon from '../../assets/icons/shopping-bag.svg';

import icons from '../constants/icons';

export const IconViewOption = [
  {
    value: icons.DEFAULT,
    icon: (
      <CarotIcon
        width={15}
        height={15}
        style={{
          marginLeft: 15
        }}
      />
    )
  },
  {
    value: icons.COFFEE,
    icon: (
      <CoffeIcon
        width={25}
        height={25}
        style={{
          marginLeft: 15
        }}
      />
    )
  },
  {
    value: icons.TAG,
    icon: (
      <TagIcon
        width={25}
        height={25}
        style={{
          marginLeft: 15
        }}
      />
    )
  },
  {
    value: icons.BOOKMARK,
    icon: (
      <BookMarkIcon
        width={25}
        height={25}
        style={{
          marginLeft: 15
        }}
      />
    )
  },
  {
    value: icons.TRUCK,
    icon: (
      <TruckIcon
        width={25}
        height={25}
        style={{
          marginLeft: 15
        }}
      />
    )
  },
  {
    value: icons.CARD,
    icon: (
      <CardIcon
        width={25}
        height={25}
        style={{
          marginLeft: 15
        }}
      />
    )
  },
  {
    value: icons.SHOPPING,
    icon: (
      <CartIcon
        width={25}
        height={25}
        style={{
          marginLeft: 15
        }}
      />
    )
  },
  {
    value: icons.BAG,
    icon: (
      <BagIcon
        width={25}
        height={25}
        style={{
          marginLeft: 15
        }}
      />
    )
  }
];

/**
 * @description for validation proper email
 */
export const validateEmail = async email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
