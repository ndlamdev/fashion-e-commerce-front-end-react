/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { KeyboardEvent, useCallback, useContext, useEffect } from "react";
import { DialogAuthContext } from "@/context/DialogAuthContext.tsx";
import { LogosGoogleIcon } from "@/assets/images/icons/LogosGoogleIcon.tsx";
import { GgFacebook } from "@/assets/images/icons/GgFacebook.tsx";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import LoginRequest from "@/domain/resquest/login.request.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import authenticationService from "@/services/authentication.service.ts";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginWithGoogleMutation } from "@/redux/query/authentication.query.ts";

function LoginDialog() {
	const [loginWithGoogleApi, loginWithGoogleApiResult] = useLoginWithGoogleMutation();
	const { showDialog, dialog } = useContext(DialogAuthContext);
	const navigation = useNavigate();
	const {
		register,
		trigger,
		getValues,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginRequest>();

	const onSubmit: SubmitHandler<LoginRequest> = useCallback(
		async (data) => {
			await authenticationService.login(data).then(() => {
				showDialog("none");
				navigation("/test");
				reset();
			});
		},
		[navigation, reset, showDialog],
	);

	useEffect(() => {
		if (!loginWithGoogleApiResult.isError) return;
		console.error("Error: ", loginWithGoogleApiResult.error);
	}, [loginWithGoogleApiResult.error, loginWithGoogleApiResult.isError]);

	useEffect(() => {
		if (!loginWithGoogleApiResult.isSuccess) return;
		showDialog("none");
	}, [loginWithGoogleApiResult.data, loginWithGoogleApiResult.isSuccess, showDialog]);

	const enterKeyHandler = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (!event.key || event.key.toLowerCase() !== "enter") return;
			trigger().then((result) => {
				if (!result) return;
				const values = getValues();
				onSubmit(values);
			});
		},
		[getValues, onSubmit, trigger],
	);

	const login = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			console.log(tokenResponse);
			loginWithGoogleApi({ "auth-code": tokenResponse.code });
		},
		onError: (errorResponse) => console.log(errorResponse),
		flow: "auth-code",
	});

	return (
		<Dialog open={dialog === "login"} onOpenChange={(value) => !value && showDialog("none")}>
			<DialogContent className={"sm:max-w-[525px]"} classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}>
				<DialogHeader>
					<DialogTitle className={"text-4xl"}>Đăng nhập ngay</DialogTitle>
					<DialogDescription className={"text-2xl font-bold text-black"}>Rất nhiều đặc quyền và quyền lợi mua sắm đang chờ bạn</DialogDescription>
					<div className='flex gap-2'>
						<div className='coolcash-x2-style-login-item'>
							<img src='https://mcdn.coolmate.me/image/March2024/mceclip3_52.jpg' alt='' />
						</div>
						<div className='coolcash-x2-style-login-item'>
							<img src='https://mcdn.coolmate.me/image/March2024/mceclip1_36.jpg' alt='' />
						</div>
						<div className='coolcash-x2-style-login-item'>
							<img src='https://mcdn.coolmate.me/image/March2024/mceclip2_55.jpg' alt='' />
						</div>
					</div>
				</DialogHeader>
				<div className='grid gap-4 pt-4'>
					<div className={"flex items-center gap-2"}>
						<p className={"font-bold text-gray-500"}>Đăng nhập bằng:</p>
						<button className={"rounded-lg border-1 border-black p-2"} onClick={() => login()}>
							<LogosGoogleIcon width={35} height={35} />
						</button>
						<button className={"rounded-lg border-1 border-black p-1"}>
							<GgFacebook width={43} height={43} color={"#2959A7"} />
						</button>
					</div>
					<form id='login-form'>
						<div className='tw-my-4 mb-5'>
							<span className='tw-text-base tw-text-cm-gray text-gray-500'>Hoặc đăng nhập tài khoản:</span>
						</div>
						<div className={"flex flex-col gap-3"}>
							<div>
								<InputAuthentication
									onKeyDown={enterKeyHandler}
									type={"email"}
									placeholder={"Email của bạn"}
									error={errors.email?.message}
									{...register("email", {
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: "Vui lòng nhập email hợp lệ",
										},
										required: "Vui lòng nhập email hợp lệ",
									})}
								/>
							</div>
							<InputAuthentication onKeyDown={enterKeyHandler} type={"password"} placeholder={"Mật khẩu"} {...register("password")} />
							<ButtonAuthentication onClick={handleSubmit(onSubmit)}>Đăng nhập</ButtonAuthentication>
						</div>
						<div className='auth-actions mt-2 flex w-full justify-between text-blue-800'>
							<a
								href='#'
								className='!tw-text-base !tw-text-cm-blue'
								onClick={() => {
									showDialog("register");
								}}>
								Đăng ký
							</a>
							<a
								href='#'
								className='!tw-text-base !tw-text-cm-blue'
								onClick={() => {
									showDialog("forgot-password");
								}}>
								Quên mật khẩu
							</a>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default LoginDialog;
