import { MetricsUnitType } from "@/utils/enums/admin/chart/metricsUnit.enum.ts";
import { ReactNode } from "react";

export type MetricsProp = {
	title: string;
	value: number;
	unit: MetricsUnitType
	chart?: ReactNode
	iconRight?: ReactNode
	className?: string;
}
