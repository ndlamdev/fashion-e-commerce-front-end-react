import DialogTypeEnum from "@/utils/enums/dialog.type.enum.ts";
import { createContext } from "react";

export type DialogProfileContextProps = {
	showDialog: (type: DialogTypeEnum) => void;
	dialog: DialogTypeEnum;
};

export const DialogProfileContext = createContext<DialogProfileContextProps>({
	showDialog: (type: DialogTypeEnum) => {
		console.log("DialogProfileContext", type);
	},
	dialog: "none",
})