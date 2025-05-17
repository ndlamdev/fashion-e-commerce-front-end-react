/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:21 AM - 18/05/2025
 * User: kimin
 **/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItemType from "@/types/CartItemType.ts";

type CartSliceState = {
	items: CartItemType[];
};

const initialState: CartSliceState = {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart-slice",
	initialState,
	reducerPath: "cart-slice",
	reducers: {
		selectItems: (state, action: PayloadAction<CartItemType>) => {
			const { payload } = action;
			state.items.push(payload);
		},
		unselectItems: (state, action: PayloadAction<CartItemType>) => {
			const { payload } = action;
			state.items = state.items.filter((item) => item.id !== payload.id);
		},
	},
});

export const { selectItems, unselectItems } = cartSlice.actions;

export default cartSlice.reducer;
