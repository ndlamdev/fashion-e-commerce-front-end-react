import { Controller, useForm } from "react-hook-form";
import { DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
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
import { useContext, useEffect } from "react";
import { DialogProfileContext } from "@/context/dialogProfileContext.props.ts";
import { toast } from "sonner";
import { getCities, getDistricts, getWards } from "@/utils/helper/AddressFilter.ts";

const SaveAddressDialog = () => {
	const { showDialog } = useContext(DialogProfileContext);
	const { user } = useSelector((state: RootState) => state.auth);
	// fetch data
	const { actionId } = useSelector((state: RootState) => state.address);
	const { data: address } = useGetAddressQuery(actionId, { skip: !actionId });
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		control,
	} = useForm<SaveAddressRequest>();
	useEffect(() => {
		if (address?.data) {
			reset(address.data,);
		}
	}, [address, reset]);
	const {
		data: infoAddresses,
		isError: isErrorInfoAddresses,
		isLoading: isLoadingInfoAddresses,
	} = useGetInfoAddressesQuery();
	const [cityValue, districtValue] = watch(["city_code", "district_id"]);
	console.log();
	const [request, { isLoading: isLoadingAddressShippingResponse }] = useSaveAddressMutation();
	const onSubmit = async (formValues: SaveAddressRequest) => {
		try {
			const data = {
				...formValues,
				country_code: user?.country_code,
				city: getCities(infoAddresses).find((item) => item.city_code === formValues.city_code)?.city ?? "",
				district: getDistricts(infoAddresses, formValues.city_code).find((item) => item.district_id === formValues.district_id)?.district ?? "",
				ward: getWards(infoAddresses, formValues.city_code, formValues.district_id).find((item) => item.ward_id === formValues.ward_id)?.ward ?? "",
				active: formValues.active ?? false,
			} as SaveAddressRequest;
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
			<DialogTitle></DialogTitle>
			<ScrollArea className={"h-80 max-sm:w-full max-sm:h-full p-5 max-md:p-2 overflow-auto overscroll-none"}>
				<h1></h1>
				<form onSubmit={handleSubmit(onSubmit)} className={"w-full space-y-3 p-2 max-sm:my-5"}>
					<div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 sm:p-2"}>
						<div className="">
							<Input placeholder={"Họ và tên"}
										 className={"rounded-lg h-10"} {...register("full_name", {
								required: "vui lòng nhập họ và tên",
							})} />
							{errors.full_name && <p className={"text-red-500 ml-2"}>{errors.full_name.message}</p>}
						</div>
						<div className="">
							<Input placeholder={"Số điện thoại"}
										 className={"rounded-lg h-10"} {...register("phone", {
								required: "vui lòng nhập số điện thoại",
								pattern: {
									value: /(0[35789])+([0-9]{8})\b/g,
									message: "số điện thoại không đúng khu vực Việt Nam",
								},
							})} />
							{errors.phone && <p className={"text-red-500 ml-2"}>{errors.phone.message}</p>}
						</div>
						<Input placeholder={"Địa chỉ"}
									 className={"rounded-lg h-10"} {...register("street")} />
						<div className="">
							<Controller
								render={({ field }) => (
									<Select value={field.value}
													onValueChange={(value) => {
														field.onChange(value);
													}}
									>
										<SelectTrigger className={"max-sm:w-full"}>
											<SelectValue placeholder="Thành phố/tỉnh"
											/>
										</SelectTrigger>
										<SelectContent className={"z-52"}>
											{isLoadingInfoAddresses && <Skeleton className={"w-full"} />}
											{isErrorInfoAddresses && <p className="text-sm text-red-500">không tìm thấy dữ liệu</p>}
											{infoAddresses && infoAddresses.length > 0 && getCities(infoAddresses).map((item, index) => (
												<SelectItem key={index + "-" + item.city_code}
																		value={item.city_code}
												>{item.city} </SelectItem>
											))}
										</SelectContent>
									</Select>

								)}
								name={"city_code"}
								control={control}
								rules={{ required: "Không được bỏ trống" }}
							/>
							{errors.city && <p className={"text-red-500 ml-2"}>{errors.city.message}</p>}
						</div>
						<div>
							{cityValue &&
								<Controller
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger disabled={!cityValue} className={"max-sm:w-full"}>
												<SelectValue placeholder="Quận/huyện" />
											</SelectTrigger>
											<SelectContent className={"z-52"}>
												{infoAddresses && getDistricts(infoAddresses, cityValue).map((item, index) => (
													<SelectItem key={index + "-" + item.district_id} data-district-code={item.district_id}
																			value={item.district_id}
													>{item.district}</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
									name={"district_id"}
									control={control}
									rules={{ required: "Không được bỏ trống" }}
								/>
							}
							{errors.district && <p className={"text-red-500 ml-2"}>{errors.district.message}</p>}
						</div>
						<div>
							{districtValue &&
								<Controller
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger disabled={!districtValue} className={"max-sm:w-full"}>
												<SelectValue placeholder="Phường/xã" />
											</SelectTrigger>
											<SelectContent className={"z-52"}>
												{infoAddresses && getWards(infoAddresses, cityValue, districtValue).map((item, index) => (
													<SelectItem key={index + "-" + item.ward_id}
																			value={item.ward_id}
													>{item.ward}</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
									name={"ward_id"}
									control={control}
									rules={{ required: "Không được bỏ trống" }}
								/>
							}
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