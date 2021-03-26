import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    summary: {
      balance_amount: 0
    },
    expenses: []
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },
    removeExpense: (state, action) => {},
    setExpense: (state, action) => state(action.payload)
  }
});

export const { addExpense, removeExpense, setExpense } = expenseSlice.actions;

export const getExpenses = state => state.expenses;

export default expenseSlice.reducer;
