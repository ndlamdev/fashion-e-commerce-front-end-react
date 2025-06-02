import { FC, memo } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart.tsx";
import OrderStatusEnum from "@/utils/enums/orderStatus.enum.ts";

type pieProps = {
	cx: number,
	cy: number,
	midAngle: number,
	innerRadius: number,
	outerRadius: number,
	percent: number,
	index: number
}

type PieChartProp = {
	name: OrderStatusEnum | string;
	value: number;
}

const pieData: PieChartProp[] = [
	{ name: "REST", value: 75 },
	{ name: "CANCEL", value: 25 },
];

const pieChartConfig = {
	complete: {
		label: "Complete",
		color: "var(--chart-1)",
	},
	total: {
		label: "Total",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;
const PieChartData: ChartProp<PieChartProp> =
	{
		chartData: pieData,
		chartConfig: pieChartConfig,
	};


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = memo(({ cx, cy, midAngle, innerRadius, outerRadius, percent }: pieProps) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
});
const PieChartCustomization: FC<ChartProp<PieChartProp>> = memo((props) => {
	return (
		<ChartContainer className={props.className} config={props.chartConfig}>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Pie
					data={props.chartData}
					cx="50%"
					cy="50%"
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{props.chartData.map((_, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>

			</PieChart>
		</ChartContainer>
	);
});

export default PieChartCustomization;
export { PieChartData };