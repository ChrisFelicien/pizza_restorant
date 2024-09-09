import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
          pizzaId: 12,
          name: "Mediterranean",
          quantity: 2,
          unitPrice: 16,
          totalPrice: 32
        },
  ]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if(item.quantity === 0){
        cartSlice.caseReducers.removeItem(state, action)
      }
    },
    clearCart(state) {
      state.cart = [];
    }
  }
});

export const {
  addToCart,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;


export const getTotalQuantity = state =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = state =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

export const getCurrentItemQuantityById = id => state => {
  return state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
};

export const getCart = state => state.cart.cart;
