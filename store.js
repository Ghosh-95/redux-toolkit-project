import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./src/slices/productSlice";
import cartReducer from "./src/slices/cartSlice"

export const myStore = configureStore({
    reducer: {
        product: productReducer,
        cartItem: cartReducer,
    }
});