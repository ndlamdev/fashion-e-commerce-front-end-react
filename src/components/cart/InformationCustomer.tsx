/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:15PM - 13/03/2025
 *  User: lam-nguyen
 **/
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { LaShippingFast } from "@/assets/images/icons/LaShippingFast.tsx";
import momo from "@/assets/images/icons/momo.png";
import zaloPay from "@/assets/images/icons/zalo-pay.png";
import cardSupport from "@/assets/images/icons/card-support.png";
import vnPay from "@/assets/images/icons/vn-pay.png";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext.tsx";
import { Payment } from "@/layouts/CartLayout.tsx";

function InformationCustomer() {
	const [sex, setSex] = useState("Anh/Chị");
	const [otherReceiver, setOtherReceiver] = useState(false);
	const { payment, setPayment } = useContext(CartContext);
	const [paymentHover, setPaymentHover] = useState<Payment | null>();

	return (
		<div>
			<h1 className={"font-[600] text-3xl mb-4"}>Thông tin đặt hàng</h1>
			<div className={"flex flex-col gap-4"}>
				<div className={"flex gap-4 flex-col md:flex-row"}>
					<div className={"md:w-8/12"}>
						<label htmlFor={"name"} className={"text-gray-700 text-[0.9rem]"}>
							Họ và tên
						</label>
						<div className={"border-1 border-gray-400 flex gap-2 rounded-full overflow-hidden"}>
							<Select onValueChange={setSex} defaultValue={"Anh/Chị"}>
								<SelectTrigger className='border-0 bg-gray-200 rounded-none text-black outline-none py-5'>
									<SelectValue placeholder={sex} className={"text-black"}>
										{sex}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='Anh'>Anh</SelectItem>
									<SelectItem value='Chị'>Chị</SelectItem>
									<SelectItem value='Anh/Chị'>Không tiết lộ</SelectItem>
								</SelectContent>
							</Select>
							<input id={"name"} className={"w-full outline-none"} placeholder={"Nhập họ và tên của bạn"} />
						</div>
					</div>
					<div className={"flex flex-col md:w-4/12"}>
						<label htmlFor={"phone-number"} className={"text-gray-700 text-[0.9rem]"}>
							Số điện thoại
						</label>
						<input
							id={"phone-number"}
							placeholder={"Nhập số điện thoại của bạn"}
							type='text'
							className={"outline-none border-1 border-gray-400 py-2 rounded-full px-5"}
						/>
					</div>
				</div>
				<div className={"email"}>
					<label htmlFor={"email"} className={"text-gray-700 text-[0.9rem]"}>
						Email
					</label>
					<input className={"outline-none border-1 border-gray-400 py-2 rounded-full px-5 w-full"} placeholder={"Theo dõi đơn hàng sẽ được gửi email về ZNS"} />
				</div>
				<div className={"address"}>
					<label htmlFor={"email"} className={"text-gray-700 text-[0.9rem]"}>
						Địa chỉ
					</label>
					<input
						className={"outline-none border-1 border-gray-400 py-2 rounded-full px-5 w-full"}
						placeholder={"Địa chỉ (ví dụ: 123 Vạn Phúc, phường Vạn Phúc)"}
					/>
					<div className={"flex gap-2 mt-2 flex-col lg:flex-row"}>
						<Select defaultValue={"Thành phố Hồ Chí Minh"}>
							<SelectTrigger className='py-5 rounded-full w-full border-gray-400'>
								<SelectValue placeholder={"Thành phố Hồ Chí Minh"} className={"text-black"}>
									Thành phố Hồ Chí Minh
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='1'>1</SelectItem>
								<SelectItem value='2'>2</SelectItem>
								<SelectItem value='3'>3</SelectItem>
							</SelectContent>
						</Select>
						<Select>
							<SelectTrigger className='py-5 rounded-full  w-full border-gray-400'>
								<SelectValue placeholder={"Chọn Quận/Huyện"} className={"text-black"} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='1'>1</SelectItem>
								<SelectItem value='2'>2</SelectItem>
								<SelectItem value='3'>3</SelectItem>
							</SelectContent>
						</Select>
						<Select>
							<SelectTrigger className='py-5 rounded-full  w-full border-gray-400'>
								<SelectValue placeholder={"Chọn Phường/Xã"} className={"text-black"} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='1'>1</SelectItem>
								<SelectItem value='2'>2</SelectItem>
								<SelectItem value='3'>3</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className={"note"}>
					<label htmlFor={"note"} className={"text-gray-700 text-[0.9rem]"}>
						Ghi chú
					</label>
					<input
						id={"note"}
						className={"outline-none border-1 border-gray-400 py-2 rounded-full px-5 w-full"}
						placeholder={"Thêm ghi chú (ví dụ: Giao giờ hành chính)"}
					/>
				</div>
				<div>
					<div className={"flex gap-3 items-center mb-5"}>
						<input
							id={"call-other-people"}
							type={"checkbox"}
							onChange={(event) => {
								setOtherReceiver(event.currentTarget.checked);
							}}
							checked={otherReceiver}
							className={"w-5 h-5"}
						/>
						<label htmlFor={"call-other-people"} className={"text-gray-700 text-[0.9rem]"}>
							Gọi cho người khác nhận hàng (nếu có)
						</label>
					</div>
					<div className={`flex flex-col gap-3 bg-gray-200 p-5 rounded-2xl ${otherReceiver ? "block" : "hidden"}`}>
						<div className={"flex gap-4"}>
							<label className={"flex gap-3"}>
								<input type={"radio"} name={"sex"} value={"male"} />
								Nam
							</label>
							<label className={"flex gap-3"}>
								<input type={"radio"} name={"sex"} value={"female"} />
								Nữ
							</label>
						</div>
						<div className={"flex gap-4"}>
							<input className={"outline-none border-1 bg-white border-gray-400 py-2 rounded-full px-5 w-full"} placeholder={"Họ và tên người nhận"} />
							<input className={"outline-none border-1 bg-white border-gray-400 py-2 rounded-full px-5 w-full"} placeholder={"Số điện thoại người nhận"} />
						</div>
					</div>
				</div>
			</div>
			<Separator className={"mb-6"} />
			<h1 className={"font-[600] text-3xl mb-4"}>Thông tin đặt hàng</h1>
			<ul className={"flex flex-col gap-2"}>
				<li>
					<div
						className={`px-4 h-17 border-1 border-gray-300 rounded-2xl flex items-center gap-3 ${payment === "cash" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("cash")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => setPayment("cash")}>
						<input type={"radio"} className={"w-5 h-5"} checked={payment === "cash" || paymentHover === "cash"} />
						<LaShippingFast width={40} height={40} />
						<p className={"font-bold text-[0.9rem]"}>Thanh toán khi nhận hàng</p>
					</div>
				</li>
				<li>
					<div
						className={`px-4 h-17 border-1 border-gray-300 rounded-2xl flex items-center gap-3 ${payment === "momo" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("momo")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => setPayment("momo")}>
						<input type={"radio"} className={"w-5 h-5"} checked={payment === "momo" || paymentHover === "momo"} />
						<img src={momo} alt={"momo.png"} className={"w-13 h-13"} />
						<p className={"font-bold text-[0.9rem]"}>Ví MoMo</p>
					</div>
				</li>
				<li>
					<div
						className={`px-4 h-17 border-1 border-gray-300 rounded-2xl flex items-center gap-3 ${payment === "zalo-pay" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("zalo-pay")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => setPayment("zalo-pay")}>
						<input type={"radio"} className={"w-5 h-5"} checked={payment === "zalo-pay" || paymentHover === "zalo-pay"} />
						<img src={zaloPay} alt={"zalo-pay.png"} className={"w-13 h-13 rounded-[0.5rem]"} />
						<div>
							<p className={"font-bold text-[0.9rem]"}>Thanh toán qua ZaloPay</p>
							<p className={"text-gray-400 text-[0.8rem] flex gap-x-2 flex-col md:flex-row"}>
								Hỗ trợ mọi hình thức thanh toán
								<img src={cardSupport} alt='support-card.png' className={"h-4"} />
							</p>
						</div>
					</div>
				</li>
				<li>
					<div
						className={`px-4 h-17 border-1 border-gray-300 rounded-2xl flex items-center gap-3 ${payment === "vn-pay" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("vn-pay")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => setPayment("vn-pay")}>
						<input type={"radio"} className={"w-5 h-5"} checked={payment === "vn-pay" || paymentHover === "vn-pay"} />
						<img src={vnPay} alt={"vn-pay.png"} className={"w-13 h-13 rounded-[0.5rem]"} />
						<div>
							<p className={"font-bold text-[0.9rem]"}>Ví điện tử VNPAY</p>
							<p className={"text-gray-400 text-[0.8rem] flex gap-2"}>Quét QR để thanh toán</p>
						</div>
					</div>
				</li>
			</ul>
			<p className={"text-[0.85rem] mt-2"}>
				Nếu bạn không hài lòng với sản phẩm của chúng tôi? Bạn hoàn toàn có thể trả lại sản phẩm. Tìm hiểu thêm{" "}
				<a href={"#"} className={"text-blue-800 font-bold"}>
					tại đây
				</a>
			</p>
		</div>
	);
}

export default InformationCustomer;
