/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:53 PM - 16/04/2025
 *  User: kimin
 **/

import type { SVGProps } from "react";

export function SolarInfoCircleLinear(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
			<g fill='none'>
				<circle cx={12} cy={12} r={10} stroke='currentColor' strokeWidth={props.strokeWidth}></circle>
				<path stroke='currentColor' strokeLinecap='round' strokeWidth={1.5} d='M12 17v-6'></path>
				<circle cx={1} cy={1} r={1} fill='currentColor' transform='matrix(1 0 0 -1 11 9)'></circle>
			</g>
		</svg>
	);
}
