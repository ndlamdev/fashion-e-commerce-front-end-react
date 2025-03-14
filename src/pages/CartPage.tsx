/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:41AM - 13/03/2025
 *  User: lam-nguyen
 **/

import { useContext, useState } from "react";
import { useHorizontalScroll } from "@/utils/use-horizontal-scroll.ts";
import InformationCustomer from "@/components/cart/InformationCustomer.tsx";
import { CartContext } from "@/context/CartContext";
import { dataVouchers } from "@/assets/data/vouchers.ts";
import Voucher from "@/components/cart/Voucher";
import { Separator } from "@/components/ui/separator.tsx";
import { formatCurrency } from "@/utils/format-data.ts";
import CartItem from "@/components/cart/CartItem.tsx";
import dataCartItems from "@/assets/data/cart-items.ts";

function CartPage() {
	const [voucherRef, setVoucherRef] = useState<HTMLElement | null>(null);
	const { voucher, setVoucher } = useContext(CartContext);
	useHorizontalScroll(voucherRef);

	return (
		<main className={"mt-10 grid grid-cols-1 grid-rows-subgrid gap-10 overflow-hidden px-5 pb-40 lg:grid-cols-7 lg:grid-rows-1 lg:px-20"}>
			<div id={"left"} className={"order-2 hidden md:block lg:order-1 lg:col-span-4"}>
				<InformationCustomer />
			</div>
			<div id={"right"} className={"order-1 lg:order-2 lg:col-span-3"}>
				<h1 className={"mb-5 text-3xl font-[600]"}>Giỏ hàng</h1>
				<div className={"mt-5"}>
					<div className={"flex text-[0.8rem] text-gray-400 uppercase"}>
						<div className={"flex basis-full gap-2 sm:basis-8/12"}>
							<div className={"flex items-center gap-3"}>
								<input type='checkbox' className={"h-5 w-5"} />
								<p>tất cả sản phẩm</p>
							</div>
							<p>|</p>
							<p className={"m-0 cursor-pointer p-0"}>xoa tất cả</p>
						</div>
						<div className={"hidden basis-3/12 sm:block"}>số lượng</div>
						<div className={"hidden basis-1/12 sm:block"}>giá</div>
					</div>
					<ul>
						{dataCartItems.map((it) => (
							<li>
								<CartItem {...it} />
							</li>
						))}
					</ul>
					{/*<p className={"text-center"}>Giỏ hàng của bạn hiện đang trống.</p>*/}
				</div>
				<div className={"flex flex-col"}>
					<div
						className={"scroll-show mt-8 flex flex-nowrap gap-7 overflow-x-scroll pb-1"}
						ref={(ref) => {
							setVoucherRef(ref);
						}}>
						{dataVouchers.map((it) => (
							<Voucher {...it} key={it.code} onClick={() => setVoucher(it)} selected={it.code === voucher?.code} />
						))}
					</div>
					<div className={"mt-4 w-full"}>
						{voucher && (
							<p className={"cursor-pointer text-[0.9rem] hover:text-red-600"} onClick={() => setVoucher(undefined)}>
								Xóa mã giảm giá <strong>{voucher.code}</strong>
							</p>
						)}
						<div className={"flex flex-col gap-x-5 gap-y-2 sm:flex-row sm:items-center"}>
							<input
								className={"grow rounded-full border-1 bg-gray-200 px-4 py-2 outline-none"}
								placeholder={"Nhập mã giảm giá"}
								value={voucher ? voucher.code : ""}
							/>
							<button className={"rounded-4xl bg-black px-5 py-2 text-white hover:bg-gray-300 hover:text-black"}>Áp dụng voucher</button>
						</div>
						{voucher && <p className={"text-[0.9rem] text-green-600"}>Mã giảm giá đã được áp dụng</p>}
					</div>
				</div>
				<Separator className={"my-5"} />
				<div className={"flex flex-col gap-4 text-[0.9rem]"}>
					<div className={"flex w-full justify-between"}>
						<p>Tạm tính</p>
						<p>{formatCurrency(0)}</p>
					</div>
					<div className={"flex w-full justify-between"}>
						<p>Giảm giá</p>
						<p>{formatCurrency(0)}</p>
					</div>
					<div className={"flex w-full justify-between"}>
						<p>Phí giao hàng</p>
						<p>{formatCurrency(0)}</p>
					</div>
				</div>
				<Separator className={"my-5"} />
				<div className={"flex w-full justify-between text-[1.1rem]"}>
					<p>Tổng</p>
					<strong>{formatCurrency(0)}</strong>
				</div>
			</div>
		</main>
	);
}

export default CartPage;
