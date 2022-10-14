import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
 

const initialState = {
  token: "",
  user: "",
};


const token = localStorage.getItem('myToken');
// console.log(token);
if(token){
  const decoded = jwt_decode(token);
  const expiresIn = new Date(decoded.exp*1000);
  if(new Date() > expiresIn){
    localStorage.removeItem('myToken');
  }else{
    initialState.token = token;
    const {user} = decoded
    initialState.user = user;
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addToken,addUser } = authSlice.actions;

export default authSlice.reducer;
