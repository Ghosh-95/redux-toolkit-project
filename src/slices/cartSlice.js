import { fetchItem, removeItemFromDB, updateItem, addItemToDB } from "../utils/cartAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    status: 'idle'
};

export const fetchItemAsync = createAsyncThunk(
    'cartItems/fetchItem',
    async () => {
        const { data } = await fetchItem();
        return data;
    },
);

export const addItemAsync = createAsyncThunk(
    'cartItems/addItem',
    async (item) => {
        const { data } = await addItemToDB(item);
        return data;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemAsync.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.status = 'idle';

            })
            .addCase(fetchItemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.cartItems.push(action.payload);
            })
    }
});

export default cartSlice.reducer;