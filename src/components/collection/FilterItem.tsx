import { FilterProps } from "@/components/collection/props/filter.props.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { X } from "lucide-react";

export default function FilterItem(props: FilterProps) {
	return (
		<>
			<Badge
				key={props.id}
				className={"flex cursor-pointer items-center space-x-2 rounded-sm border-1 border-gray-200 bg-white p-1 text-xs text-gray-500 lg:text-sm xl:text-base"}>
				<span>{props.name}</span>
				<X className={"size-5! text-red-900"} onClick={() => props.onDelete} />
			</Badge>
		</>
	);
}

export function FilterReducer(items: FilterProps[], action: { payload: FilterProps; type: string }) {
	switch (action.type) {
		case "add": {
			return [...items, action.payload];
		}
		case "deleted": {
			console.log("dispatched run");
			return items.filter((item) => item.id !== action.payload.id);
		}
		case "clear": {
			console.log("dispatched clear");
			return (items = []);
		}
		default: {
			throw new Error("Unknown action type" + action.type);
		}
	}
}
