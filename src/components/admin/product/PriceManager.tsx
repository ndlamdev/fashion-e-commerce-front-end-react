/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:39 PM - 16/04/2025
 * User: kimin
 **/

import { Separator } from "@/components/ui/separator.tsx";
import { useContext, useState } from "react";
import CreateProductPageContext from "@/context/CreateProductPageContext.tsx";

export type PriceManagerProps = { price: number; compareAtPrice: number; costPerItem: number; profit: number; margin: number };

function PriceManager({ onDataChange }: { onDataChange: (value: PriceManagerProps) => void }) {
	const createProductPageContext = useContext(CreateProductPageContext);
	const [data] = useState<PriceManagerProps>({ compareAtPrice: 0, margin: 0, costPerItem: 0, profit: 0, price: 0 });

	return (
		<>
			<div className={"grid grid-cols-3 grid-rows-1 gap-3"}>
				<div>
					<label htmlFor='product-price' className={"text-sm"}>
						Price
					</label>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							id={"product-price"}
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.price}
							onChange={(event) => {
								onDataChange({ ...data, price: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</div>
				<div>
					<label htmlFor='product-compare-at-price' className={"text-sm"}>
						Compare-at price
					</label>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							id={"product-compare-at-price"}
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.compareAtPrice}
							onChange={(event) => {
								onDataChange({ ...data, compareAtPrice: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</div>
			</div>
			<Separator className={"my-5"} />
			<div className={"grid grid-cols-3 grid-rows-1 gap-3"}>
				<div>
					<label htmlFor='product-price' className={"text-sm"}>
						Cost per item
					</label>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							id={"product-cost-per-item"}
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.costPerItem}
							onChange={(event) => {
								onDataChange({ ...data, costPerItem: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</div>
				<div>
					<label htmlFor='product-compare-at-price' className={"text-sm"}>
						Profit
					</label>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							id={"product-profit"}
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.profit}
							onChange={(event) => {
								onDataChange({ ...data, profit: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</div>
				<div>
					<label htmlFor='product-price' className={"text-sm"}>
						Margin
					</label>
					<div className={`mt-1 flex items-center gap-1 rounded-md px-3 py-2 text-sm ${createProductPageContext.borderStyle}`}>
						<span className={"text-decoration-underline"}>₫</span>
						<input
							id={"product-margin"}
							type={"number"}
							min={0}
							placeholder={"0"}
							value={data.margin}
							onChange={(event) => {
								onDataChange({ ...data, margin: parseInt(event.target.value) });
							}}
							className={"w-full border-0 shadow-none outline-none focus:outline-none"}></input>
					</div>
				</div>
			</div>
		</>
	);
}

export default PriceManager;
