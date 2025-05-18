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
import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext.tsx";
import { Payment } from "@/layouts/CartLayout.tsx";
import {
	useGetDistrictsOpenApiQuery,
	useGetProvincesOpenApiQuery,
	useGetWardsOpenApiQuery,
} from "@/redux/query/addressOpenApi.query.ts";
import ProvinceType from "@/types/address/province.type.ts";
import ToastErrorApi from "@/utils/helper/toastErrorApi.ts";
import DistrictType from "@/types/address/districtType.ts";
import WardType from "@/types/address/ward.type.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { PayOs } from "@/assets/images/icons/PayOs.tsx";

function InformationCustomer() {
	const user = useSelector((state: RootState) => state.auth.user);
	const [sex, setSex] = useState("Anh/Chị");
	const [otherReceiver, setOtherReceiver] = useState(false);
	const { payment, setPayment, showConfirm } = useContext(CartContext);
	const [paymentHover, setPaymentHover] = useState<Payment | null>();
	const [province, setProvince] = useState<ProvinceType>();
	const [district, setDistrict] = useState<DistrictType>();
	const [ward, setWard] = useState<WardType>();
	const [fullAddress, setFullAddress] = useState<string>("");
	const { data: dataProvinces, error: errorProvinces } = useGetProvincesOpenApiQuery();
	const { data: dataDistrict, error: errorDistrict } = useGetDistrictsOpenApiQuery(province?.code ?? 0, {
		skip: !province,
	});
	const { data: dataWard, error: errorWard } = useGetWardsOpenApiQuery(district?.code ?? 0, {
		skip: !district,
	});

	useEffect(() => {
		if (!errorProvinces) return;
		ToastErrorApi.toastErrorApiRTK(errorProvinces);
	}, [errorProvinces]);

	useEffect(() => {
		ToastErrorApi.toastErrorApiRTK(errorDistrict);
	}, [errorDistrict]);

	useEffect(() => {
		ToastErrorApi.toastErrorApiRTK(errorWard);
	}, [errorWard]);

	const handleChangeProvince = useCallback(
		(code: string) => {
			setProvince(dataProvinces?.find((it) => it.code.toString() === code));
		},
		[dataProvinces],
	);

	const handleChangeDistrict = useCallback(
		(code: string) => {
			setDistrict(dataDistrict?.districts.find((it) => it.code.toString() === code));
		},
		[dataDistrict],
	);

	const handleChangeWard = useCallback(
		(code: string) => {
			setWard(dataWard?.wards.find((it) => it.code.toString() === code));
		},
		[dataWard],
	);

	useEffect(() => {
		if (!province || !district || !ward) {
			setFullAddress("");
		} else setFullAddress(` , ${ward?.name ?? ""}, ${district?.name ?? ""}, ${province?.name ?? ""}.`);
	}, [ward, district, province]);

	return (
		<div className={`px-5 md:pb-0 lg:px-0 ${showConfirm ? "pb-30" : "pb-0"}`}>
			<h1 className={"mt:mt-0 mt-4 mb-4 text-xl md:text-3xl md:font-[600]"}>Thông tin đặt hàng</h1>
			<div className={"flex flex-col gap-4"}>
				<div className={"flex flex-col gap-4 md:flex-row"}>
					<div className={"md:w-8/12"}>
						<label htmlFor={"name"} className={"text-[0.9rem] text-gray-700"}>
							Họ và tên
						</label>
						<div className={"flex gap-2 overflow-hidden rounded-full border-1 border-gray-400"}>
							<Select onValueChange={setSex} defaultValue={"Anh/Chị"}>
								<SelectTrigger className='rounded-none border-0 bg-gray-200 py-5 text-black outline-none'>
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
							<input id={"name"} className={"w-full outline-none"} defaultValue={user?.full_name} placeholder={"Nhập họ và tên của bạn"} />
						</div>
					</div>
					<div className={"flex flex-col md:w-4/12"}>
						<label htmlFor={"phone-number"} className={"text-[0.9rem] text-gray-700"}>
							Số điện thoại
						</label>
						<input
							id={"phone-number"}
							placeholder={"Nhập số điện thoại của bạn"}
							defaultValue={user?.phone}
							type={"text"}
							className={"rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
						/>
					</div>
				</div>
				<div className={"email"}>
					<label htmlFor={"email"} className={"text-[0.9rem] text-gray-700"}>
						Email
					</label>
					<input
						className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
						defaultValue={user?.email}
						placeholder={"Theo dõi đơn hàng sẽ được gửi email về ZNS"}
					/>
				</div>
				<div className={"address"}>
					<label htmlFor={"email"} className={"text-[0.9rem] text-gray-700"}>
						Địa chỉ
					</label>
					<input
						className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
						placeholder={"Địa chỉ (ví dụ: 123 Vạn Phúc, phường Vạn Phúc)"}
						value={fullAddress}
						onChange={(event) => {
							setFullAddress(event.currentTarget.value);
						}}
					/>
					<div className={"mt-2 flex w-full flex-col flex-wrap gap-2 lg:flex-row"}>
						<Select onValueChange={handleChangeProvince}>
							<SelectTrigger className='w-full rounded-full border-gray-400 py-5 lg:w-auto lg:grow'>
								<SelectValue placeholder={"Vui lòng chọn tỉnh/thành phố"} className={"text-black"} />
							</SelectTrigger>
							<SelectContent>
								{dataProvinces &&
									dataProvinces.map((it) => (
										<SelectItem key={`province_${it.code}`} value={it.code.toString()}>
											{it.name}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
						<Select onValueChange={handleChangeDistrict}>
							<SelectTrigger className='w-full rounded-full border-gray-400 py-5 lg:w-auto lg:grow'>
								<SelectValue placeholder={"Chọn Quận/Huyện"} className={"text-black"} />
							</SelectTrigger>
							<SelectContent>
								<SelectContent>
									{dataDistrict &&
										dataDistrict.districts.map((it) => (
											<SelectItem key={`district_${it.code}`} value={it.code.toString()}>
												{it.name}
											</SelectItem>
										))}
								</SelectContent>
							</SelectContent>
						</Select>
						<Select onValueChange={handleChangeWard}>
							<SelectTrigger className='w-full rounded-full border-gray-400 py-5 lg:w-auto lg:grow'>
								<SelectValue placeholder={"Chọn Phường/Xã"} className={"text-black"} />
							</SelectTrigger>
							<SelectContent>
								<SelectContent>
									{dataWard &&
										dataWard.wards.map((it) => (
											<SelectItem key={`ward_${it.code}`} value={it.code.toString()}>
												{it.name}
											</SelectItem>
										))}
								</SelectContent>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className={"note"}>
					<label htmlFor={"note"} className={"text-[0.9rem] text-gray-700"}>
						Ghi chú
					</label>
					<input
						id={"note"}
						className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
						placeholder={"Thêm ghi chú (ví dụ: Giao giờ hành chính)"}
					/>
				</div>
				<div>
					<div className={"mb-5 flex items-center gap-3"}>
						<input
							id={"call-other-people"}
							type={"checkbox"}
							onChange={(event) => {
								setOtherReceiver(event.currentTarget.checked);
							}}
							checked={otherReceiver}
							className={"h-5 w-5"}
						/>
						<label htmlFor={"call-other-people"} className={"text-[0.9rem] text-gray-700"}>
							Gọi cho người khác nhận hàng (nếu có)
						</label>
					</div>
					<div className={`flex flex-col gap-3 rounded-2xl bg-gray-200 p-5 ${otherReceiver ? "block" : "hidden"}`}>
						<div className={"flex gap-4"}>
							<label className={"flex gap-3"}>
								<input type={"radio"} name={"sex"} value={"male"} onChange={() => {}} />
								Nam
							</label>
							<label className={"flex gap-3"}>
								<input type={"radio"} name={"sex"} value={"female"} onChange={() => {}} />
								Nữ
							</label>
						</div>
						<div className={"flex gap-4"}>
							<input className={"w-full rounded-full border-1 border-gray-400 bg-white px-5 py-2 outline-none"} placeholder={"Họ và tên người nhận"} />
							<input className={"w-full rounded-full border-1 border-gray-400 bg-white px-5 py-2 outline-none"} placeholder={"Số điện thoại người nhận"} />
						</div>
					</div>
				</div>
			</div>
			<Separator className={"mb-6"} />
			<h1 className={"mb-4 text-3xl font-[600]"}>Thông tin đặt hàng</h1>
			<ul className={"flex flex-col gap-2"}>
				<li>
					<div
						className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "cash" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("cash")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => setPayment("cash")}>
						<input type={"radio"} className={"h-5 w-5"} checked={payment === "cash" || paymentHover === "cash"} onChange={() => {}} />
						<LaShippingFast width={40} height={40} />
						<p className={"text-[0.9rem] font-bold"}>Thanh toán khi nhận hàng</p>
					</div>
				</li>
				<li>
					<div
						className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "momo" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("momo")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => setPayment("momo")}>
						<input type={"radio"} className={"h-5 w-5"} checked={payment === "momo" || paymentHover === "momo"} onChange={() => {}} />
						<img src={momo} alt={"momo.png"} className={"h-13 w-13"} />
						<p className={"text-[0.9rem] font-bold"}>Ví MoMo</p>
					</div>
				</li>
				<li>
					<div
						className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "zalo-pay" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("zalo-pay")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => setPayment("zalo-pay")}>
						<input type={"radio"} className={"h-5 w-5"} checked={payment === "zalo-pay" || paymentHover === "zalo-pay"} onChange={() => {}} />
						<img src={zaloPay} alt={"zalo-pay.png"} className={"h-13 w-13 rounded-[0.5rem]"} />
						<div>
							<p className={"text-[0.9rem] font-bold"}>Thanh toán qua ZaloPay</p>
							<p className={"flex flex-col gap-x-2 text-[0.8rem] text-gray-400 md:flex-row"}>
								Hỗ trợ mọi hình thức thanh toán
								<img src={cardSupport} alt='support-card.png' className={"h-4"} />
							</p>
						</div>
					</div>
				</li>
				<li>
					<div
						className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "vn-pay" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("vn-pay")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => setPayment("vn-pay")}>
						<input type={"radio"} className={"h-5 w-5"} checked={payment === "vn-pay" || paymentHover === "vn-pay"} onChange={() => {}} />
						<PayOs className={"h-13 w-13 rounded-[0.5rem]"} />
						<div>
							<p className={"text-[0.9rem] font-bold"}>Ví điện tử PayOs</p>
							<p className={"flex gap-2 text-[0.8rem] text-gray-400"}>Quét QR để thanh toán</p>
						</div>
					</div>
				</li>
			</ul>
			<p className={"mt-2 text-[0.85rem]"}>
				Nếu bạn không hài lòng với sản phẩm của chúng tôi? Bạn hoàn toàn có thể trả lại sản phẩm. Tìm hiểu thêm{" "}
				<a href={"#"} className={"font-bold text-blue-800"}>
					tại đây
				</a>
			</p>
		</div>
	);
}

export default InformationCustomer;
