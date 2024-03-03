import { configureStore } from '@reduxjs/toolkit';
import translationSlice from './slices/Translate-slice';
import ProductSlice from './slices/Product-slice';
//import WishlistSlice from './slices/Wishlist-slice';
import cartSlice from './slices/Cart-slice';
import SearchSlice from './slices/Search-slice';
import AuthSlice from './slices/Auth-slice';
import UserSlice from './slices/User-slice';
//import WishlistSlice from './slices/Wishlist-slice';
import WishlistSlice from './slices/Wishlist-slice';

const store = configureStore({
  reducer: {
    translation: translationSlice,
    products : ProductSlice,
    /*wishlist: WishlistSlice,*/
   // wishlist: WishlistSlice, 
    cart: cartSlice,
    search: SearchSlice,
    auth: AuthSlice,
    user : UserSlice,
    wishlist : WishlistSlice,
  },
});


export default store;
