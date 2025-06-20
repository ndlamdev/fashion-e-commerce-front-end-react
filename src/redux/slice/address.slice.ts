import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressProps = {
	userIdAction: number | undefined;
	addressIdAction: number | undefined;
};

const initialState: AddressProps = {
	userIdAction: undefined,
	addressIdAction: undefined,
};

const addressSlice = createSlice({
	name: "address-slice",
	initialState,
	reducerPath: "address-slice",
	reducers: {
		setAddressIdAction: (state, action: PayloadAction<number | undefined>) => {
			state.addressIdAction = action.payload;
		},
		setUserIdAction: (state, action: PayloadAction<number | undefined>) => {
			state.userIdAction = action.payload;
		},
	},
});

export const { setAddressIdAction, setUserIdAction } = addressSlice.actions;
export default addressSlice.reducer;
