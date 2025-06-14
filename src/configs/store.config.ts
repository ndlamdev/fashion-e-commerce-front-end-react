import { configureStore } from "@reduxjs/toolkit";

/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:45 AM - 18/04/2025
 * User: kimin
 **/
import logger from "redux-logger";
import { authApi } from "@/redux/api/auth.api.ts";
import { authSlice } from "@/redux/slice/auth.slice.ts";
import { adminProfileApi, profileApi } from "@/redux/api/profile.api";
import addressSlice from "@/redux/slice/address.slice.ts";
import { addressCoolMateApi } from "@/redux/api/addressCoolMate.api.ts";
import { addressApi, adminAddressApi } from "@/redux/api/address.api.ts";
import { cartApi } from "@/redux/api/cart.api.ts";
import { cartSlice } from "@/redux/slice/cart.slice.ts";
import { productApi } from "@/services/product.service.ts";
import { dialogSlice } from "@/redux/slice/dialog.slice.ts";
import { sheetSlice } from "@/redux/slice/sheet.slice.ts";
import { collectionApi } from "@/services/collection.service.ts";
import { adminOrderApi, orderApi } from "@/redux/api/order.api.ts";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
	reducer: {
		/*===========================for slice======================*/
		dialog: dialogSlice.reducer,
		sheet: sheetSlice.reducer,
		auth: authSlice.reducer,
		address: addressSlice,
		cart: cartSlice.reducer,

		/*===========================for api======================*/
		[authApi.reducerPath]: authApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[addressCoolMateApi.reducerPath]: addressCoolMateApi.reducer,
		[collectionApi.reducerPath]: collectionApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		[addressApi.reducerPath]: addressApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
		[adminOrderApi.reducerPath]: adminOrderApi.reducer,
		[adminProfileApi.reducerPath]: adminProfileApi.reducer,
		[adminAddressApi.reducerPath]: adminAddressApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(logger)
			.concat(authApi.middleware)
			.concat(profileApi.middleware)
			.concat(addressCoolMateApi.middleware)
			.concat(addressApi.middleware)
			.concat(cartApi.middleware)
			.concat(productApi.middleware)
			.concat(collectionApi.middleware)
			.concat(orderApi.middleware)
			.concat(adminOrderApi.middleware)
			.concat(adminProfileApi.middleware)
			.concat(adminAddressApi.middleware)
			,
});

// Get the type of our slice variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the slice itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
export const appDispatch = store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
