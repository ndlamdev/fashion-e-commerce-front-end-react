import {
	BanknoteIcon,
	BellRing,
	ChartNoAxesColumnIcon,
	PackageCheckIcon,
	RefreshCcw,
	ScrollTextIcon,
	UsersRoundIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { DatePicker } from "@/components/DatePickerCustom.tsx";
import { formatDate } from "@/utils/helper/format-data.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { MetricsProp } from "@/components/admin/chart/props/metrics.prop.ts";
import { MetricsUnitType } from "@/utils/enums/admin/chart/metricsUnit.enum.ts";
import Metrics from "@/components/admin/chart/Metrics.tsx";
import LineChartCustomization from "@/components/admin/chart/LineChartCustomization.tsx";
import { LineChartData } from "@/assets/data/admin/chart/chart.data.ts";

export default function DashBoardPage() {
	return (
		<main>
			<header className={"my-3"}>
				<div className="flex justify-between items-end">
					<p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
						<ChartNoAxesColumnIcon className={"size-4 sm:size-6 lg:size-8"} />
						<span className={"font-bold "}>Analytics</span>
					</p>
					<div className="flex items-center space-x-2 text-center">
						<Button variant={"outline"}
										className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}><RefreshCcw /></Button>
						<Button variant={"outline"} className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}><BellRing /></Button>
					</div>
				</div>
			</header>
			<section className={"flex items-center space-x-2 "}>
				<DatePicker defaultValue={formatDate(new Date())} />
				<Select defaultValue={"day"}>
					<SelectTrigger className="w-25">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="day">Day</SelectItem>
						<SelectItem value="month">Month</SelectItem>
						<SelectItem value="year">Year</SelectItem>
					</SelectContent>
				</Select>
				<Badge variant={"default"} className={""}>Today</Badge>
			</section>
			<section className={"flex items-center justify-between space-x-2"}>
				{Object.values(metricsValues).map((metrics, index) => (
					<Metrics className={"my-4"} key={index} {...metrics} />
				))}
			</section>
			<section className={" flex items-center justify-between space-x-2"}>
				<Metrics className={"w-6/10"} title={"Total sales over time"} value={20000000} unit={MetricsUnitType.CURRENCY}
								 chart={<LineChartCustomization {...LineChartData} />} />
			</section>
		</main>
	);
}

const metricsValues: Record<number, MetricsProp> = {
	0: { title: "Gross sale", value: 120000, unit: MetricsUnitType.CURRENCY, iconRight: <BanknoteIcon /> },
	1: { title: "Returning customer rate", value: 50, unit: MetricsUnitType.PERCENTAGE, iconRight: <UsersRoundIcon /> },
	2: { title: "Orders fulfilled", value: 99, unit: MetricsUnitType.NUMBER, iconRight: <PackageCheckIcon /> },
	3: { title: "Orders", value: 200, unit: MetricsUnitType.NUMBER, iconRight: <ScrollTextIcon /> },
};
