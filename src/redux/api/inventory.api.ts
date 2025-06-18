/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:15 AM - 18/05/2025
 * User: Administrator
 **/
import { ApiResponse } from "@/domain/ApiResponse.ts";
import InventoryResponse from "@/domain/response/inventory.response";
import { createBaseQueryWithDispatch } from "@/redux/api/baseQueryWithDispatch.ts";
import { createApi } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/admin/inventory/v1";

export const adminInventoryApi = createApi({
	reducerPath: "AdminInventoryApi",
	baseQuery: createBaseQueryWithDispatch(BASE_URL),
	endpoints: (build) => ({
		getAllInventory: build.query<ApiResponse<InventoryResponse[]>, void>({
			query: () => ({
				url: "",
			}),
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllInventoryQuery } = adminInventoryApi;
