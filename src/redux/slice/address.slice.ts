import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressProps = {
	actionId: number | undefined,
	defaultId: number | undefined,
}

const initialState: AddressProps = {
	actionId: undefined,
	defaultId: undefined,
}

const addressSlice = createSlice({
	name: "address-slice",
	initialState,
	reducerPath: "address-slice",
	reducers: {
		setActionId: (state, action: PayloadAction<number | undefined>) => {
			state.actionId = action.payload;
		},
		setDefaultId: (state, action: PayloadAction<number | undefined>) => {
			state.defaultId = action.payload;
		},
	},
})

export const { setActionId, setDefaultId } = addressSlice.actions;
export default addressSlice.reducer;