/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import OtherLogin from "@/components/authentication/ui/OtherLogin.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { RootState } from "@/configs/store.config.ts";
import LoginRequest from "@/domain/resquest/login.request.ts";
import { hiddenDialog, showDialog } from "@/redux/slice/dialog.slice";
import authenticationService from "@/services/authentication.service.ts";
import jwtHelper from "@/utils/helper/jwtHelper";
import { KeyboardEvent, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function LoginDialog() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.auth.login"
	});
	const { dialog } = useSelector((state: RootState) => state.dialog);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		trigger,
		getValues,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginRequest>();

	const naviagteToAdmin = useCallback((accessToken: string) => {
		const payload = jwtHelper.getPayload(accessToken);
		if (payload && payload.roles.includes("ROLE_ADMIN")) {
			navigate("/admin");
		}
	}, [navigate]);

	const onSubmit: SubmitHandler<LoginRequest> = useCallback(
		async (data) => {
			await authenticationService.login(data).then((data) => {
				dispatch(hiddenDialog());
				reset();
				naviagteToAdmin(data.data.access_token);
			});
		},
		[dispatch, reset, naviagteToAdmin],
	);

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

	return (
		<Dialog open={dialog === "login"} onOpenChange={(value) => {
			if (value) return;
			dispatch(hiddenDialog());
			reset();
		}}>
			<DialogContent className={"sm:max-w-[525px]"}
										 classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}>
				<DialogHeader>
					<DialogTitle className={"text-4xl"}>{t('login_now')}</DialogTitle>
					<DialogDescription className={"text-2xl font-bold text-black"}>{t('description')}</DialogDescription>
					<div className="flex gap-2">
						<div className="coolcash-x2-style-login-item">
							<img src="https://mcdn.coolmate.me/image/March2024/mceclip3_52.jpg" alt="" />
						</div>
						<div className="coolcash-x2-style-login-item">
							<img src="https://mcdn.coolmate.me/image/March2024/mceclip1_36.jpg" alt="" />
						</div>
						<div className="coolcash-x2-style-login-item">
							<img src="https://mcdn.coolmate.me/image/March2024/mceclip2_55.jpg" alt="" />
						</div>
					</div>
				</DialogHeader>
				<div className="grid gap-4 pt-4">
					<OtherLogin />
					<form id="login-form">
						<div className="tw-my-4 mb-5">
							<span className="tw-text-base tw-text-cm-gray text-gray-500">{t('login_method')}</span>
						</div>
						<div className={"flex flex-col gap-3"}>
							<div>
								<InputAuthentication
									onKeyDown={enterKeyHandler}
									type={"email"}
									placeholder={"Email"}
									error={errors.email?.message}
									{...register("email", {
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: t('invalid_email'),
										},
										required: t('invalid_email'),
									})}
								/>
							</div>
							<InputAuthentication onKeyDown={enterKeyHandler} type={"password"}
																	 placeholder={t('password')} {...register("password")} />
							<ButtonAuthentication onClick={handleSubmit(onSubmit)}>{t('login')}</ButtonAuthentication>
						</div>
						<div className="auth-actions mt-2 flex w-full justify-between text-blue-800">
							<a href="#" className="!tw-text-base !tw-text-cm-blue" onClick={() => dispatch(showDialog("register"))}>
								{t('register')}
							</a>
							<a href="#" className="!tw-text-base !tw-text-cm-blue"
								 onClick={() => dispatch(showDialog("forgot-password"))}>
								{t('forget_password')}
							</a>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default LoginDialog;
