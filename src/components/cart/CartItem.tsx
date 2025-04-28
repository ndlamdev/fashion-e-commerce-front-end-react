/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:19PM - 13/03/2025
 *  User: lam-nguyen
 **/
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { TablerPlus } from "@/assets/images/icons/TablerPlus.tsx";
import { TablerMinus } from "@/assets/images/icons/TablerMinus.tsx";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { Fa6RegularTrashCan } from "@/assets/images/icons/Fa6RegularTrashCan.tsx";
import CartItemProps from "@/components/cart/props/cart-item.prop.ts";

function CartItem({ id, name, image, color, size, amount, colors, sizes, discount, price, onDelete, onPlus, onMinute }: CartItemProps) {
	return (
		<div className={"flex min-h-55 items-center gap-3 border-b-1 border-gray-300 pt-4 pb-10"}>
			<input type={"checkbox"} className={"h-5 w-5 flex-none"} />
			<img src={image} alt='image.png' className={"h-full w-33 rounded-xl"} />
			<div className={"flex h-full w-full flex-col justify-between align-bottom"}>
				<div>
					<p>{name}</p>
					<p className={"text-sm text-gray-600"}>
						{color} / {size}
					</p>
				</div>
				<div className={"grid grid-cols-1 grid-rows-subgrid sm:grid-cols-2 sm:grid-rows-1"}>
					<div className={"flex flex-row flex-wrap items-end justify-end gap-x-5 gap-y-1 sm:flex-col sm:items-start"}>
						<Select onValueChange={(_) => {}} defaultValue={"Tím"}>
							<SelectTrigger className='rounded-full border-0 bg-gray-200 px-3 py-0 text-black outline-none sm:w-auto'>
								<SelectValue className={"text-black"}>Tím</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{colors.map((color, index) => (
									<SelectItem value={color} key={`${id}_color_${index}`}>
										{color}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select onValueChange={(_) => {}} defaultValue={"XS"}>
							<SelectTrigger className='rounded-full border-0 bg-gray-200 px-3 py-0 text-black outline-none sm:w-auto'>
								<SelectValue className={"text-black"}>XS</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{sizes.map((size, index) => (
									<SelectItem value={color} key={`${id}_size_${index}`}>
										{size}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<button className={"hidden cursor-pointer items-center gap-2 text-sm hover:text-red-600 md:flex"} onClick={onDelete}>
							<Fa6RegularTrashCan width={13} height={13} />
							Xóa
						</button>
					</div>
					<div className={"mt-2 flex flex-col flex-wrap items-end justify-end gap-x-2 sm:flex-row sm:items-center md:mt-0"}>
						<div className={"flex min-w-20 flex-none items-center justify-between gap-2 overflow-hidden rounded-full border-1 border-gray-300 p-2"}>
							<TablerMinus width={15} height={15} className={"cursor-pointer"} onClick={onMinute} />
							<p className={"text-center text-sm"}>{amount}</p>
							<TablerPlus width={15} height={15} className={"cursor-pointer"} onClick={onPlus} />
						</div>
						<div className={"mt-2 flex flex-row flex-wrap items-end justify-end gap-x-2 sm:mt-0 md:flex-col"}>
							<p className={"mb-0 pb-0 text-end"}>{formatCurrency(discount ? discount : price)}</p>
							{discount && <p className={"text-end text-sm text-gray-400 line-through"}>{formatCurrency(price)}</p>}
						</div>
					</div>
					<button
						className={"mt-2 flex cursor-pointer items-center justify-end gap-2 text-sm hover:text-red-600 sm:justify-start md:hidden"}
						onClick={onDelete}>
						<Fa6RegularTrashCan width={13} height={13} />
						Xóa
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartItem;
