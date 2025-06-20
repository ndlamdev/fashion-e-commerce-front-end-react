import { PieChartLabelProps } from "@/components/admin/chart/props/pieChartLabel.prop.ts";
import { ChartConfig } from "@/components/ui/chart.tsx";
import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";

const PieChartDonutActiveData: PieChartLabelProps[] = [
	{ dateName: "Abandonment", value: 25, fill: "var(--color-chart-1)" },
	{ dateName: "Total", value: 100, fill: "var(--color-chart-6)" },
];
const PieChartLabelConfig = {
	Abandonment: {
		label: "Chưa đặt",
		color: "var(--chart-3)",
	},
	Total: {
		label: "Tổng",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig;

export const pieChartDonutActiveValue: ChartProp<PieChartLabelProps> = {
	chartConfig: PieChartLabelConfig,
	chartData: PieChartDonutActiveData,
}