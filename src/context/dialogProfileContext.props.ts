import DialogTypeEnum from "@/utils/enums/dialog.type.enum.ts";
import { createContext } from "react";

type DialogProfileContextProps = {
	showDialog: (type: DialogTypeEnum) => void;
	dialog: DialogTypeEnum;
};

export const DialogProfileContext = createContext<DialogProfileContextProps>({
	showDialog: () => {},
	dialog: "none",
})