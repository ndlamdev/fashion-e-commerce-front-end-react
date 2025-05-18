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
		}),
		voiceSearch: build.query<ApiResponse<ApiPageResponse<ProductResponseType[]>>, string | null>({
			query: (prompt ) => `/voice-search?query=${prompt}`
			}),
		searchByText: build.query<ApiResponse<ApiPageResponse<ProductResponseType[]>>, {query: string | null, page?: string | null, size?: string | null}>({
			query: ({ query, size = '12', page = '0' } ) => `/search?query=${query}&query=${size}&query=${page}`
		}),
		quickSearch: build.query<ApiResponse<ApiPageResponse<ProductResponseType[]>>, string | null>({
			query: (query ) => `/quick-search?query=${query}`
		}),
	}),

});

export const { useGetProductQuery, useSearchByImageMutation, useVoiceSearchQuery, useSearchByTextQuery, useQuickSearchQuery } = productApi;