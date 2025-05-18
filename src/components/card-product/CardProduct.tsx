import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useEffect, useMemo, useState } from "react";
import ProductCardProp from "@/components/card-product/props/productCard.prop.ts";
import { Star } from "lucide-react";
import { useNavigate } from "react-router";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { cn } from "@/lib/utils.ts";
import ProductImageType from "@/types/product/productImage.type.ts";
import { OptionType } from "@/types/product/productOption.type.ts";
import { SameRadioGroup, SameRadioGroupItem } from "@/components/radio-group/SameRadioGroup.tsx";
import { Label } from "@/components/ui/label.tsx";

export default function CardProduct(props: ProductCardProp) {
	const navigate = useNavigate();
	const RESOURCE_IMAGE = import.meta.env.VITE_BASE_MEDIA_URL;
	const [colorSelected, setColorSelected] = useState<string | undefined>();
	const [sizeSelected, setSizeSelected] = useState<string | undefined>();
	const [imagesColor, setImagesColor] = useState<(ProductImageType | undefined) []>();

	useEffect(() => {
		if (!props) return;
		setColorSelected(props.variants[0]?.options[OptionType.COLOR]);
		setSizeSelected(props.variants[0]?.options[OptionType.SIZE]);
		const colorValues = props.options.find(opt => opt.type === OptionType.COLOR)?.values;
		const colorOptions = props.options_value.find((opt) => opt.type === OptionType.COLOR)
		setImagesColor(colorValues
			?.map((color: string) => {
				return colorOptions?.options?.find((item) => item.title === color)?.images[0];
			}));
	}, [props]);

	const variants = useMemo(() => {
		return props.variants.find(v => v.options.COLOR === colorSelected && v.options.SIZE === sizeSelected);
	}, [props, colorSelected, sizeSelected]);

	const cardData = useMemo(() => {
		const images = props.options_value.find(opt => opt.type === OptionType.COLOR)
			?.options?.find(item => item.title === colorSelected)?.images;
		return images?.map((item, index) => ({
			id: index,
			img: RESOURCE_IMAGE + item.src,
		}));
	}, [props, colorSelected, RESOURCE_IMAGE]);

	const [bgImage, setBgImage] = useState<string | undefined>();
	useEffect(() => {
		setBgImage((cardData && cardData.length > 1) ? cardData[0].img : (RESOURCE_IMAGE + props.images[0].src))
	}, [RESOURCE_IMAGE, cardData, props.images]);
	return (
		<Card className={cn(`rounded-none border-0 p-2 shadow-none`, props.className)}>
			<CardContent
				onClick={() => {
					if(!variants?.regular_price) return
					navigate(`/product-detail/${props.id}`, { replace: true });
				}}
				className={`group relative h-[50vw] cursor-pointer rounded-lg bg-cover bg-center bg-no-repeat p-0 text-base md:h-62 xl:min-h-72`}
				style={{ backgroundImage: `url("${bgImage}")` }}
				onMouseEnter={() => setBgImage((cardData && cardData.length > 1) ? cardData[1].img : RESOURCE_IMAGE + props.images[1].src)}
				onMouseLeave={() => setBgImage((cardData && cardData.length > 1) ? cardData[0].img : RESOURCE_IMAGE + props.images[0].src)}
			>
				<div className="absolute top-2 right-2 grid grid-cols-2 grid-rows-2">
					{props.tags && props.tags.map((tag, index) => <Badge key={index}
																															 className={"lg:text-sx col-span-2 mb-2 rounded-xl border-0 bg-black text-white"}>{tag}</Badge>)}
					<div className=""></div>
					{props.icon_thumbnail &&
						<img className={"size-7 object-fill"} src={props.icon_thumbnail?.src} alt={props.title} />}
				</div>

				<span className={"absolute top-2 left-2 flex items-center font-bold"}>
					<span>{props.review?.ratingValue}</span>
					<Star className="size-2 fill-black md:size-3" />
					<span className={"text-[8px] text-blue-600 md:text-xs"}>({props.review?.reviewCount})</span>
				</span>

				{props.icon_thumbnail && (
					<div className="absolute bottom-0">
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
						{props.options.find(opt => opt.type === OptionType.SIZE)?.values?.map((size, index) => (
							<Badge onClick={() => setSizeSelected(size)} key={index}
										 className={"size-10 border-0 bg-white text-black hover:bg-black! hover:text-white"}>
								{size}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>

			<CardFooter className={"block p-0 text-xs font-bold sm:text-sm"}>
				<SameRadioGroup className="flex flex-wrap items-center gap-2" onValueChange={setColorSelected}
												defaultValue={colorSelected}>
					{props && props.options.find((option) => option.type === OptionType.COLOR)?.values?.map((color, index) => (
						<SameRadioGroupItem
							key={index}
							className={"h-4 w-8 cursor-pointer rounded-2xl object-fill"}
							value={color}
							checked={color == colorSelected}
							id={color}
							style={{
								backgroundImage: imagesColor ? `url("${RESOURCE_IMAGE + imagesColor[index]?.src}")` : ``,
								backgroundSize: "auto",
								backgroundPosition: "center",
							}}
						>
							<Label
								htmlFor={color}
								className=" w-full h-full box-content	rounded-sm outline-2 outline-offset-2 outline-blue-700 lg:rounded-full object-center" />

						</SameRadioGroupItem>
					))}
				</SameRadioGroup>
				<p className={"my-1"}>{props.title}</p>
				<p className={"mb-1 flex flex-wrap gap-2"}>
					<span>
						{formatCurrency((props.discount && variants) ? variants.regular_price * (1 - props.discount.percent / 100) : (variants?.regular_price as number))}
					</span>
					{props.discount &&
						<Badge className={"rounded-2 bg-blue-700 text-xs font-bold text-white"}>-{props.discount.percent}%</Badge>}
					{props.discount && <span
						className={"text-neutral-400 line-through"}>{formatCurrency(variants?.regular_price as number)}</span>}
				</p>
				{<span className={"line-clamp-1 text-xs text-blue-700"}>{props.display_name_open}</span>}
			</CardFooter>
		</Card>
	);
}
