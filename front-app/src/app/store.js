import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth'
import cartReducer  from '../features/cart';
import filterReducer from '../features/filter';
import productsReducer from '../features/products';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter:filterReducer,
    cart:cartReducer,
    products: productsReducer
  },
})

export default store;