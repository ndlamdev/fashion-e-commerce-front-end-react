/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { KeyboardEvent, useCallback, useContext } from "react";
import { DialogAuthContext } from "@/context/DialogAuthContext.tsx";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import RegisterRequest from "@/domain/resquest/register.request.ts";
import authenticationService from "@/services/authentication.service.ts";
import OtherLogin from "@/components/authentication/ui/OtherLogin.tsx";
import InputPassword from "@/components/authentication/ui/InputPassword.tsx";

function RegisterDialog() {
	const { showDialog, dialog } = useContext(DialogAuthContext);
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		trigger,
		formState: { errors },
	} = useForm<RegisterRequest>({
		resetOptions: {
			keepValues: false,
		},
	});

	const onVerifyHandler = useCallback(
		async (otp: string): Promise<void> => {
			return authenticationService.verifyRegister(otp).then(() => {
				showDialog("login");
			});
		},
		[showDialog],
	);

	const onResendHandler = useCallback(async () => {
		return authenticationService.resendCodeVerify();
	}, []);

	const registerHandler: SubmitHandler<RegisterRequest> = (data: RegisterRequest) => {
		authenticationService.register(data).then(() => {
			showDialog("input-otp", {
				sendOtp: onVerifyHandler,
				resendOtp: onResendHandler,
			});
			reset();
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
		<Dialog open={dialog === "register"} onOpenChange={(value) => !value && showDialog("none")}>
			<DialogContent className={"sm:max-w-[525px]"} classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}>
				<DialogHeader>
					<DialogTitle className={"text-4xl"}>Đăng ký ngay</DialogTitle>
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
				<div className={"scroll-show grid gap-4 overflow-y-scroll pt-4 sm:max-h-[350px]"}>
					<OtherLogin />
					<form id='login-form'>
						<div className='tw-my-4 mb-5'>
							<span className='tw-text-base tw-text-cm-gray text-gray-500'>Hoặc đăng ký tài khoản:</span>
						</div>
						<div className={"my-3 flex w-full flex-col gap-3 md:flex-row"}>
							<InputAuthentication
								type='text'
								placeholder='Tên của bạn'
								onKeyDown={enterKeyHandler}
								error={errors["full-name"]?.message}
								{...register("full-name", {
									required: "Vui lòng nhập họ tên của bạn",
								})}
							/>
							<InputAuthentication
								type='tel'
								placeholder='SĐT của bạn'
								onKeyDown={enterKeyHandler}
								error={errors.phone?.message}
								{...register("phone", {
									required: "Vui lòng nhập số điện thoại của bạn",
									minLength: {
										value: 10,
										message: "Vui lòng nhập số điện thoại của bạn",
									},
								})}
							/>
						</div>
						<InputPassword errors={errors} register={register} enterKeyHandler={enterKeyHandler} onClick={handleSubmit(registerHandler)} />
						<div className='auth-actions mt-2 flex w-full text-blue-800'>
							<a href='#' className='!tw-text-base !tw-text-cm-blue' onClick={() => showDialog("login")}>
								Đăng nhập
							</a>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default RegisterDialog;
