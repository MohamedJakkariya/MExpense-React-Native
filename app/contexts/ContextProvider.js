import React, { createContext, useState } from 'react';
import expenseJson from '../json/expenses.json';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [expense, setExpense] = useState(expenseJson);

  return <Context.Provider value={[expense, setExpense]}>{children}</Context.Provider>;
};

export default ContextProvider;
