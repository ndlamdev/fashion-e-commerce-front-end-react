/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { KeyboardEvent } from "react";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailRequest from "@/domain/resquest/email.request.ts";
import authenticationService from "@/services/authentication.service.ts";
import { AxiosError } from "axios";
import AxiosErrorCustom from "@/domain/ApiResponseError.ts";
import { useDispatch, useSelector } from "react-redux";
import { hiddenDialog, showDialogWithCallback } from "@/redux/slice/dialog.slice";
import { RootState } from "@/configs/store.config.ts";
import { useTranslation } from "react-i18next";

function ForgotPasswordDialog() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.auth.new_password"
	});
	const dispatch = useDispatch();
	const { dialog } = useSelector((state: RootState) => state.dialog);
	const {
		register,
		handleSubmit,
		reset,
		trigger,
		getValues,
		formState: { errors },
	} = useForm<EmailRequest>();

	const onSubmit: SubmitHandler<EmailRequest> = (data) => {
		authenticationService
			.resetPassword(data.email)
			.then(() => {
				dispatch(showDialogWithCallback({ type: "input-otp", callback: "forget-password" }));
				reset();
			})
			.catch((error) => {
				if (!(error instanceof AxiosError)) return;

				const err = error as AxiosErrorCustom<any>;
				if (err.response == null || err.response.data.code !== 90006) return;
				dispatch(showDialogWithCallback({ type: "input-otp", callback: "forget-password" }));
				reset();
			});
	};

	const enterKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!event.key || event.key.toLowerCase() !== "enter") return;
		trigger().then((result) => {
			if (!result) return;
			const values = getValues();
			onSubmit(values);
		});
		event.preventDefault();
	};

	return (
		<Dialog open={dialog === "forgot-password"} onOpenChange={(value) => {
			if (value) return;
			dispatch(hiddenDialog());
			reset();
		}}>
			<DialogContent
				aria-describedby={""}
				className={"sm:max-w-[525px]"}
				classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}>
				<DialogHeader>
					<DialogTitle className={"text-center text-4xl"}>{t('title')}</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4">
					<form className={"flex flex-col gap-3"}>
						<InputAuthentication
							onKeyDown={enterKeyHandler}
							type={"email"}
							placeholder={t('your_email')}
							error={errors.email?.message}
							{...register("email", {
								required: t('invalid_email'),
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: t('invalid_email'),
								},
							})}
						/>
						<ButtonAuthentication onClick={handleSubmit(onSubmit)}>{t('watch')}</ButtonAuthentication>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ForgotPasswordDialog;
