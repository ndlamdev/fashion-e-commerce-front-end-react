/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:14 CH - 13/05/2025
 * User: Administrator
 **/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SheetType } from "@/context/provider/SheetProvider.tsx";

type SheetSliceState = {
	sheetType: SheetType;
};

const initialState: SheetSliceState = {
	sheetType: "NONE",
};

export const sheetSlice = createSlice({
	name: "sheet-slice",
	initialState,
	reducerPath: "sheet-slice",
	reducers: {
		setSheetType: (state, action: PayloadAction<SheetType>) => {
			state.sheetType = action.payload;
		},
		hiddenSheet: (state) => {
			state.sheetType = "NONE";
		},
	},
});

export const { setSheetType, hiddenSheet } = sheetSlice.actions;

export default sheetSlice.reducer;
