import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/product.json";
import categories from "../../data/categories.json";
export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categorySelected: "",
    productSelected: "",
    allCategories: categories,
    allProducts: products,
    productsSelected: [],
  },
  reducers: {
    setCategorySelected: (state, actions) => {
      state.productsSelected = state.allProducts.filter(
        (e) => e.category === actions.payload
      );
      state.categorySelected = actions.payload;
    },
    setProductSelected: (state, actions) => {
      state.productSelected = actions.payload;
    },
  },
});

export const { setCategorySelected, setProductSelected } = shopSlice.actions;

export default shopSlice.reducer;
