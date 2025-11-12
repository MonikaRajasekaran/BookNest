import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listings: []  // This will hold the array of objects
  };
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) => {
        state.listings = action.payload;
      
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
