import { ChartConfig } from "@/components/ui/chart.tsx";

export type ChartProp<T> = {
	chartData: T[]
	chartConfig: ChartConfig
	xDataKey?: string
	yDataKey?: string[]
	className?: string
}
