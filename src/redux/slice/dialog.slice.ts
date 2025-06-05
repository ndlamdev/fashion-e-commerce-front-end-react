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

type DialogSliceState = {
	dialog: DialogTypeEnum;
	callBacksDialog?: "register" | "forget-password";
	loading: boolean;
};

const initialState: DialogSliceState = {
	dialog: "none",
	loading: false,
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
				callback?: "register" | "forget-password";
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
		showDialogLoading: (state) => {
			state.loading = true;
		},
		closeDialogLoading: (state) => {
			state.loading = false;
		},
	},
});

export const { showDialogWithCallback, showDialog, hiddenDialog, showDialogLoading, closeDialogLoading } = dialogSlice.actions;

export default dialogSlice.reducer;
