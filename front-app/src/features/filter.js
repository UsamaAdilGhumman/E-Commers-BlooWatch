import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  range: 0,
  category: "",
  pageTitle: 'Home Page'
};

// console.log(initialState);
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
    },
    addRange: (state, action) => {
      state.range = action.payload;
    },
    addCategory: (state, action) => {
      state.category = action.payload;
    },
    addPageTitle: (state, action) => {
      // console.log(action.type);
      state.pageTitle = action.payload;
    },
  },
});

export const { addSearch,addRange,addCategory,addPageTitle } = filterSlice.actions;

export default filterSlice.reducer;
