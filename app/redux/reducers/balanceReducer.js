import { createSlice } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
  name: 'balances',
  initialState: 0,
  reducers: {
    setBalance: (state, action) => (state = action.payload),

    addBalance: (state, action) => (state = action.payload),
    subtractBalance: (state, action) => (state = action.payload),
    resetBalance: (state, action) => (state = action.payload)
  }
});

export const { addBalance, subtractBalance, resetBalance, setBalance } = balanceSlice.actions;

export const getBalance = state => state.balances;

export default balanceSlice.reducer;
