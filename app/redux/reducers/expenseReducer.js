import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.unshift(action.payload);
    },
    removeExpense: (state, action) => (state = state.filter(expense => expense.key !== action.payload)),
    setExpense: (state, action) => (state = action.payload)
  }
});

export const { addExpense, removeExpense, setExpense } = expenseSlice.actions;

export const getExpenses = state => state.expenses;

export default expenseSlice.reducer;
