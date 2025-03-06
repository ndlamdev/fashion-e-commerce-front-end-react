/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:06PM - 05/03/2025
 *  User: lam-nguyen
 **/

import type { SVGProps } from "react";

export function LucideSearch(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
			<g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'>
				<circle cx={11} cy={11} r={8}></circle>
				<path d='m21 21l-4.3-4.3'></path>
			</g>
		</svg>
	);
}
