/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:15 AM - 18/05/2025
 * User: Administrator
 **/
import { ApiResponse } from "@/domain/ApiResponse.ts";
import CollectionResponse from "@/domain/response/collection.response";
import { createBaseQueryWithDispatch } from "@/redux/api/baseQueryWithDispatch.ts";
import { createApi } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/admin/collection/v1";

export const adminCollectionApi = createApi({
	reducerPath: "AdminCollectionApi",
	baseQuery: createBaseQueryWithDispatch(BASE_URL),
	endpoints: (build) => ({
		getAllCollection: build.query<ApiResponse<CollectionResponse[]>, void>({
			query: () => ({
				url: "",
			}),
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCollectionQuery } = adminCollectionApi;
