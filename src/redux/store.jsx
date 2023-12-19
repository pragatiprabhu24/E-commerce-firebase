import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import ModalSlice from "./slice/ModalSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        modal: ModalSlice
    },
})