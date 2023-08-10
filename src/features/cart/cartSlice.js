import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      user: "",
      updatedAt: "",
      total: null,
      items: [],
    },
  },
  reducers: {
    addToCart: (state, actions) => {
      const index = state.cart.items.findIndex(
        (e) => e.product.id == actions.payload.id
      );
      if (index != -1) {
        state.cart.items[index] = {
          product: actions.payload,
          quantity: state.cart.items[index].quantity + 1,
        };
      } else {
        state.cart.items = [
          ...state.cart.items,
          { product: actions.payload, quantity: 1 },
        ];
      }
      state.cart.total = state.cart.items.reduce(
        (total, current) => (total += current.product.price * current.quantity),
        0
      );
      state.cart.updatedAt = new Date().toString();
      state.cart.user = actions.payload.user;
    },
    removeFromCart: (state, actions) => {
      state.cart = state.cart.items.filter(
        (e) => e.product.id !== actions.payload
      );
    },
    setCartUser: (state, actions) => {
      console.log(actions.payload);
      state.cart.user = actions.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCartUser } = cartSlice.actions;
export default cartSlice.reducer;
