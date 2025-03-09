import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { StarIcon } from "@heroicons/react/24/solid";
import { Badge } from "../../../@/components/ui/badge.tsx";
import { useState } from "react";
import ProductCardProp from "@/components/card-product/types/productCard.prop.ts";

export default function CardProduct(props: ProductCardProp) {
	const [selected, setSelected] = useState<number>(0);
  const [bgImage, setBgImage] = useState<string>(props.models[selected].thumbnailUrl);

	return (
		<Card
			className={
				"w-1/2 xl:w-1/5 lg:w-1/4 md:w-1/3 p-3 rounded-none border-0 shadow-none"
			}
		>
			<CardContent
        onClick={props.onClick}
				className={`group relative text-base h-60 rounded-2 p-0`}
      >
        <img className={'absolute w-full h-full rounded-lg object-cover'}
             onMouseEnter={() => setBgImage(props.models[selected].thumbnailHoverUrl)}
             onMouseLeave={() => setBgImage(props.models[selected].thumbnailUrl)}
             src={bgImage}  alt={props.name}/>
				<div className='absolute grid grid-cols-2 grid-rows-2  top-2 right-2'>
					<Badge className={" rounded-2 mb-2 bg-black text-white col-span-2"}>
						{props.label}
					</Badge>
					<div className=''></div>
					<img
						className={"object-fill size-7 "}
						src={"src/assets/images/product/coolcash.webp"}
						alt={"cash's name"}
					/>
				</div>

				<span
					className={"absolute top-2 left-2 flex align-items-center font-bold"}
				>
					<span>{props.numStars}</span>
					<StarIcon className='size-4 max-sm:size-2 md:size-4  text-yellow-500' />
					<span className={"max-sm:text-xs text-blue-600"}>
						({props.numComments})
					</span>
				</span>

				{props.attachBonusUrl && (
					<div className='absolute bottom-0 '>
						<img
							className={"rounded-b-lg"}
							src={`${props.attachBonusUrl}`}
							alt='bonus'
						/>
					</div>
				)}

				<div
					className={
						"w-5/6 absolute opacity-1 bottom-0 left-1/2 -translate-x-1/2  p-2 rounded-lg bg-white/30 backdrop-blur-xl  text-center  \n" +
						"group-hover:opacity-100   group-hover:-translate-y-1/2 ease-in-out transition-all duration-500 "
					}
				>
					<p className={"font-bold text-sm p-0 m-0 mb-1"}>
						Thêm nhanh vào giỏ hàng +
					</p>
					<div className={"flex flex-wrap gap-2 cursor-pointer "}>
						{props.models[selected].sizes.map((size, index) => (
							<Badge
								key={index}
								className={
									"size-10 bg-white hover:bg-black! border-0 hover:text-white"
								}
							>
								{size}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>

			<CardFooter className={"block p-0 font-bold"}>
				<div className='flex items-center flex-wrap gap-1 cursor-pointer'>
					{props.models.map((item, index = 5) => (
						<div
							key={index}
							onClick={() => setSelected(index)}
							className={`w-8 h-4 rounded-2xl ${item.titleColor} ${
								selected === index
									? "outline-2 outline-offset-2 outline-neutral-700"
									: "outline-none"
							}`}
						></div>
					))}
					<span className={"font-bold"}>+11</span>
				</div>
				<p>{props.name}</p>
				<p className={"flex gap-2 text-base max-sm:text-xs"}>
					<span>{props.originPrice * (1 - props.percentDiscount * 0.01)}</span>
					<Badge className={"text-white "}>-{props.percentDiscount}%</Badge>
					<span className={"text-neutral-400 line-through"}>
						{props.originPrice}
					</span>
				</p>
			</CardFooter>
		</Card>
	);
}
