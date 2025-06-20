import { ChartConfig } from "@/components/ui/chart.tsx";
import { ChartProp } from "@/components/admin/chart/props/chart.prop.ts";

export type PieChartLabelProps = {
	dateName: string;
	value: number;
	fill?: string
}

const PieChartLabelData: PieChartLabelProps[] = [
	{ dateName: "7AM", value: 275, fill: "var(--color-chart-1)" },
	{ dateName: "8AM", value: 200, fill: "var(--color-chart-2)" },
	{ dateName: "9AM", value: 187, fill: "var(--color-chart-3)" },
	{ dateName: "10AM", value: 173, fill: "var(--color-chart-4)" },
	{ dateName: "11AM", value: 90, fill: "var(--color-chart-5)" },
	{ dateName: "12AM", value: 190, fill: "var(--color-chart-6)" },
];

const PieChartLabelConfig = {
	'7AM': {
		label: "7AM",
		color: "var(--chart-6)",
	},
	'8AM': {
		label: "8AM",
		color: "var(--chart-1)",
	},
	'9AM': {
		label: "9AM",
		color: "var(--chart-2)",
	},
	'10AM': {
		label: "10AM",
		color: "var(--chart-3)",
	},
	'11AM': {
		label: "11AM",
		color: "var(--chart-4)",
	},
	'12AM': {
		label: "12AM",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig;

const pieChartLabelValue: ChartProp<PieChartLabelProps> = {
	chartConfig: PieChartLabelConfig,
	chartData: PieChartLabelData,
}

export {pieChartLabelValue }