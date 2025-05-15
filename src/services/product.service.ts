import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import ProductResponseType from "@/types/product/productResponse.type.ts";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";

export const BASE_PRODUCT_URL = import.meta.env.VITE_BASE_PRODUCT_URL + "/product/v1";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_PRODUCT_URL,
});

export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: baseQuery,
	endpoints: (build) => ({
		getProduct: build.query<ApiResponse<ProductResponseType>, string | undefined>({
			query: (id) => ({
				url: `/${id}`,
			}),
		}),
		searchByImage: build.mutation<ApiResponse<ApiPageResponse<ProductResponseType[]>>, FormData | undefined>({
			query: (file) => ({
				url: `/search`,
				method: 'POST',
				body: file
			})
		})
	})
});

export const { useGetProductQuery, useSearchByImageMutation } = productApi;