import { FC, memo } from "react";
import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart.tsx";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type DataProp = {
	hour: string;
	total: number;
}

const LineChartCustomization: FC<ChartProp<DataProp>> = memo(({ xDataKey = "hour", chartData, ...props }) => {
	return (
		<ChartContainer className={props.className} config={props.chartConfig}>
			<LineChart accessibilityLayer data={chartData}>
				<CartesianGrid  vertical={false} />
				<XAxis
					dataKey={xDataKey}
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<YAxis />
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				{props.yDataKey.map((label, index) => (
					<Line key={index} type="monotone" dataKey={label} activeDot={{ r: 8 }} />))}
			</LineChart>
		</ChartContainer>
	);
});

export default LineChartCustomization;