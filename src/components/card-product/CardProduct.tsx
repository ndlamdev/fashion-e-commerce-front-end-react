import { Card, CardContent, CardFooter } from "../../../@/components/ui/card.tsx";
import { Badge } from "../../../@/components/ui/badge.tsx";
import { useEffect, useState } from "react";
import ProductCardProp from "@/components/card-product/types/productCard.prop.ts";
import { Star } from "lucide-react";

export default function CardProduct(props: ProductCardProp) {
	const [selected, setSelected] = useState<number>(0);
	const [numPageModel, setNumPageModel] = useState<number>(6);
	const [bgImage, setBgImage] = useState<string>(
		props.models[selected].thumbnailUrl,
	);
	useEffect(() => setBgImage(props.models[selected].thumbnailUrl), [selected]);

	return (
		<Card
			className={
				" p-2 rounded-none border-0 shadow-none"
			}
		>
			<CardContent
				onClick={props.onClick}
				className={`group relative text-base h-[50vw] xl:h-84  md:h-62 sm:h-50 rounded-2 p-0 bg-center bg-no-repeat bg-cover`}
				style={{ backgroundImage: `url(${bgImage})` }}
				onMouseEnter={() =>
					setBgImage(props.models[selected].imageUrls?.[0] ?? '')
				}
				onMouseLeave={() => setBgImage(props.models[selected].thumbnailUrl)}
			>
				<div className='absolute grid grid-cols-2 grid-rows-2  top-2 right-2'>
          {props.label && <Badge
            className={
              "lg:text-sx  rounded-xl border-0 mb-2 bg-black text-white col-span-2"
            }
          >
            {props.label}
          </Badge>}
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
					<Star className='size-2 md:size-3  text-yellow-500' />
					<span className={"md:text-xs text-[8px]  text-blue-600"}>({props.numComments})</span>
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
									"size-10 bg-white text-black hover:bg-black! border-0 hover:text-white"
								}
							>
								{size}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>

			<CardFooter className={"max-lg:text-[12px]  block p-0 font-bold"}>
				<div className='flex items-center flex-wrap gap-2 cursor-pointer' >
					{props.models.slice(0, numPageModel).map((item, index) => (
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

					{props.models.length > 6 && numPageModel === 6 && (
						<span
							onClick={() => setNumPageModel(props.models.length)}
							className={"font-bold"}
						>
							{props.models.length > 6 ? ` +${props.models.length - 6}` : ""}
						</span>
					)}
				</div>
				<p className={'my-1'}>{props.name}</p>
				<p className={"flex gap-2 mb-1"}>
          {props.percentDiscount && <span>{props.originPrice * (1 - props.percentDiscount * 0.01)}</span>}
          {props.percentDiscount && <Badge className={"text-xs text-white  rounded-2  bg-blue-700"}>
            -{props.percentDiscount}%
          </Badge>}
					<span className={"text-neutral-400 line-through"}>
						{props.originPrice}
					</span>
				</p>
        {props.description && <span className={'text-xs text-blue-700 '}>{props.description}</span>}
			</CardFooter>
		</Card>
	);
}
