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
import AxiosErrorCustom, { ApiResponseError } from "@/domain/ApiResponseError.ts";
import SessionStorage from "@/utils/helper/SessionStorage.ts";
import TokenResponse from "@/domain/response/token.response.ts";
import NewPasswordRequest from "@/domain/resquest/newPassword.request.ts";
import LoginResponse from "@/domain/response/login.response.ts";
import LocalStorage from "@/utils/helper/LocalStorage.ts";
import LoginRequest from "@/domain/resquest/login.request.ts";
import LoginWithGoogleRequest from "@/domain/resquest/loginWithGoogle.request.ts";
import { authenticationApi } from "@/redux/query/authentication.query";
import { appDispatch } from "@/configs/store.config.ts";
import { loginSuccess } from "@/redux/slice/auth.slice.ts";
import RegisterWithGoogleRequest from "@/domain/resquest/registerWithGoogle.request.ts";
import RegisterWithFacebookRequest from "@/domain/resquest/registerWithFacebook.request";
import AccesTokenRequest from "@/domain/resquest/accesToken.request.ts";

const PATH_BASE_URL = "/auth/v1";

async function register(request: RegisterRequest): Promise<EmailResponse> {
	return api
		.post<any, AxiosResponseCustom<EmailResponse>, RegisterRequest>(PATH_BASE_URL + "/register", request)
		.then((result) => {
			SessionStorage.setValue("EMAIL_REGISTER", request.email);
			return result.data.data;
		})
		.catch((error) => {
			if (error instanceof AxiosError) {
				if (!error.response) {
					toast.error(error.message);
				} else {
					const err = error as AxiosErrorCustom<any>;
					const code = err.response?.data.code;
					if (code == 90013) {
						SessionStorage.setValue("EMAIL_REGISTER", request.email);
						return { email: request.email } as EmailResponse;
					} else {
						toast.error(err.response?.data.detail || err.response?.data?.error);
					}
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
			const token = result.data.data["access-token"];
			const user = result.data.data.user;
			appDispatch(loginSuccess({ access_token: token, user: user }));
			LocalStorage.setValue("ACCESS_TOKEN", token);
			LocalStorage.setObjectValue("USER", user);
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
	SessionStorage.setValue("EMAIL_FORGET_PASSWORD", email);
	return await api
		.post<any, AxiosResponseCustom<void>, EmailRequest>(PATH_BASE_URL + "/reset-password", {
			email: email,
		})
		.then((result) => {
			toast.message(result.data.message);
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
			SessionStorage.deleteValue("EMAIL_FORGET_PASSWORD");
			SessionStorage.setValue("TOKEN_RESET_PASSWORD", result.data.data.token);
			toast.message(result.data.message);
		})
		.catch((error) => {
			return showError(error);
		});
}

async function setNewPassword(request: Omit<NewPasswordRequest, "token">) {
	const token = SessionStorage.getValue("TOKEN_RESET_PASSWORD");
	if (!token) {
		toast.message("Token noi found!");
		return Promise.reject();
	}
	return await api
		.post<any, AxiosResponseCustom<void>, NewPasswordRequest>(PATH_BASE_URL + "/reset-password/set-new-password", {
			...request,
			token: token,
		})
		.then(async (result) => {
			SessionStorage.deleteValue("TOKEN_RESET_PASSWORD");
			toast.message(result.data.message);
		})
		.catch(async (error) => {
			return showError(error);
		});
}

const loginWithGoogle = async (data: LoginWithGoogleRequest) => {
	return await appDispatch(authenticationApi.endpoints.loginWithGoogle.initiate(data, { track: false })).then(({ data, error }) => {
		if (error) {
			return Promise.reject(error);
		}

		const token = data.data["access-token"];
		appDispatch(loginSuccess({ access_token: token, user: data.data.user }));
		LocalStorage.setValue("ACCESS_TOKEN", token);
		LocalStorage.setObjectValue("USER", data.data.user);
	});
};

const registerWithGoogle = async (data: RegisterWithGoogleRequest) => {
	const token = SessionStorage.getValue("REGISTER_TOKEN_USING_GOOGLE");
	if (!token) {
		toast.message("Don't have any token");
		return Promise.reject({
			code: 90000012,
			error: "Don't have any token",
			detail: "Don't have any token",
		} as ApiResponseError<string>);
	}
	data["register-token"] = token;
	return await appDispatch(authenticationApi.endpoints.registerWithGoogle.initiate(data, { track: false })).then(({ error }) => {
		if (error) {
			const response = (error as any).data as ApiResponseError<string>;
			toast.message(response.detail);
			return Promise.reject(error);
		}
		SessionStorage.deleteValue("REGISTER_TOKEN_USING_GOOGLE");
		toast.message("Register success!");
	});
};

const registerWithFacebook = async (data: RegisterWithFacebookRequest) => {
	const token = SessionStorage.getValue("REGISTER_TOKEN_USING_FACEBOOK");
	if (!token) {
		toast.message("Don't have any token");
		return Promise.reject({
			code: 90000013,
			error: "Don't have any token",
			detail: "Don't have any token",
		} as ApiResponseError<string>);
	}
	data["register-token"] = token;
	return await appDispatch(authenticationApi.endpoints.registerWithFacebook.initiate(data, { track: false })).then(({ error }) => {
		if (error) {
			SessionStorage.deleteValue("REGISTER_TOKEN_USING_FACEBOOK");
			const response = (error as any).data as ApiResponseError<string>;
			toast.message(response.detail || response.error);
			return Promise.reject(error);
		}
		SessionStorage.deleteValue("REGISTER_TOKEN_USING_FACEBOOK");
		toast.message("Register success!");
	});
};

const loginWithFacebook = async (data: AccesTokenRequest) => {
	return await appDispatch(authenticationApi.endpoints.loginWithFacebook.initiate(data, { track: false })).then(({ data, error }) => {
		if (error) {
			return Promise.reject(error);
		}

		const token = data.data["access-token"];
		appDispatch(loginSuccess({ access_token: token, user: data.data.user }));
		LocalStorage.setValue("ACCESS_TOKEN", token);
		LocalStorage.setObjectValue("USER", data.data.user);
	});
};

const showError = (error: any) => {
	if (error instanceof AxiosError) {
		const err = error as AxiosErrorCustom<any>;
		toast.error(err.response?.data.detail || err.response?.data.error);
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
	loginWithGoogle,
	registerWithGoogle,
	loginWithFacebook,
	registerWithFacebook,
};

export default authenticationService;
