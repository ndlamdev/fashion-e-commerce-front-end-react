import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import RegisterRequest from "@/domain/resquest/register.request";
import RegisterWithFacebookRequest from "@/domain/resquest/registerWithFacebook.request";
import { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.auth.register"
	});
	return (
		<div className={"flex flex-col gap-3"}>
			<InputAuthentication
				type='password'
				placeholder={t('password')}
				onKeyDown={enterKeyHandler}
				error={errors.password?.message}
				{...register("password", {
					required: t('invalid_password'),
					pattern: {
						value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
						message: t('invalid_password'),
					},
				})}
			/>
			<InputAuthentication
				type='password'
				placeholder={t('renter_password')}
				onKeyDown={enterKeyHandler}
				error={errors.confirm_password?.message}
				{...register("confirm_password", {
					required: "Vui lòng nhập lại mật khẩu",
					validate: (value, formValues) => {
						if (value == formValues.password) return undefined;
						return t('invalid_renter_password');
					},
				})}
			/>
			<ButtonAuthentication onClick={onClick}>{t('register')}</ButtonAuthentication>
		</div>
	);
}

export default InputPassword;
