import { configureStore } from "@reduxjs/toolkit";

/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:45 AM - 18/04/2025
 * User: kimin
 **/
import logger from "redux-logger";
import { authenticationApi } from "@/redux/query/authentication.query.ts";
import { authSlice } from "@/redux/slice/auth.slice.ts";
import { profileApi } from "@/services/profile.service.ts";
import addressSlice from "@/redux/slice/address.slice.ts";
import { addressApi } from "@/services/address.service.ts";
import { cartApi } from "@/redux/query/cart.query.ts";
import { dialogSlice } from "@/redux/slice/dialog.slice.ts";
import { addressOpenApi } from "@/redux/query/addressOpenApi.query.ts";
import { cartSlice } from "@/redux/slice/cart.slice.ts";

const store = configureStore({
	reducer: {
		[authenticationApi.reducerPath]: authenticationApi.reducer,
		auth: authSlice.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		address: addressSlice,
		[addressApi.reducerPath]: addressApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		dialogSlice: dialogSlice.reducer,
		[addressOpenApi.reducerPath]: addressOpenApi.reducer,
		cartSlice: cartSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(logger)
			.concat(authenticationApi.middleware)
			.concat(profileApi.middleware)
			.concat(addressApi.middleware)
			.concat(cartApi.middleware)
			.concat(addressOpenApi.middleware),
});

// Get the type of our slice variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the slice itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
export const appDispatch = store.dispatch;

export default store;
