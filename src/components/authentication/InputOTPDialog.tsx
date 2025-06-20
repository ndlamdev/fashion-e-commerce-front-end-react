/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:27AM - 24/03/2025
 *  User: lam-nguyen
 **/
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp.tsx";
import ButtonAuthentication from "@/components/authentication/ui/ButtonAuthentication.tsx";
import { useForm } from "react-hook-form";
import OTPRequest from "@/domain/resquest/otp.request.ts";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch, RootState } from "@/configs/store.config.ts";
import { hiddenDialog, showDialog } from "@/redux/slice/dialog.slice";
import EventInputOTPDialog from "@/components/authentication/props/InputOTPDialog.props.ts";
import authenticationService from "@/services/authentication.service.ts";
import SessionStorage from "@/utils/helper/SessionStorage.ts";
import { useTranslation } from "react-i18next";

const mapCallbacks: Record<"register" | "forget-password", EventInputOTPDialog> = {
	register: {
		sendOtp: async (otp: string): Promise<void> => {
			return authenticationService.verifyRegister(otp).then(() => {
				appDispatch(showDialog("login"));
			});
		},
		resendOtp: () => {
			return authenticationService.resendCodeVerify();
		},
	},
	"forget-password": {
		sendOtp: async (otp: string): Promise<void> => {
			return authenticationService.verifyResetPassword(otp).then(() => {
				appDispatch(showDialog("new-password"));
			});
		},
		resendOtp: () => {
			return authenticationService.resetPassword(SessionStorage.getValue("EMAIL_FORGET_PASSWORD") || "");
		},
	},
};

function InputOTPDialog() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.auth.otp"
	});
	const dispatch = useDispatch();
	const { dialog, callBacksDialog } = useSelector((state: RootState) => state.dialog);
	const [openDialog, setOpenDialog] = useState<"none" | "show-confirm" | "show-dialog">("none");
	const {
		setValue,
		setError,
		getValues,
		reset,
		formState: { errors },
	} = useForm<Omit<OTPRequest, "email">>({
		values: { code: "" },
	});

	useEffect(() => {
		if (dialog === "input-otp") setOpenDialog("show-dialog");
	}, [dialog]);

	const onSubmitHandler = async () => {
		const otp = getValues("code");
		if (!otp || otp.length < 6) {
			setError("code", { type: "minLength", message: t('invalid_opt') });
			return;
		}

		if (!callBacksDialog) return;
		await mapCallbacks[callBacksDialog]?.sendOtp?.(otp).then(() => {
			setOpenDialog("none");
		});
	};

	return (
		<>
			<Dialog open={openDialog == "show-dialog"}>
				<DialogContent
					className={"sm:max-w-[525px]"}
					aria-describedby={""}
					classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}
					onClosed={() => setOpenDialog("show-confirm")}>
					<DialogHeader>
						<DialogTitle className={"text-center text-4xl"}>{t('enter_otp')}</DialogTitle>
					</DialogHeader>
					<div className={"flex flex-col items-center"}>
						<InputOTP
							maxLength={6}
							onChange={(value) => {
								if (value.length == 6) setError("code", {});
								setValue("code", value);
							}}>
							<InputOTPGroup>
								<InputOTPSlot index={0} className={"size-12 text-lg"} />
								<InputOTPSlot index={1} className={"size-12 text-lg"} />
								<InputOTPSlot index={2} className={"size-12 text-lg"} />
								<InputOTPSlot index={3} className={"size-12 text-lg"} />
								<InputOTPSlot index={4} className={"size-12 text-lg"} />
								<InputOTPSlot index={5} className={"size-12 text-lg"} />
							</InputOTPGroup>
						</InputOTP>
						{errors.code && <small className={"mt-1 text-red-600"}>{errors.code.message}</small>}
					</div>
					<ButtonAuthentication onClick={onSubmitHandler}>{t('submit')}</ButtonAuthentication>
					<div className={"flex items-center gap-3"}>
						<p>{t('resend_opt')}:</p>
						<button
							className={"rounded-2xl border-1 border-black px-4 py-1 hover:border-white hover:bg-green-400 hover:text-white"}
							onClick={async () => {
								if (!callBacksDialog) return;
								await mapCallbacks[callBacksDialog]?.resendOtp?.().then();
							}}>
							Gửi
						</button>
					</div>
				</DialogContent>
			</Dialog>
			<DialogConfirm
				open={openDialog === "show-confirm"}
				onOpenChange={(value) => !value && dispatch(hiddenDialog())}
				onClickCancel={() => {
					setOpenDialog("show-dialog");
				}}
				onClickSubmit={() => {
					setOpenDialog("none");
					dispatch(hiddenDialog());
					reset();
				}}
			/>
		</>
	);
}

export default InputOTPDialog;
