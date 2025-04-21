/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:16AM - 24/03/2025
 *  User: lam-nguyen
 **/

import { createContext } from "react";
import DialogTypeEnum from "@/utils/enums/dialog.type.enum.ts";
import EventInputOTPDialog from "@/components/authentication/props/InputOTPDialog.props.ts";

export const DialogAuthContext = createContext<DialogAuthContextProps>({
	showDialog: () => {},
	callBacksDialog: {},
	dialog: "none",
});

type DialogAuthContextProps = {
	showDialog: (type: DialogTypeEnum, callbacks?: CallbackDialogProps) => void;
	callBacksDialog?: CallbackDialogProps;
	dialog: DialogTypeEnum;
};

export type CallbackDialogProps = EventInputOTPDialog & {};
