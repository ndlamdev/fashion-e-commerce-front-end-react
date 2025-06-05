import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddressType } from "@/types/profile/address.type.ts";

export const addressCoolMateApi = createApi({
	reducerPath: "address-coolmate-api",
	baseQuery: fetchBaseQuery({ baseUrl: "/treeVN.json" }),
	endpoints: (build) => ({
		getInfoAddresses: build.query<AddressType[], void>({
			query: () => ({
				url: "",
			}),
		}),
	}),
});
export const { useGetInfoAddressesQuery } = addressCoolMateApi;
