/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:41AM - 13/03/2025
 *  User: lam-nguyen
 **/
import { useContext, useEffect, useState } from "react";
import { useHorizontalScroll } from "@/utils/helper/use-horizontal-scroll.ts";
import InformationCustomer from "@/components/cart/InformationCustomer.tsx";
import { CartContext } from "@/context/CartContext";
import { dataVouchers } from "@/assets/data/vouchers.ts";
import Voucher from "@/components/cart/Voucher";
import { Separator } from "@/components/ui/separator.tsx";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import CartItem from "@/components/cart/CartItem.tsx";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useGetCartQuery } from "@/redux/query/cart.query";
import { ApiResponseError } from "@/domain/ApiResponseError.ts";
import { toast } from "sonner";

function CartPage() {
	const [voucherRef, setVoucherRef] = useState<HTMLElement | null>(null);
	const { voucher, setVoucher, setShowConfirm, showConfirm } = useContext(CartContext);
	useHorizontalScroll(voucherRef);
	const [deleted, setDeleted] = useState(false);
	const [confirmDeleted, setConfirmDeleted] = useState(false);

	const { data, error } = useGetCartQuery();

	useEffect(() => {
		if (!error) return;
		const response = (error as any).data as ApiResponseError<string>;
		toast.message(response.detail || response.error);
	}, [error]);

	return (
		<Dialog open={confirmDeleted} onOpenChange={() => setConfirmDeleted(true)}>
			<div className={"mt-10 grid grid-cols-1 grid-rows-subgrid gap-10 overflow-hidden pb-40 md:grid lg:grid-cols-7 lg:grid-rows-1 lg:px-20"}>
				<div
					id={"left"}
					className={`order-2 w-full bg-white transition-all duration-500 md:block lg:order-1 lg:col-span-4 ${showConfirm ? "block" : "hidden"}`}>
					<div className={"flex items-center justify-between border-b-1 border-gray-300 px-5 pb-10 md:hidden"}>
						<ArrowLeft width={30} height={30} color={"blue"} onClick={() => setShowConfirm(false)} />
						<p className={"text-bold text-2xl"}>Xác thực thanh toán</p>
						<span />
					</div>
					<InformationCustomer />
				</div>
				<div id={"right"} className={`order-1 px-5 md:block lg:order-2 lg:col-span-3 lg:px-0 ${!showConfirm ? "block" : "hidden"}`}>
					<h1 className={"mb-5 text-3xl font-[600]"}>Giỏ hàng</h1>
					<div className={"mt-5"}>
						{deleted ? (
							<p className={"text-center"}>Giỏ hàng của bạn hiện đang trống.</p>
						) : (
							<>
								<div className={"flex border-b-1 border-gray-300 pb-5 text-[0.8rem] text-gray-400 uppercase"}>
									<div className={"flex basis-full gap-2 sm:basis-8/12"}>
										<div className={"flex items-center gap-3"}>
											<input type='checkbox' className={"h-5 w-5"} />
											<p>tất cả sản phẩm</p>
										</div>
										<p>|</p>
										<DialogTrigger className={"m-0 cursor-pointer p-0 uppercase"}>Xóa tất cả</DialogTrigger>
									</div>
									<div className={"hidden basis-3/12 sm:block"}>số lượng</div>
									<div className={"hidden basis-1/12 sm:block"}>giá</div>
								</div>
								<ul>
									{data?.data.cartItems.map((it) => (
										<li key={`cart_item_${it.id}`}>
											<CartItem {...it} />
										</li>
									))}
								</ul>
							</>
						)}
					</div>
					<div className={"flex flex-col"}>
						<div
							className={"scroll-show mt-8 flex flex-nowrap gap-7 overflow-x-scroll pb-2"}
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
									onChange={() => {}}
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
			</div>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className={"text-center text-xl"}>Bạn muốn xóa toàn bộ sản phẩm trong giỏ hàng không?</DialogTitle>
					<DialogDescription className={"mt-5 flex w-full gap-5 px-10"}>
						<button className={"w-full rounded-full border-2 border-black py-2 text-lg text-black"} onClick={() => setConfirmDeleted(false)}>
							Không
						</button>
						<button
							className={"w-full rounded-full bg-black py-2 text-lg text-white"}
							onClick={() => {
								setConfirmDeleted(false);
								setDeleted(true);
							}}>
							Đồng ký
						</button>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default CartPage;
