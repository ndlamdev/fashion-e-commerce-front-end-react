/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { KeyboardEvent, useEffect, useState } from "react";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import RegisterWithGoogleRequest from "@/domain/resquest/registerWithGoogle.request.ts";
import SessionStorage from "@/utils/helper/SessionStorage.ts";
import authenticationService from "@/services/authentication.service.ts";
import { ApiResponseError } from "@/domain/ApiResponseError.ts";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import OtherLogin from "@/components/authentication/ui/OtherLogin.tsx";
import InputPassword from "@/components/authentication/ui/InputPassword.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { hiddenDialog, showDialog } from "@/redux/slice/dialog.slice.ts";
import { useTranslation } from "react-i18next";

function RegisterWithGoogleDialog() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.auth.register"
	});
	const dispatch = useDispatch();
	const { dialog } = useSelector((state: RootState) => state.dialog);
	const [localDialog, setLocalDialog] = useState<"dialog" | "none" | "confirm">("none");
	const {
		register,
		handleSubmit,
		getValues,
		trigger,
		reset,
		formState: { errors },
	} = useForm<RegisterWithGoogleRequest>({
		resetOptions: {
			keepValues: false,
		},
	});

	useEffect(() => {
		if (dialog === "register-with-google") setLocalDialog("dialog");
	}, [dialog]);

	const registerHandler: SubmitHandler<RegisterWithGoogleRequest> = (data: RegisterWithGoogleRequest) => {
		authenticationService
			.registerWithGoogle(data)
			.then(() => {
				setLocalDialog("none");
				reset();
				dispatch(showDialog("login"));
			})
			.catch((error: ApiResponseError<string>) => {
				if (error.code == 90001) {
					setLocalDialog("none");
					reset();
					dispatch(showDialog("login"));
				}
			});
	};

	const enterKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!event.key || event.key.toLowerCase() !== "enter") return;
		trigger().then((result) => {
			if (!result) return;
			const values = getValues();
			registerHandler(values);
		});
	};

	return (
		<>
			<Dialog open={localDialog === "dialog"}>
				<DialogContent
					className={"sm:max-w-[525px]"}
					aria-describedby={""}
					classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}
					onClosed={() => setLocalDialog("confirm")}>
					<DialogHeader>
						<DialogTitle className={"text-4xl"}>{t('register_now')}</DialogTitle>
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
					<div className={"scroll-show grid gap-4 overflow-y-scroll pt-4 sm:max-h-[350px]"}>
						<OtherLogin />
						<form id="login-form">
							<div className="tw-my-4 mb-5">
								<span className="tw-text-base tw-text-cm-gray text-gray-500">{t('another_register')}:</span>
							</div>
							<div className={"my-3 flex w-full flex-col gap-3 md:flex-row"}>
								<InputAuthentication
									type="tel"
									placeholder={t('your_phone')}
									onKeyDown={enterKeyHandler}
									error={errors.phone?.message}
									{...register("phone", {
										required: t('invalid_phone'),
										minLength: {
											value: 10,
											message: t('invalid_phone'),
										},
									})}
								/>
							</div>
							<InputPassword errors={errors} register={register} enterKeyHandler={enterKeyHandler}
														 onClick={handleSubmit(registerHandler)} />
							<div className="auth-actions mt-2 flex w-full text-blue-800">
								<a href="#" className="!tw-text-base !tw-text-cm-blue" onClick={() => dispatch(showDialog("login"))}>
									{t('login')}
								</a>
							</div>
						</form>
					</div>
				</DialogContent>
			</Dialog>
			<DialogConfirm
				open={localDialog === "confirm"}
				onOpenChange={(value) => !value && dispatch(hiddenDialog())}
				onClickCancel={() => {
					setLocalDialog("dialog");
				}}
				onClickSubmit={() => {
					SessionStorage.deleteValue("REGISTER_TOKEN_USING_GOOGLE");
					setLocalDialog("none");
					dispatch(hiddenDialog());
					reset();
				}}
			/>
		</>
	);
}

export default RegisterWithGoogleDialog;
