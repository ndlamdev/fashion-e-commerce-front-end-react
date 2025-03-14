import type { SVGProps } from "react";

export function SolarMenuDotsLinear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} strokeWidth={1.5} height={24} viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor">
        <circle cx={5} cy={12} r={2}></circle>
        <circle cx={12} cy={12} r={2}></circle>
        <circle cx={19} cy={12} r={2}></circle>
      </g>
    </svg>
  );
}
