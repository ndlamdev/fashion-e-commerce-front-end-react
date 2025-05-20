/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:58 CH - 13/05/2025
 *  User: Administrator
 **/

import type { SVGProps } from "react";

export function SystemUiconsPicture(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={21} height={21} viewBox='0 0 21 21' {...props}>
			<g fill='none' fillRule='evenodd' transform='translate(3 3)'>
				<g stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.2}>
					<path d='M2.5.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2'></path>
					<path d='m14.5 10.5l-3-3l-3 2.985m4 4.015l-9-9l-3 3'></path>
				</g>
				<circle cx={11} cy={4} r={1} fill='currentColor'></circle>
			</g>
		</svg>
	);
}
