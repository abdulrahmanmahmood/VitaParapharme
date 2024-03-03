// authSlice.js
/*import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;*/

// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const intialEmail = localStorage.getItem('email');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken || null,
    email: intialEmail || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setEmail: (state , action) => {
      state.email = action.payload;
    }
  },
});

export const { setToken  , setEmail} = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectEmail = (state) => state.auth.email;
export default authSlice.reducer;