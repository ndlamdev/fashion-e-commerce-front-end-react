import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import ProductResponseType from "@/domain/response/product.response";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { QueryType } from "@/types/collection/query.type.ts";
import QuickSearchProductType from "@/types/product/quickSearchProduct.type.ts";

export const BASE_PRODUCT_URL = import.meta.env.VITE_BASE_URL + "/product/v1";

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
		searchByImage: build.mutation<ApiResponse<ApiPageResponse<ProductResponseType>>, FormData | undefined>({
			query: (file) => ({
				url: `/search`,
				method: "POST",
				body: file,
			}),
		}),
		voiceSearch: build.query<ApiResponse<ApiPageResponse<ProductResponseType>>, QueryType>({
			query: ({ prompt }) => `/voice-search?query=${prompt}`,
		}),
		searchByText: build.query<ApiResponse<ApiPageResponse<ProductResponseType>>, QueryType>({
			query: ({ title, size = "12", page = "0", colors = "", sizes = [], tag, direction }) =>
				`/search?title=${title}&size=${size}&page=${page}` +
				(colors && `&colors=${colors}`) +
				(sizes?.length ? `&sizes=${sizes?.join(",")}` : "") +
				(tag && `&sort.tag=${tag}&sort.direction=${direction ?? "ASC"}`),
		}),
		quickSearch: build.query<ApiResponse<QuickSearchProductType[]>, string | undefined>({
			query: (title) => `/quick-search?query=${title}`,
		}),
	}),
});

export const { useGetProductQuery, useSearchByImageMutation, useVoiceSearchQuery, useSearchByTextQuery, useQuickSearchQuery } = productApi;
