import { createSlice } from '@reduxjs/toolkit';

import expenseJson from '../../json/expenses.json';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: expenseJson,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.today.unshift(action.payload);
    },
    removeExpense: (state, action) => {}
  }
});

export const { addExpense, removeExpense } = expenseSlice.actions;

export const getExpenses = state => state.expenses;

export default expenseSlice.reducer;
