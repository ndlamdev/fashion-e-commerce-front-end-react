import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { Label } from "@/components/ui/label.tsx";
import { CheckboxCustom } from "@/components/checkbox/CheckboxCustom.tsx";
import { SameRadioGroup, SameRadioGroupItem } from "@/components/radio-group/SameRadioGroup.tsx";
import { ListFilterPlus } from "lucide-react";
import AccordionCustom from "@/components/accordion/AccordionCustom.tsx";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import Input from "@/components/form/Input.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { memo, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { useSearchParams } from "react-router";

function CollectionFilter(props: CollectionFilterProps) {
	const isDesktop = useMediaQuery("(min-width: 640px)");
	const [searchParams, setSearchParams] = useSearchParams();
	const [sizeValues, setSizeValues] = useState<string[]>(searchParams.getAll('sizes'));
	const [colorValue, setColorValue] = useState<string | null>(searchParams.get("colors"));
	// Xử lý khi checkbox thay đổi
	const handleToggle = useCallback((item: string) => {
		setSizeValues((prev) => (prev
			.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));

		console.log(sizeValues);
	}, [sizeValues]);
	console.log(sizeValues);

	useEffect(() => {
		const newParams = new URLSearchParams(searchParams); // Clone lại params hiện tại
		newParams.delete("sizes");
		newParams.delete("colors");

		sizeValues.forEach(size => {
			newParams.append("sizes", size);
		});

		if (colorValue) {
			newParams.set("colors", colorValue);
		}
		setSearchParams(newParams);
	}, [sizeValues, colorValue, searchParams, setSearchParams]);
	if (isDesktop) {
		return (
			<ScrollArea className='h-dvh overscroll-auto'>
				<div className={"text-sm font-bold text-gray-500"}>
					<AccordionCustom
						isDown={true}
						className={"w-full"}
						trigger={<span className={"cursor-pointer"}>Kích cỡ</span>}
						content={
							<div className={"flex flex-wrap items-center gap-2"}>
								{props.size.map((item: string, index: number) => (
									<div key={index} className={"relative rounded-sm border-1 border-gray-300 px-6 py-2 uppercase"}>
										<CheckboxCustom
											onCheckedChange={() => {
												handleToggle(item);
											}}
											defaultChecked={sizeValues?.includes(item)}
											className={cn("absolute top-0 left-0 size-full cursor-pointer rounded-sm border-4 border-none ", )}>
											<div
												// style={{backgroundColor: sizeValues?.includes(item) ? `#4E71FF` : ''}}
												className={cn("size-full cursor-pointer rounded-sm  px-6 py-2 text-center uppercase bg-sky-600", )}>
												{item}
											</div>
										</CheckboxCustom>
										{item}
									</div>
								))}
							</div>
						}
					/>

					<AccordionCustom
						className={"w-full"}
						trigger={<span className={"cursor-pointer"}>Màu sắc</span>}
						content={
							<SameRadioGroup className={"flex flex-wrap items-center space-x-5 space-y-2"} onValueChange={setColorValue}>
								{props.color.map((item, index) => (
									<div key={index} className={"py-3"}>
										<div className={cn('relative size-6 cursor-pointer rounded-full', item.style)}>
											<SameRadioGroupItem checked={item.slug === colorValue} defaultChecked={item.slug === colorValue} className={"size-6 cursor-pointer rounded-full border-none"} value={item.slug} id={item.slug}>
												<span className={"absolute size-6 rounded-full outline-2 outline-offset-2 outline-blue-700"}></span>
											</SameRadioGroupItem>
											<Label className={"cursor-pointer"} htmlFor={item.slug}>
												{item.name}
											</Label>
										</div>
									</div>
								))}
							</SameRadioGroup>
						}
					/>
				</div>
			</ScrollArea>
		);
	}
	return (
		<Drawer>
			<DrawerTrigger>
				<Input className={"flex w-32 rounded-full bg-neutral-200 p-1"} placeholder={"Bộ lọc"} rightIcon={<ListFilterPlus />} />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Tìm kiếm sản phẩm?</DrawerTitle>
					<DrawerDescription>

					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className={"p-0"}>
					<ScrollArea className={"h-100 w-full overflow-y-auto scroll-smooth"}>
						<div className={"p-5 text-sm font-bold text-gray-500"}>
							<AccordionCustom
								isDown={true}
								className={"w-full"}
								trigger={<span className={"cursor-pointer"}>Kích cỡ</span>}
								content={
									<div className={"flex items-center space-x-2"}>
										{props.size.map((item: string, index: number) => (
											<div className={"relative rounded-sm border-1 border-gray-300 px-6 py-2 uppercase"}>
												<CheckboxCustom className={"absolute top-0 left-0 size-full cursor-pointer rounded-sm border-4 border-none"}>
													<div key={index} className={"size-full cursor-pointer rounded-sm bg-blue-700 px-6 py-2 text-center uppercase"}>
														{item}
													</div>
												</CheckboxCustom>
												{item}
											</div>
										))}
									</div>
								}
							/>

							<AccordionCustom
								className={"w-full"}
								trigger={<span className={"cursor-pointer"}>Màu sắc</span>}
								content={
									<SameRadioGroup className={"flex flex-wrap items-center space-x-2"}>
										{props.color.map((item, index) => (
											<div key={index} className={"py-3"}>
												<div className={cn("relative size-6 cursor-pointer rounded-full", item.style)}>
													<SameRadioGroupItem checked={item.slug === colorValue} className={"size-6 cursor-pointer rounded-full border-none"} value={item.slug} id={item.slug}>
														<span className={"absolute size-6 rounded-full outline-2 outline-offset-2 outline-blue-700"}></span>
													</SameRadioGroupItem>
													<Label className={"cursor-pointer"} htmlFor={item.slug}>
														{item.name}
													</Label>
												</div>
											</div>
										))}
									</SameRadioGroup>
								}
							/>
						</div>
					</ScrollArea>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
export default memo(CollectionFilter);