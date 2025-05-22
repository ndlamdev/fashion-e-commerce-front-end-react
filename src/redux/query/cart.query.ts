/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:15 AM - 18/05/2025
 * User: Administrator
 **/
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import CartType from "@/types/CartType.ts";
import { createBaseQueryWithDispatch } from "@/redux/query/baseQueryWithDispatch.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/cart/v1";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: createBaseQueryWithDispatch(BASE_URL),
  tagTypes: ["Cart"],
  endpoints: (build) => ({
    getCart: build.query<ApiResponse<CartType>, void>({
      query: () => ({
        url: "/me",
      }),
      providesTags: ["Cart"],
    }),
    modifyQuantityCartItem: build.mutation<
      ApiResponse<{
        cartItemId: number;
        quantity: number;
      }>,
      { cartItemId: number; quantity: number }
    >({
      query: (arg) => ({
        url: `/update/${arg.cartItemId}`,
        method: "PUT",
        body: {
          quantity: arg.quantity,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    addCartItem: build.mutation<ApiResponse<void>, { variantId: string; quantity: number }>({
      query: (arg) => ({
        url: `/add/${arg.variantId}`,
        method: "POST",
        body: {
          quantity: arg.quantity,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: build.mutation<ApiResponse<void>, { cartItemId: number }>({
      query: (arg) => ({
        url: `/remove/${arg.cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCartQuery, useAddCartItemMutation } = cartApi;
