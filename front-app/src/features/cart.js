import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  items: '',
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state) => {
      state.items++;
    },
    deleteItem:(state) => {
      state.items--;
    },
    clearItem:(state) => {
      state.items = '';
    }
  },
});

export const { addItem,deleteItem,clearItem } = cartSlice.actions;

export default cartSlice.reducer;
