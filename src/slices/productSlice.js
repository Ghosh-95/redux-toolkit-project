import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../utils/productAPI";

const initialState = {
    products: [],
    status: 'idle'
};

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const { data } = await fetchProducts();
        return data;
    },
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.products = action.payload;
        })
            .addCase(fetchProductsAsync.pending, (state) => state.status = 'loading')
    }
});

export default productSlice.reducer;