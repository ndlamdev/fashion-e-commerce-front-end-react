/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:15 AM - 18/05/2025
 * User: Administrator
 **/
import { ApiResponse } from "@/domain/ApiResponse.ts";
import MediaResponse from "@/domain/response/media.response";
import { createBaseQueryWithDispatch } from "@/redux/api/baseQueryWithDispatch.ts";
import { createApi } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/media/v1";

export const RETURN_URL = window.location.href;
export const CANCEL_URL = window.location.href;

export const adminMediaApi = createApi({
	reducerPath: "MediaApi",
	baseQuery: createBaseQueryWithDispatch(BASE_URL),
	tagTypes: ["media"],
	endpoints: (build) => ({
		getAllMedia: build.query<ApiResponse<MediaResponse[]>, void>({
			query: () => ({
				url: ``,
			}),
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMediaQuery } = adminMediaApi;
