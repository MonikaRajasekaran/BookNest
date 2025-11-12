import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkInDate: null,
  checkOutDate: null,
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDates: (state, action) => {
      state.checkInDate = action.payload.checkInDate;
      state.checkOutDate = action.payload.checkOutDate;
    },
  },
});

export const { setDates } = dateSlice.actions;
export default dateSlice.reducer;
