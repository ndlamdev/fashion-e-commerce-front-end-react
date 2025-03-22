import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useEffect, useState } from "react";
import ProductCardProp from "@/components/card-product/props/productCard.prop.ts";
import { Star } from "lucide-react";
import { useNavigate } from "react-router";
import { formatCurrency } from "@/utils/format-data.ts";
import { cn } from "@/lib/utils.ts";

export default function CardProduct(props: ProductCardProp) {
	const navigate = useNavigate();
	const [selected, setSelected] = useState<number>(0);
	const [numPageModel, setNumPageModel] = useState<number>(6);
	const [bgImage, setBgImage] = useState<string>(props.models[selected].imageUrls[0]);
	useEffect(() => setBgImage(props.models[selected].imageUrls[0]), [selected]);
	return (
		<Card className={cn(`rounded-none border-0 p-2 shadow-none`, props.className)}>
			<CardContent
				onClick={() => navigate(`/product-detail/${props.id}`, { replace: true })}
				className={`group relative h-[50vw] md:h-62 xl:h-84 cursor-pointer rounded-lg bg-cover bg-center bg-no-repeat p-0 text-base `}
				style={{ backgroundImage: `url(${bgImage})` }}
				onMouseEnter={() =>
					setBgImage(props.models[selected].imageUrls.length > 1 ? props.models[selected].imageUrls?.[1] : props.models[selected].imageUrls?.[0])
				}
				onMouseLeave={() => setBgImage(props.models[selected].imageUrls[0])}>
				<div className='absolute top-2 right-2 grid grid-cols-2 grid-rows-2'>
					{props.label && <Badge className={"lg:text-sx col-span-2 mb-2 rounded-xl border-0 bg-black text-white"}>{props.label}</Badge>}
					<div className=''></div>
					{/*<img*/}
					{/*	className={"object-fill size-7 "}*/}
					{/*	src={"src/assets/images/product/coolcash.webp"}*/}
					{/*	alt={"cash's name"}*/}
					{/*/>*/}
				</div>

				<span className={"absolute top-2 left-2 flex items-center font-bold"}>
					<span>{props.numStars}</span>
					<Star className='size-2 fill-black md:size-3' />
					<span className={"text-[8px] text-blue-600 md:text-xs"}>({props.numComments})</span>
				</span>

				{props.attachGiftThumbnail && (
					<div className='absolute bottom-0'>
						<img className={"rounded-b-lg"} src={props.attachGiftThumbnail} alt={props.models[selected].name} />
					</div>
				)}

				<div
					className={
						"absolute bottom-0 left-1/2 w-5/6 -translate-x-1/2 rounded-lg bg-white/30 p-2 text-center opacity-1 backdrop-blur-xl " +
						"transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 group-hover:opacity-100"
					}>
					<p className={"m-0 mb-1 p-0 text-sm font-bold"}>Thêm nhanh vào giỏ hàng +</p>
					<div className={"flex cursor-pointer flex-wrap gap-2"}>
						{props.models[selected].sizes.map((size: string, index: number) => (
							<Badge key={index} className={"size-10 border-0 bg-white text-black hover:bg-black! hover:text-white"}>
								{size}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>

			<CardFooter className={"block p-0 font-bold text-xs sm:text-sm"}>
				<div className='flex flex-wrap items-center gap-2'>
					{props.models.slice(0, numPageModel).map((item, index) => (
						<div
							key={index}
							onClick={() => setSelected(index)}
							style={{ backgroundColor: item.codeColor }}
							className={`h-4 w-8 cursor-pointer rounded-2xl ${selected === index ? "outline-2 outline-offset-2 outline-neutral-700" : "outline-none"}`}></div>
					))}

					{props.models.length > 6 && numPageModel === 6 && (
						<span onClick={() => setNumPageModel(props.models.length)} className={"font-bold"}>
							{props.models.length > 6 ? ` +${props.models.length - 6}` : ""}
						</span>
					)}
				</div>
				<p className={"my-1"}>{props.name}</p>
				<p className={"mb-1 flex flex-wrap gap-2"}>
					{/*discount handle*/}
					<span>{formatCurrency(props.discount ? props.price * (1 - props.discount * 0.01) : props.price)}</span>
					{props.discount && <Badge className={"rounded-2 bg-blue-700 text-xs font-bold text-white"}>-{props.discount}%</Badge>}
					{props.discount && <span className={"text-neutral-400 line-through"}>{formatCurrency(props.price)}</span>}
				</p>
				{props.description && <span className={"text-xs text-blue-700 line-clamp-1"}>{props.description}</span>}
			</CardFooter>
		</Card>
	);
}
