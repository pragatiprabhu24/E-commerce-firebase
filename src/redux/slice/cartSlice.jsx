import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const clearCart = createAction("cart/clearCart");

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearCart, (state) => {
      return [];
    });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export { clearCart };

export default cartSlice.reducer;
