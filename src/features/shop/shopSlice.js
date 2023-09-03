import { createSlice } from "@reduxjs/toolkit";
export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categorySelected: "",
    productSelected: "",
    orderSelected: "",
    allCategories: [],
    allProducts: [],
    orders: [],
    productsSelected: [],
    modalActive: false,
  },
  reducers: {
    setCategories: (state, actions) => {
      state.allCategories = actions.payload;
    },
    setProducts: (state, actions) => {
      state.allProducts = actions.payload;
    },
    setOrders: (state, actions) => {
      state.orders = actions.payload;
    },
    /*Usado para agregar al state una orden generada durante la sesion activa*/
    addOrder: (state, actions) => {
      state.orders = [...state.orders, actions.payload];
    },
    setCategorySelected: (state, actions) => {
      state.productsSelected = state.allProducts.filter(
        (e) => e.category === actions.payload
      );
      state.categorySelected = actions.payload;
    },
    setProductSelected: (state, actions) => {
      state.productSelected = actions.payload;
    },
    setOrderSelected: (state, action) => {
      state.orderSelected = action.payload;
    },
    /*Utilizado para mostrar el modal dependiendo de la screen en donde se encuentre el usuario*/
    setModalActive: (state) => {
      state.modalActive = !state.modalActive;
    },
  },
});

export const {
  setCategorySelected,
  setProductSelected,
  setOrderSelected,
  setModalActive,
  setCategories,
  setProducts,
  setOrders,
  addOrder,
} = shopSlice.actions;

export default shopSlice.reducer;
