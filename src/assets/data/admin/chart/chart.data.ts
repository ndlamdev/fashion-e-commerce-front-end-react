import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";
import { ChartConfig } from "@/components/ui/chart.tsx";

const chartConfig = {
	total: {
		label: "Total",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig

const chartData = [
	{ hour: "7AM", total: 186, },
	{ hour: "8AM", total: 305, },
	{ hour: "9AM", total: 237, },
	{ hour: "10AM", total: 73, },
	{ hour: "11AM", total: 209, },
	{ hour: "12AM", total: 214, },
]

export const LineChartData: ChartProp<{hour: string, total: number}> =
	{
		chartData: chartData,
		chartConfig: chartConfig,
		xDataKey: 'hour',
		yDataKey: ['total']
	}
