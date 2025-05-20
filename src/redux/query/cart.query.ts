/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:15 AM - 18/05/2025
 * User: Administrator
 **/
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import LocalStorage from "@/utils/helper/LocalStorage.ts";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import CartType from "@/types/CartType.ts";
import { closeDialogLoading, showDialogLoading } from "@/redux/slice/dialog.slice.ts";
import { debounce } from "lodash";

export const BASE_URL = import.meta.env.VITE_BASE_URL + "/cart/v1";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: (headers) => {
		const token = LocalStorage.getValue("ACCESS_TOKEN");
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const debounceFc = debounce((api) => {
	api.dispatch(closeDialogLoading());
}, 200);

const baseQueryWithDispatch: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	api.dispatch(showDialogLoading());
	const result = await baseQuery(args, api, extraOptions);
	debounceFc(api);
	return result;
};

export const cartApi = createApi({
	reducerPath: "cartApi",
	baseQuery: baseQueryWithDispatch,
	tagTypes: ["Cart"],
	endpoints: (build) => ({
		getCart: build.query<ApiResponse<CartType>, void>({
			query: () => ({
				url: "/me",
			}),
			providesTags: ["Cart"],
		}),
		modifyQuantityCartItem: build.mutation<
			ApiResponse<{
				cartItemId: number;
				quantity: number;
			}>,
			{ cartItemId: number; quantity: number }
		>({
			query: (arg) => ({
				url: `/update/${arg.cartItemId}`,
				method: "PUT",
				body: {
					quantity: arg.quantity,
				},
			}),
			invalidatesTags: ["Cart"],
		}),
		addCartItem: build.mutation<ApiResponse<void>, { variantId: string; quantity: number }>({
			query: (arg) => ({
				url: `/add/${arg.variantId}`,
				method: "POST",
				body: {
					quantity: arg.quantity,
				},
			}),
			invalidatesTags: ["Cart"],
		}),
		deleteCartItem: build.mutation<ApiResponse<void>, { cartItemId: number }>({
			query: (arg) => ({
				url: `/remove/${arg.cartItemId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Cart"],
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCartQuery, useAddCartItemMutation } = cartApi;
