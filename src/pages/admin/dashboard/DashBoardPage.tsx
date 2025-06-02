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
import LineChartCustomization, { LineChartData } from "@/components/admin/chart/LineChartCustomization.tsx";
import BestSaleTop from "@/components/admin/chart/BestSaleTop.tsx";
import { bestSaleData } from "@/assets/data/admin/chart/bestsale.data.ts";
import PieChartCustomization, { PieChartData } from "@/components/admin/chart/PieChartCustomization.tsx";

export default function DashBoardPage() {
	return (
		<main className={'text-sm sm:text-base'}>
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
						<SelectItem value="week">Month</SelectItem>
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
			<section className={" flex items-start justify-between space-x-2"}>
				<Metrics className={"w-7/10"} title={"Total sales over time"} value={20000000} unit={MetricsUnitType.CURRENCY}
								 chart={<LineChartCustomization {...LineChartData} />} />
				<div className="w-3/10 p-3 rounded-lg bg-gray-300">
					<BestSaleTop {...bestSaleData} />
				</div>
			</section>
			<section className={"flex items-center justify-between space-x-2 my-4"}>
				<div className="w-3/9">
					<Metrics title={'Return Rate'} value={25} unit={MetricsUnitType.PERCENTAGE} chart={<PieChartCustomization {...PieChartData} />} />
				</div>
				<div className="w-3/9"></div>
				<div className="w-3/9"></div>
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
