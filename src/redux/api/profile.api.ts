import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProfileResponse } from "@/domain/response/profile/profile.response.ts";
import { ProfileRequest } from "@/domain/resquest/profile/profile.request.ts";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import LocalStorage from "@/utils/helper/LocalStorage.ts";
import { AddressShippingType } from "@/types/profile/address.type.ts";
import { SaveAddressRequest } from "@/domain/resquest/profile/saveAddress.request.ts";
import { createBaseQueryWithDispatch } from "./baseQueryWithDispatch";

export const BASE_PROFILE_URL = import.meta.env.VITE_BASE_URL + "/profile/v1";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_PROFILE_URL,
	prepareHeaders: (headers) => {
		const token = LocalStorage.getValue("ACCESS_TOKEN");
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const profileApi = createApi({
	reducerPath: "profileApi",
	baseQuery: baseQuery,
	tagTypes: ["Address"],
	endpoints: (build) => ({
		getProfile: build.query<ApiResponse<ProfileResponse>, number | undefined>({
			query: (id) => ({
				url: `/${id}`,
				credentials: "include",
			}),
		}),
		saveProfile: build.mutation<ApiResponse<ProfileResponse>, ProfileRequest>({
			query: (request: ProfileRequest) => ({
				url: "",
				method: "PUT",
				body: request,
				credentials: "include",
			}),
		}),
		getAddresses: build.query<ApiResponse<AddressShippingType[]>, void>({
			query: () => ({
				url: "/addresses",
				credentials: "include",
			}),
			providesTags: ["Address"],
		}),
		getAddress: build.query<ApiResponse<AddressShippingType>, number | undefined>({
			query: (id) => ({
				url: `/addresses/${id}`,
				credentials: "include",
			}),
		}),
		saveAddress: build.mutation<ApiResponse<AddressShippingType>, SaveAddressRequest>({
			query: (request) => ({
				url: request.id ? `/addresses/${request.id}` : `/addresses`,
				method: request.id ? "PUT" : "POST",
				body: request,
				credentials: "include",
			}),
			invalidatesTags: ["Address"],
		}),
		deleteAddress: build.mutation<ApiResponse<void>, number | undefined>({
			query: (id) => ({
				url: `/addresses/${id}`,
				method: "DELETE",
				credentials: "include",
			}),
			invalidatesTags: ["Address"],
		}),
		setDefaultAddress: build.mutation<ApiResponse<void>, { old_id: number | undefined; new_id: number | undefined }>({
			query: ({ old_id, new_id }) => ({
				url: `/addresses?old=${old_id}&new=${new_id}`,
				method: "PATCH",
				credentials: "include",
			}),
			invalidatesTags: ["Address"],
		}),
	}),
});

export const adminProfileApi = createApi({
	reducerPath: "AdminProfileApi",
	baseQuery: createBaseQueryWithDispatch(import.meta.env.VITE_BASE_URL + "/admin/profile/v1"),
	tagTypes: ["AdminProfile"],
	endpoints: (build) => ({
		adminGetProfile: build.query<ApiResponse<ProfileResponse>, number>({
			query: (id) => ({
				url: `/${id}`,
				credentials: "include",
			}),
		}),
		adminGetProfiles: build.query<ApiResponse<(ProfileResponse & { total_orders: number; total_spent: number })[]>, void>({
			query: () => ({
				url: ``,
				credentials: "include",
			}),
		}),
	}),
});

export const {
	useGetProfileQuery,
	useSaveProfileMutation,
	useGetAddressesQuery,
	useGetAddressQuery,
	useDeleteAddressMutation,
	useSaveAddressMutation,
	useSetDefaultAddressMutation,
} = profileApi;

export const { useAdminGetProfileQuery, useAdminGetProfilesQuery } = adminProfileApi;
