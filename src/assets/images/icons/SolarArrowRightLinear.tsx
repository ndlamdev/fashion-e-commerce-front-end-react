/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:21PM - 05/03/2025
 *  User: lam-nguyen
 **/
import type { SVGProps } from "react";

export function SolarArrowRightLinear(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
			<path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M4 12h16m0 0l-6-6m6 6l-6 6'
			></path>
		</svg>
	);
}
