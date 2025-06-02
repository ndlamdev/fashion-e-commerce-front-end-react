import { FC, memo } from "react";
import { MetricsProp } from "@/components/admin/chart/props/metrics.prop.ts";
import { MetricsUnitType } from "@/utils/enums/admin/chart/metricsUnit.enum.ts";
import GradientText from "@/components/GradientText/GradientText.tsx";
import CountUp from "@/components/CountUp/CountUp.tsx";
import SplitText from "@/components/SplitText/SplitText";
import { cn } from "@/lib/utils.ts";
import { formatCurrency } from "@/utils/helper/format-data.ts";

const Metrics: FC<MetricsProp> = memo((props) => {
	return (
		<div className={cn(" w-100 p-2 rounded-lg bg-gray-300", props.className)}>
			<div className="flex items-center justify-between">
				<div className={" text-start"}>
					<p className={'font-bold text-neutral-500'}>{props.title}</p>
					<div className="float-start text-2xl">
						{props.unit === MetricsUnitType.CURRENCY &&
							<GradientText ><SplitText className={' text-black px-1'} text={formatCurrency(props.value)} /></GradientText>}
						{props.unit === MetricsUnitType.PERCENTAGE &&
							<GradientText className={''} colors={["#9290C3", "#1B1A55", "#070F2B"]} animationSpeed={3}><CountUp
								to={props.value} /> %</GradientText>}
						{props.unit === MetricsUnitType.NUMBER &&
							<GradientText colors={["#9290C3", "#1B1A55", "#070F2B"]} animationSpeed={3}><CountUp
								to={props.value} /></GradientText>}
					</div>
				</div>
				<p className="">{props.iconRight}</p>
			</div>
			{props.chart}
		</div>
	);
});

export default Metrics;