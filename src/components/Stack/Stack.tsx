/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import { motion, useMotionValue, useTransform } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts";

interface CardRotateProps {
	children: React.ReactNode;
	onSendToBack: () => void;
	sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useTransform(y, [-100, 100], [60, -60]);
	const rotateY = useTransform(x, [-100, 100], [-60, 60]);

	function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
		if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
			onSendToBack();
		} else {
			x.set(0);
			y.set(0);
		}
	}

	return (
		<motion.div
			className='absolute cursor-grab'
			style={{ x, y, rotateX, rotateY }}
			drag
			dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
			dragElastic={0.6}
			whileTap={{ cursor: "grabbing" }}
			onDragEnd={handleDragEnd}>
			{children}
		</motion.div>
	);
}

interface StackProps {
	randomRotation?: boolean;
	sensitivity?: number;
	cardDimensions?: { width: number; height: number };
	sendToBackOnClick?: boolean;
	cardsData?: { id: number; img: string }[];
	animationConfig?: { stiffness: number; damping: number };
	className: string;
}

function Stack({
	randomRotation = false,
	sensitivity = 200,
	// cardDimensions = { width: 208, height: 208 },
	cardsData = [],
	animationConfig = { stiffness: 260, damping: 20 },
	sendToBackOnClick = false,
	className,
}: StackProps) {
	const [cards, setCards] = useState(
		cardsData
	);
	useEffect(() => {setCards(cardsData)}, [cardsData]);

	const sendToBack = (id: number) => {
		setCards((prev) => {
			const newCards = [...prev];
			const index = newCards.findIndex((card) => card.id === id);
			const [card] = newCards.splice(index, 1);
			newCards.unshift(card);
			return newCards;
		});
	};

	return (
		<div
			className={cn("relative", className)}
			style={{
				// width: cardDimensions.width,
				// height: cardDimensions.height,
				perspective: 600,
			}}>
			{cards.map((card, index) => {
				const randomRotate = randomRotation
					? Math.random() * 5 - 10 // Random degree between -5 and 5
					: 0;

				return (
					<CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
						<motion.div
							className={cn("overflow-hidden rounded-2xl border-4 border-neutral-400", className)}
							onClick={() => sendToBackOnClick && sendToBack(card.id)}
							animate={{
								rotateZ: (cards.length - index - 1) + randomRotate,
								scale:  0.7 ,
								transformOrigin: "50% 50%",
							}}
							initial={false}
							transition={{
								type: "spring",
								stiffness: animationConfig.stiffness,
								damping: animationConfig.damping,
							}}
							style={
								{
									// width: cardDimensions.width,
									// height: cardDimensions.height,
								}
							}>
							<img src={card.img} alt={`card-${card.id}`} className='pointer-events-none h-full w-full object-cover' />
						</motion.div>
					</CardRotate>
				);
			})}
		</div>
	);
}

export default memo(Stack);
