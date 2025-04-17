/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:28PM - 26/03/2025
 * User: lam-nguyen
 **/
import EmailResponse from "@/domain/response/email.response.ts";
import RegisterRequest from "@/domain/resquest/register.request.ts";
import api from "@/configs/axios.config.ts";
import AxiosResponseCustom, { ApiResponse } from "@/domain/ApiResponse.ts";
import OtpRequest from "@/domain/resquest/otp.request.ts";
import EmailRequest from "@/domain/resquest/email.request.ts";
import { toast } from "sonner";
import { AxiosError } from "axios";
import AxiosErrorCustom from "@/domain/ApiResponseError.ts";
import SessionStorage from "@/utils/SessionStorage.ts";
import TokenResponse from "@/domain/response/token.response.ts";
import NewPasswordRequest from "@/domain/resquest/newPassword.request.ts";
import LoginResponse from "@/domain/response/login.response.ts";
import LocalStorage from "@/utils/LocalStorage.ts";
import LoginRequest from "@/domain/resquest/login.request.ts";

const PATH_BASE_URL = "/v1/auth";

async function register(request: RegisterRequest): Promise<EmailResponse> {
	return api
		.post<any, AxiosResponseCustom<EmailResponse>, RegisterRequest>(PATH_BASE_URL + "/register", request)
		.then((result) => {
			SessionStorage.setValue("EMAIL_REGISTER", request.email);
			return result.data.data;
		})
		.catch((error) => {
			if (error instanceof AxiosError) {
				const err = error as AxiosErrorCustom<any>;
				const code = err.response?.data.code;
				if (code == 90003) {
					SessionStorage.setValue("EMAIL_REGISTER", request.email);
					return { email: request.email } as EmailResponse;
				} else {
					toast.error(err.response?.data.detail);
				}
			}
			return Promise.reject(error);
		});
}

async function verifyRegister(otp?: string): Promise<void> {
	const email = SessionStorage.getValue("EMAIL_REGISTER");
	if (!email || !otp) {
		toast.error("Otp request not found.");
		return Promise.reject("Otp request not found.");
	}

	return await api
		.post<any, AxiosResponseCustom<void>, OtpRequest>(PATH_BASE_URL + "/verify", {
			email: email,
			code: otp,
		})
		.then((result) => {
			toast.message(result.data.message);
			SessionStorage.deleteValue("EMAIL_REGISTER");
			return;
		})
		.catch((error) => {
			return showError(error);
		});
}

async function resendCodeVerify() {
	const email = SessionStorage.getValue("EMAIL_REGISTER");
	if (!email) {
		toast.message("Email request not found.");
		return Promise.reject("Email request not found.");
	}

	return await api
		.post<any, AxiosResponseCustom<void>, EmailRequest>(PATH_BASE_URL + "/resend-verify", {
			email: email,
		})
		.then((result) => {
			toast.message(result.data.message);
		})
		.catch(async (error) => {
			return showError(error);
		});
}

async function login(data: LoginRequest) {
	return await api
		.post<any, AxiosResponseCustom<LoginResponse>, LoginRequest>(PATH_BASE_URL + "/login", data, { withCredentials: true })
		.then((result) => {
			LocalStorage.setValue("ACCESS_TOKEN", result.data.data["access-token"]);
			toast.message(result.data.message);
		})
		.catch((error) => {
			return showError(error);
		});
}

async function logout() {
	return await api
		.post<any, AxiosResponseCustom<void>>(PATH_BASE_URL + "/logout", null, {
			headers: { Authorization: getAuthorizationToken() },
		})
		.then(() => {
			LocalStorage.deleteValue("ACCESS_TOKEN");
		});
}

async function renewAccessToken() {
	return await api.post<any, AxiosResponseCustom<TokenResponse>>(PATH_BASE_URL + "/renew-access-token").then((result) => {
		LocalStorage.setValue("ACCESS_TOKEN", result.data.data.token);
	});
}

async function greeting() {
	return await api
		.get<ApiResponse<string>>(PATH_BASE_URL, {
			headers: {
				Authorization: getAuthorizationToken(),
			},
		})
		.then((result) => {
			toast.message(result.data.data);
		});
}

async function resetPassword(email: string) {
	return await api
		.post<any, AxiosResponseCustom<void>, EmailRequest>(PATH_BASE_URL + "/reset-password", {
			email: email,
		})
		.then((result) => {
			toast.message(result.data.message);
			SessionStorage.setValue("EMAIL_FORGET_PASSWORD", email);
		})
		.catch(async (error) => {
			return showError(error);
		});
}

async function verifyResetPassword(otp: string) {
	return await api
		.post<any, AxiosResponseCustom<TokenResponse>, OtpRequest>(PATH_BASE_URL + "/reset-password/verify", {
			code: otp,
			email: SessionStorage.getValue("EMAIL_FORGET_PASSWORD") || "",
		})
		.then((result) => {
			SessionStorage.setValue("EMAIL_FORGET_PASSWORD", result.data.data.token);
			toast.message(result.data.message);
		})
		.catch((error) => {
			return showError(error);
		});
}

async function setNewPassword(request: Omit<NewPasswordRequest, "token">) {
	const email = SessionStorage.getValue("EMAIL_FORGET_PASSWORD");
	if (!email) {
		return Promise.reject("Email noi found!");
	}
	return await api
		.post<any, AxiosResponseCustom<void>, NewPasswordRequest>(PATH_BASE_URL + "/reset-password/set-new-password", {
			...request,
			token: email,
		})
		.then(async (result) => {
			SessionStorage.deleteValue("EMAIL_FORGET_PASSWORD");
			toast.message(result.data.message);
		})
		.catch(async (error) => {
			return showError(error);
		});
}

const showError = (error: any) => {
	if (error instanceof AxiosError) {
		const err = error as AxiosErrorCustom<any>;
		toast.error(err.response?.data.detail);
	} else {
		toast.error(error);
	}
	return Promise.reject(error);
};

const getAuthorizationToken = () => {
	return "Bearer " + LocalStorage.getValue("ACCESS_TOKEN") || "";
};

const authenticationService = {
	register,
	verifyRegister,
	resendCodeVerify,
	login,
	logout,
	renewAccessToken,
	setNewPassword,
	verifyResetPassword,
	resetPassword,
	greeting,
};

export default authenticationService;
