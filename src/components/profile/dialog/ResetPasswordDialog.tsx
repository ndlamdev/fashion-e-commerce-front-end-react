import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext.tsx";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ResetPasswordProps } from "@/components/profile/props/resetPassword.props.ts";
import { ResetPasswordRequest } from "@/domain/resquest/resetPassword.request.ts";

const ResetPasswordDialog = ({ open }: ResetPasswordProps) => {
	const { showDialog } = useContext(GlobalContext);
	const { register, handleSubmit, reset, formState: { errors } } = useForm<ResetPasswordRequest>();

	const onSubmit = (data: ResetPasswordRequest) => {
		console.log(data);
		showDialog("none");
		reset();
	};
	return (
		<Dialog open={open} onOpenChange={(value) => !value && showDialog("none")}>
			<DialogContent classIcon={' bg-black text-white p-5 max-md:p-3 cursor-pointer !rounded-lg sm:!rounded-full -translate-y-3 sm:-translate-y-10 translate-x-3 sm:translate-x-10 opacity-100 '} className={"text-gray-500 max-w-80 sm:max-w-200 max-md:p-0  z-51"}>
				<ScrollArea className={"max-sm:w-full h-80 p-5 max-md:p-2 overflow-auto overscroll-none"}>
					<DialogHeader >
						<DialogTitle className={'text-lg sm:text-2xl text-black lg:text-4xl sm:text-center text-left'}>Thay đổi mật khẩu</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className={'space-y-3 p-2 mt-2'}>
						<div className="">
							<Input type={'password'} placeholder={"Mật khẩu cũ"} className={" rounded-lg h-10"} {...register("oldPassword", {
								required: 'vui lòng nhập mật khẩu cũ',
							})}/>
							{errors.oldPassword && <p className={'text-red-500 ml-2'}>{errors.oldPassword.message}</p>}
						</div>
						<div className="">
							<Input type={'password'} placeholder={"Mật khẩu mới"} className={" rounded-lg h-10"} {...register("password", {
								required: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
								pattern: {
									value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
								},
							})}/>
							{errors.password && <p className={'text-red-500 ml-2'}>{errors.password.message}</p>}
						</div>
						<div className="">
							<Input type={'password'} placeholder={"Mật khẩu cũ"} className={" rounded-lg h-10"} {...register("confirm-password", {
								required: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
								pattern: {
									value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
								},
							})}/>
							{errors["confirm-password"] && <p className={'text-red-500 ml-2'}>{errors["confirm-password"].message}</p>}
						</div>

						<Button type={'submit'} className={'text-xs sm:text-base p-5 text-white bg-black  w-full  sm:rounded-full  uppercase cursor-pointer active:bg-neutral-500'}><span>Cập nhật tài khoản</span></Button>
					</form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default ResetPasswordDialog;