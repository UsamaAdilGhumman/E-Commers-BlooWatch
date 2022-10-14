import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
};

// console.log(initialState);
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.productsList = action.payload;
    }
  },
});

export const { addProducts } = productsSlice.actions;

export default productsSlice.reducer;
