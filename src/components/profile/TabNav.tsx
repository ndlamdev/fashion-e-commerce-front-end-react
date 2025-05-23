import { TabNavProps } from "@/components/profile/props/tabNav.props.ts";
import { Link } from "react-router";
import { cn } from "@/lib/utils.ts";
import { FC, memo } from "react";

const TabNav : FC<TabNavProps> = memo((props ) => {
	return (
		<Link onClick={props.onClick} to={props.to} style={props.style} className={cn(`w-full rounded-lg bg-white p-3 flex justify-between items-center`, props.tailwindStyle)}>
			<div className="flex items-center space-x-1">
				{props.iconLeft}
				<p className="text-base">{props.title}</p>
			</div>
			{props.iconRight}
		</Link>
	)
})


export { TabNav };