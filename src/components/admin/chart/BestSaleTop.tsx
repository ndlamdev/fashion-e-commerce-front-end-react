import { FC, memo } from "react";
import { BestSaleProp } from "@/components/admin/chart/props/bestSale.prop.ts";
import CountUp from "@/components/CountUp/CountUp.tsx";
import GradientText from "@/components/GradientText/GradientText.tsx";
import { ScrollTextIcon } from "lucide-react";
import { bestSaleData } from "@/assets/data/admin/chart/bestsale.data.ts";

const BestSaleTop: FC<BestSaleProp[]> = memo((props) => {
	if(!props.length) props = bestSaleData
	return (
		<article>
			<p className={"flex justify-between items-center"}>
				<span>Top {props.length} Collection best sale</span><span><ScrollTextIcon className={"flex-none"} /></span></p>
			{props.length > 0 && props.map((item, index) => (
				<div key={index} className={"flex items-center justify-between p-2 bg-neutral-100 my-2 rounded-lg"}>
					<div className={'text-neutral-500 font-bold'}>{item.title}</div>
					<div className=""><GradientText colors={["#9290C3", "#1B1A55", "#070F2B"]}><CountUp to={item.quantity} /></GradientText></div>
				</div>
			))}
		</article>
	);
});

export default BestSaleTop;