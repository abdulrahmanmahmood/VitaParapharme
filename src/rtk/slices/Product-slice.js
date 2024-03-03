// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectLanguage } from "./Translate-slice";
import axios from "axios";

export const baseUrl = "https://api.vitaparapharma.com/api/v1";
const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    try {
      const language = selectLanguage(getState());
      console.log("Language:", language);

      const response = await axios.get(`${baseUrl}/public/product/all`, {
        headers: {
          "Accept-Language": language,
        },
      });
      console.log("products", response.data.data.products);
      return response.data.data.products;
    } catch (error) {
      console.log("error in pro : ", error);
    }
  }
);

// Create a slice with reducers and actions
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const { setProducts } = productSlice.actions;
export const selectProducts = (state) => state.products;
