import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CustomerResponse } from "@/domain/response/profile/customer.response.ts";
import { CustomerRequest } from "@/domain/resquest/profile/customer.request.ts";
import { ApiResponse } from "@/domain/ApiResponse.ts";

const BASE_URL = 'http://localhost:8002/api/v1/profile/';

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
	endpoints: (build) => ({
		getProfile: build.query<ApiResponse<CustomerResponse>, number | undefined>({
			query: (id) => ({
				url: `customers/${id}`,
				credentials: "include",
			})
		}),
		saveProfile: build.mutation<ApiResponse<CustomerResponse>, CustomerRequest>({
			query: (request) => ({
				url: `customers`,
				method: 'PATCH',
				body: request,
				credentials: "include",
			})
		})
	})
})

export const { useGetProfileQuery, useSaveProfileMutation } = profileApi;