/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:15 AM - 18/05/2025
 * User: Administrator
 **/
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import { createBaseQueryWithDispatch } from "@/redux/api/baseQueryWithDispatch.ts";
import OrderDetailResponse from "@/domain/response/orderDetail.response";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/payment/v1";

export const paymentApi = createApi({
	reducerPath: "paymentApi",
	baseQuery: createBaseQueryWithDispatch(BASE_URL),
	tagTypes: ["payment"],
	endpoints: (build) => ({
		cancelPayment: build.mutation<ApiResponse<OrderDetailResponse>, number>({
			query: (orderCode) => ({
				url: `/${orderCode}`,
				method: "PUT",
			}),
			invalidatesTags: ["payment"],
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCancelPaymentMutation } = paymentApi;
