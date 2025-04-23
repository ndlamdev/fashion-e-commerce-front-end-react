/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:21 PM - 18/04/2025
 * User: kimin
 **/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserDto from "@/domain/dto/user.dto.ts";
import LocalStorage from "@/utils/helper/LocalStorage.ts";

type AuthSliceState = {
	access_token: string | null;
	user: UserDto | null;
};

const initialState: AuthSliceState = {
	access_token: LocalStorage.getValue("ACCESS_TOKEN"),
	user: LocalStorage.getObjectValue<UserDto>("USER"),
};

export const authSlice = createSlice({
	name: "auth-slice",
	initialState,
	reducerPath: "auth-slice",
	reducers: {
		loginSuccess: (state, action: PayloadAction<{ access_token: string; user: UserDto }>) => {
			state.user = action.payload.user;
			state.access_token = action.payload.access_token;
		},
		logout: (state: AuthSliceState) => {
			state.user = null;
			state.access_token = null;
		},
	},
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
