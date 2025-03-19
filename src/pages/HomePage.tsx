/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:26PM - 07/03/2025
 *  User: lam-nguyen
 **/
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useHorizontalScroll } from "@/utils/use-horizontal-scroll.ts";

function HomePage() {
	const [ref, setRef] = useState<HTMLDivElement | null>(null);
	useHorizontalScroll(ref);

	return (
		<main className={"flex w-full flex-col justify-center"}>
			<section>
				<Carousel className={"w-full"}>
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={index}>
								<div className='flex aspect-[5/3] items-center justify-center bg-blue-400 p-6 lg:aspect-[5/2]'>
									<span className='text-4xl font-semibold'>{index + 6}</span>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className={"rounded-circle left-3 size-10 bg-gray-200"} />
					<CarouselNext className={"rounded-circle right-3 size-10 bg-gray-200"} />
				</Carousel>
			</section>
			<section className={"flex flex-col gap-10 px-5 py-6 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
				<Tabs defaultValue={"male"}>
					<TabsList className={"mb-5 h-auto gap-2 bg-[none] md:gap-4 lg:gap-8"}>
						<TabsTrigger
							className={
								"text-md w-32 rounded-4xl bg-gray-200 p-3 font-bold text-black shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white"
							}
							value='male'>
							ĐỒ NAM
						</TabsTrigger>
						<TabsTrigger
							className={
								"text-md w-32 rounded-4xl bg-gray-200 p-3 font-bold text-black shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white"
							}
							value='female'>
							ĐỒ NỮ
						</TabsTrigger>
					</TabsList>
					<TabsContent value={"male"}>
						<div ref={setRef} className={"scroll-hidden flex h-[280px] gap-4 overflow-x-scroll transition-all md:h-[315px] lg:h-[350px]"}>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/ao-thun-cate_86.jpg'
										alt='ao_thun.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>áo thun</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/so-mi-cate_10.jpg'
										alt='so_mi.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>sơ mi</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/ao-khoac-cate_16.jpg'
										alt='ao_khoac.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>áo khoác</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-dai-cate_24.jpg'
										alt='quan_dai.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>quần dài</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-short-cate_36.jpg'
										alt='quan_short.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>quần short</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-lot-cate_7.jpg'
										alt='quan_short.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>quần lót</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/phu-kien-cate_63.jpg'
										alt='phu_kien.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>phụ kiện</h5>
							</div>
						</div>
					</TabsContent>
					<TabsContent value={"female"}>
						<div className={"scroll-hidden md:scroll-show flex h-[280px] gap-4 overflow-x-scroll transition-all md:h-[315px] md:justify-center lg:h-[350px]"}>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/Frame_img.jpg'
										alt='bra_&_leggings.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>bra & leggings</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/Frame_img_(1).jpg'
										alt='ao_the_thao.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>áo thể thao</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image_(3).jpg'
										alt='quan_the_thao.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>quần thể thao</h5>
							</div>
							<div className={"flex h-full flex-col items-center gap-2"}>
								<Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
									<img
										className={"transition-all hover:scale-[1.1]"}
										src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image_96.png'
										alt='phu_kien.png'
									/>
								</Card>
								<h5 className={"font-bold uppercase"}>phụ hiện</h5>
							</div>
						</div>
					</TabsContent>
				</Tabs>
				<div className={"flex flex-col gap-10 lg:flex-row"}>
					<div id={"main-collection"} className={"group relative aspect-[3/2] flex-1 overflow-hidden rounded-3xl"}>
						<img
							src='https://media3.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/February2025/mceclip0_122.jpg'
							alt='image.png'
							className={"size absolute top-0 left-0 transition duration-200 ease-in group-hover:scale-[1.03]"}
						/>
						<div className={"absolute top-0 left-0 flex size-full flex-col items-start justify-end gap-3 p-5"}>
							<h3 className={"w-1/2 text-2xl font-bold text-white uppercase md:w-1/3 lg:w-1/2 lg:text-3xl"}>man wear collection</h3>
							<p className={"text-white"}>Nhập CM10 Giảm thểm 10% tối đa 100k</p>
							<a href={"#"} className={"rounded-4xl bg-white px-8 py-3 uppercase"}>
								Mua ngay
							</a>
						</div>
					</div>
					<div id={"women-collection"} className={"group relative aspect-[3/2] flex-1 overflow-hidden rounded-3xl"}>
						<img
							src='https://media3.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/February2025/mceclip1_37.jpg'
							alt='image.png'
							className={"size absolute top-0 left-0 transition duration-200 ease-in group-hover:scale-[1.03]"}
						/>
						<div className={"absolute top-0 left-0 flex size-full flex-col items-start justify-end gap-3 p-5"}>
							<h3 className={"w-2/3 text-2xl font-bold text-white uppercase md:w-1/2 lg:w-2/3 lg:text-3xl"}>women active collection</h3>
							<p className={"text-white"}>Nhập CMWMHELLO Giảm thêm 15% tối đa 100K</p>
							<a href={"#"} className={"rounded-4xl bg-white px-8 py-3 font-light uppercase"}>
								Mua ngay
							</a>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div
					className={
						"md:10 flex h-[30rem] w-full flex-col items-start justify-end bg-[url('https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/hang-ngay-desk-chung.jpg')] bg-cover bg-no-repeat p-5 lg:p-14"
					}>
					<h3 className={"mb-2 text-4xl font-bold text-white md:text-5xl lg:text-7xl"}>MẶC HẰNG NGÀY</h3>
					<p className={"text-white"}>Thoải mái, thanh lịch | Nhập CM10 giảm 10% đơn từ 600K</p>
					<a href={"#"} className={"mt-7 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xl md:px-10 md:py-5"}>
						<span>khám phá ngay</span>
						<ArrowRight />
					</a>
				</div>
				<div className={"px-5 py-6 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
					<h3 className={"text-2xl font-bold md:text-3xl"}>SẢN PHẨM MẶC HẰNG NGÀY</h3>
					<div className={"mt-3"}>sản phẩm</div>
				</div>
			</section>
			<section>
				<div
					className={
						"md:10 flex h-[30rem] w-full flex-col items-start justify-end bg-[url('https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/running-desk-chung_23.jpg')] bg-cover bg-no-repeat p-5 lg:p-14"
					}>
					<h3 className={"mb-2 text-4xl font-bold text-white md:text-5xl lg:text-7xl"}>ĐỒ CHẠY BỘ</h3>
					<p className={"text-white"}>Co giãn, thoáng khí | Mua combo tiết kiệm đến 30%</p>
					<a href={"#"} className={"mt-7 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xl md:px-10 md:py-5"}>
						<span>khám phá ngay</span>
						<ArrowRight />
					</a>
				</div>
				<div className={"px-5 py-6 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
					<h3 className={"text-2xl font-bold md:text-3xl"}>SẢN PHẨM CHẠY BỘ</h3>
					<div className={"mt-3"}>sản phẩm</div>
				</div>
			</section>
			<section>
				<a href='#'>
					<img
						className={"flex px-5 pb-6 md:px-10 md:pb-10 lg:px-15 lg:pb-14"}
						src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/mceclip33.png'
						alt='image.png'
					/>
				</a>
			</section>
			<section className={"px-5 py-6 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
				<div className={"flex flex-col items-center gap-8 rounded-2xl bg-[#F1F1F1] p-5 md:flex-row md:p-8 lg:p-10"}>
					<div className={"flex-2/3"}>
						<h3 className={"mb-3 text-xl font-bold md:mb-5 md:text-2xl"}>ĐẶC QUYỀN DÀNH CHO 363,688 THÀNH VIÊN KIMICLUB</h3>
						<div className={"flex flex-col gap-3 md:flex-row"}>
							<picture className={"w-full"}>
								<source
									media={"(max-width: 768px)"}
									srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip15.png"}
								/>
								<img
									src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip18.png"}
									alt={"image.png"}
									className={"aspect-[5/3] h-15 w-full flex-1 overflow-hidden rounded-2xl md:size-full"}
								/>
							</picture>
							<picture className={"w-full"}>
								<source
									media={"(max-width: 768px)"}
									srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip14.png"}
								/>
								<img
									src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip19.png"}
									alt={"image.png"}
									className={"aspect-[5/3] h-15 w-full flex-1 overflow-hidden rounded-2xl md:size-full"}
								/>
							</picture>
							<picture className={"w-full"}>
								<source
									media={"(max-width: 768px)"}
									srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/mceclip3_71.png"}
								/>
								<img
									src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/mceclip2_81.png"}
									alt={"image.png"}
									className={"aspect-[5/3] h-15 w-full flex-1 overflow-hidden rounded-2xl md:size-full"}
								/>
							</picture>
						</div>
					</div>
					<div className={"rounded-l-8xl rounded-r-8xl hidden h-46 w-2 rounded-t-2xl rounded-b-2xl bg-radial from-gray-400 from-10% to-white md:block"} />
					<div className={"flex w-full flex-1/3 flex-col items-center overflow-hidden"}>
						<h3 className={"mb-3 text-center text-xl font-bold md:mb-5 md:text-2xl"}>HOẠT ĐỘNG GẦN ĐÂY</h3>
						<div className={"flex h-full w-full flex-col items-center justify-between"}>
							<div className={"flex h-full flex-col justify-around py-3"}>
								<motion.p
									className={"flex gap-3 text-nowrap"}
									animate={{ x: ["100%", "-100%"] }}
									transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
									<span> Các hoạt động gần đây</span>
									<span>Các hoạt động gần đây</span>
									<span>Các hoạt động gần đây</span>
									<span>Các hoạt động gần đây</span>
								</motion.p>
								<motion.p
									className={"flex gap-3 text-nowrap"}
									animate={{ x: ["100%", "-100%"] }}
									transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: 2 }}>
									<span>Các hoạt động gần đây</span>
									<span>Các hoạt động gần đây</span>
									<span>Các hoạt động gần đây</span>
									<span>Các hoạt động gần đây</span>
								</motion.p>
							</div>
							<a href={"#"} className={"flex flex-row flex-nowrap items-center rounded-full bg-black px-5 py-3 text-white md:flex-col lg:flex-row"}>
								<span className={"text-center text-wrap"}>GIA NHẬP COOLCLUB NGAY</span>
								<ArrowRight />
							</a>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default HomePage;
