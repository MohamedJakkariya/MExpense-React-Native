import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.unshift(action.payload);
    },
    removeExpense: (state, action) => (state = state.filter(expense => expense.key !== action.payload)),
    setExpense: (state, action) => (state = action.payload),
    updateExpense: (state, action) => {
      const index = state.findIndex(expense => expense.key === action.payload.key);

      state[index] = action.payload;

      return state;
    }
  }
});

export const { addExpense, removeExpense, setExpense, updateExpense } = expenseSlice.actions;

export const getExpenses = state => state.expenses;

export default expenseSlice.reducer;
