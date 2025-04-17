/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { KeyboardEvent, useCallback, useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext.tsx";
import { LogosGoogleIcon } from "@/assets/images/icons/LogosGoogleIcon.tsx";
import { GgFacebook } from "@/assets/images/icons/GgFacebook.tsx";
import RegisterDialogProps from "@/components/authentication/props/registerDialog.props.ts";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import RegisterRequest from "@/domain/resquest/register.request.ts";
import authenticationService from "@/services/authentication.service.ts";

function RegisterDialog({ open }: RegisterDialogProps) {
	const { showDialog } = useContext(GlobalContext);
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
		<Dialog open={open} onOpenChange={(value) => !value && showDialog("none")}>
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
					<div className={"flex items-center gap-2"}>
						<p className={"font-bold text-gray-500"}>Đăng nhập bằng:</p>
						<button className={"rounded-lg border-1 border-black p-2"}>
							<LogosGoogleIcon width={35} height={35} />
						</button>
						<button className={"rounded-lg border-1 border-black p-1"}>
							<GgFacebook width={43} height={43} color={"#2959A7"} />
						</button>
					</div>
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
						<div className={"flex flex-col gap-3"}>
							<InputAuthentication
								type={"email"}
								placeholder={"Email của bạn"}
								onKeyDown={enterKeyHandler}
								error={errors.email?.message}
								{...register("email", {
									required: "Vui lòng nhập email hợp lệ",
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: "Vui lòng nhập email hợp lệ",
									},
								})}
							/>
							<InputAuthentication
								type='password'
								placeholder='Mật khẩu'
								onKeyDown={enterKeyHandler}
								error={errors.password?.message}
								{...register("password", {
									required: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
									pattern: {
										value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
									},
								})}
							/>
							<InputAuthentication
								type='password'
								placeholder='Nhập lại mật khẩu'
								onKeyDown={enterKeyHandler}
								error={errors["confirm-password"]?.message}
								{...register("confirm-password", {
									required: "Vui lòng nhập lại mật khẩu",
									validate: (value, formValues) => {
										if (value == formValues.password) return undefined;
										return "Mật khẩu nhập lại không chính xác";
									},
								})}
							/>
							<ButtonAuthentication onClick={handleSubmit(registerHandler)}>Đăng ký</ButtonAuthentication>
						</div>
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
