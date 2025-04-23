/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:39 PM - 18/04/2025
 *  User: kimin
 **/
import { CallbackDialogProps, DialogAuthContext } from "@/context/DialogAuthContext.tsx";
import DialogTypeEnum from "@/utils/enums/dialog.type.enum.ts";
import { ReactNode, useState } from "react";
import { Dialog } from "@/components/ui/dialog.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginDialog from "@/components/authentication/LoginDialog.tsx";
import RegisterDialog from "@/components/authentication/RegisterDialog.tsx";
import RegisterWithGoogleDialog from "@/components/authentication/RegisterWithGoogleDialog.tsx";
import ForgotPasswordDialog from "@/components/authentication/ForgotPasswordDialog.tsx";
import NewPasswordDialog from "@/components/authentication/NewPasswordDialog.tsx";
import InputOTPDialog from "@/components/authentication/InputOTPDialog.tsx";
import RegisterWithFacebookDialog from "@/components/authentication/RegisterWithFacebookDialog";

function DialogAuthProvider({ children }: { children: ReactNode }) {
	const [dialog, setDialog] = useState<DialogTypeEnum>("none");
	const [callbackDialog, setCallbackDialog] = useState<CallbackDialogProps | undefined>({});

	const renderContent = (dialog: DialogTypeEnum): ReactNode => {
		switch (dialog) {
			case "none":
				return <></>;
			case "forgot-password":
				return <ForgotPasswordDialog />;
			case "login":
				return <LoginDialog />;
			case "register":
				return <RegisterDialog />;
			case "register-with-google":
				return <RegisterWithGoogleDialog />;
			case "input-otp":
				return <InputOTPDialog />;
			case "new-password":
				return <NewPasswordDialog />;
			case "register-with-facebook":
				return <RegisterWithFacebookDialog />;
		}
	};

	return (
		<DialogAuthContext.Provider
			value={{
				showDialog: (type, callback) => {
					setDialog(type);
					setCallbackDialog(callback);
				},
				dialog: dialog,
				callBacksDialog: callbackDialog,
			}}>
			<Dialog open={dialog !== "none"} onOpenChange={(value) => !value && setDialog("none")}>
				{children}
				<GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_KEY || ""}>{renderContent(dialog)}</GoogleOAuthProvider>
			</Dialog>
		</DialogAuthContext.Provider>
	);
}

export default DialogAuthProvider;
