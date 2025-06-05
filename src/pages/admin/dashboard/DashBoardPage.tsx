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
import PieChartLabel from "@/components/admin/chart/PieChartLabel.tsx";
import { pieChartLabelValue } from "@/components/admin/chart/props/pieChartLabel.prop.ts";
import PieChartDonutActive from "@/components/admin/chart/PieChartDonutActive.tsx";
import {
	pieChartDonutActiveValue,
} from "@/components/admin/chart/props/pieChartDonutActive.prop.ts";

export default function DashBoardPage() {
	return (
		<main className={'text-sm sm:text-base'}>
			<header className={"mb-3"}>
				<div className="flex justify-between items-end">
					<p className="flex justify-end items-center space-x-2 text-base	 sm:text-lg lg:text-2xl">
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
			<section className={"flex flex-wrap items-center space-x-2 max-sm:space-y-2 "}>
				<DatePicker defaultValue={formatDate(new Date())} />
				<Select defaultValue={"day"}>
					<SelectTrigger className="w-25">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="day">Day</SelectItem>
						<SelectItem value="week">Week</SelectItem>
						<SelectItem value="month">Month</SelectItem>
						<SelectItem value="year">Year</SelectItem>
					</SelectContent>
				</Select>
				<Badge variant={"default"} className={""}>Today</Badge>
			</section>
			<section className={"flex flex-wrap items-center justify-between xl:space-x-2 max-xl:space-y-2 my-4"}>
				{Object.values(metricsValues).map((metrics, index) => (
					<Metrics className={"w-full sm:w-72 lg:w-95 xl:w-60"} key={index} {...metrics} />
				))}
			</section>
			<section className={" flex max-lg:flex-wrap items-start justify-between lg:space-x-2 max-lg:space-y-2"}>
				<Metrics className={"w-full lg:w-7/10"} title={"Total sales over time"} value={20000000} unit={MetricsUnitType.CURRENCY}
								 chart={<LineChartCustomization {...LineChartData} />} />
				<div className="w-full lg:w-3/10 p-3 rounded-lg bg-gray-300">
					<BestSaleTop {...bestSaleData} />
				</div>
			</section>
			<section className={"max-sm:flex-col max-sm:space-y-2 sm:flex sm:flex-wrap items-center justify-between sm:gap-1 my-4"}>
				<div className="w-full lg:w-3/10">
					{/*Tỷ lệ đơn hàng bị trả về*/}
					<Metrics title={'Return Rate'} value={25} unit={MetricsUnitType.PERCENTAGE} chart={<PieChartCustomization {...PieChartData} />} />
				</div>
				<div className="w-full lg:w-3/10">
					{/*Giá trị đơn hàng trung bình (value là gía trị tổng đơn hàng trung bình) cong thuc: Tổng doanh thu / Số đơn hàng.*/}
					<Metrics title={'Average Order Value'} value={100} unit={MetricsUnitType.NUMBER} chart={<PieChartLabel {...pieChartLabelValue} />} />
				</div>
				<div className="w-full  lg:w-3/10">
					{/*Tỷ lệ bỏ giỏ hàng (Công thức: (Số giỏ hàng bị bỏ / Tổng số giỏ hàng) × 100.)*/}
					<Metrics title={'Cart Abandonment Rate'} value={25} unit={MetricsUnitType.PERCENTAGE} chart={<PieChartDonutActive {...pieChartDonutActiveValue} />} />
				</div>
			</section>
		</main>
	);
}

const metricsValues: Record<number, MetricsProp> = {
	0: { title: "Gross sale", value: 120000, unit: MetricsUnitType.CURRENCY, iconRight: <BanknoteIcon className={'flex-none font-bold text-neutral-500 size-8'} /> },
	1: { title: "Returning customer rate", value: 50, unit: MetricsUnitType.PERCENTAGE, iconRight: <UsersRoundIcon className={'flex-none font-bold text-neutral-500 size-8'} /> },
	2: { title: "Orders fulfilled", value: 99, unit: MetricsUnitType.NUMBER, iconRight: <PackageCheckIcon className={'flex-none font-bold text-neutral-500 size-8'} /> },
	3: { title: "Orders", value: 200, unit: MetricsUnitType.NUMBER, iconRight: <ScrollTextIcon className={'flex-none font-bold text-neutral-500 size-8'} /> },
};
