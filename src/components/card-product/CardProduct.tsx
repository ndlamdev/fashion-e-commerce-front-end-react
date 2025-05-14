import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useEffect, useState } from "react";
import ProductCardProp from "@/components/card-product/props/productCard.prop.ts";
import { Star } from "lucide-react";
import { useNavigate } from "react-router";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { cn } from "@/lib/utils.ts";

export default function CardProduct(props: ProductCardProp) {
	const navigate = useNavigate();
	const [selected, setSelected] = useState<number>(0);
	const [numPageModel, setNumPageModel] = useState<number>(6);
	const [bgImage, setBgImage] = useState<string>(props.images[0].src);
	useEffect(() => setBgImage(props.images[selected].src), [props.images, selected]);
	return (
		<Card className={cn(`rounded-none border-0 p-2 shadow-none`, props.className)}>
			<CardContent
				onClick={() => navigate(`/product-detail/${props.id}`, { replace: true })}
				className={`group relative h-[50vw] cursor-pointer rounded-lg bg-cover bg-center bg-no-repeat p-0 text-base md:h-62 xl:h-84`}
				style={{ backgroundImage: `url(${bgImage})` }}
				onMouseEnter={() => setBgImage(props.images.length > 1 ? props.images[1].src : props.images[0].src)}
				onMouseLeave={() => setBgImage(props.images[0].src)}>
				<div className='absolute top-2 right-2 grid grid-cols-2 grid-rows-2'>
					{props.tags && props.tags.map((tag) => <Badge className={"lg:text-sx col-span-2 mb-2 rounded-xl border-0 bg-black text-white"}>{tag}</Badge>)}
					<div className=''></div>
					<img className={"size-7 object-fill"} src={props.icon_thumbnail.src} alt={props.title} />
				</div>

				<span className={"absolute top-2 left-2 flex items-center font-bold"}>
					<span>{props.review?.ratingValue}</span>
					<Star className='size-2 fill-black md:size-3' />
					<span className={"text-[8px] text-blue-600 md:text-xs"}>({props.review?.reviewCount})</span>
				</span>

				{props.icon_thumbnail && (
					<div className='absolute bottom-0'>
						<img className={"rounded-b-lg"} src={props.icon_thumbnail.src} alt={props.title} />
					</div>
				)}

				<div
					className={
						"absolute bottom-0 left-1/2 w-5/6 -translate-x-1/2 rounded-lg bg-white/30 p-2 text-center opacity-1 backdrop-blur-xl " +
						"transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100"
					}>
					<p className={"m-0 mb-1 p-0 text-sm font-bold"}>Thêm nhanh vào giỏ hàng +</p>
					<div className={"flex cursor-pointer flex-wrap gap-2"}>
						{props.variants.map((variant) => (
							<Badge key={variant.id} className={"size-10 border-0 bg-white text-black hover:bg-black! hover:text-white"}>
								{variant.options.SIZE}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>

			<CardFooter className={"block p-0 text-xs font-bold sm:text-sm"}>
				<div className='flex flex-wrap items-center gap-2'>
					{props.variants.slice(0, numPageModel).map((_, index) => (
						<div
							key={index}
							onClick={() => setSelected(index)}
							className={`h-4 w-8 cursor-pointer rounded-2xl ${selected === index ? "outline-2 outline-offset-2 outline-neutral-700" : "outline-none"}`}></div>
					))}

					{props.variants.length > 6 && numPageModel === 6 && (
						<span onClick={() => setNumPageModel(props.variants.length)} className={"font-bold"}>
							{props.variants.length > 6 ? ` +${props.variants.length - 6}` : ""}
						</span>
					)}
				</div>
				<p className={"my-1"}>{props.title}</p>
				<p className={"mb-1 flex flex-wrap gap-2"}>
					<span>
						{formatCurrency(props.discount ? props.variants[selected].regular_price * (1 - props.discount.percent) : props.variants[selected].regular_price)}
					</span>
					{props.discount && <Badge className={"rounded-2 bg-blue-700 text-xs font-bold text-white"}>-{props.discount.percent}%</Badge>}
					{props.discount && <span className={"text-neutral-400 line-through"}>{formatCurrency(props.variants[selected].regular_price)}</span>}
				</p>
				{<span className={"line-clamp-1 text-xs text-blue-700"}>{props.display_name_open}</span>}
			</CardFooter>
		</Card>
	);
}
