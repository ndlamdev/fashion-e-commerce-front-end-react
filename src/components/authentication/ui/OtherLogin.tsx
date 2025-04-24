import { useContext } from "react";
import { LogosGoogleIcon } from "@/assets/images/icons/LogosGoogleIcon.tsx";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GgFacebook } from "@/assets/images/icons/GgFacebook.tsx";
import { useGoogleLogin } from "@react-oauth/google";
import authenticationService from "@/services/authentication.service.ts";
import { ApiResponseError } from "@/domain/ApiResponseError.ts";
import SessionStorage from "@/utils/helper/SessionStorage.ts";
import { DialogAuthContext } from "@/context/DialogAuthContext";

function OtherLogin() {
	const { showDialog } = useContext(DialogAuthContext);

	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			await authenticationService
				.loginWithGoogle({ "auth-code": tokenResponse.code })
				.then(() => {
					showDialog("none");
				})
				.catch((error) => {
					const response = error.data as ApiResponseError<{ "register-token": string }>;
					switch (response.code) {
						case 90014:
							SessionStorage.setValue("REGISTER_TOKEN_USING_GOOGLE", response.detail["register-token"]);
							showDialog("register-with-google");
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
			.then(() => {
				showDialog("none");
			})
			.catch((error) => {
				const response = error.data as ApiResponseError<any>;
				switch (response.code) {
					case 90014:
						SessionStorage.setValue("REGISTER_TOKEN_USING_FACEBOOK", response?.detail?.["register-token"] || "");
						showDialog("register-with-facebook");
						break;
				}
			});
	};

	return (
		<div className={"flex items-center gap-2"}>
			<p className={"font-bold text-gray-500"}>Đăng nhập bằng:</p>
			<button className={"rounded-lg border-1 border-black p-2"} onClick={() => googleLogin()}>
				<LogosGoogleIcon width={35} height={35} />
			</button>
			<button className={"rounded-lg border-1 border-black p-1"}>
				<FacebookLogin
					appId={"1371816417281846"}
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
