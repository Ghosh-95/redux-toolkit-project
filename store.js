import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./src/slices/productSlice";

export const myStore = configureStore({
    reducer: {
        product: productReducer,
    }
});