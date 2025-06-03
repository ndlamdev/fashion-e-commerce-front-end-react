import { FC, memo } from "react";
import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";
import { PieChartLabelProps } from "@/components/admin/chart/props/pieChartLabel.prop.ts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart.tsx";
import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { cn } from "@/lib/utils.ts";

const PieChartDonutActive: FC<ChartProp<PieChartLabelProps>> = memo((props) => {
	return (
		<ChartContainer
			config={props.chartConfig}
			className={cn(props.className)}
		>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				<Pie
					data={props.chartData}
					dataKey="value"
					nameKey="dateName"
					innerRadius={40}
					strokeWidth={5}
					activeIndex={0}
					activeShape={({
													outerRadius = 0,
													...props
												}: PieSectorDataItem) => (
						<Sector {...props} outerRadius={outerRadius + 10} />
					)}
				/>
			</PieChart>
		</ChartContainer>
	);
});

export default PieChartDonutActive