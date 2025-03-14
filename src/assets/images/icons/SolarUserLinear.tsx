/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:44AM - 05/03/2025
 *  User: lam-nguyen
 **/

import type { SVGProps } from "react";

export function SolarUserLinear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} strokeWidth={1.5} viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor">
        <circle cx={12} cy={6} r={4}></circle>
        <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"></path>
      </g>
    </svg>
  );
}
