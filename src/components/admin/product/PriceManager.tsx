/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:39 PM - 16/04/2025
 * User: kimin
 **/

import { Separator } from "@/components/ui/separator.tsx";
import { DetailedHTMLProps, HTMLAttributes, useContext, useState } from "react";
import CreateProductPageContext from "@/context/CreateProductPageContext.tsx";

export type PriceManagerProps = { price: number; compareAtPrice: number; costPerItem: number; profit: number; margin: number };

function PriceManager(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { onDataChange: (value: PriceManagerProps) => void }) {
	const createProductPageContext = useContext(CreateProductPageContext);
	const [data] = useState<PriceManagerProps>({ compareAtPrice: 0, margin: 0, costPerItem: 0, profit: 0, price: 0 });

	return (
		<div {...props}>
			<div className={"grid grid-cols-3 grid-rows-1 gap-3"}>
				<label className={"text-sm"}>
					<span>Price</span>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.price}
							onChange={(event) => {
								props.onDataChange({ ...data, price: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</label>
				<label className={"text-sm"}>
					<span>Compare-at price</span>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.compareAtPrice}
							onChange={(event) => {
								props.onDataChange({ ...data, compareAtPrice: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</label>
			</div>
			<Separator className={"my-5"} />
			<div className={"grid grid-cols-3 grid-rows-1 gap-3"}>
				<label className={"text-sm"}>
					<span>Cost per item</span>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.costPerItem}
							onChange={(event) => {
								props.onDataChange({ ...data, costPerItem: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</label>
				<div>
					<label className={"text-sm"}>
						<span>Profit</span>
						<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
							<span className={"text-decoration-underline"}>₫</span>
							<input
								type={"number"}
								min={0}
								placeholder={"0"}
								value={data.profit}
								onChange={(event) => {
									props.onDataChange({ ...data, profit: parseInt(event.target.value) });
								}}
								className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
						</div>
					</label>
				</div>
				<label className={"text-sm"}>
					<span>Margin</span>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.margin}
							onChange={(event) => {
								props.onDataChange({ ...data, margin: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</label>
			</div>
		</div>
	);
}

export default PriceManager;
