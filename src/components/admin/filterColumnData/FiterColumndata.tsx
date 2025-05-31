import { FC, memo } from "react";
import { FilterColumnDataProps } from "@/components/admin/filterColumnData/props/filterColumndata.prop.ts";
import Input from "@/components/form/Input.tsx";
import { ArrowDownUpIcon, SearchIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { CustomerSortEnum } from "@/utils/enums/admin/sort/customerSort.enum.ts";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils.ts";

const FilterColumnData: FC<FilterColumnDataProps> = memo((props: FilterColumnDataProps ) => {
	return (
		<>
			<div className={cn("flex py-2 space-x-3", props.infoData && 'flex-wrap')}>
				<Input leftIcon={<SearchIcon />}
							 className={"p-1 flex items-center space-x-2 w-full lg:w-8/10 bg-neutral-200 rounded-lg grow"}
							 placeholder={props.placeholderInput ?? ''} />
				<div className={cn("flex", props.infoData ? 'max-sm:justify-between max-sm:w-full max-sm:my-2 items-center space-x-2' : 'grow-0')}>
					{props.infoData && 	<span className={"font-bold text-sm lg:text-base"}>{props.infoData}</span>}
					<Popover>
						<PopoverTrigger className={"cursor-pointer "} asChild>
							<Button variant={"outline"} className={"cursor-pointer max-sm:size-8 "}>
								<ArrowDownUpIcon/>
							</Button>
						</PopoverTrigger>
						<PopoverContent className={"sm:-translate-2 sm:translate-y-2 w-auto max-sm:p-2 max-sm:text-xs"}>
							<p>Sort by</p>
							<RadioGroup defaultValue={Object.keys(CustomerSortEnum)[0]} className={"border-b py-3"}>
								{Object.entries(props.sortEnum).map((item) => (
									<div key={item[0]} className="flex items-center space-x-2">
										<RadioGroupItem value={item[0]} id={item[0]} />
										<Label htmlFor={item[0]}>{item[1]}</Label>
									</div>
								))
								}
							</RadioGroup>
							{
								props.DirectionSortBy &&
								<RadioGroup defaultValue={Object.keys(props.DirectionSortBy)[0]} className={"py-3"}>
									{Object.entries(props.DirectionSortBy).map((value) => (
										<div key={value[0]} className="flex items-center space-x-2">
											<RadioGroupItem value={value[0]} id={value[0]} />
											<Label htmlFor={value[0]}>{value[1]}</Label>
										</div>
									))
									}
								</RadioGroup>
							}
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</>
	)
})



export default FilterColumnData