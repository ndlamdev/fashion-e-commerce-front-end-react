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
import { useCallback, useEffect, useState } from "react";
import PaymentEnum from "@/utils/enums/payment.enum.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { PayOs } from "@/assets/images/icons/PayOs.tsx";
import { setPayment, updateInfoCustomerCreateOrder } from "@/redux/slice/cart.slice.ts";
import { useForm } from "react-hook-form";
import { InfoCustomerCreateOrder } from "@/domain/resquest/createOrder.request.ts";
import { useGetDefaultAddressQuery } from "@/redux/api/address.api.ts";
import AddressData, { getDistrict, getWard } from "@/assets/data/address/tree";
import { useTranslation } from "react-i18next";

function InformationCustomer() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.cart.customer_info",
	});
	const user = useSelector((state: RootState) => state.auth.user);
	const [sex, setSex] = useState(t("title"));
	const [otherReceiver, setOtherReceiver] = useState(false);
	const [paymentHover, setPaymentHover] = useState<PaymentEnum | null>();
	const dispatch = useDispatch();
	const { payment, showConfirm, trigger: triggerState } = useSelector((state: RootState) => state.cart);
	const [addressKeys, setAddressKeys] = useState<{ cityKey?: string; districtKey?: string }>({});
	const { data: defaultAddress } = useGetDefaultAddressQuery();

	const {
		setValue,
		getValues,
		register,
		trigger,
		setError,
		watch,
		formState: { errors },
	} = useForm<InfoCustomerCreateOrder>();
	const [province, district, ward, address] = watch(["province", "district", "ward", "address"]);

	const handleChangeProvince = useCallback(
		(cityKey: string) => {
			setAddressKeys({ cityKey: cityKey });
			const city = AddressData[cityKey];
			setValue("province", city.name_with_type);
			setValue("district", "");
			setValue("ward", "");
		},
		[setValue],
	);

	const handleChangeDistrict = useCallback(
		(districtKey: string) => {
			if (!addressKeys.cityKey) return;
			setAddressKeys((prev) => ({ ...prev, districtKey: districtKey }));
			const district = AddressData[addressKeys.cityKey]["quan-huyen"][districtKey];
			setValue("district", district.name_with_type);
			setValue("ward", "");
		},
		[addressKeys.cityKey, setValue],
	);

	const handleChangeWard = useCallback(
		(ward: string) => {
			setValue("ward", ward);
		},
		[setValue],
	);

	useEffect(() => {
		if (address || !province || !district || !ward) return;
		setValue("address", ` , ${ward ?? ""}, ${district ?? ""}, ${province ?? ""}.`);
	}, [setValue, province, district, ward, address]);

	useEffect(() => {
		if (triggerState == 0) return;
		setValue("payment", { method: payment ?? "CASH" });
		const { province, district, ward } = getValues();
		if (!province || !province.length) {
			setError("province", {
				type: "manual",
				message: t("select_province"),
			});
		} else {
			setError("province", {
				type: "manual",
			});
		}

		if (!district || !district.length) {
			setError("district", {
				type: "manual",
				message: t("select_district"),
			});
		} else {
			setError("district", {
				type: "manual",
			});
		}

		if (!ward || !ward.length) {
			setError("ward", {
				type: "manual",
				message: t("select_ward"),
			});
		} else {
			setError("ward", {
				type: "manual",
			});
		}

		trigger().then();

		if (!province || !district || !ward) {
			return;
		}
		dispatch(updateInfoCustomerCreateOrder(getValues()));
	}, [triggerState, trigger, getValues, setError, dispatch, setValue, payment, t]);

	useEffect(() => {
		setValue("name", user?.full_name ?? "");
		setValue("phone", user?.phone ?? "");
		if (!defaultAddress) return;
		const { street, city, ward, district, full_name, phone } = defaultAddress.data;
		setAddressKeys({ cityKey: defaultAddress.data.city_code, districtKey: defaultAddress.data.district_code });
		if (street?.length) setValue("address", street);
		setValue("province", city);
		setValue("district", district);
		setValue("ward", ward);
		setValue("name", full_name ?? "");
		setValue("phone", phone ?? "");
	}, [defaultAddress, setValue, user?.full_name, user?.phone]);

	return (
		<div className={`px-5 md:pb-0 lg:px-0 ${showConfirm ? "pb-30" : "pb-0"}`}>
			<h1 className={"mt:mt-0 mt-4 mb-4 text-xl md:text-3xl md:font-[600]"}>{t("order_info")}</h1>
			<div className={"flex flex-col gap-4"}>
				<div className={"flex flex-col gap-4 md:flex-row"}>
					<div className={"md:w-8/12"}>
						<label htmlFor={"name"} className={"text-[0.9rem] text-gray-700"}>
							{t("full_name")}
						</label>
						<div className={"flex gap-2 overflow-hidden rounded-full border-1 border-gray-400"}>
							<Select
								onValueChange={(value) => {
									setSex(value);
									setValue("name", value + ": " + (getValues("name") ?? ""));
								}}
								defaultValue={t("title")}>
								<SelectTrigger className='rounded-none border-0 bg-gray-200 py-5 text-black outline-none'>
									<SelectValue placeholder={sex} className={"text-black"}>
										{sex}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='Anh'>{t("male")}</SelectItem>
									<SelectItem value='Chị'>{t("female")}</SelectItem>
									<SelectItem value='Anh/Chị'>{t("secret")}</SelectItem>
								</SelectContent>
							</Select>
							<input
								id={"name"}
								className={"w-full outline-none"}
								placeholder={t("enter_full_name")}
								{...register("name", {
									required: t("name_required"),
								})}
							/>
						</div>
						{errors.name && <small className={"text-red-500"}>{errors.name?.message}</small>}
					</div>
					<div className={"flex flex-col md:w-4/12"}>
						<label htmlFor={"phone-number"} className={"text-[0.9rem] text-gray-700"}>
							{t("phone")}
						</label>
						<input
							id={"phone-number"}
							placeholder={t("enter_phone")}
							type={"tel"}
							className={"rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
							{...register("phone", {
								required: t("phone_required"),
								minLength: {
									value: 10,
									message: t("please_enter_phone"),
								},
							})}
						/>
						{errors.phone && <small className={"text-red-500"}>{errors.phone?.message}</small>}
					</div>
				</div>
				<div className={"email"}>
					<label htmlFor={"email"} className={"text-[0.9rem] text-gray-700"}>
						{t("email")}
					</label>
					<input
						className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
						defaultValue={user?.email}
						placeholder={t("email_note")}
						{...register("email", {
							required: t("email_required"),
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: t("invalid_email"),
							},
						})}
					/>
					{errors.email && <small className={"text-red-500"}>{errors.email?.message}</small>}
				</div>
				<div className={"address"}>
					<label htmlFor={"email"} className={"text-[0.9rem] text-gray-700"}>
						{t("address")}
					</label>
					<input
						className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
						placeholder={t("address_ex")}
						{...register("address", {
							required: t("address_required"),
						})}
					/>
					{errors.address && <small className={"text-red-500"}>{errors.address?.message}</small>}
					<div className={"mt-2 flex w-full flex-col flex-wrap gap-2 lg:flex-row"}>
						<div className={"w-full py-5 lg:w-auto lg:grow"}>
							<Select onValueChange={handleChangeProvince} value={defaultAddress?.data.city_code}>
								<SelectTrigger className={"w-full rounded-full border-gray-400"}>
									<SelectValue placeholder={t("select_province")} className={"text-black"} />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(AddressData).map(([key, city], index) => (
										<SelectItem key={index + "-" + city.code} value={key}>
											{city.name_with_type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.province && <small className={"text-red-500"}>{errors.province?.message}</small>}
						</div>
						<div className={"w-full py-5 lg:w-auto lg:grow"}>
							<Select onValueChange={handleChangeDistrict} value={defaultAddress?.data.district_code}>
								<SelectTrigger className='w-full rounded-full border-gray-400'>
									<SelectValue placeholder={t("select_district")} className={"text-black"} />
								</SelectTrigger>
								<SelectContent>
									<SelectContent>
										{Object.entries(getDistrict(addressKeys.cityKey)).map(([key, district], index) => (
											<SelectItem key={index + "-" + district.code} data-district-code={district.code} value={key}>
												{district.name_with_type}
											</SelectItem>
										))}
									</SelectContent>
								</SelectContent>
							</Select>
							{errors.district && <small className={"text-red-500"}>{errors.district?.message}</small>}
						</div>
						<div className={"w-full py-5 lg:w-auto lg:grow"}>
							<Select onValueChange={handleChangeWard} value={defaultAddress?.data.ward_code}>
								<SelectTrigger className='w-full rounded-full border-gray-400'>
									<SelectValue placeholder={t("select_ward")} className={"text-black"} />
								</SelectTrigger>
								<SelectContent>
									<SelectContent>
										{Object.entries(getWard(addressKeys.cityKey, addressKeys.districtKey)).map(([key, ward], index) => (
											<SelectItem key={index + "-" + ward.code} value={key}>
												{ward.name_with_type}
											</SelectItem>
										))}
									</SelectContent>
								</SelectContent>
							</Select>
							{errors.ward && <small className={"text-red-500"}>{errors.ward?.message}</small>}
						</div>
					</div>
				</div>
				<div className={"note"}>
					<label htmlFor={"note"} className={"text-[0.9rem] text-gray-700"}>
						{t("note")}
					</label>
					<input
						id={"note"}
						className={"w-full rounded-full border-1 border-gray-400 px-5 py-2 outline-none"}
						placeholder={t("note")}
						{...register("note", {})}
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
							{t("receiver_other")}
						</label>
					</div>
					<div className={`flex flex-col gap-3 rounded-2xl bg-gray-200 p-5 ${otherReceiver ? "block" : "hidden"}`}>
						<div className={"flex gap-4"}>
							<label className={"flex gap-3"}>
								<input type={"radio"} name={"sex"} value={"male"} onChange={() => {}} />
								{t("gender_male")}
							</label>
							<label className={"flex gap-3"}>
								<input type={"radio"} name={"sex"} value={"female"} onChange={() => {}} />
								{t("gender_female")}
							</label>
						</div>
						<div className={"flex gap-4"}>
							<input className={"w-full rounded-full border-1 border-gray-400 bg-white px-5 py-2 outline-none"} placeholder={t("receiver_name")} />
							<input className={"w-full rounded-full border-1 border-gray-400 bg-white px-5 py-2 outline-none"} placeholder={t("receiver_phone")} />
						</div>
					</div>
				</div>
			</div>
			<Separator className={"mb-6"} />
			<h1 className={"mb-4 text-3xl font-[600]"}>{t("order_info")}</h1>
			<ul className={"flex flex-col gap-2"}>
				<li>
					<div
						className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "CASH" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("CASH")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => {
							dispatch(setPayment("CASH"));
						}}>
						<input type={"radio"} className={"h-5 w-5"} checked={payment === "CASH" || paymentHover === "CASH"} onChange={() => {}} />
						<LaShippingFast width={40} height={40} />
						<p className={"text-[0.9rem] font-bold"}>{t("payment_cod")}</p>
					</div>
				</li>
				<li>
					<div
						className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "MOMO" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("MOMO")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => {
							dispatch(setPayment("MOMO"));
						}}>
						<input type={"radio"} className={"h-5 w-5"} checked={payment === "MOMO" || paymentHover === "MOMO"} onChange={() => {}} />
						<img src={momo} alt={"momo.png"} className={"h-13 w-13"} />
						<p className={"text-[0.9rem] font-bold"}>{t("payment_momo")}</p>
					</div>
				</li>
				<li>
					<div
						className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "ZALO_PAY" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("ZALO_PAY")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => {
							dispatch(setPayment("ZALO_PAY"));
						}}>
						<input type={"radio"} className={"h-5 w-5"} checked={payment === "ZALO_PAY" || paymentHover === "ZALO_PAY"} onChange={() => {}} />
						<img src={zaloPay} alt={"zalo-pay.png"} className={"h-13 w-13 rounded-[0.5rem]"} />
						<div>
							<p className={"text-[0.9rem] font-bold"}>{t("payment_zalopay")}</p>
							<p className={"flex flex-col gap-x-2 text-[0.8rem] text-gray-400 md:flex-row"}>
								{t("payment_support_all")}
								<img src={cardSupport} alt='support-card.png' className={"h-4"} />
							</p>
						</div>
					</div>
				</li>
				<li>
					<div
						className={`flex h-17 items-center gap-3 rounded-2xl border-1 border-gray-300 px-4 ${payment === "PAY_OS" ? "bg-gray-100" : "bg-white"} hover:bg-gray-100`}
						onMouseEnter={() => setPaymentHover("PAY_OS")}
						onMouseLeave={() => setPaymentHover(null)}
						onClick={() => {
							dispatch(setPayment("PAY_OS"));
						}}>
						<input type={"radio"} className={"h-5 w-5"} checked={payment === "PAY_OS" || paymentHover === "PAY_OS"} onChange={() => {}} />
						<PayOs className={"h-13 w-13 rounded-[0.5rem]"} />
						<div>
							<p className={"text-[0.9rem] font-bold"}>{t("payment_payos")}</p>
							<p className={"flex gap-2 text-[0.8rem] text-gray-400"}>{t("payment_qr")}</p>
						</div>
					</div>
				</li>
			</ul>
			<p className={"mt-2 text-[0.85rem]"}>
				{t("return_policy")}
				<a href={"#"} className={"ml-1 font-bold text-blue-800"}>
					{t("learn_more")}
				</a>
			</p>
		</div>
	);
}

export default InformationCustomer;
