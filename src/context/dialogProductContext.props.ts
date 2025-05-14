import { createContext } from "react";
import { DialogProfileContextProps } from "@/context/dialogProfileContext.props.ts";

type DialogProductContextProps = DialogProfileContextProps & {
};

export const DialogProductContext = createContext<DialogProductContextProps>({
	showDialog: () => {},
	dialog: "none",
})