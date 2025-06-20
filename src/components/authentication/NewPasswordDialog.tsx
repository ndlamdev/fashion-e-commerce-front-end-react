/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { KeyboardEvent, useEffect, useState } from "react";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import InputAuthentication from "@/components/authentication/ui/InputAuthentication.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import NewPasswordRequest from "@/domain/resquest/newPassword.request.ts";
import authenticationService from "@/services/authentication.service.ts";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { hiddenDialog, showDialog } from "@/redux/slice/dialog.slice.ts";
import { useTranslation } from "react-i18next";

function ForgotPasswordDialog() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.auth.new_password"
	});
	const { dialog } = useSelector((state: RootState) => state.dialog);
	const dispatch = useDispatch();
	const [openDialog, setOpenDialog] = useState<"none" | "show-confirm" | "show-dialog">("none");
	const {
		register,
		handleSubmit,
		trigger,
		getValues,
		reset,
		formState: { errors },
	} = useForm<Omit<NewPasswordRequest, "token">>();

	const onSubmit: SubmitHandler<Omit<NewPasswordRequest, "token">> = (data) => {
		authenticationService.setNewPassword(data).then(() => {
			setOpenDialog("none");
			reset();
			dispatch(showDialog("login"));
		});
	};

	const enterKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (!event.key || event.key.toLowerCase() !== "enter") return;
		trigger().then((result) => {
			if (!result) return;
			const values = getValues();
			onSubmit(values);
		});
	};

	useEffect(() => {
		if (dialog == "new-password") setOpenDialog("show-dialog");
	}, [dialog]);

	return (
		<>
			<Dialog open={openDialog === "show-dialog"}>
				<DialogContent
					aria-describedby={""}
					className={"sm:max-w-[525px]"}
					classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}
					onClosed={() => setOpenDialog("show-confirm")}>
					<DialogHeader>
						<DialogTitle className={"text-center text-4xl"}>{t('title')}</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4">
						<form id="login-form" className={"flex flex-col gap-3"}>
							<InputAuthentication
								type="password"
								onKeyDown={enterKeyHandler}
								error={errors?.password?.message}
								placeholder={t("invalid_renter_password")}
								{...register("password", {
									required: t("invalid_renter_password"),
									pattern: {
										value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message: t('invalid_password'),
									},
								})}
							/>
							<InputAuthentication
								type="password"
								onKeyDown={enterKeyHandler}
								placeholder={t('renter_password')}
								error={errors?.confirm_password?.message}
								{...register("confirm_password", {
									required: t('invalid_renter_password'),
									validate: (value, formValues) => {
										if (value == formValues.password) return undefined;
										return t('incorrect_password');
									},
								})}
							/>
							<ButtonAuthentication onClick={handleSubmit(onSubmit)}>{t('submit')}</ButtonAuthentication>
						</form>
					</div>
				</DialogContent>
			</Dialog>
			<DialogConfirm
				open={openDialog === "show-confirm"}
				onOpenChange={(value) => !value && setOpenDialog("show-dialog")}
				onClickCancel={() => {
					setOpenDialog("show-dialog");
				}}
				onClickSubmit={() => {
					setOpenDialog("none");
					dispatch(hiddenDialog());
				}}
			/>
		</>
	);
}

export default ForgotPasswordDialog;
