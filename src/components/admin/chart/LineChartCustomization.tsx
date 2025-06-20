import { FC, memo } from "react";
import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export type LineChartProp = {
	dateName: string;
	total: number;
}
const lineChartConfig = {
	total: {
		label: "Total",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig;

const chartData: LineChartProp[] = [
	{ dateName: "7AM", total: 186 },
	{ dateName: "8AM", total: 305 },
	{ dateName: "9AM", total: 237 },
	{ dateName: "10AM", total: 73 },
	{ dateName: "11AM", total: 209 },
	{ dateName: "12AM", total: 214 },
];

const LineChartData: ChartProp<LineChartProp> =
	{
		chartData: chartData,
		chartConfig: lineChartConfig,
		xDataKey: "dateName",
		yDataKey: ["total"],
	};

const LineChartCustomization: FC<ChartProp<LineChartProp>> = memo(({ xDataKey = "dateName", chartData, ...props }) => {
	return (
		<ChartContainer className={props.className} config={props.chartConfig}>
			<LineChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey={xDataKey}
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<YAxis />
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				{props.yDataKey?.map((label, index) => (
					<Line key={index} type="monotone" dataKey={label} activeDot={{ r: 8 }} />))}
			</LineChart>
		</ChartContainer>
	);
});

export default LineChartCustomization;
export {LineChartData}