/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:16AM - 24/03/2025
 *  User: lam-nguyen
 **/

import { createContext } from "react";
import DialogTypeEnum from "@/utils/dialog.type.enum.ts";
import { EventInputOTPDialog } from "@/components/authentication/props/InputOTPDialog.props.ts";

export const GlobalContext = createContext<{
	showDialog: (type: DialogTypeEnum, callbacks?: CallbackDialogProps) => void;
	callBacksDialog?: CallbackDialogProps;
	sheetAccount: (show: boolean) => void;
}>({
	showDialog: () => {},
	callBacksDialog: {},
	sheetAccount: () => {},
});

export type CallbackDialogProps = EventInputOTPDialog & {};
