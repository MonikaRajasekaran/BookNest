import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomID: null,
  bookingId: null,
  totalFees: null,
  customerDetails:null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayment: (state, action) => {
        console.log('Setting payment details:', action.payload);
      state.roomID = action.payload.roomID;
      state.bookingId = action.payload.bookingId;
      state.totalFees = action.payload.totalFees;
      state.customerDetails = action.payload.customerDetails;
    },
  },
});

export const { setPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
