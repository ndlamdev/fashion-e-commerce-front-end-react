/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 08:37:25 - 13/03/2025
 *  User: lam-nguyen
 **/

import { formatCurrency } from "@/utils/format-data.ts";
import ShoppingBagItemType from "@/types/ShoppingBagItemType.ts";

function ShoppingBagItem({ image, name, price, discount, amount, color, size }: ShoppingBagItemType) {
	return (
		<div className={"flex gap-4 items-center"}>
			<img className={"h-1/6 w-25 rounded-xl"} src={image} alt='img.png' />
			<div className={"w-full "}>
				<div className={"flex justify-between flex-nowrap items-center"}>
					<p className={"overflow-hidden font-bold text-[0.8rem]"}>{name}</p>
					<button>x</button>
				</div>
				<p className={"text-[0.8rem]"}>
					{color} / {size}
				</p>
				<div className={"flex gap-2 items-end mt-2"}>
					<p className={"text-[1.25rem]"}>{discount ? formatCurrency(discount) : formatCurrency(price)}</p>
					{discount && <p className={"text-[0.9rem] line-through text-gray-400"}>{formatCurrency(price)}</p>}
				</div>
				<p className={"text-[0.8rem] mt-[-5px]"}>x{amount}</p>
			</div>
		</div>
	);
}

export default ShoppingBagItem;
