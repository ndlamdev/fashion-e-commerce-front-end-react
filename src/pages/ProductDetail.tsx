import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../../@/components/ui/breadcrumb.tsx";
import {
	CalendarSync,
	Check,
	Crown,
	MapPinHouse,
	PhoneCall,
	RefreshCcw,
	Search,
	Slash,
} from "lucide-react";
import Stack from "@/components/Stack/Stack.tsx";
import { Input, Popover, Rate } from "antd";
import { ArrowRightIcon, ShareIcon } from "@heroicons/react/24/solid";
import { Badge } from "../../@/components/ui/badge.tsx";
import {
	ShoppingBagIcon,
	TicketIcon,
	TruckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "react-bootstrap";
import {
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from "../../@/components/ui/accordion.tsx";
import { AccordionItem } from "@radix-ui/react-accordion";
import ZaloIcon from "@/assets/images/icons/ZaloIcon.tsx";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../../@/components/ui/collapsible.tsx";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../@/components/ui/carousel.tsx";
import { productCardSamples } from "@/assets/data/productCard.data.ts";
import CardProduct from "@/components/card-product/CardProduct.tsx";
import {
	RadioGroup,
	RadioGroupItem,
} from "../../@/components/ui/radio-group.tsx";
import { Label } from "../../@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../@/components/ui/select.tsx";
import Comment from "@/components/product-detail/Comment.tsx";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext,
  PaginationPrevious,
} from "../../@/components/ui/pagination.tsx";

export default function ProductDetailPage() {
	const images = [
		{
			id: 1,
			img: "src/assets/images/product-detail-image/quan-dai-kaki-ecc-pants-den_(4).jpeg",
		},
		{
			id: 2,
			img: "src/assets/images/product-detail-image/quan-dai-kaki-ecc-pants-den_(7).jpeg",
		},
		{
			id: 3,
			img: "src/assets/images/product/hover-t-shirt.webp",
		},
		{
			id: 5,
			img: "src/assets/images/product/t-shirt-1.webp",
		},
	];
	const products = productCardSamples;

	return (
		<div>
			<div className={"p-4"}>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href='/'>Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>
							<Slash />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink href='/components'>Components</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>
							<Slash />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className='grid grid-cols-2 grid-rows-1 gap-1'>
					<Stack
						randomRotation={true}
						sensitivity={90}
						sendToBackOnClick={true}
						cardDimensions={{ width: 537, height: 716 }}
						cardsData={images}
					/>

					<div className=''>
						<p className={"text-2xl font-bold mb-0"}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						</p>
						<p className={"text-base text-neutral-400"}>Lorem ipsum dolor.</p>
						<p className={"flex items-center"}>
							<Rate
								allowHalf
								disabled
								defaultValue={2.5}
								className={"text-black"}
							/>{" "}
							(2.5){" "}
							<span
								className={
									"ms-6 flex items-center text-blue-600 font-bold text-sm cursor-pointer"
								}
							>
								<ShareIcon className={"size-3 me-1 "} /> <span> chia sẻ</span>
							</span>
						</p>
						<p className={"text-base line-through text-neutral-400"}>100000</p>
						<p className='flex font-bold text-2xl '>
							<span className='me-3'>100.000</span>
							<Badge className={"text-white font-bold text-xl bg-blue-700"}>
								-10%
							</Badge>
						</p>
						<p className='flex items-center'>
							<TruckIcon className={"size-4 me-3 text-blue-600 "} /> Freeship
						</p>

						<p className='flex items-center'>
							<span className='me-3 text-lg font-bold text-neutral-400'>
								Mã giảm giá
							</span>
							<Popover
								placement={"bottom"}
								content={
									<div className={"text-center"}>
										<p className={"m-0"}>
											Nhập <span className='font-bold'>code</span> (còn number
											lượt)
										</p>
										<p className={"m-0"}>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
											Aliquam, autem!
										</p>
									</div>
								}
							>
								<div className='relative cursor-pointer'>
									<TicketIcon className={"size-20 text-amber-200"} />
									<span
										className={
											"absolute text-xs top-1/3 left-1/4 font-bold text-orange-500"
										}
									>
										-20%
									</span>
								</div>
							</Popover>
						</p>

						<p className='m-0'>
							Màu sắc: <span className='font-bold'>Lorem ipsum.</span>
						</p>
						<div className='flex flex-wrap gap-4 mb-4 '>
							<div className='w-12 h-6 rounded-2xl outline-2 outline-offset-2 outline-neutral-700 bg-blue-600'></div>
						</div>

						<p className='m-0 flex justify-between'>
							<span>
								Kích thước áo: <span className={"font-bold"}>size</span>{" "}
								<span>mô tả size</span>
							</span>
							<span
								className={
									"text-blue-600 cursor-pointer text-decoration-underline"
								}
							>
								Hướng dẫn chọn size
							</span>
						</p>
						<div className='flex flex-wrap gap-3 mb-3'>
							<Popover
								placement={"bottom"}
								content={
									<div className={"text-center"}>
										<p className={"m-0"}>Lorem ipsum.</p>
										<p className={"m-0"}>Lorem ipsum.</p>
									</div>
								}
							>
								<div className='cursor-pointer w-1/8 h-12 bg-black text-white text-center content-center rounded-2xl'>
									Size
								</div>
							</Popover>

							<Popover
								placement={"bottom"}
								content={
									<div className={"text-center"}>
										<p className={"m-0"}>Lorem ipsum.</p>
										<p className={"m-0"}>Lorem ipsum.</p>
									</div>
								}
							>
								<div className='cursor-pointer w-1/8 h-12 bg-neutral-200 text-center content-center rounded-xl'>
									Size
								</div>
							</Popover>
						</div>

						<div className='flex mb-3'>
							<Input
								defaultValue={1}
								className={"w-1/5! rounded-2xl! me-3 text-center"}
								type={"number"}
							/>
							<Button
								className={"w-full rounded-2xl! flex text-center items-center"}
								variant='dark'
							>
								<ShoppingBagIcon className={"size-6 inline-block mx-2"} />
								<span>Lorem ipsum dolor sit amet.</span>
							</Button>
						</div>

						<Accordion
							className={"rounded-xl bg-blue-100 p-2"}
							type='single'
							collapsible
						>
							<AccordionItem value='item-1'>
								<AccordionTrigger className={"h-4! text-sm! p-0 "}>
									<p className='flex items-center'>
										<Crown className={"mr-1 text-blue-600"} /> Được hoàn
										<span className='font-bold px-2'>1000</span>name' Cash.
									</p>
								</AccordionTrigger>
								<AccordionContent className={"p-2"}>
									<span className=''>
										Đây là số CoolCash ước tính bạn sẽ được hoàn lại khi mua sản
										phẩm hôm nay, tương ứng với quyền lợi hạng
									</span>
									<span className='text-blue-600 font-bold flex items-center uppercase'>
										Thành viên mới <Crown className={"ml-1 "} />
									</span>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						<div className='flex my-3 items-center'>
							<ZaloIcon />
							<a className='text-blue-700! px-2 cursor-pointer'>
								Chat để coolmate tư vấn ngay (8:30 - 22:00)
							</a>
							<ArrowRightIcon className={"size-4"} />
						</div>

						<div className='grid grid-cols-2 grid-rows-2 gap-3'>
							<div className={"flex"}>
								<RefreshCcw className={"font-bold mr-1"} />
								Đổi trả cực dễ chỉ cần số điện thoại
							</div>
							<div className={"flex"}>
								<CalendarSync className={"font-bold mr-1"} /> 60 ngày đổi trả vì
								bất kỳ lý do gì
							</div>
							<div className={"flex"}>
								<PhoneCall className={"font-bold mr-1"} /> Hotline 1900.27.27.37
								hỗ trợ từ 8h30 - 22h mỗi ngày
							</div>
							<div className={"flex"}>
								<MapPinHouse className={"font-bold mr-1"} /> Đến tận nơi nhận
								hàng trả, hoàn tiền trong 24h
							</div>
						</div>
					</div>
				</div>
			</div>

			<Collapsible className={" p-5 bg-neutral-200 text-sm"}>
				<p className={"uppercase text-center font-bold text-4xl"}>Mô tả sản phẩm</p>
				<div className='grid grid-cols-2 gap-3 mb-3'>
					<div className='p-3 px-5 '>
						<p className={"m-0 py-2 border-b-1 border-neutral-300"}>
							Lorem ipsum dolor sit amet.
						</p>
						<p className={"m-0 py-2 border-b-1 border-neutral-300"}>
							Lorem ipsum dolor sit amet.
						</p>
						<p className={"m-0 py-2 border-b-1 border-neutral-300"}>
							Lorem ipsum dolor sit amet.
						</p>
						<p className={"m-0 py-2 border-b-1 border-neutral-300"}>
							Lorem ipsum dolor sit amet.
						</p>
						<p className={"m-0 py-2 border-b-1 border-neutral-300"}>
							Lorem ipsum dolor sit amet.
						</p>
					</div>
					<img
						src='src/assets/images/product-detail-image/quan-dai-kaki-ecc-pants-den_(4).jpeg'
						alt=''
						className='object-cover rounded-xl h-150!'
					/>
				</div>
				<CollapsibleContent>
					<img
						src='src/assets/images/product-detail-image/QDECC.webp'
						alt='QDECC'
						className=''
					/>
				</CollapsibleContent>
				<div className='flex justify-center mt-4'>
					<CollapsibleTrigger asChild>
						<Button
							className={"w-1/10 h-10 rounded-[50px]!"}
							variant='outline-dark'
							size='sm'
						>
							More
						</Button>
					</CollapsibleTrigger>
				</div>
			</Collapsible>

			<p className={"uppercase text-center py-3 font-bold text-4xl"}>Gợi ý sản phẩm</p>
			<Carousel className='w-full'>
				<CarouselContent>
					{products.map((card, index) => (
						<CarouselItem className={" basis-1/4"} key={index}>
							<CardProduct {...card} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className={"left-2 rounded-2xl! outline-0"} />
				<CarouselNext className={"right-2 rounded-2xl! outline-0"} />
			</Carousel>

			<div className='flex p-5 bg-neutral-200'>
				<div className='w-1/3'>
					<h1 className='fw-bold uppercase w-1/2'>Đánh giá sản phẩm</h1>
					<Input
						className={"rounded-2xl! w-1/2! mb-4"}
						size='large'
						placeholder='Tìm kiếm đánh giá'
						prefix={<Search />}
					/>

					<p className='text-sm text-gray-600 fw-bold mb-1'>
						Phân loại xếp hạng
					</p>
					<RadioGroup>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 bg-white rounded-sm!"}
								value='5'
								id='r5'
							/>
							<Label className={" ml-1"} htmlFor='r5'>
								{" "}
								<Rate
									allowHalf
									disabled
									defaultValue={5}
									className={"text-black"}
								/>
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 bg-white rounded-sm!"}
								value='4'
								id='r4'
							/>
							<Label className={"ml-1"} htmlFor='r4'>
								<Rate
									allowHalf
									disabled
									defaultValue={4}
									className={"text-black"}
								/>
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 bg-white rounded-sm!"}
								value='3'
								id='r3'
							/>
							<Label className={" ml-1"} htmlFor='r3'>
								<Rate
									allowHalf
									disabled
									defaultValue={3}
									className={"text-black"}
								/>
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 bg-white rounded-sm!"}
								value='2'
								id='r2'
							/>
							<Label className={" ml-1"} htmlFor='r2'>
								<Rate
									allowHalf
									disabled
									defaultValue={2}
									className={"text-black"}
								/>
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 bg-white rounded-sm!"}
								value='1'
								id='r1'
							/>
							<Label className={" ml-1"} htmlFor='r1'>
								<Rate
									allowHalf
									disabled
									defaultValue={1}
									className={"text-black"}
								/>
							</Label>
						</div>
					</RadioGroup>

					<div className='w-1/2 my-4 flex items-center p-2 text-blue-700 bg-violet-100 rounded-xl fw-bold text-sm'>
						<Check className={"mr-1! size-10"} />
						<span className=''>
							Các review đều đến từ khách hàng đã thực sự mua hàng của Coolmate
						</span>
					</div>

          <p className='text-sm text-gray-600 fw-bold mb-1'>Lọc phản hồi</p>
          <RadioGroup>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value='res'
                id='res'
              />
              <Label className={" ml-1 text-gray-600"} htmlFor='res'>
                Đã phản hồi
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value='has-image'
                id='has-image'
              />
              <Label className={"ml-1 text-gray-600"} htmlFor='has-image'>
                Chỉ có hình ảnh
              </Label>
            </div>
          </RadioGroup>
				</div>

				<div className='w-2/3'>
          <p className="mb-0 flex items-center font-bold text-8xl">4.5
            <Rate className={'text-4xl! text-orange-400!'}  allowHalf disabled defaultValue={4.8} />
          </p>
          <p className="text-sm text-gray-500 fw-bold">Dựa trên <span className="text-gray-800">X</span> đánh giá đến từ khách hàng</p>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 fw-bold">Hiển thị đánh giá <span className="text-gray-800">1-10</span></p>
            <Select>
              <SelectTrigger className="w-60 bg-white rounded-2xl! text-sm! text-center">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent className={'bg-white text-sm'}>
                <SelectItem  value="z2a">Đánh giá: Cao đến thấp</SelectItem>
                <SelectItem  value="a2z">Đánh giá: Thấp đến cao</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Comment id={1} name={'LamHongPhong'} description={'Hello world'} numOfStars={4.1} date={new Date(Date.now())}/>
          <Pagination className={'py-2'}>
            <PaginationContent>
              <PaginationItem >
                <PaginationPrevious className={'flex!'} href="#" />
              </PaginationItem>
              <PaginationItem  >
                <PaginationLink className={'flex!'} href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink  className={'flex!'} href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink  className={'flex!'} href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className={'flex!'} href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

			<p className={"uppercase text-center py-3 font-bold text-4xl"}>Sản phẩm bạn đã xem</p>
			<Carousel className='w-full'>
				<CarouselContent>
					{products.map((card, index) => (
						<CarouselItem className={" basis-1/4"} key={index}>
							<CardProduct {...card} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className={"left-2 rounded-2xl! outline-0"} />
				<CarouselNext className={"right-2 rounded-2xl! outline-0"} />
			</Carousel>
		</div>
	);
}
