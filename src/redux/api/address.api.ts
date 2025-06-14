import { ApiResponse } from "@/domain/ApiResponse.ts";
import { SaveAddressRequest } from "@/domain/resquest/profile/saveAddress.request.ts";
import { createBaseQueryWithDispatch } from "@/redux/api/baseQueryWithDispatch.ts";
import { AddressShippingType } from "@/types/profile/address.type.ts";
import { createApi } from "@reduxjs/toolkit/query/react";

export const BASE_ADDRESS_URL = import.meta.env.VITE_BASE_URL + "/address/v1";
export const BASE_ADDRESS_ADMIN_URL = import.meta.env.VITE_BASE_URL + "/admin/address/v1/user";

export const addressApi = createApi({
	reducerPath: "addressUserApi",
	baseQuery: createBaseQueryWithDispatch(BASE_ADDRESS_URL),
	tagTypes: ["Address"],
	endpoints: (build) => ({
		getAddresses: build.query<ApiResponse<AddressShippingType[]>, void>({
			query: () => ({
				url: "",
				credentials: "include",
			}),
			providesTags: ["Address"],
		}),
		getAddress: build.query<ApiResponse<AddressShippingType>, number | undefined>({
			query: (id) => ({
				url: `/${id}`,
				credentials: "include",
			}),
		}),
		getDefaultAddress: build.query<ApiResponse<AddressShippingType>, void>({
			query: () => ({
				url: `/default`,
				credentials: "include",
			}),
		}),
		saveAddress: build.mutation<ApiResponse<AddressShippingType>, SaveAddressRequest>({
			query: (request) => ({
				url: request.id ? `/${request.id}` : ``,
				method: request.id ? "PUT" : "POST",
				body: request,
				credentials: "include",
			}),
		}),
		deleteAddress: build.mutation<ApiResponse<void>, number | undefined>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
				credentials: "include",
			}),
		}),
		setDefaultAddress: build.mutation<ApiResponse<void>, number>({
			query: (addressId) => ({
				url: `/set-default/${addressId}`,
				method: "PATCH",
				credentials: "include",
			}),
		}),
	}),
});

export const adminAddressApi = createApi({
	reducerPath: "AdminAddressUserApi",
	baseQuery: createBaseQueryWithDispatch(BASE_ADDRESS_ADMIN_URL),
	tagTypes: ["AdminAddress"],
	endpoints: (build) => ({
		adminGetAddresses: build.query<ApiResponse<AddressShippingType[]>, number>({
			query: (id) => ({
				url: `/${id}`,
				credentials: "include",
			}),
			providesTags: ["AdminAddress"],
		}),
		adminGetAddress: build.query<ApiResponse<AddressShippingType>, { userId: number; addressId: number }>({
			query: ({ userId, addressId }) => ({
				url: `/${userId}/address/${addressId}`,
				credentials: "include",
			}),
		}),
		adminGetDefaultAddress: build.query<ApiResponse<AddressShippingType>, number>({
			query: (userId) => ({
				url: `/${userId}/default`,
				credentials: "include",
			}),
		}),
		adminSaveAddress: build.mutation<ApiResponse<AddressShippingType>, { userId: number; address: SaveAddressRequest }>({
			query: ({ userId, address }) => ({
				url: address.id ? `/${userId}/address/${address.id}` : `/${userId}`,
				method: address.id ? "PUT" : "POST",
				body: address,
				credentials: "include",
			}),
		}),
		adminDeleteAddress: build.mutation<ApiResponse<void>, { userId: number; addressId: number }>({
			query: ({ userId, addressId }) => ({
				url: `/${userId}/address/${addressId}`,
				method: "DELETE",
				credentials: "include",
			}),
		}),
		adminSetDefaultAddress: build.mutation<ApiResponse<void>, { userId: number; addressId: number }>({
			query: ({ userId, addressId }) => ({
				url: `/${userId}/set-default/${addressId}`,
				method: "PATCH",
				credentials: "include",
			}),
		}),
	}),
});

export const {
	useGetAddressQuery,
	useGetAddressesQuery,
	useSetDefaultAddressMutation,
	useDeleteAddressMutation,
	useSaveAddressMutation,
	useGetDefaultAddressQuery,
} = addressApi;

export const {
	useAdminGetAddressQuery,
	useAdminGetAddressesQuery,
	useAdminDeleteAddressMutation,
	useAdminGetDefaultAddressQuery,
	useAdminSaveAddressMutation,
	useAdminSetDefaultAddressMutation,
} = adminAddressApi;
