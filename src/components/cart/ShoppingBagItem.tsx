/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 08:37:25 - 13/03/2025
 *  User: lam-nguyen
 **/

import { formatCurrency } from "@/utils/format-data.ts";
import ShoppingBagProps from "@/components/cart/props/shopping-bag-item.prop.ts";

function ShoppingBagItem({ image, name, price, discount, amount, color, size }: ShoppingBagProps) {
	return (
		<div className={"flex items-center gap-4"}>
			<img className={"h-1/6 w-25 rounded-xl"} src={image} alt='img.png' />
			<div className={"w-full"}>
				<div className={"flex flex-nowrap items-center justify-between"}>
					<p className={"overflow-hidden text-[0.8rem] font-bold"}>{name}</p>
					<button>x</button>
				</div>
				<p className={"text-[0.8rem]"}>
					{color} / {size}
				</p>
				<div className={"mt-2 flex items-end gap-2"}>
					<p className={"text-[1.25rem]"}>{discount ? formatCurrency(discount) : formatCurrency(price)}</p>
					{discount && <p className={"text-[0.9rem] text-gray-400 line-through"}>{formatCurrency(price)}</p>}
				</div>
				<p className={"mt-[-5px] text-[0.8rem]"}>x{amount}</p>
			</div>
		</div>
	);
}

export default ShoppingBagItem;
