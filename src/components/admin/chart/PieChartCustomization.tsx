import { FC, memo } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart.tsx";
import OrderStatusEnum from "@/utils/enums/orderStatus.enum.ts";

type PieChartProp = {
	name: OrderStatusEnum | string;
	value: number;
	fill?: string
}

const pieData: PieChartProp[] = [
	{ name: "REST", value: 75, fill: "var(--chart-5)" },
	{ name: "CANCEL", value: 25, fill: "var(--chart-3)" },
];

const pieChartConfig = {
	REST: {
		label: "REST",
		color: "var(--chart-1)",
	},
	CANCEL: {
		label: "CANCEL",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;
const PieChartData: ChartProp<PieChartProp> =
	{
		chartData: pieData,
		chartConfig: pieChartConfig,
	};


const PieChartCustomization: FC<ChartProp<PieChartProp>> = memo((props) => {
	return (
		<ChartContainer className={props.className} config={props.chartConfig}>
			<PieChart>
				<ChartTooltip
					content={<ChartTooltipContent className={''} nameKey="value" hideLabel />}
				/>
				<Pie data={props.chartData} dataKey="value">
					<LabelList
						dataKey="name"
						className="fill-neutral-500"
						stroke="none"
						fontSize={12}
						formatter={(value: keyof typeof props.chartConfig) =>
							props.chartConfig[value]?.label
						}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
});

export default PieChartCustomization;
export { PieChartData };