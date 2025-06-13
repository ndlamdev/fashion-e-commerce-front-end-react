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
import CreateOrderRequest from "@/domain/resquest/createOrder.request.ts";
import CreateOrderResponse from "@/domain/response/createOrder.response.ts";
import { ApiPageResponse } from "@/domain/ApiPageResponse";
import HistoryOrderType from "@/types/historyOrder.type";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/order/v1";

export const RETURN_URL = window.location.href;
export const CANCEL_URL = window.location.href;

export const orderApi = createApi({
	reducerPath: "orderApi",
	baseQuery: createBaseQueryWithDispatch(BASE_URL),
	tagTypes: ["order"],
	endpoints: (build) => ({
		createOrder: build.mutation<ApiResponse<CreateOrderResponse>, CreateOrderRequest>({
			query: (arg) => ({
				url: "",
				method: "POST",
				body: {
					...arg,
					payment: {
						method: arg.payment.method,
						return_url: RETURN_URL,
						cancel_url: CANCEL_URL,
					},
				},
			}),
			invalidatesTags: ["order"],
		}),
		cancelOrder: build.mutation<ApiResponse<CreateOrderResponse>, { orderId: number; orderCode: number }>({
			query: ({ orderId, orderCode }) => ({
				url: "/cancel",
				method: "POST",
				body: {
					order_id: orderId,
					order_code: orderCode,
				},
			}),
			invalidatesTags: ["order"],
		}),
		historyOrder: build.query<ApiResponse<ApiPageResponse<HistoryOrderType>>, number | undefined>({
			query: (page = 0) => ({
				url: `/history?page=${page}`,
			}),
		}),
	}),
});

export const adminOrderApi = createApi({
	reducerPath: "AdminOrderApi",
	baseQuery: createBaseQueryWithDispatch(import.meta.env.VITE_BASE_URL + "/admin/order/v1"),
	tagTypes: ["admin_order"],
	endpoints: (build) => ({
		adminOrderHistories: build.query<ApiResponse<HistoryOrderType[]>, void>({
			query: () => ({
				url: ``,
			}),
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateOrderMutation, useCancelOrderMutation, useHistoryOrderQuery } = orderApi;
export const { useAdminOrderHistoriesQuery } = adminOrderApi;
