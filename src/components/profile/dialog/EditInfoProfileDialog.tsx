import { EditInfoProfileDialogProps, gender } from "@/components/profile/props/editInfoProfileDialog.props.ts";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext.tsx";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Input } from "@/components/ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { InfoProfileRequest } from "@/domain/resquest/infoProfile.request.ts";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { formatDate } from "@/utils/format-data.ts";

const EditInfoProfileDialog = ({ open }: EditInfoProfileDialogProps) => {
	const { showDialog } = useContext(GlobalContext);
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

	const [date, setDate] = useState<Date>();
	const onSubmit = (data: InfoProfileRequest) => {
		console.log(data);
		showDialog("none");
		reset();
	};
	return (
		<Dialog open={open} onOpenChange={(value) => !value && showDialog("none")}>
			<DialogContent
				classIcon={"bg-black text-white p-5 max-md:p-3 cursor-pointer !rounded-full -translate-y-10 translate-x-10 opacity-100 "}
				className={"max-md:p-2 text-gray-500 max-w-80 sm:max-w-200 z-51"}>
				<DialogTitle className={"text-black text-4xl max-md:text-2xl text-center"}>Chỉnh sửa thông tin tài
					khoản</DialogTitle>
				<ScrollArea className={"h-100 max-md:h-90 p-5 max-md:p-2 overflow-auto overscroll-none"}>
					<DialogDescription aria-description={'form'}>
						<form onSubmit={handleSubmit(onSubmit)} className={"space-y-3 p-2"}>
							{/*<UserRoundIcon className={"w-6 h-6"} />*/}
							<div className="">
								<Input placeholder={"Họ và tên của bạn"} className={"rounded-lg"} {...register("fullName", {
									required: "vui lòng nhập tên tài khoản",
								})} />
								{errors.fullName && <p className={"text-red-500 ml-2"}>{errors.fullName.message}</p>}
							</div>
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-[240px] justify-start text-left font-normal",
											!date && "text-muted-foreground",
										)}
									>
										<CalendarIcon />
										{date ? formatDate(date) : <span>Chọn ngày sinh</span>}
									</Button>
								</DialogTrigger>
								<DialogContent className="w-80 h-90 p-5"
															 classIcon={"bg-black text-white p-3 cursor-pointer !rounded-full -translate-y-10 translate-x-10 opacity-100 "}>
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										initialFocus
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										{...register("birthday")}
									/>
								</DialogContent>
							</Dialog>
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
					</DialogDescription>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default EditInfoProfileDialog;