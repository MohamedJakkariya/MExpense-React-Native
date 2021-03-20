import React, { createContext, useState } from 'react';
import expenseJson from '../json/expenses.json';

export const Context = createContext();

export const GlobalContext = ({ children }) => {
  const [expense, setExpense] = useState([
    {
      icon: 'coffee',
      amount: 30.0,
      time: '11.06',
      notes: 'cafe bar-hostel'
    },
    {
      icon: 'bag',
      amount: 24.0,
      time: '10.02',
      notes: 'online order-cake'
    }
  ]);

  return <Context.Provider value={expense}>{children}</Context.Provider>;
};

export default GlobalContext;
