/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:39 AM - 16/04/2025
 *  User: Lam Nguyen
 **/

import type { SVGProps } from "react";

export function HumbleiconsPlusCircle(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
			<g fill='none' stroke='currentColor' strokeWidth={2}>
				<path strokeLinecap='round' d='M12 16V8m4 4H8'></path>
				<path d='M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z'></path>
			</g>
		</svg>
	);
}
