/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:29 AM - 18/05/2025
 * User: Administrator
 **/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ProvinceType from "@/types/address/province.type.ts";
import DistrictType from "@/types/address/districtType.ts";

const baseQuery = fetchBaseQuery({
	baseUrl: "https://provinces.open-api.vn/api",
});

export const addressOpenApi = createApi({
	reducerPath: "addressOpenApi",
	baseQuery: baseQuery,
	endpoints: (build) => ({
		getProvincesOpenApi: build.query<ProvinceType[], void>({
			query: () => ({
				url: "/p",
			}),
		}),
		getDistrictsOpenApi: build.query<ProvinceType, number>({
			query: (arg) => ({
				url: `/p/${arg}?depth=2`,
			}),
		}),
		getWardsOpenApi: build.query<DistrictType, number>({
			query: (arg) => ({
				url: `/d/${arg}?depth=2`,
			}),
		}),
	}),
});

export const { useGetProvincesOpenApiQuery, useGetDistrictsOpenApiQuery, useGetWardsOpenApiQuery } = addressOpenApi;
