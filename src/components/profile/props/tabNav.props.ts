import { CSSProperties, MouseEventHandler, ReactNode } from "react";

export type TabNavProps = {
	title: string;
	to: string;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	style?: CSSProperties;
	tailwindStyle?: string
	onClick?: MouseEventHandler<HTMLAnchorElement> ;
}


