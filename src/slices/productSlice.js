import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    status: 'idle'
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase()
    }
});

export default productSlice.reducer;