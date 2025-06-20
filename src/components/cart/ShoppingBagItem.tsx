/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 08:37:25 - 13/03/2025
 *  User: lam-nguyen
 **/

import { formatCurrency } from "@/utils/helper/format-data.ts";
import ShoppingBagProps from "@/components/cart/props/shopping-bag-item.prop.ts";
import { useCallback } from "react";
import cartService from "@/services/cart.service.ts";

function ShoppingBagItem({ id, product, variant, quantity }: ShoppingBagProps) {
	const deleteCartItem = useCallback((id: number) => {
		cartService.deleteCartItem(id).then();
	}, []);

	return (
		<div className={"flex items-center gap-4"}>
			<img className={"h-1/6 w-25 rounded-xl"} loading={"lazy"} src={import.meta.env.VITE_BASE_MEDIA_URL + product.image.src} alt='img.png' />
			<div className={"w-full"}>
				<div className={"flex flex-nowrap items-center justify-between"}>
					<p className={"overflow-hidden text-[0.8rem] font-bold"}>{product.title}</p>
					<button
						className={
							"flex h-[28px] w-[28px] items-center justify-center rounded-full border-1 border-white hover:border-black hover:bg-gray-200 hover:text-red-500"
						}
						onClick={() => deleteCartItem(id)}>
						x
					</button>
				</div>
				<p className={"text-[0.8rem]"}>{Array.from(Object.values(variant.options)).join(" / ")}</p>
				<div className={"mt-2 flex items-end gap-2"}>
					<p className={"text-[1.25rem]"}>{formatCurrency(variant.regular_price)}</p>
					{variant.compare_price !== variant.regular_price && (
						<p className={"text-[0.9rem] text-gray-400 line-through"}>{formatCurrency(variant.compare_price)}</p>
					)}
				</div>
				<p className={"mt-[-5px] text-[0.8rem]"}>x{quantity}</p>
			</div>
		</div>
	);
}

export default ShoppingBagItem;
