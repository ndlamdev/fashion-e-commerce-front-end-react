/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { KeyboardEvent } from "react";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import RegisterRequest from "@/domain/resquest/register.request.ts";
import authenticationService from "@/services/authentication.service.ts";
import OtherLogin from "@/components/authentication/ui/OtherLogin.tsx";
import InputPassword from "@/components/authentication/ui/InputPassword.tsx";
import { hiddenDialog, showDialog, showDialogWithCallback } from "@/redux/slice/dialog.slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config";

function RegisterDialog() {
	const dispatch = useDispatch();
	const { dialog } = useSelector((state: RootState) => state.dialog);
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

	const registerHandler: SubmitHandler<RegisterRequest> = (data: RegisterRequest) => {
		authenticationService.register(data).then(() => {
			dispatch(showDialogWithCallback({ type: "input-otp", callback: "register" }));
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
		<Dialog open={dialog === "register"} onOpenChange={(value) => !value && dispatch(hiddenDialog())}>
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
								error={errors.full_name?.message}
								{...register("full_name", {
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
						<div className={"my-3"}>
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
						<InputPassword errors={errors} register={register} enterKeyHandler={enterKeyHandler} onClick={handleSubmit(registerHandler)} />
						<div className='auth-actions mt-2 flex w-full text-blue-800'>
							<a href='#' className='!tw-text-base !tw-text-cm-blue' onClick={() => dispatch(showDialog("login"))}>
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
