import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '../features/dateSlice';
import guestReducer from '@/features/guestSlice';
import searchReducer from '@/features/searchSlice';
import paymentReducer from '@/features/paymentSlice'
import categoryReducer from '@/features/categorySlice';


const store = configureStore({
  reducer: {
    date: dateReducer,
    guest: guestReducer,
    search : searchReducer,
    payment : paymentReducer,
    category: categoryReducer,
  },
});

export default store;
