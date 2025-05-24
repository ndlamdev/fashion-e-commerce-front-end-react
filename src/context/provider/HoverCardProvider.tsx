import { ReactNode, useState } from "react";
import { HoverCardContext } from "@/context/HoverCardContext.ts";
import { HoverCardEnum } from "@/utils/enums/hoverCard.enum.ts";
import { Link } from "react-router";

type CardProps = {
	title: string
	description: string
	content: ReactNode
	footer: ReactNode

}

const HoverCardValues: Record<HoverCardEnum, Partial<CardProps>> = {
	[HoverCardEnum.NONE]: {},
	[HoverCardEnum.AMOUNT_SPENT]: {
		title: "Amount spent",
		description: "Total amount spent by this customer across all channels including taxes, discounts, refunds and shipping. Doesn’t include gift cards, tips, deleted and test orders.",
	},
	[HoverCardEnum.ORDERS]: {
		title: "Orders",
		description: "Total number of orders placed by this customer. Doesn’t include orders containing only gift cards, test orders, or deleted orders",
	},
	[HoverCardEnum.CUSTOMER_SINCE]: {
		title: "Customer since",
		description: "Total time that this person has been a customer of your store.",
	},
	[HoverCardEnum.RFM_GROUP]: {
		title: "RFM Group",
		description: "RFM groups are 11 predefined customer categories based on order recency, frequency, and monetary value criteria.",
		footer: <Link to={"#"} className={"text-sky-600 hover:underline py-2"}>Learning more</Link>,
	},
};

export default function HoverCardProvider({ children }: { children: ReactNode }) {
	const [type, setType] = useState<HoverCardEnum>(HoverCardEnum.NONE);
	return (
		<HoverCardContext.Provider
			value={{
				hoverCard: type,
				showHoverCard: (type) => setType(type),
			}}
		>
			{children}
		</HoverCardContext.Provider>
	);
}
export {HoverCardValues}