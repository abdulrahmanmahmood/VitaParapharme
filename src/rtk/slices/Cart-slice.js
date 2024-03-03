import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Product-slice";

const localStorageKey = "cartSlice";
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem(localStorageKey);
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToStorage = (cartSlice) => {
  localStorage.setItem(localStorageKey, JSON.stringify(cartSlice));
};

export const fetchCart = createAsyncThunk("cartSlice/fetchCart", async (bearerToken,language) => {
  // const language = "en";
  // const bearerToken =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyLjFAZ21haWwuY29tIiwiaWF0IjoxNzA3MzY3MjM1LCJleHAiOjE3MDc0NTM2MzV9.KGFlNVT3_QKmI6fpbxawDvBVUXB_WVvUmIOiVsBRxQY";

  const response = await axios.get(
    `${baseUrl}/user/cart/my`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Accept-Language": language,
      },
    }
  );
  // state=response.data.data
  console.log(response.data.data);

  return response;
});

// Define the initial state here
const initialState = loadCartFromStorage();

// Use createAction to define clearCart action
export const clearCart = createAction("cart/clearCart");

export const cartSlice = createSlice({
  initialState, // Use the defined initialState
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;

      // Check if the product already exists in the cart
      const existingProductIndex = state.findIndex(
        (product) => product.productId === itemToAdd.productId
      );

      if (existingProductIndex !== -1) {
        // If the product exists, increment the quantity
        state[existingProductIndex].quantity += itemToAdd.quantity || 1;
      } else {
        // If the product doesn't exist, add it to the cart
        const productClone = {
          ...itemToAdd,
          quantity: itemToAdd.quantity || 1,
        };
        state.push(productClone);
      }

      saveCartToStorage(state);
    },

    deleteFromCart: (state, action) => {
      const productToDelete = action.payload;
      return state.filter(
        (product) => product.productId !== productToDelete.productId
      );
    },

    // fetchCart: async (state,payload,bearerToken)=>{
    //   const language = 'en';

    //   const response = await axios.get('https://ecommerce-1-q7jb.onrender.com/api/v1/user/cart/my', {
    //     headers: {
    //       'Authorization': `Bearer ${bearerToken}`,
    //       'Accept-Language': language,
    //     },
    //   });
    //   state=response.data.data
    // }
  },

  extraReducers: (builder) => {
    // builder.addCase(fetchCart.pending,(state,action)=>{

    // });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      console.log(action);
      state = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      console.log("rejected", state.message);
    });
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
