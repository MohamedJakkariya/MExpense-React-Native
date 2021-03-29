import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.unshift(action.payload);
    },
    removeExpense: (state, action) => {},
    setExpense: (state, action) => (state = action.payload)
  }
});

export const { addExpense, removeExpense, setExpense } = expenseSlice.actions;

export const getExpenses = state => state.expenses;

export default expenseSlice.reducer;
