/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:23 AM - 16/04/2025
 *  User: Lam Nguyen
 **/

import type { SVGProps } from "react";

export function SolarArrowLeftLinear(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
			<path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 12H4m0 0l6-6m-6 6l6 6'></path>
		</svg>
	);
}
