import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adult: null,
  child: null,
  infant: null,
};

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.adult = action.payload.adult;
      state.child = action.payload.child;
      state.infant = action.payload.infant;

    },
  },
});

export const { setCount } = guestSlice.actions;
export default guestSlice.reducer;
