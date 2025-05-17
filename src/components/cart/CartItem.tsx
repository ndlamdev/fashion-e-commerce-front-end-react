/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:19PM - 13/03/2025
 *  User: lam-nguyen
 **/
import { TablerPlus } from "@/assets/images/icons/TablerPlus.tsx";
import { TablerMinus } from "@/assets/images/icons/TablerMinus.tsx";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { Fa6RegularTrashCan } from "@/assets/images/icons/Fa6RegularTrashCan.tsx";
import CartItemProps from "@/components/cart/props/cart-item.prop.ts";

function CartItem({ product, variant, quantity, onDelete, onPlus, onMinute }: CartItemProps) {
	return (
		<div className={"flex h-55 items-center gap-3 border-b-1 border-gray-300 pt-4 pb-10"}>
			<input type={"checkbox"} className={"h-5 w-5 flex-none"} />
			<img src={"http://localhost:8004/api/resource/images/" + product.image.src} alt='image.png' className={"h-full w-33 rounded-xl"} />
			<div className={"flex h-full w-full flex-col justify-around"}>
				<div>
					<p>{product.title}</p>
					<p className={"text-sm text-gray-600"}>{Array.from(Object.values(variant.options)).join(" / ")}</p>
				</div>
				<div className={"grid grid-cols-1 grid-rows-subgrid gap-x-5 sm:grid-cols-2 sm:grid-rows-1"}>
					<div className={"flex flex-row flex-wrap items-end justify-end gap-x-5 gap-y-1 sm:flex-col sm:items-start"}>
						<div className={"flex w-full flex-none items-center justify-between gap-2 overflow-hidden rounded-full border-1 border-gray-300 p-2"}>
							<TablerMinus width={15} height={15} className={"cursor-pointer"} onClick={onMinute} />
							<p className={"text-center text-sm"}>{quantity}</p>
							<TablerPlus width={15} height={15} className={"cursor-pointer"} onClick={onPlus} />
						</div>
					</div>
					<div className={"mt-2 flex flex-wrap items-end justify-between gap-x-2 sm:flex-col sm:items-center md:mt-0"}>
						<p className={"mb-0 pb-0 text-end"}>{formatCurrency(variant.regular_price)}</p>
						{variant.compare_price !== variant.regular_price && (
							<p className={"text-end text-sm text-gray-400 line-through"}>{formatCurrency(variant.compare_price)}</p>
						)}
					</div>
				</div>
				<button className={"mt-2 flex cursor-pointer items-center justify-end gap-2 text-sm hover:text-red-600 sm:justify-start"} onClick={onDelete}>
					<Fa6RegularTrashCan width={13} height={13} />
					Xóa
				</button>
			</div>
		</div>
	);
}

export default CartItem;
