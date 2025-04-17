/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:31AM - 24/03/2025
 * User: lam-nguyen
 **/
import LoginDialogProps from "@/components/authentication/props/loginDialog.props.ts";

type NewPasswordDialogProps = LoginDialogProps & {
	onSubmit?: () => Promise<object | undefined | number | void>;
	onResendHandle?: () => Promise<object | undefined | number | void>;
};

export default NewPasswordDialogProps;
