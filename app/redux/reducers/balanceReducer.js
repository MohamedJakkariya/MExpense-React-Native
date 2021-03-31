import { createSlice } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
  name: 'balances',
  initialState: 0,
  reducers: {
    setRootBalance: (state, action) => (state = action.payload)
  }
});

export const { setRootBalance } = balanceSlice.actions;

export const getBalance = state => state.balances;

export default balanceSlice.reducer;
