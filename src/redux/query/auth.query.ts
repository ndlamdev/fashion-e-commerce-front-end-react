/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:31 AM - 18/04/2025
 * User: kimin
 **/
import { createApi } from "@reduxjs/toolkit/query/react";
import LoginRequest from "@/domain/resquest/login.request.ts";
import LoginResponse from "@/domain/response/login.response.ts";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import LoginWithGoogleRequest from "@/domain/resquest/loginWithGoogle.request.ts";
import EmailResponse from "@/domain/response/email.response.ts";
import RegisterWithGoogleRequest from "@/domain/resquest/registerWithGoogle.request.ts";
import RegisterWithFacebookRequest from "@/domain/resquest/registerWithFacebook.request";
import AccessTokenRequest from "@/domain/resquest/accesToken.request.ts";
import { createBaseQueryWithDispatch } from "@/redux/query/baseQueryWithDispatch.ts";

export const authApi = createApi({
	reducerPath: "authenticationApi",
	baseQuery: createBaseQueryWithDispatch(import.meta.env.VITE_BASE_URL + "/auth/v1/"),
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
		registerWithGoogle: build.mutation<ApiResponse<EmailResponse>, RegisterWithGoogleRequest>({
			query: (request) => ({
				url: "/google/register",
				method: "POST",
				body: request,
			}),
		}),
		loginWithFacebook: build.mutation<ApiResponse<LoginResponse>, AccessTokenRequest>({
			query: (request) => ({
				url: "/facebook/login",
				method: "POST",
				body: request,
				credentials: "include",
			}),
		}),
		registerWithFacebook: build.mutation<ApiResponse<EmailResponse>, RegisterWithFacebookRequest>({
			query: (request) => ({
				url: "/facebook/register",
				method: "POST",
				body: request,
			}),
		}),
	}),
});
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLoginWithGoogleMutation } = authApi;
