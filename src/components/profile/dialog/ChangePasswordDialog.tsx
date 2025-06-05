import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import ChangePasswordRequest from "@/domain/resquest/changePassword.request.ts";
import authenticationService from "@/services/authentication.service.ts";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { hiddenDialog } from "@/redux/slice/dialog.slice.ts";
import { useAppSelector } from "@/configs/store.config";

const ChangePasswordDialog = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { dialog } = useAppSelector((state) => state.dialog);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ChangePasswordRequest>();
	const onSubmit = (data: ChangePasswordRequest) => {
		authenticationService.changePassword(data).then(() => {
			dispatch(hiddenDialog());
			reset();
			navigate("/");
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
		reset();
	};
	return (
		<Dialog open={dialog === "change-password"}>
			<DialogContent
				classIcon={
					" bg-black text-white p-5 max-md:p-3 cursor-pointer !rounded-lg sm:!rounded-full -translate-y-3 sm:-translate-y-10 translate-x-3 sm:translate-x-10 opacity-100 "
				}
				onClosed={() => dispatch(hiddenDialog())}
				className={"z-51 max-w-80 text-gray-500 max-md:p-0 sm:max-w-200"}>
				<ScrollArea className={"h-80 overflow-auto overscroll-none p-5 max-md:p-2 max-sm:w-full"}>
					<DialogHeader>
						<DialogTitle className={"text-left text-lg text-black sm:text-center sm:text-2xl lg:text-4xl"}>Thay đổi mật khẩu</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmit)} className={"mt-2 space-y-3 p-2"}>
						<div className=''>
							<Input
								type={"password"}
								placeholder={"Mật khẩu cũ"}
								className={"h-10 rounded-lg"}
								{...register("old_password", {
									required: "vui lòng nhập mật khẩu cũ",
								})}
							/>
							{errors.old_password && <p className={"ml-2 text-red-500"}>{errors.old_password.message}</p>}
						</div>
						<div className=''>
							<Input
								type={"password"}
								placeholder={"Mật khẩu mới"}
								className={"h-10 rounded-lg"}
								{...register("password", {
									required: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
									pattern: {
										value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
									},
								})}
							/>
							{errors.password && <p className={"ml-2 text-red-500"}>{errors.password.message}</p>}
						</div>
						<div className=''>
							<Input
								type={"password"}
								placeholder={"Nhập lại mật khẩu mới"}
								className={"h-10 rounded-lg"}
								{...register("confirm_password", {
									required: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
									pattern: {
										value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt",
									},
									validate: (value, formValues) => {
										if (value == formValues.password) return undefined;
										return "Mật khẩu nhập lại không chính xác";
									},
								})}
							/>
							{errors.confirm_password && <p className={"ml-2 text-red-500"}>{errors.confirm_password.message}</p>}
						</div>

						<Button
							type={"submit"}
							className={"w-full cursor-pointer bg-black p-5 text-xs text-white uppercase active:bg-neutral-500 sm:rounded-full sm:text-base"}>
							<span>Cập nhật mật khẩu</span>
						</Button>
					</form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default ChangePasswordDialog;
