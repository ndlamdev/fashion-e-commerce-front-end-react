import { configureStore } from "@reduxjs/toolkit";

/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:45 AM - 18/04/2025
 * User: kimin
 **/
import logger from "redux-logger";
import { authApi } from "@/redux/query/auth.query.ts";
import { authSlice } from "@/redux/slice/auth.slice.ts";
import { profileApi } from "@/services/profile.service.ts";
import addressSlice from "@/redux/slice/address.slice.ts";
import { addressApi, addressCustomerApi } from "@/services/address.service.ts";
import { cartApi } from "@/redux/query/cart.query.ts";
import { addressOpenApi } from "@/redux/query/addressOpenApi.query.ts";
import { cartSlice } from "@/redux/slice/cart.slice.ts";
import { productApi } from "@/services/product.service.ts";
import { dialogSlice } from "@/redux/slice/dialog.slice.ts";
import { sheetSlice } from "@/redux/slice/sheet.slice.ts";
import { collectionApi } from "@/services/collection.service.ts";
import { orderApi } from "@/redux/query/order.query.ts";

const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		auth: authSlice.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		address: addressSlice,
		[addressApi.reducerPath]: addressApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		dialog: dialogSlice.reducer,
		sheet: sheetSlice.reducer,
		[collectionApi.reducerPath]: collectionApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		[addressOpenApi.reducerPath]: addressOpenApi.reducer,
		[addressCustomerApi.reducerPath]: addressCustomerApi.reducer,
		cart: cartSlice.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(logger)
			.concat(authApi.middleware)
			.concat(profileApi.middleware)
			.concat(addressApi.middleware)
			.concat(cartApi.middleware)
			.concat(addressOpenApi.middleware)
			.concat(productApi.middleware)
			.concat(addressCustomerApi.middleware)
			.concat(collectionApi.middleware)
			.concat(orderApi.middleware),
});

// Get the type of our slice variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the slice itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
export const appDispatch = store.dispatch;

export default store;
