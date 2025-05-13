import DialogTypeEnum from "@/utils/enums/dialog.type.enum.ts";
import { createContext } from "react";

type DialogProfileContextProps = {
	showDialog: (type: DialogTypeEnum) => void;
	dialog: DialogTypeEnum;
};

export const DialogProductContext = createContext<DialogProfileContextProps>({
	showDialog: (type: DialogTypeEnum) => {
		console.log(type);
	},
	dialog: "none",
});
