/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:15 AM - 18/05/2025
 * User: Administrator
 **/
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import LocalStorage from "@/utils/helper/LocalStorage.ts";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import CartType from "@/types/CartType.ts";

export const BASE_URL = "http://localhost:8006/api/cart/v1";

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

export const cartApi = createApi({
	reducerPath: "cartApi",
	baseQuery,
	endpoints: (build) => ({
		getCart: build.query<ApiResponse<CartType>, void>({
			query: () => ({
				url: "/me",
			}),
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCartQuery } = cartApi;
