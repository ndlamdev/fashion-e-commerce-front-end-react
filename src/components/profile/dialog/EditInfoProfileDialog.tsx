import { useState } from "react";
import { useForm } from "react-hook-form";
import { DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { InfoProfileRequest } from "@/domain/resquest/infoProfile.request.ts";
import { Button } from "@/components/ui/button.tsx";
import { gender } from "@/components/profile/props/editInfoProfileDialog.props.ts";
import "react-day-picker/style.css";
import { DatePicker } from "@/components/DatePickerCustom.tsx";

const EditInfoProfileDialog = () => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm<InfoProfileRequest>();
	// handle data height range Slider component
	const [heightValue, setHeightValue] = useState<number[]>([0]); // Giá trị mặc định

	const handleHeightChange = (newValue: number[]) => {
		setHeightValue(newValue);
	};

	// handle data weight range Slider component
	const [weightValue, setWeightValue] = useState<number[]>([0]); // Giá trị mặc định

	const handleWeightChange = (newValue: number[]) => {
		setWeightValue(newValue);
	};

	// const [date, setDate] = useState<Date>();
	const onSubmit = (data: InfoProfileRequest) => {
		console.log(data);
		// showDialog("none");
		reset();
	};
	return (
		<DialogContent
			classIcon={"bg-black text-white p-2 sm:p-5 cursor-pointer !rounded-lg sm:!rounded-full -translate-y-3 sm:-translate-y-10 translate-x-3 sm:translate-x-10 opacity-100 "}
			className={"max-w-full max-sm:h-3/4 max-sm:p-2 text-gray-500 sm:max-w-200 z-51 max-sm:-translate-y-1/4  max-sm:bottom-0 max-sm:rounded-b-none"}>
			<ScrollArea className={"h-100 max-sm:w-full max-sm:h-full p-5 max-md:p-2 overflow-auto overscroll-none"}>
				<DialogTitle className={"max-sm: text-black text-lg lg:text-4xl sm:text-2xl sm:text-center"}>Chỉnh sửa thông tin tài
					khoản</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)} className={"w-full space-y-3 p-2 max-sm:my-5"}>
						{/*<UserRoundIcon className={"w-6 h-6"} />*/}
						<div className="">
							<Input placeholder={"Họ và tên của bạn"} className={"rounded-lg"} {...register("fullName", {
								required: "vui lòng nhập tên tài khoản",
							})} />
							{errors.fullName && <p className={"text-red-500 ml-2"}>{errors.fullName.message}</p>}
						</div>
						<DatePicker/>
						{/*{...register("birthday")}*/}
						<RadioGroup className={"flex space-x-4"} {...register("gender")}>
							{Object.keys(gender).map((_, index: number) => {
								return (
									<div key={index} className="flex flex-wrap space-x-2">
										<RadioGroupItem value={gender[index].value}
																		id={gender[index].value} className={"cursor-pointer "} />
										<Label htmlFor={gender[index].value} className={"cursor-pointer "}>{gender[index].name}</Label>
									</div>
								);
							})}
						</RadioGroup>
						{/*<PhoneIcon className={"w-6 h-6"} />*/}
						<div className="">
							<Input placeholder={"Số điện thoại"} className={""} {...register("phone", {
								required: true,
								pattern: {
									value: /\d+/,
									message: "This input is number only.",
								},
								minLength: {
									value: 10,
									message: "This input must exceed 10 characters",
								},
							})} />
							{errors.phone && <span className={"text-red-500 ml-2"}>{errors.phone.message}</span>}
						</div>
						<div className="flex w-full">
							<span className="flex-none px-4 text-gray-500">Chiều cao</span>
							<Slider
								{...register("height")}
								className={"shrink"}
								onValueChange={handleHeightChange}
								defaultValue={heightValue}
								min={140}
								max={190}
								step={1}
							/>
							<span className="flex-none px-4 text-blue-700">{heightValue} cm</span>
						</div>
						<div className="my-5 flex w-full">
							<span className="flex-none px-4 text-gray-500">Cân nặng</span>
							<Slider
								{...register("weight")}
								className={"shrink"}
								onValueChange={handleWeightChange}
								defaultValue={weightValue}
								min={40}
								max={90}
								step={1}
							/>
							<span className="flex-none px-4 text-blue-700">{weightValue} kg</span>
						</div>

						<Button type={"submit"}
										className={"p-3 text-white bg-black w-full uppercase cursor-pointer active:bg-neutral-500"}>Cập nhật
							tài khoản</Button>
					</form>
			</ScrollArea>
		</DialogContent>
	);
};

export default EditInfoProfileDialog;