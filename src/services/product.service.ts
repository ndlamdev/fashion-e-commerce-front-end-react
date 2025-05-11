import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import ProductType from "@/types/product/product.type.ts";

export const BASE_PRODUCT_URL = import.meta.env.VITE_BASE_PRODUCT_URL + "/product/v1";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_PRODUCT_URL,
});

export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: baseQuery,
	endpoints: (build) => ({
		getProduct: build.query<ApiResponse<ProductType>, string | undefined>({
			query: (id) => ({
				url: `/${id}`,
			}),
		}),
	})
});

export const { useGetProductQuery } = productApi;