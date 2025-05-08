"use client";

import * as React from "react";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.tsx";
import { formatDate } from "@/utils/helper/format-data.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import Input from "@/components/form/Input.tsx";
import { DayPicker } from "react-day-picker";

export function DatePicker({ defaultValue, className, type, ...props }: React.ComponentProps<"input">
) {
	const startYear = getYear(new Date()) - 100;
	const endYear = getYear(new Date()) + 100;
	const birthday = defaultValue as string;
	const [day, month, year] = birthday.split("/").map(Number);
	const dateObj = new Date(year, month - 1, day);
	const [date, setDate] = React.useState<Date | undefined>(dateObj);
	const currentDate = new Date();
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const years = Array.from(
		{ length: endYear - startYear + 1 },
		(_, i) => startYear + i,
	);

	const handleMonthChange = (month: string) => {
		const newDate = setMonth(date ?? currentDate, months.indexOf(month));
		setDate(newDate > currentDate ? currentDate : newDate);
	};

	const handleYearChange = (year: string) => {
		const newDate = setYear(date ?? currentDate, parseInt(year));
		setDate(newDate > currentDate ? currentDate : newDate);
	};

	const handleSelect = (selectedData: Date | undefined) => {
		if (selectedData) {
			setDate(selectedData);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Input
					{...props}
					type={'button'}
					onChange={() => {}}
					leftIcon={<CalendarIcon className="flex-none" />}
					className={cn(
						"w-40 justify-start text-left font-normal flex space-x-1 border-neutral-300 p-1 border-1 rounded-md focus-within:border-primary focus-within:text-primary-foreground focus-within:bg-primary",
						!date && "text-muted-foreground", className
					)}
					defaultValue={date ? formatDate(date) : 'Pick a date'}
				/>
			</DialogTrigger>
			<DialogContent className="w-full sm:w-auto p-2 z-60 "
										 classIcon={"bg-black text-white p-2  cursor-pointer !rounded-lg -translate-y-3 translate-x-3  opacity-100 "}
			>
				<ScrollArea className={"h-full w-full overflow-auto scroll-auto"}>
					<div className="flex content-start space-x-4 sm:justify-between p-2 mt-6 max-sm:my-6">
						<Select
							onValueChange={handleMonthChange}
							value={months[getMonth(date ?? currentDate)]}
						>
							<SelectTrigger className="">
								<SelectValue placeholder="Month" />
							</SelectTrigger>
							<SelectContent className={"z-70"}>
								{months.map(month => (
									<SelectItem key={month} value={month}>{month}</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							onValueChange={handleYearChange}
							value={getYear(date ?? currentDate).toString()}
						>
							<SelectTrigger className="">
								<SelectValue placeholder="Year" />
							</SelectTrigger>
							<SelectContent className={"z-70"}>
								{years.map(year => (
									<SelectItem key={year} value={year.toString()}>{year}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<DayPicker
						className={"z-52 "}
						classNames={{
							table: "w-full space-y-1",
							head_row: "flex ",
							head_cell:
								"text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
							row: "flex w-full mt-2",
							cell: cn(
								"relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
							),
							day_range_start: "day-range-start",
							day_range_end: "day-range-end",
							day_selected:
								"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
							day_today: "bg-accent text-accent-foreground",
							day_outside:
								"day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
							day_disabled: "text-muted-foreground opacity-50",
							day_range_middle:
								"aria-selected:bg-accent aria-selected:text-accent-foreground",
							day_hidden: "invisible",
						}}
						mode="single"
						selected={date ? date : undefined}
						onSelect={handleSelect}
						month={date ? date : undefined}
						onMonthChange={setDate}
						disabled={{ after: new Date(currentDate.setDate(currentDate.getDate())) }}
					/>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}