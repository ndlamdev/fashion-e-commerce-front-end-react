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
import { formatCurrency } from "@/utils/format-data.ts";

function CartLayoutFooter() {
	const { payment } = useContext(CartContext);

	return (
		<div
			className={"fixed bottom-0 z-3 grid h-25 w-full grid-cols-4 grid-rows-1"}
			style={{
				boxShadow: "0px -5px 20px 0px rgba(0,0,0,0.1)",
			}}>
			<div className={"col-span-2 hidden h-full bg-blue-50 sm:block"}>
				<ul className={"flex h-full items-center justify-center"}>
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
			</div>
			<div className={"col-span-4 flex h-full items-center justify-between gap-2 bg-white px-5 sm:col-span-2 sm:justify-end"}>
				<div className={"text-start sm:text-end"}>
					<p className={"text-[0.9rem]"}>
						Thành tiền <span className={"text-[1.3rem] font-bold text-blue-700"}>{formatCurrency(0)}</span>
					</p>
					<p className={"text-[0.9rem] text-gray-600"}>Tiết kiệm {formatCurrency(0)}</p>
				</div>
				<button className={"rounded-full bg-gray-300 px-4 py-2 text-white md:px-10 md:py-4"}>Thanh toán</button>
			</div>
		</div>
	);
}

export default CartLayoutFooter;
