import { createSlice } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
  name: 'balance',
  initialState: 0,
  reducers: {
    setBalance: (state, action) => (state = action.payload),

    addBalance: (state, action) => (state = action.payload),
    subtractAmount: (state, action) => {},
    resetAmount: (state, action) => {
      state = 0;
    }
  }
});

export const { addBalance, subtractAmount, resetAmount, setBalance } = balanceSlice.actions;

export const getBalance = state => state.balance;

export default balanceSlice.reducer;
