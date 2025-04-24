import { useForm } from "react-hook-form";
import { DialogClose, DialogContent } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SaveAddressRequest } from "@/domain/resquest/saveAddress.request.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

const SaveAddressDialog= () => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm<SaveAddressRequest>();

	const onSubmit = (data: SaveAddressRequest) => {
		console.log(data);
		// setDialog("none");
		reset(data);
	};
	return (
			<DialogContent classIcon={' bg-black text-white p-2 sm:p-5 cursor-pointer !rounded-lg sm:!rounded-full -translate-y-3 sm:-translate-y-10 translate-x-3 sm:translate-x-10 opacity-100 '} className={"max-w-full max-sm:h-3/4 max-sm:p-2 text-gray-500 sm:max-w-200 z-51 max-sm:-translate-y-1/4  max-sm:bottom-0 max-sm:rounded-b-none"}>
				<ScrollArea className={"h-100 max-sm:w-full max-sm:h-full p-5 max-md:p-2 overflow-auto overscroll-none"}>
					<form onSubmit={handleSubmit(onSubmit)} className={"w-full space-y-3 p-2 max-sm:my-5"}>
						<div className={'grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 sm:p-2'}>
							<div className="">
								<Input placeholder={"Họ và tên"} className={"rounded-lg h-10"} {...register("fullName", {
									required: 'vui lòng nhập họ và tên',
								})}/>
								{errors.fullName && <p className={'text-red-500 ml-2'}>{errors.fullName.message}</p>}
							</div>
							<div className="">
								<Input placeholder={"Số điện thoại"} className={"rounded-lg h-10"} {...register("phone", {
									required: 'vui lòng nhập số điện thoại',
									// /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
									pattern: {
										value: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
										message: 'số điện thoại không đúng khu vực Việt Nam'
									}
								})}/>
								{errors.fullName && <p className={'text-red-500 ml-2'}>{errors.fullName.message}</p>}
							</div>
							<Input placeholder={"Địa chỉ"} className={"rounded-lg h-10"} {...register("street",)}/>
							<div className="">
								<Select>
									<SelectTrigger className={'max-sm:w-full'}>
										<SelectValue placeholder="Thành phố/tỉnh" {...register("city", {
											required: 'Không được bỏ trống'
										})}/>
									</SelectTrigger>
									<SelectContent className={'z-52'}>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
										<SelectItem value="system">System</SelectItem>
									</SelectContent>
								</Select>
								{errors.city && <p className={'text-red-500 ml-2'}>{errors.city.message}</p>}
							</div>
							<div className="">
								<Select>
									<SelectTrigger className={'max-sm:w-full'}>
										<SelectValue placeholder="Quận/huyện" {...register("district", {
											required: 'Không được bỏ trống'
										})}/>
									</SelectTrigger>
									<SelectContent className={'z-52'}>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
										<SelectItem value="system">System</SelectItem>
									</SelectContent>
								</Select>
								{errors.district && <p className={'text-red-500 ml-2'}>{errors.district.message}</p>}
							</div>
							<div className="">
								<Select>
									<SelectTrigger className={'max-sm:w-full'}>
										<SelectValue placeholder="Phường/xã" {...register("ward", {
											required: 'Không được bỏ trống'
										})}/>
									</SelectTrigger>
									<SelectContent className={'z-52'}>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
										<SelectItem value="system">System</SelectItem>
									</SelectContent>
								</Select>
								{errors.ward && <p className={'text-red-500 ml-2'}>{errors.ward.message}</p>}
							</div>
							<div className="flex items-center content-start space-x-3">
								<Checkbox id={'is-default'} /> <Label htmlFor={'is-default'}>Đặt làm mặc định</Label>
							</div>
						</div>
						<div className="flex items-center place-content-end w-full space-x-4">
							<DialogClose><Button className={'sm:p-5 text-black bg-neutral-200 rounded-full hover:text-white hover:bg-neutral-500  uppercase cursor-pointer'}>Hủy</Button></DialogClose>
							<Button type={'submit'} className={'sm:p-5 text-white bg-black rounded-full  uppercase cursor-pointer active:bg-neutral-500'}>Lưu</Button>
						</div>
					</form>
				</ScrollArea>
			</DialogContent>
	)
}

export default SaveAddressDialog;