import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CustomerResponse } from "@/domain/response/profile/customer.response.ts";
import { CustomerRequest } from "@/domain/resquest/profile/customer.request.ts";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import LocalStorage from "@/utils/helper/LocalStorage.ts";

export const BASE_PROFILE_URL = import.meta.env.VITE_BASE_PROFILE_URL + "/v1/profile";

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
	endpoints: (build) => ({
		getProfile: build.query<ApiResponse<CustomerResponse>, number | undefined>({
			query: (id) => ({
				url: `/${id}`,
				credentials: "include",
			}),
		}),
		saveProfile: build.mutation<ApiResponse<CustomerResponse>, CustomerRequest>({
			query: (request: CustomerRequest) => ({
				url: "",
				method: "PUT",
				body: request,
				credentials: "include",
			}),
			// async onQueryStarted()
		}),
	}),
});

export const { useGetProfileQuery, useSaveProfileMutation } = profileApi;