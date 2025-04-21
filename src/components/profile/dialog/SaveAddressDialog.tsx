import { FC, useContext } from "react";
import { EditAddressDialogProps } from "@/components/profile/props/editAddressDialog.props.ts";
import { GlobalContext } from "@/context/GlobalContext.tsx";
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SaveAddressRequest } from "@/domain/resquest/saveAddress.request.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

const SaveAddressDialog: FC<EditAddressDialogProps> = ({open}) => {
	const { showDialog } = useContext(GlobalContext);
	const { register, handleSubmit, reset, formState: { errors } } = useForm<SaveAddressRequest>();

	const onSubmit = (data: SaveAddressRequest) => {
		console.log(data);
		showDialog("none");
		reset(data);
	};
	return (
		<Dialog open={open} onOpenChange={(value) => !value && showDialog("none")}>
			<DialogContent classIcon={' bg-black text-white p-5 cursor-pointer !rounded-full -translate-y-10 translate-x-10 opacity-100 '} className={"text-gray-500 sm:max-w-200 z-51"}>
				<ScrollArea className={"h-80 p-5"}>
					<form onSubmit={handleSubmit(onSubmit)} >
						<div className={'grid grid-cols-2 gap-4 p-2'}>
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
									<SelectTrigger >
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
									<SelectTrigger >
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
									<SelectTrigger >
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
							<DialogClose><Button className={'p-5 text-black bg-neutral-200 rounded-full hover:text-white hover:bg-neutral-500  uppercase cursor-pointer'}>Hủy</Button></DialogClose>
							<Button type={'submit'} className={'p-5 text-white bg-black rounded-full  uppercase cursor-pointer active:bg-neutral-500'}>Lưu</Button>
						</div>
					</form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default SaveAddressDialog;