import React from 'react';

import CoffeIcon from '../../assets/icons/coffee.svg';
import CarotIcon from '../../assets/icons/downCaret.svg';
import TagIcon from '../../assets/icons/tag.svg';
import BookMarkIcon from '../../assets/icons/bookmark.svg';
import TruckIcon from '../../assets/icons/truck.svg';
import CardIcon from '../../assets/icons/credit-card.svg';
import CartIcon from '../../assets/icons/shopping-cart.svg';
import BagIcon from '../../assets/icons/shopping-bag.svg';

export const IconViewOption = [
  {
    value: 'DEFAULT',
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
    value: 'COFFEE',
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
    value: 'TAG',
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
    value: 'BOOKMARK',
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
    value: 'TRUCK',
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
    value: 'CARD',
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
    value: 'SHOPPING',
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
    value: 'BAG',
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
