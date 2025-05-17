/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:45PM - 13/03/2025
 * User: lam-nguyen
 **/
import { useContext } from "react";
import { CartContext } from "@/context/CartContext.tsx";
import momo from "@/assets/images/icons/momo.png";
import zaloPay from "@/assets/images/icons/zalo-pay.png";
import { LaShippingFast } from "@/assets/images/icons/LaShippingFast";
import vnPay from "@/assets/images/icons/vn-pay.png";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { ArrowRight } from "lucide-react";
import CartItemType from "@/types/CartItemType.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";

function CartLayoutFooter() {
	const { payment, setShowConfirm, showConfirm } = useContext(CartContext);
	const cartItemsSelected = useSelector((state: RootState) => state.cartSlice.items);

	return (
		<div
			className={`fixed bottom-0 z-3 flex w-full flex-col md:flex-row`}
			style={{
				boxShadow: "0px -5px 20px 0px rgba(0,0,0,0.1)",
			}}>
			<ul className={`${showConfirm ? "flex" : "hidden"} size-full h-25 items-center justify-center bg-blue-50 md:flex`}>
				<li className={`${payment === "cash" ? "block" : "hidden"}`}>
					<div className='flex flex-col items-center gap-4 px-3 lg:flex-row'>
						<LaShippingFast width={40} height={40} />
						<p className={"text-center text-gray-700"}>Thanh toán khi nhận hàng</p>
					</div>
				</li>
				<li className={`${payment === "momo" ? "block" : "hidden"}`}>
					<div className='flex flex-col items-center gap-4 px-3 lg:flex-row'>
						<img src={momo} alt={"momo.png"} className={"h-13 w-13"} />
						<p className={"text-center text-gray-700"}>Thanh toán qua ví Momo</p>
					</div>
				</li>
				<li className={`${payment === "zalo-pay" ? "block" : "hidden"}`}>
					<div className='flex flex-col items-center gap-4 px-3 lg:flex-row'>
						<img src={zaloPay} alt={"zalo-pay.png"} className={"h-13 w-13 rounded-[0.5rem]"} />
						<p className={"text-center text-gray-700"}>Thanh toán qua ZaloPay</p>
					</div>
				</li>
				<li className={`${payment === "vn-pay" ? "block" : "hidden"}`}>
					<div className='flex flex-col items-center gap-4 px-3 lg:flex-row'>
						<img src={vnPay} alt={"vn-pay.png"} className={"h-13 w-13 rounded-[0.5rem]"} />
						<p className={"text-center text-gray-700"}>Thanh toán qua VnPay</p>
					</div>
				</li>
			</ul>
			<div className={"flex size-full h-25 items-center justify-between gap-2 bg-white px-5 sm:col-span-2 sm:justify-end"}>
				<div className={"text-start sm:text-end"}>
					<p className={"text-[0.9rem]"}>
						Thành tiền <span className={"text-[1.3rem] font-bold text-blue-700"}>{formatCurrency(totalRegularPrice(cartItemsSelected))}</span>
					</p>
					<p className={"text-[0.9rem] text-gray-600"}>
						Tiết kiệm {formatCurrency(totalComparePrice(cartItemsSelected) - totalRegularPrice(cartItemsSelected))}
					</p>
				</div>
				<button
					className={`${showConfirm ? "hidden" : "flex"} items-center rounded-full bg-gray-300 px-4 py-2 text-white md:hidden md:px-10 md:py-4`}
					onClick={() => setShowConfirm(true)}>
					Thanh toán
					<ArrowRight color={"white"} />
				</button>
				<button className={`${showConfirm ? "block" : "hidden"} rounded-full bg-gray-300 px-4 py-2 text-white md:block md:px-10 md:py-4`}>Thanh toán</button>
			</div>
		</div>
	);
}

export const totalRegularPrice = (cartItems: CartItemType[] | undefined) => {
	if (!cartItems) return 0;
	return cartItems.reduce((sum, item) => {
		return sum + item.variant.regular_price * item.quantity;
	}, 0);
};

export const totalComparePrice = (cartItems: CartItemType[] | undefined) => {
	if (!cartItems) return 0;
	return cartItems.reduce((sum, item) => {
		return sum + item.variant.compare_price * item.quantity;
	}, 0);
};

export default CartLayoutFooter;
