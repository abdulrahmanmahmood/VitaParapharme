// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: storedWishlist,
  reducers: {
    addToWishlist: (state, action) => {
      console.log('Adding to wishlist:', action.payload);
      state.push(action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    removeFromWishlist: (state, action) => {
      console.log('Removing from wishlist:', action.payload);
      const updatedState = state.filter((product) => product.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(updatedState));
      return updatedState;
    },
    clearWishlist: (state) => {
      localStorage.removeItem('wishlist'); // Clear Wishlist data in local storage
      return [];
    },
  },
});



export const { addToWishlist, removeFromWishlist , clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;

