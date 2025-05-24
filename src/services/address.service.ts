import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddressShippingType, AddressType } from "@/types/profile/address.type.ts";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import { SaveAddressRequest } from "@/domain/resquest/profile/saveAddress.request.ts";
import { createBaseQueryWithDispatch } from "@/redux/query/baseQueryWithDispatch.ts";

export const addressApi = createApi({
	reducerPath: "addressApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/treeVN.json" }),
	endpoints: (build) => ({
		getInfoAddresses: build.query<AddressType[], void>({
			query: () => ({
				url: "",
			}),
		}),
	}),
});
export const BASE_ADDRESS_URL = import.meta.env.VITE_BASE_URL + "/address/v1";

export const addressUserApi = createApi({
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
			invalidatesTags: ["Address"],
		}),
		deleteAddress: build.mutation<ApiResponse<void>, number | undefined>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
				credentials: "include",
			}),
			invalidatesTags: ["Address"],
		}),
		setDefaultAddress: build.mutation<ApiResponse<void>, { old_id: number | undefined; new_id: number | undefined }>({
			query: ({ old_id, new_id }) => ({
				url: `?old=${old_id}&new=${new_id}`,
				method: "PATCH",
				credentials: "include",
			}),
			invalidatesTags: ["Address"],
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
} = addressUserApi;
export const { useGetInfoAddressesQuery } = addressApi;
