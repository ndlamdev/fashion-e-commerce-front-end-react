import { HoverCardEnum } from "@/utils/enums/hoverCard.enum.ts";
import { createContext } from "react";

type HoverCardContextProps = {
	hoverCard: HoverCardEnum
	showHoverCard: (popover: HoverCardEnum) => void;
}

export const HoverCardContext = createContext<HoverCardContextProps>({
	hoverCard: HoverCardEnum.NONE,
	showHoverCard: () => {}
})