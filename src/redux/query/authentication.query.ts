/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:31 AM - 18/04/2025
 * User: kimin
 **/
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import LoginRequest from "@/domain/resquest/login.request.ts";
import LoginResponse from "@/domain/response/login.response.ts";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import LoginWithGoogleRequest from "@/domain/resquest/loginWithGoogle.request.ts";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8001/api/auth/v1/" });

export const authenticationApi = createApi({
	reducerPath: "authenticationApi",
	baseQuery,
	endpoints: (build) => ({
		login: build.mutation<ApiResponse<LoginResponse>, LoginRequest>({
			query: (request) => ({
				url: "/login",
				method: "POST",
				body: request,
				credentials: "include",
			}),
		}),
		loginWithGoogle: build.mutation<ApiResponse<LoginResponse>, LoginWithGoogleRequest>({
			query: (request) => ({
				url: "/google/login",
				method: "POST",
				body: request,
				credentials: "include",
			}),
		}),
	}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLoginWithGoogleMutation } = authenticationApi;
