import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddressType } from "@/types/profile/address.type.ts";

export const addressApi = createApi({
	reducerPath: "addressApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/treeVN.json" }),
	endpoints: (build) => ({
		getInfoAddresses: build.query<AddressType[], void>({
			query: () => ({
				url: ''
			})
		}),
	}),
});

export const { useGetInfoAddressesQuery } = addressApi;