"use client";

import { Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FC, memo } from "react";
import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";
import { PieChartLabelProps } from "@/components/admin/chart/props/pieChartLabel.prop.ts";


const PieChartLabel: FC<ChartProp<PieChartLabelProps>> = memo((props) => {
	return (
			<ChartContainer
				config={props.chartConfig}
				className={props.className}
			>
				<PieChart>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
					<Pie data={props.chartData} dataKey="value" label nameKey="dateName" />
				</PieChart>
			</ChartContainer>
	);
});

export default PieChartLabel