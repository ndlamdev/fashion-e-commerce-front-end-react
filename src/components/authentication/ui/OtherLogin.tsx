import { LogosGoogleIcon } from "@/assets/images/icons/LogosGoogleIcon.tsx";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GgFacebook } from "@/assets/images/icons/GgFacebook.tsx";
import { useGoogleLogin } from "@react-oauth/google";
import authenticationService from "@/services/authentication.service.ts";
import { ApiResponseError } from "@/domain/ApiResponseError.ts";
import SessionStorage from "@/utils/helper/SessionStorage.ts";
import { useDispatch } from "react-redux";
import { hiddenDialog, showDialog } from "@/redux/slice/dialog.slice.ts";
import { useNavigate } from "react-router";
import jwtHelper from "@/utils/helper/jwtHelper";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

function OtherLogin() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.auth.login"
	});
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const naviagteToAdmin = useCallback((accessToken: string) => {
		const payload = jwtHelper.getPayload(accessToken);
		if (payload && payload.roles.includes("ROLE_ADMIN")) {
			navigate("/admin");
		}
	}, [navigate])

	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			await authenticationService
				.loginWithGoogle({ "auth_code": tokenResponse.code })
				.then((data) => {
					dispatch(hiddenDialog());
					naviagteToAdmin(data.data.access_token)
				})
				.catch((error) => {
					const response = error.data as ApiResponseError<{ "register_token": string }>;
					switch (response.code) {
						case 90014:
							SessionStorage.setValue("REGISTER_TOKEN_USING_GOOGLE", response.detail.register_token);
							dispatch(showDialog("register-with-google"));
							break;
					}
				});
		},
		onError: (errorResponse) => console.log(errorResponse),
		flow: "auth-code",
	});

	const facebookLogin = async (accessToken: string) => {
		await authenticationService
			.loginWithFacebook({ access_token: accessToken })
			.then((data) => {
				dispatch(hiddenDialog());
				naviagteToAdmin(data.data.access_token)
			})
			.catch((error) => {
				const response = error.data as ApiResponseError<any>;
				switch (response.code) {
					case 90014:
						SessionStorage.setValue("REGISTER_TOKEN_USING_FACEBOOK", response?.detail?.["register_token"] || "");
						dispatch(showDialog("register-with-facebook"));
						break;
				}
			});
	};

	return (
		<div className={"flex items-center gap-2"}>
			<p className={"font-bold text-gray-500"}>{t('login_by')}:</p>
			<button className={"rounded-lg border-1 border-black p-2"} onClick={() => googleLogin()}>
				<LogosGoogleIcon width={35} height={35} />
			</button>
			<button className={"rounded-lg border-1 border-black p-1"}>
				<FacebookLogin
					appId={import.meta.env.VITE_FACEBOOK_APP_ID}
					onSuccess={async (response) => {
						await facebookLogin(response.accessToken);
					}}
					dialogParams={{
						state: "facebookdirect",
						response_type: "code",
						redirect_uri: "https://www.facebook.com/connect/login_success.html",
					}}
					render={({ onClick }) => <GgFacebook onClick={onClick} width={43} height={43} color={"#2959A7"} />}
				/>
			</button>
		</div>
	);
}

export default OtherLogin;
