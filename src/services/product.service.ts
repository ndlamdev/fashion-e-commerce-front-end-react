import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import { ProductDto } from "@/domain/dto/product.dto.ts";

export const BASE_PRODUCT_URL = import.meta.env.VITE_BASE_PRODUCT_URL + "/product/v1";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_PRODUCT_URL,
});

export const productAip = createApi({
	reducerPath: "productAip",
	baseQuery: baseQuery,
	endpoints: (build) => ({
		getProduct: build.query<ApiResponse<ProductDto>, number | undefined>({
			query: (id) => ({
				url: `/${id}`,
			}),
		}),
	})
});

export const { useGetProductQuery } = productAip;