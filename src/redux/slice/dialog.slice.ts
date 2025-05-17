/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:21 AM - 18/05/2025
 * User: kimin
 **/
import { createSlice } from "@reduxjs/toolkit";

type DialogSliceState = {
	open: boolean;
};

const initialState: DialogSliceState = {
	open: false,
};

export const dialogSlice = createSlice({
	name: "dialog-slice",
	initialState,
	reducerPath: "dialog-slice",
	reducers: {
		openDialog: (state) => {
			state.open = true;
		},
		closeDialog: (state) => {
			state.open = false;
		},
	},
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
