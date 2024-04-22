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
        const { data } = await addItemToDB({ ...item, quantity: 1 });
        return data;
    }
);

export const updateItemAsync = createAsyncThunk(
    'cartItems/updateItem',
    async (itemId, item) => {
        const { data } = await updateItem(itemId, item);
        return data;
    }
);

export const deleteItemAsync = createAsyncThunk(
    'cartItems/deleteItem',
    async (itemId) => {
        await removeItemFromDB(itemId);
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeFromCart(state, action) {
            const index = state.cartItems.findIndex(item => item.id === action.payload);
            state.cartItems.splice(index, 1);
        }
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
            .addCase(updateItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.cartItems.findIndex(item => item.id === action.payload.id);
                state.cartItems.splice(index, 1, action.payload);

            })
    }
});

export const { removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;