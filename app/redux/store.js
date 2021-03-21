import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './reducers/balanceReducer';
import expenseReducer from './reducers/expenseReducer';

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    balance: balanceReducer
  }
});

export default store;
