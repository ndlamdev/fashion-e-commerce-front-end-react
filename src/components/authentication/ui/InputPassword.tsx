import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import RegisterRequest from "@/domain/resquest/register.request";
import RegisterWithFacebookRequest from "@/domain/resquest/registerWithFacebook.request";
import { KeyboardEvent } from "react";

function InputPassword({
	enterKeyHandler,
	onClick,
	errors,
	register,
}: {
	errors: FieldErrors<RegisterRequest | RegisterWithFacebookRequest>;
	register: UseFormRegister<any>;
	enterKeyHandler: (event: KeyboardEvent<HTMLInputElement>) => void;
	onClick: () => void;
}) {
	return (
		<div className={"flex flex-col gap-3"}>
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
				error={errors.confirm_password?.message}
				{...register("confirm_password", {
					required: "Vui lòng nhập lại mật khẩu",
					validate: (value, formValues) => {
						if (value == formValues.password) return undefined;
						return "Mật khẩu nhập lại không chính xác";
					},
				})}
			/>
			<ButtonAuthentication onClick={onClick}>Đăng ký</ButtonAuthentication>
		</div>
	);
}

export default InputPassword;
