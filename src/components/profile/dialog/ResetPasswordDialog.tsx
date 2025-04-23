import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext.tsx";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
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
			<DialogContent classIcon={'bg-black text-white p-5 max-md:p-3 cursor-pointer !rounded-full -translate-y-10 translate-x-10 opacity-100 '} className={"text-gray-500 max-w-2/3 max-md:p-0 sm:max-w-150 z-51"}>
				<ScrollArea className={"h-80 p-5 max-md:p-2 overflow-auto overscroll-none"}>
					<DialogHeader>
						<DialogTitle className={'max-md:text-2xl text-black text-4xl text-center'}>Thay đổi mật khẩu</DialogTitle>
						<DialogDescription/>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className={'space-y-3 p-2'}>
						<div className="">
							<Input type={'password'} placeholder={"Mật khẩu cũ"} className={"rounded-lg h-10"} {...register("oldPassword", {
								required: 'vui lòng nhập mật khẩu cũ',
							})}/>
							{errors.oldPassword && <p className={'text-red-500 ml-2'}>{errors.oldPassword.message}</p>}
						</div>
						<div className="">
							<Input type={'password'} placeholder={"Mật khẩu mới"} className={"rounded-lg h-10"} {...register("password", {
								required: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
								pattern: {
									value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
								},
							})}/>
							{errors.password && <p className={'text-red-500 ml-2'}>{errors.password.message}</p>}
						</div>
						<div className="">
							<Input type={'password'} placeholder={"Mật khẩu cũ"} className={"rounded-lg h-10"} {...register("confirm-password", {
								required: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
								pattern: {
									value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
								},
							})}/>
							{errors["confirm-password"] && <p className={'text-red-500 ml-2'}>{errors["confirm-password"].message}</p>}
						</div>

						<Button type={'submit'} className={'p-5 text-white bg-black w-full  rounded-full  uppercase cursor-pointer active:bg-neutral-500'}>Cập nhật tài khoản</Button>
					</form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default ResetPasswordDialog;