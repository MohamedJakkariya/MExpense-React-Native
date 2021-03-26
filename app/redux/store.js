import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './reducers/balanceReducer';
import expenseReducer from './reducers/expenseReducer';

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    balances: balanceReducer
  }
});

export default store;
