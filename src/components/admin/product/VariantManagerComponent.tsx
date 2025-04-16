/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:22 PM - 16/04/2025
 *  User: Lam Nguyen
 **/
import { HumbleiconsPlusCircle } from "@/assets/images/icons/HumbleiconsPlusCircle.tsx";
import { CodexMenu } from "@/assets/images/icons/CodexMenu.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import OptionVariantType from "@/types/admin/option-variant.type.ts";

function VariantManagerComponent() {
	const [optionVariants, setOptionVariants] = useState<OptionVariantType[]>([]);

	const createNewOption = () => {
		setOptionVariants((prevState) => [...prevState, { name: "", values: [{ newValue: "", oldValue: "" }], canAddNewValueOption: true }]);
	};

	const onChangeValueOptionVariant = (indexOptionVariant: number, indexValueOptionVariant: number, value: string) => {
		const optionVariant = optionVariants[indexOptionVariant];
		const valueOptionVariant = optionVariant.values[indexValueOptionVariant];
		if (indexValueOptionVariant == optionVariant.values.length - 1 && value.length > valueOptionVariant.oldValue.length && optionVariant.canAddNewValueOption) {
			optionVariant.canAddNewValueOption = false;
			optionVariant.values.push({ oldValue: "", newValue: "" });
		}
		valueOptionVariant.oldValue = valueOptionVariant.newValue;
		valueOptionVariant.newValue = value;
		setOptionVariants((prevState) =>
			prevState.map((item, i) =>
				indexOptionVariant === i
					? {
							...optionVariant,
							values: item.values.map((preValueOption, indexPreValueOption) =>
								indexPreValueOption == indexValueOptionVariant ? { ...preValueOption } : preValueOption,
							),
						}
					: item,
			),
		);
	};

	const onChangeNameOptionVariant = (indexOptionVariant: number, name: string) => {
		setOptionVariants((prevState) => prevState.map((item, i) => (indexOptionVariant === i ? { ...item, name: name } : item)));
	};

	const onFocusValueOptionVariant = (indexOptionVariant: number) => {
		setOptionVariants((prevState) =>
			prevState.map((item, i) =>
				indexOptionVariant === i
					? {
							...item,
							canAddNewValueOption: true,
						}
					: item,
			),
		);
	};

	const onBlurValueOptionVariant = (indexOptionVariant: number, indexValueOptionVariant: number) => {
		const optionVariant = optionVariants[indexOptionVariant];
		if (optionVariant.values[indexValueOptionVariant].newValue.length < 1) {
			optionVariant.values[indexValueOptionVariant].newValue = optionVariant.values[indexValueOptionVariant].oldValue;
		}

		setOptionVariants((prevState) =>
			prevState.map((item, i) =>
				indexOptionVariant === i
					? {
							...optionVariant,
						}
					: item,
			),
		);
	};

	return (
		<>
			{!optionVariants.length ? (
				<button className={"flex w-[210px] items-center gap-2 rounded-md p-1 text-sm hover:bg-gray-100"} onClick={createNewOption}>
					<HumbleiconsPlusCircle width={15} height={15} />
					Add options like size or color
				</button>
			) : (
				<div className={"rounded-md border-1 border-gray-200"}>
					{optionVariants.map((optionVariant, indexOptionVariant) => (
						<div className={"flex flex-row border-b-1 border-gray-200 p-4"}>
							<div className={"w-8"}>
								<CodexMenu color={"gray"} className={"mt-7.5"} />
							</div>
							<div className={"flex flex-1 flex-col gap-1"}>
								<div>
									<label className={"text-sm"}>Option name</label>
									<Input
										placeholder={"Option name"}
										value={optionVariant.name}
										onChange={(event) => onChangeNameOptionVariant(indexOptionVariant, event.target.value)}
									/>
								</div>
								<div>
									<label className={"text-sm"}>Option value</label>
									{optionVariant.values.map((valueOptionVariant, indexValueOptionVariant) => (
										<Input
											placeholder={"Option value"}
											className={"mb-0.75"}
											value={valueOptionVariant.newValue}
											onFocus={() => onFocusValueOptionVariant(indexOptionVariant)}
											onBlur={() => onBlurValueOptionVariant(indexOptionVariant, indexValueOptionVariant)}
											onChange={(event) => onChangeValueOptionVariant(indexOptionVariant, indexValueOptionVariant, event.target.value)}
										/>
									))}
								</div>
								<div className={"mt-2 flex justify-between"}>
									<button className={"rounded-md border-1 border-gray-300 px-2 py-0.5 text-sm text-red-500 hover:bg-gray-100"}>Delete</button>
									<button className={"rounded-md border-1 border-gray-300 bg-[rgba(0,0,0,0.8)] px-2 py-0.5 text-sm text-white hover:bg-black"}>Done</button>
								</div>
							</div>
						</div>
					))}
					<div className={"p-1 hover:bg-gray-100"}>
						<button className={"flex w-full items-center gap-2 p-1 text-sm"} onClick={createNewOption}>
							<HumbleiconsPlusCircle width={15} height={15} />
							Add another options
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default VariantManagerComponent;
