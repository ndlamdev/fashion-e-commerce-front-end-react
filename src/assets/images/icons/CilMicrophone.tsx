/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:53 CH - 13/05/2025
 *  User: Administrator
 **/

import type { SVGProps } from "react";

export function CilMicrophone(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={512} height={512} viewBox='0 0 512 512' {...props}>
			<path
				fill='currentColor'
				d='M256 328a96.11 96.11 0 0 0 96-96V112a96 96 0 0 0-192 0v120a96.11 96.11 0 0 0 96 96m-64-216a64 64 0 0 1 128 0v120a64 64 0 0 1-128 0Z'></path>
			<path
				fill='currentColor'
				d='M400 176v56c0 79.4-64.6 144-144 144s-144-64.6-144-144v-56H80v56c0 91.653 70.424 167.154 160 175.265V496h32v-88.735c89.576-8.111 160-83.612 160-175.265v-56Z'></path>
		</svg>
	);
}
