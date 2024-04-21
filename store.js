import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./src/slices/productSlice";

export const myStore = configureStore({
    reducer: {
        product: productSlice,
    }
});