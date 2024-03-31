import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    let initialToken = null;
    let initialEmail = null;

    try {
      const storedToken = localStorage.getItem('token');
      const storedEmail = localStorage.getItem('email');

      if (storedToken) {
        const tokenData = JSON.parse(storedToken);
        if (tokenData.expires > Date.now()) {
          initialToken = tokenData.value;
        } else {
          localStorage.removeItem('token');
        }
      }

      if (storedEmail) {
        const emailData = JSON.parse(storedEmail);
        if (emailData.expires > Date.now()) {
          initialEmail = emailData.value;
        } else {
          localStorage.removeItem('email');
        }
      }
    } catch (error) {
      console.error('Error parsing JSON data from localStorage:', error);
      // Handle the error (e.g., fallback to default values)
    }

    return {
      token: initialToken,
      email: initialEmail,
    };
  },
  reducers: {
    setToken: (state, action) => {
      if (action.payload !== null) {
        state.token = action.payload; // Accessing the 'value' property of the payload
      } else {
        state.token = null;
        console.log("teken Deleted ");
      }
    },
    setEmail: (state, action) => {
      if (action.payload !== null) {
        state.email = action.payload; // Accessing the 'value' property of the payload
      } else {
        state.email = null;
      }
    }
  }
  
});

export const { setToken, setEmail } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectEmail = (state) => state.auth.email;
export default authSlice.reducer;