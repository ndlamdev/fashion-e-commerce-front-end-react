import { Controller, useForm } from "react-hook-form";
import { DialogClose, DialogContent } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SaveAddressRequest } from "@/domain/resquest/saveAddress.request.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { useGetAddressQuery, useSaveAddressMutation } from "@/services/profile.service.ts";
import { useGetInfoAddressesQuery } from "@/services/address.service.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useContext, useEffect, useState } from "react";
import { DialogProfileContext } from "@/context/dialogProfileContext.props.ts";
import { toast } from "sonner";
import { getCities, getDistricts, getWards } from "@/utils/helper/AddressFilter.ts";

const SaveAddressDialog = () => {
	const { showDialog } = useContext(DialogProfileContext);
	const { user } = useSelector((state: RootState) => state.auth);
	// fetch data
	const { actionId } = useSelector((state: RootState) => state.address);
	const { data: address } = useGetAddressQuery(actionId, { skip: !actionId });
	const [cityCode, setCityCode] = useState<string | undefined | null>(address?.data.city_code);
	const [districtCode, setDistrictCode] = useState<string | undefined | null>(address?.data.district_id);
	const [wardCode, setWardCode] = useState<string | undefined | null>(address?.data.ward_id);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		control,
	} = useForm<SaveAddressRequest>();
	useEffect(() => {
		if (address?.data) {
			reset({
				...address.data,
				city: JSON.stringify({ city: address.data.city, city_code: address.data.city_code }),
				district: JSON.stringify({ district: address.data.district, district_id: address.data.district_id }),
				ward: JSON.stringify({ ward: address.data.ward, ward_id: address.data.ward_id }),
			});
			setCityCode(address.data.city_code);
			setDistrictCode(address.data.district_id);
			setWardCode(address.data.ward_id);
		}
	}, [address?.data, reset]);
	const {
		data: infoAddresses,
		isError: isErrorInfoAddresses,
		isLoading: isLoadingInfoAddresses,
	} = useGetInfoAddressesQuery();

	const [cityValue, districtValue] = watch(["city", "district"]);
	// add address
	const [request, { isLoading: isLoadingAddressShippingResponse }] = useSaveAddressMutation();
	const onSubmit = async (formValues: SaveAddressRequest) => {
		try {
			const data = {
				...formValues,
				city: JSON.parse(formValues.city).city,
				district: JSON.parse(formValues.district).district,
				ward: JSON.parse(formValues.ward).ward,
				country_code: user?.country_code,
				city_code: cityCode,
				district_id: districtCode,
				ward_id: wardCode,
				active: formValues.active ?? false,
			} as SaveAddressRequest;
			console.log(data);
			const result = await request(data).unwrap();
			if (result?.code >= 400) {
				toast("Cập nhật thất bại " + result?.message, {});
				return;
			}
			showDialog("none");
			toast("Cập nhật thành công ");
		} catch (error) {
			console.log(error);
			toast("Cập nhật thất bại " + error, {});
		}
	};
	return (
		<DialogContent
			classIcon={" bg-black text-white p-2 sm:p-5 cursor-pointer !rounded-lg sm:!rounded-full -translate-y-3 sm:-translate-y-10 translate-x-3 sm:translate-x-10 opacity-100 "}
			className={"max-w-full max-sm:h-3/4 max-sm:p-2 text-gray-500 sm:max-w-200 z-51 max-sm:-translate-y-1/4  max-sm:bottom-0 max-sm:rounded-b-none"}>
			<ScrollArea className={"h-80 max-sm:w-full max-sm:h-full p-5 max-md:p-2 overflow-auto overscroll-none"}>
				<form onSubmit={handleSubmit(onSubmit)} className={"w-full space-y-3 p-2 max-sm:my-5"}>
					<div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 sm:p-2"}>
						<div className="">
							<Input defaultValue={address?.data.full_name} placeholder={"Họ và tên"}
										 className={"rounded-lg h-10"} {...register("full_name", {
								required: "vui lòng nhập họ và tên",
							})} />
							{errors.full_name && <p className={"text-red-500 ml-2"}>{errors.full_name.message}</p>}
						</div>
						<div className="">
							<Input defaultValue={address?.data.phone} placeholder={"Số điện thoại"}
										 className={"rounded-lg h-10"} {...register("phone", {
								required: "vui lòng nhập số điện thoại",
								pattern: {
									value: /(0[35789])+([0-9]{8})\b/g,
									message: "số điện thoại không đúng khu vực Việt Nam",
								},
							})} />
							{errors.phone && <p className={"text-red-500 ml-2"}>{errors.phone.message}</p>}
						</div>
						<Input defaultValue={address?.data.street} placeholder={"Địa chỉ"}
									 className={"rounded-lg h-10"} {...register("street")} />
						<div className="">
							<Controller
								render={({ field }) => (
									<Select value={field.value}
													onValueChange={(value) => {
														field.onChange(value); // báo cho react-hook-form
														const { city_code } = JSON.parse(value);
														setCityCode(city_code);
													}}
									>
										<SelectTrigger className={"max-sm:w-full"}>
											<SelectValue placeholder="Thành phố/tỉnh"
											/>
										</SelectTrigger>
										<SelectContent className={"z-52"}>
											{isLoadingInfoAddresses && <Skeleton className={"w-full"} />}
											{isErrorInfoAddresses && <p className="text-sm text-red-500">không tìm thấy dữ liệu</p>}
											{infoAddresses && getCities(infoAddresses).map((item, index) => (
												<SelectItem key={index + "-" + item.city_code}
																		value={JSON.stringify({ city: item.city, city_code: item.city_code })}
												>{item.city}</SelectItem>
											))}
										</SelectContent>
									</Select>

								)}
								name={"city"}
								control={control}
								rules={{ required: "Không được bỏ trống" }}
							/>
							{errors.city && <p className={"text-red-500 ml-2"}>{errors.city.message}</p>}
						</div>

						<div className="">
							<Controller
								render={({ field }) => (
									<Select value={field.value} onValueChange={(value) => {
										field.onChange(value); // báo cho react-hook-form
										if (!value) return;

										try {
											const parsed = JSON.parse(value);
											setDistrictCode(parsed?.district_id);
										} catch (err) {
											console.error("Không parse được JSON:", value, err);
										}
										// const { district_id } = JSON.parse(value);
										// setDistrictCode(district_id);
									}}>
										<SelectTrigger disabled={!cityValue} className={"max-sm:w-full"}>
											<SelectValue placeholder="Quận/huyện" />
										</SelectTrigger>
										<SelectContent className={"z-52"}>
											{infoAddresses && getDistricts(infoAddresses, cityCode).map((item, index) => (
												<SelectItem key={index + "-" + item.district_id} data-district-code={item.district_id}
																		value={JSON.stringify({ district: item.district, district_id: item.district_id })}
												>{item.district}</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
								name={"district"}
								control={control}
								rules={{ required: "Không được bỏ trống" }}
							/>
							{errors.district && <p className={"text-red-500 ml-2"}>{errors.district.message}</p>}
						</div>
						<div className="">
							<Controller
								render={({ field }) => (
									<Select value={field.value} onValueChange={(value) => {
										field.onChange(value); // báo cho react-hook-form
										if (!value) return;

										try {
											const { ward_id } = JSON.parse(value);
											setWardCode(ward_id);
										} catch (err) {
											console.error("Không parse được JSON:", value, err);
										}

									}}>
										<SelectTrigger disabled={!districtValue} className={"max-sm:w-full"}>
											<SelectValue placeholder="Phường/xã" />
										</SelectTrigger>
										<SelectContent className={"z-52"}>
											{infoAddresses && getWards(infoAddresses, cityCode, districtCode).map((item, index) => (
												<SelectItem key={index + "-" + item.ward_id}
																		value={JSON.stringify({ ward: item.ward, ward_id: item.ward_id })}
												>{item.ward}</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
								name={"ward"}
								control={control}
								rules={{ required: "Không được bỏ trống" }}
							/>
							{errors.ward && <p className={"text-red-500 ml-2"}>{errors.ward.message}</p>}
						</div>
						<Controller
							name={"active"}
							control={control}
							render={({ field }) => (
								<div className="flex items-center content-start space-x-3">
									<Checkbox defaultChecked={address?.data.active} id={"is-default"} checked={field.value}
														onCheckedChange={field.onChange} />
									<Label htmlFor={"is-default"}>Đặt làm mặc định</Label>
								</div>
							)}
						>
						</Controller>
					</div>
					<div className="flex items-center place-content-end w-full space-x-4">
						<DialogClose><Button
							disabled={isLoadingAddressShippingResponse}
							className={"sm:p-5 text-black bg-neutral-200 rounded-full hover:text-white hover:bg-neutral-500  uppercase cursor-pointer"}>Hủy</Button></DialogClose>
						<Button type={"submit"}
										className={"sm:p-5 text-white bg-black rounded-full  uppercase cursor-pointer active:bg-neutral-500"}>Lưu</Button>
					</div>
				</form>
			</ScrollArea>
		</DialogContent>
	);
};

export default SaveAddressDialog;