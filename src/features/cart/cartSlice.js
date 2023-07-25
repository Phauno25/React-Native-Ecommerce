import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, actions) => {
      const index = state.cart.findIndex(
        (e) => e.product.id == actions.payload.id
      );
      if (index != -1) {
        state.cart[index] = {
          product: actions.payload,
          quantity: state.cart[index].quantity + 1,
        };
      } else {
        state.cart = [...state.cart, { product: actions.payload, quantity: 1 }];
      }
    },
    removeFromCart: (state, actions) => {
      state.cart = state.cart.filter((e) => e.product.id !== actions.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
