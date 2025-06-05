/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:03 PM - 16/04/2025
 *  User: Lam Nguyen
 **/

import type { SVGProps } from "react";

export function CodexMenu(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' {...props}>
			<path
				fill='none'
				stroke='currentColor'
				strokeLinecap='round'
				strokeWidth={2.6}
				d='M9.41 7.3H9.4m5.2 0h-.01M9.31 12H9.3m5.3 0h-.01m-5.18 4.7H9.4m5.2 0h-.01'></path>
		</svg>
	);
}
