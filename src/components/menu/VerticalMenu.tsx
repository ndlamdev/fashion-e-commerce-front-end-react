/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:51PM - 05/03/2025
 *  User: lam-nguyen
 **/

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsCancel01 } from "@/assets/images/icons/HugeiconsCancel01.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";
import useScrolled from "@/utils/use-scrolled.ts";

function VerticalMenu({
	showMenu,
	onHidden,
	onAnimationComplete,
	onExitComplete,
}: {
	showMenu: boolean;
	onHidden?: () => void;
	onAnimationComplete?: () => void;
	onExitComplete?: () => void;
}) {
	const [hiddenMenu, setHiddenMenu] = useState<boolean>(true);
	const [, scrollY] = useScrolled();

	useEffect(() => {
		setHiddenMenu(!showMenu);
	}, [showMenu]);

	return (
		<AnimatePresence initial={false} onExitComplete={onExitComplete}>
			{!hiddenMenu && (
				<motion.div
					initial={{ left: -1000 }}
					animate={{ left: 0 }}
					transition={{ duration: 0.75 }}
					exit={{ left: -1000 }}
					onUpdate={(value) => {
						if (value.left == 0) onAnimationComplete?.();
					}}
					className={"absolute bg-[#E5E5E5] top-0 w-full lg:hidden"}>
					<div className={`sticky top-3 flex justify-end h-[40px] items-center z-1 ${scrollY < 20 ? "pe-3" : "pe-1"}`}>
						<div
							className={`${scrollY >= 20 && "bg-gray-100 rounded-full p-2"}`}
							onClick={() => {
								setHiddenMenu(true);
								onHidden?.();
							}}>
							<HugeiconsCancel01 />
						</div>
					</div>
					<div className={"absolute top-3 left-4 h-[40px] w-[40px]"}>
						<div className={"bg-blue-400 p-2 flex items-center justify-center"}>LOGO</div>
					</div>
					<div className={"mx-3 my-4 bg-white rounded-2xl p-3 flex flex-col items-center gap-3"}>
						<Tabs defaultValue='male' className='w-full '>
							<TabsList className={"grid w-full grid-cols-3 bg-[none] border-b-1 border-gray-500 rounded-0"}>
								<TabsTrigger value='male'>NAM</TabsTrigger>
								<TabsTrigger value='female'>NỮ</TabsTrigger>
								<TabsTrigger value='sport'>THỂ THAO</TabsTrigger>
							</TabsList>
							<TabsContent value='male'>
								<div className={"w-full px-[20px]"}>
									<Carousel className='w-full'>
										<CarouselContent>
											{Array.from({ length: 5 }).map((_, index) => (
												<CarouselItem key={index}>
													<Card>
														<CardContent className='flex aspect-[6/2] items-center justify-center p-6'>
															<span className='text-4xl font-semibold'>{index + 1}</span>
														</CardContent>
													</Card>
												</CarouselItem>
											))}
										</CarouselContent>
										<CarouselPrevious className={"rounded-circle left-[-15px] size-10 bg-gray-200"} />
										<CarouselNext className={"rounded-circle right-[-15px] size-10 bg-gray-200"} />
									</Carousel>
									<button className={"p-2 bg-gray-200 w-full rounded my-3"}>KHÁM PHÁ ĐỒ NAM</button>
									<Accordion
										type='single'
										collapsible
										onValueChange={(value) => {
											console.log(value);
										}}>
										<AccordionItem value='item-1'>
											<AccordionTrigger className={"font-bold pb-0 items-center"}>
												<h6 className={"mb-0"}>NỔI BẬT</h6>
											</AccordionTrigger>
											<AccordionContent>
												<ul className={"flex flex-col"}>
													{Array.from({ length: 5 }).map((_, index) => (
														<li
															key={`asfafasfa${index}`}
															className={"p-2 rounded active:bg-gray-200"}
															onClick={(event) => {
																console.log(event.currentTarget.textContent);
															}}>
															Loai san pham nao do {index}
														</li>
													))}
												</ul>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value='item-2'>
											<AccordionTrigger className={"font-bold pb-0 items-center"}>
												<h6 className={"mb-0"}>NỔI BẬT</h6>
											</AccordionTrigger>
											<AccordionContent>
												<ul className={"flex flex-col"}>
													{Array.from({ length: 5 }).map((_, index) => (
														<li
															key={`asdfasdgag${index}`}
															className={"p-2 rounded active:bg-gray-200"}
															onClick={(event) => {
																console.log(event.currentTarget.textContent);
															}}>
															Loai san pham nao do {index}
														</li>
													))}
												</ul>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
							</TabsContent>
							<TabsContent value='female'>
								<div className={"w-full px-[20px]"}>
									<Carousel className='w-full'>
										<CarouselContent>
											{Array.from({ length: 5 }).map((_, index) => (
												<CarouselItem key={index}>
													<Card>
														<CardContent className='flex aspect-[6/2] items-center justify-center p-6'>
															<span className='text-4xl font-semibold'>{index + 6}</span>
														</CardContent>
													</Card>
												</CarouselItem>
											))}
										</CarouselContent>
										<CarouselPrevious className={"rounded-circle left-[-15px] size-10 bg-gray-200"} />
										<CarouselNext className={"rounded-circle right-[-15px] size-10 bg-gray-200"} />
									</Carousel>
									<button className={"p-2 bg-gray-200 w-full rounded my-3"}>KHÁM PHÁ ĐỒ NỮ</button>
								</div>
							</TabsContent>
							<TabsContent value='sport'>
								<div className={"w-full px-[20px]"}>
									<Carousel className='w-full'>
										<CarouselContent>
											{Array.from({ length: 5 }).map((_, index) => (
												<CarouselItem key={index}>
													<Card>
														<CardContent className='flex aspect-[6/2] items-center justify-center p-6'>
															<span className='text-4xl font-semibold'>{index + 11}</span>
														</CardContent>
													</Card>
												</CarouselItem>
											))}
										</CarouselContent>
										<CarouselPrevious className={"rounded-circle left-[-15px] size-10 bg-gray-200"} />
										<CarouselNext className={"rounded-circle right-[-15px] size-10 bg-gray-200"} />
									</Carousel>
									<button className={"p-2 bg-gray-200 w-full rounded my-3"}>KHÁM PHÁ ĐỒ THỂ THAO</button>
								</div>
							</TabsContent>
						</Tabs>
					</div>
					<div className={"bg-white size px-10 pt-4 pb-56"}>
						<ul className={"flex flex-col"}>
							<li className={"py-2 px-3 rounded active:bg-gray-200 hover::bg-gray-200"}>Trung tâm CSKH</li>
							<li className={"py-2 px-3 rounded active:bg-gray-200 hover::bg-gray-200"}>Về KimiFashion</li>
							<li className={"py-2 px-3 rounded active:bg-gray-200 hover::bg-gray-200"}>Đăng nhập</li>
							<li className={"py-2 px-3 rounded active:bg-gray-200 hover::bg-gray-200"}>Blog</li>
						</ul>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default VerticalMenu;
