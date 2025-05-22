import { TabNavProps } from "@/components/profile/props/tabNav.props.ts";
import {
	BadgePercent,
	ChartNoAxesColumnIcon,
	CornerDownRight,
	HouseIcon,
	LucideShoppingBag,
	TagIcon,
	UserRoundIcon,
} from "lucide-react";
import { TabNav } from "@/components/profile/TabNav.tsx";
import { useLocation } from "react-router";
import AccordionCustom from "@/components/accordion/AccordionCustom.tsx";

export function VerticalMenu() {
	const { hash: tabIndex } = useLocation();
	return (
		<nav className={"p-3 bg-neutral-200"}>
			{
				Array.from(Object.keys(MenuValues)).map((key, index) => (
					<AccordionCustom showContent={Array.from(Object.keys(SubMenuValues)).filter((sub) => sub.at(0) == key).length > 0} key={index} showIcon={false} trigger={
						<TabNav style={{
							backgroundColor: tabIndex?.substring(1) == key? "#F5F5FA" : "",
						}} iconLeft={MenuValues[key].iconLeft} to={MenuValues[key].to} title={MenuValues[key].title}
										tailwindStyle={"p-1 my-1 bg-neutral-200 hover:bg-neutral-50 text-sx font-bold text-neutral-600"} />
					} styleContent={"bg-neutral-200 p-1 pl-4"} content={
					<>
						{Array.from(Object.keys(SubMenuValues)).filter((sub) => sub.at(0) == key).map((subKey) => (
						<div key={subKey}>
							<TabNav style={{
								backgroundColor: tabIndex?.substring(1) == subKey ? "#DDDDDD" : "",
							}} iconLeft={tabIndex?.substring(1) == subKey ? <CornerDownRight className={"text-neutral-500 "} /> : ""}
											to={SubMenuValues[subKey].to} title={SubMenuValues[subKey].title}
											tailwindStyle={"bg-neutral-200 text-neutral-600 hover:bg-neutral-100 rounded-lg p-1 my-1"} />
						</div>
						))}
					</>
					} className={"p-0 m-0 w-full"} />
				))
			}
		</nav>
	);
}

const MenuValues: Record<string, TabNavProps> = {
	"0": { title: "Home", to: "/admin", iconLeft: <HouseIcon /> },
	"1": { title: "Orders", to: "/admin/orders#1", iconLeft: <LucideShoppingBag /> },
	"2": { title: "Products", to: "/admin/products#2", iconLeft: <TagIcon /> },
	"3": { title: "Customers", to: "/admin/customers#3", iconLeft: <UserRoundIcon /> },
	"4": { title: "Discounts", to: "/admin/discount#4", iconLeft: <BadgePercent /> },
	"5": { title: "Analytics", to: "/admin/analytics#4", iconLeft: <ChartNoAxesColumnIcon /> },
};

const SubMenuValues: Record<string, TabNavProps> = {
	"10": { title: "Drafts", to: "/admin/orders/drafts#10" },
	"11": { title: "Abandoned checkouts", to: "/admin/orders/abandoned-checkouts#11" },
	"20": { title: "Collections", to: "/admin/products/collections#20" },
	"21": { title: "Inventory", to: "/admin/products/inventories#21" },
	"22": { title: "Purchase order", to: "/admin/products/purchase-order#22" },
	"30": { title: "Segments", to: "/admin/customers/segments#30" },
};
