/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:39 PM - 18/04/2025
 *  User: kimin
 **/
import { ReactNode, useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginDialog from "@/components/authentication/LoginDialog.tsx";
import RegisterDialog from "@/components/authentication/RegisterDialog.tsx";
import RegisterWithGoogleDialog from "@/components/authentication/RegisterWithGoogleDialog.tsx";
import ForgotPasswordDialog from "@/components/authentication/ForgotPasswordDialog.tsx";
import NewPasswordDialog from "@/components/authentication/NewPasswordDialog.tsx";
import InputOTPDialog from "@/components/authentication/InputOTPDialog.tsx";
import RegisterWithFacebookDialog from "@/components/authentication/RegisterWithFacebookDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { showDialogWithCallback } from "@/redux/slice/dialog.slice.ts";

function DialogAuthProvider({ children }: { children: ReactNode }) {
	const { dialog } = useSelector((state: RootState) => state.dialog);
	const dispatch = useDispatch();
	const [dialogReactNode, setDialogReactNode] = useState<ReactNode>();

	useEffect(() => {
		switch (dialog) {
			case "forgot-password":
				setDialogReactNode(<ForgotPasswordDialog />);
				break;
			case "login":
				setDialogReactNode(<LoginDialog />);
				break;
			case "register":
				setDialogReactNode(<RegisterDialog />);
				break;
			case "register-with-google":
				setDialogReactNode(<RegisterWithGoogleDialog />);
				break;
			case "input-otp":
				setDialogReactNode(<InputOTPDialog />);
				break;
			case "new-password":
				setDialogReactNode(<NewPasswordDialog />);
				break;
			case "register-with-facebook":
				setDialogReactNode(<RegisterWithFacebookDialog />);
				break;
		}
	}, [dialog]);

	return (
		<Dialog open={dialog !== "none"} onOpenChange={(value) => !value && dispatch(showDialogWithCallback({ type: "none" }))}>
			{children}
			<GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_KEY || ""}>{dialogReactNode}</GoogleOAuthProvider>
		</Dialog>
	);
}

export default DialogAuthProvider;
