import { BASE_PROFILE_URL } from "@/services/profile.service.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import { CustomerResponse } from "@/domain/response/profile/customer.response.ts";
import { CustomerRequest } from "@/domain/resquest/profile/customer.request.ts";
import { AddressShippingType } from "@/types/profile/address.type.ts";

const BASE_ADDRESS_URL = BASE_PROFILE_URL + "/addresses";

export const addressApi = createApi({
	reducerPath: 'addressApi',
	baseQuery: fetchBaseQuery({baseUrl: BASE_ADDRESS_URL}),
	endpoints: (build) => ({
		getProfile: build.query<ApiResponse<AddressShippingType>, number | undefined>({
			query: (id) => ({
				url: `/${id}`,
				credentials: "include",
			})
		}),
		saveProfile: build.mutation<ApiResponse<CustomerResponse>, CustomerRequest>({
			query: (request) => ({
				url: `/${request.id}`,
				method: 'PATCH',
				body: request,
				credentials: "include",
			})
		})
	})
})