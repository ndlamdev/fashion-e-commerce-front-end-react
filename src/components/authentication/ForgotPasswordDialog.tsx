/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { KeyboardEvent, useCallback, useContext } from "react";
import { DialogAuthContext } from "@/context/DialogAuthContext.tsx";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailRequest from "@/domain/resquest/email.request.ts";
import authenticationService from "@/services/authentication.service.ts";
import SessionStorage from "@/utils/helper/SessionStorage.ts";
import { AxiosError } from "axios";
import AxiosErrorCustom from "@/domain/ApiResponseError.ts";

function ForgotPasswordDialog() {
	const { showDialog, dialog } = useContext(DialogAuthContext);
	const {
		register,
		handleSubmit,
		reset,
		trigger,
		getValues,
		formState: { errors },
	} = useForm<EmailRequest>();

	const onVerifyHandler = useCallback(
		async (otp: string): Promise<void> => {
			return authenticationService.verifyResetPassword(otp).then(() => {
				showDialog("new-password");
			});
		},
		[showDialog],
	);

	const onResendHandler = useCallback(async () => {
		return authenticationService.resetPassword(SessionStorage.getValue("EMAIL_FORGET_PASSWORD") || "");
	}, []);

	const onSubmit: SubmitHandler<EmailRequest> = (data) => {
		authenticationService
			.resetPassword(data.email)
			.then(() => {
				showDialog("input-otp", { sendOtp: onVerifyHandler, resendOtp: onResendHandler });
				reset();
			})
			.catch((error) => {
				if (!(error instanceof AxiosError)) return;

				const err = error as AxiosErrorCustom<any>;
				if (err.response == null || err.response.data.code !== 90006) return;
				showDialog("input-otp", { sendOtp: onVerifyHandler, resendOtp: onResendHandler });
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
		<Dialog open={dialog === "forgot-password"} onOpenChange={(value) => !value && showDialog("none")}>
			<DialogContent
				aria-describedby={""}
				className={"sm:max-w-[525px]"}
				classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}>
				<DialogHeader>
					<DialogTitle className={"text-center text-4xl"}>Cấp lại mật khẩu</DialogTitle>
				</DialogHeader>
				<div className='grid gap-4'>
					<form className={"flex flex-col gap-3"}>
						<InputAuthentication
							onKeyDown={enterKeyHandler}
							type={"email"}
							placeholder={"Email của bạn"}
							error={errors.email?.message}
							{...register("email", {
								required: "Vui lòng nhập email hợp lệ",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Vui lòng nhập email hợp lệ",
								},
							})}
						/>
						<ButtonAuthentication onClick={handleSubmit(onSubmit)}>Kiểm tra</ButtonAuthentication>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ForgotPasswordDialog;
