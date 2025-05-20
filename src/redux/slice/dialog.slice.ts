/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:14 CH - 13/05/2025
 * User: Administrator
 **/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DialogTypeEnum from "@/utils/enums/dialog.type.enum.ts";
import EventInputOTPDialog from "@/components/authentication/props/InputOTPDialog.props.ts";

export type CallbackDialogProps = EventInputOTPDialog & {};

type SheetSliceState = {
	dialog: DialogTypeEnum;
	callBacksDialog: CallbackDialogProps | undefined;
};

const initialState: SheetSliceState = {
	dialog: "none",
	callBacksDialog: undefined as CallbackDialogProps | undefined,
};

export const dialogSlice = createSlice({
	name: "dialog-slice",
	initialState,
	reducerPath: "dialog-slice",
	reducers: {
		showDialogWithCallback: (
			state,
			action: PayloadAction<{
				type: DialogTypeEnum;
				callback?: CallbackDialogProps;
			}>,
		) => {
			state.dialog = action.payload.type;
			state.callBacksDialog = action.payload.callback;
		},
		showDialog: (state, action: PayloadAction<DialogTypeEnum>) => {
			state.dialog = action.payload;
		},
		hiddenDialog: (state) => {
			state.dialog = "none";
		},
	},
});

export const { showDialogWithCallback, showDialog, hiddenDialog } = dialogSlice.actions;

export default dialogSlice.reducer;


// /**
//  * Author: Nguyen Dinh Lam
//  * Email: kiminonawa1305@gmail.com
//  * Phone number: +84 855354919
//  * Create at: 3:21 AM - 18/05/2025
//  * User: kimin
//  **/
// import { createSlice } from "@reduxjs/toolkit";
//
// type DialogSliceState = {
// 	open: boolean;
// };
//
// const initialState: DialogSliceState = {
// 	open: false,
// };
//
// export const dialogSlice = createSlice({
// 	name: "dialog-slice",
// 	initialState,
// 	reducerPath: "dialog-slice",
// 	reducers: {
// 		openDialog: (state) => {
// 			state.open = true;
// 		},
// 		closeDialog: (state) => {
// 			state.open = false;
// 		},
// 	},
// });
//
// export const { openDialog, closeDialog } = dialogSlice.actions;
//
// export default dialogSlice.reducer;