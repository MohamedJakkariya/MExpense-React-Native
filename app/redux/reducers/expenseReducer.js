import { createSlice } from '@reduxjs/toolkit';

import expenseJson from '../../json/expenses.json';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: expenseJson,
  reducers: {
    addExpense: (state, action) => {},
    removeExpense: (state, action) => {}
  }
});

export const { addExpense, removeExpense } = expenseSlice.actions;

export const getExpenses = state => state.expense;

export default expenseSlice.reducer;
