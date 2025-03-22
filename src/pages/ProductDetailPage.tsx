import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx";
import {
	ArrowRight,
	CalendarSync,
	Check,
	Copy,
	Crown,
	MapPinHouse,
	PhoneCall,
	RefreshCcw,
	Share2,
	ShoppingBag,
	Slash,
	Square,
	Ticket,
	Truck,
} from "lucide-react";
import Stack from "@/components/Stack/Stack.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion.tsx";
import { AccordionItem } from "@radix-ui/react-accordion";
import ZaloIcon from "@/assets/images/icons/ZaloIcon.tsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel.tsx";
import sampleProducts from "@/assets/data/product.data.ts";
import CardProduct from "@/components/card-product/CardProduct.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import Comment from "@/components/product-detail/Comment.tsx";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { Button } from "@/components/ui/button.tsx";
import Gift from "@/components/product-detail/Gift.tsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { Input } from "@/components/ui/input.tsx";
import Rate from "@/components/product-detail/Rate.tsx";
import { SameRadioGroup, SameRadioGroupItem } from "@/components/radio-group/SameRadioGroup.tsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { NavLink, useParams } from "react-router";
import { formatCurrency } from "@/utils/format-data.ts";
import { getMaxSize, getMinSize, getSizeSuggestion } from "@/utils/sizeModelManage.ts";
import { ProductModelType, SizeName } from "@/types/product/productModels.type.ts";

export default function ProductDetailPage() {
	const { id } = useParams();
	const products = sampleProducts;
	const product = products[parseInt(id ?? "1") - 1];

	// sync radio group
	const [chooseModel, setChooseModel] = useState<string>(product.models[0].id + "");

	// find model
	const model: ProductModelType = product.models.find((m: ProductModelType) => m.id === Number(chooseModel)) ?? product.models[0];

	// convert urls arr to object
	const imageUrls = model.imageUrls.map((url: string, index: number) => ({
		id: index + 1,
		img: url,
	}));

	// handle save text to clipboard
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log("Copied to clipboard!");
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	// handle data height range Slider component
	const [heightValue, setHeightValue] = useState<number[]>([getSizeSuggestion(getMinSize(model.sizes) ?? "S")?.heightRange.min ?? 0]); // Giá trị mặc định

	const handleHeightChange = (newValue: number[]) => {
		setHeightValue(newValue);
	};

	// handle data weight range Slider component
	const [weightValue, setWeightValue] = useState<number[]>([getSizeSuggestion(getMinSize(model.sizes) ?? "S")?.weightRange.min ?? 0]); // Giá trị mặc định

	const handleWeightChange = (newValue: number[]) => {
		setWeightValue(newValue);
	};

	// handle choose size change
	const [sizeSelected, setSizeSelected] = useState<SizeName | undefined>(undefined); // Giá trị mặc định

	// handle decrement/increment quanlity buy
	const [boughtQuantity, setBoughtQuantity] = useState<number>(1);
	const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
		setBoughtQuantity(Number(event.target.value));
	};

	// handle fixed
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const triggerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!triggerRef.current) return;

			const triggerTop = triggerRef.current.getBoundingClientRect().top;
			setIsVisible(triggerTop < 0); // Khi trigger vào giữa màn hình thì hiện
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className={"pb-10"}>
			<div className={"my-6 p-2 sm:p-4 lg:mx-10 xl:mx-20"}>
				<Breadcrumb className={"px-15"}>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href={"/"}>Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>
							<Slash />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink href={"/components"}>Components</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>
							<Slash />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className={"mt-2 grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 md:gap-4"}>
					<Stack
						randomRotation={true}
						sensitivity={90}
						sendToBackOnClick={true}
						cardsData={imageUrls}
						className={"grid h-dvw w-full place-items-center md:h-150 lg:h-200 xl:h-200"}
					/>

					<div className={"w-full"}>
						<p className={"mb-0 text-base font-bold md:text-lg lg:text-2xl"}>{product.name}</p>
						<p className={"mb-4 text-base text-neutral-400"}>{product?.material}</p>
						<p className={"mb-5 flex space-x-10"}>
							<p className={"flex items-center space-x-25"}>
								<Rate disabled={true} allowHalf={true} defaultValue={product?.numStars} className={"size-4 flex-none! fill-black md:size-5! xl:size-6"} />
								<span className={"text-end sm:text-center lg:pe-4 lg:text-start"}>({product?.numComments})</span>
							</p>

							<Dialog>
								<DialogTrigger>
									<span className={"flex cursor-pointer items-center text-sm font-bold text-blue-600"}>
										<Share2 className={"me-1 size-3 fill-blue-800"} /> <span> chia sẻ</span>
									</span>
								</DialogTrigger>
								<DialogContent className={"pb-0 xl:max-w-[660px]!"}>
									<ScrollArea className={"h-146 border-none"}>
										<div className={"grid lg:grid-cols-1 xl:grid-cols-2"}>
											<div>
												<p className={"pe-6 text-3xl font-bold"}>Giới thiệu bạn bè Nhận ngay 10% CoolCash</p>
												<p className={"my-5 text-sm"}>
													Bạn sẽ nhận được 10% giá trị đơn hàng đầu tiên của bạn bè và được trả bằng CoolCash khi họ là thành viên CoolClub và mua sản phẩm
													Coolmate bất kỳ.
												</p>
												<div className={"mb-3 rounded-lg bg-neutral-100 p-3"}>
													<p className={"text-sm text-neutral-400 uppercase"}>Gửi mã giới thiệu đến với bạn bè</p>
													<div className={"border-1 border-neutral-300"}></div>
													<p className={"flex items-center justify-between p-2"}>
														<span className={"text-lg text-neutral-700 uppercase"}>{model.codeModel}</span>
														<span
															onClick={() => {
																copyToClipboard(model.codeModel).then();
																toast("Đã copy mã giới thiệu");
															}}
															className={"flex cursor-pointer text-sm text-blue-700"}>
															<Copy className={"mx-1"} /> Copy
														</span>
													</p>
												</div>
												<div className={"mb-3 rounded-lg bg-neutral-100 p-3"}>
													<p className={"text-sm text-neutral-400 uppercase"}>Gửi link giới thiệu đến với bạn bè</p>
													<div className={"flex items-center justify-between rounded-3xl border-2 bg-white px-2"}>
														<Input className={"w-3/4! border-none! focus-visible:border-none"} type={"text"} value={"http://localhost:5173/product-detail"} />
														<span
															onClick={() => {
																copyToClipboard(model.codeModel).then();
																toast("Đã copy mã giới thiệu");
															}}
															className={"flex cursor-pointer text-sm text-blue-700"}>
															<Copy className={"mx-1"} /> Copy
														</span>
													</div>
												</div>

												<Button onClick={() => toast("Đã copy link giới thiệu")} className={"mb-2 w-full cursor-pointer rounded-2xl"} variant={"default"}>
													<Share2 />
													<span>Chia sẻ</span>
												</Button>

												<p className={"text-sm font-bold"}>Bạn sẽ nhận được CoolCash khi:</p>
												<ul className={"text-sm"}>
													<li className={"flex items-center"}>
														<Check className={"mr-1 size-4 flex-none"} /> <span className={"shrink text-sm"}>Bạn bè của bạn tham gia CoolClub</span>
													</li>
													<li className={"flex items-center"}>
														<Check className={"mr-1 size-4 flex-none"} />{" "}
														<span className={"shrink text-sm"}>Bạn bè của bạn hoàn thành đơn hàng đầu tiên trên website</span>
													</li>
													tẽ
													<li className={"flex items-center"}>
														<Check className={"mr-1 size-4 flex-none"} />{" "}
														<span className={"shrink text-sm"}>
															Sau 7 ngày kể từ ngày đơn hàng giao thành công và không đổi trả, bạn có thể nhận và sử dụng CoolCash của bạn
														</span>
													</li>
												</ul>

												<NavLink to={"/"}>
													<span className={"text-xs text-gray-400 underline decoration-gray-400"}>*Chính sách và điều khoản</span>
												</NavLink>
											</div>
											<img
												src={"https://mcdn.coolmate.me/image/September2024/mceclip0_28.png"}
												alt={""}
												className={"h-0 w-0 place-self-end object-cover xl:h-auto xl:w-full"}
											/>
										</div>
									</ScrollArea>
								</DialogContent>
							</Dialog>
						</p>
						{product?.discount && <p className={"text-sm text-neutral-400 line-through md:text-base"}>{formatCurrency(product.price)}</p>}
						<p className={"flex font-bold"}>
							<span className={"me-3 text-sm md:text-base lg:text-2xl"}>
								{formatCurrency(product.discount ? product.price * (1 - product.discount / 100) : product.price)}
							</span>
							{product?.discount && <Badge className={"bg-blue-700 text-xs font-bold text-white md:text-xl"}>-{product.discount}%</Badge>}
						</p>
						<p className={"flex items-center"}>
							<Truck className={"me-3 size-4 text-blue-600"} /> Freeship
						</p>

						<p className={"my-5 flex items-center"}>
							<span className={"me-3 text-sm font-bold text-neutral-400 lg:text-lg"}>Mã giảm giá</span>
							<HoverCard>
								<HoverCardTrigger>
									<Badge
										onClick={() => {
											copyToClipboard(model.codeModel).then();
											toast("Lưu mã giảm giá thành công");
										}}
										className={"cursor-pointer bg-orange-100 p-2"}>
										<span className={"text-xs font-bold text-orange-500"}>-20%</span>
										<Ticket className={"size-5! text-orange-500"} />
									</Badge>
								</HoverCardTrigger>
								<HoverCardContent className={"w-100! p-1"}>
									<div className={"text-center"}>
										<p className={"m-0"}>
											Nhập <span className={"font-bold"}>code</span> (còn number lượt)
										</p>
										<p className={"m-0"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, autem!</p>
									</div>
								</HoverCardContent>
							</HoverCard>
						</p>

						{product.attachGift && <Gift className={"mb-4"} />}

						<p className={"my-1 text-xs md:text-sm lg:text-lg"}>
							Màu sắc: <span className={"font-bold"}>{model.name}</span>
						</p>
						<SameRadioGroup onValueChange={setChooseModel} value={chooseModel} className={"flex flex-wrap gap-4"}>
							{product.models.map((model: ProductModelType) => (
								<SameRadioGroupItem
									style={{ backgroundColor: model.codeColor }}
									className={"cursor-pointer rounded-sm px-4 py-2 lg:rounded-full lg:px-6 lg:py-4"}
									value={model.id + ""}
									id={model.id + ""}>
									<span className='rounded-sm px-4 py-2 outline-2 outline-offset-2 outline-blue-700 lg:rounded-full lg:px-6 lg:py-4'></span>
								</SameRadioGroupItem>
							))}
						</SameRadioGroup>

						<div className=''>
							<p className='m-0 flex items-center justify-between'>
								<span className={"text-xs md:text-sm lg:text-lg"}>
									Kích thước áo: <span className={"mx-1 font-bold"}>{sizeSelected ?? ""}</span>
									<span>
										{sizeSelected && (
											<span>
												({getSizeSuggestion(sizeSelected)?.heightRange.min}cm - {getSizeSuggestion(sizeSelected)?.heightRange.max}cm |
												{getSizeSuggestion(sizeSelected)?.weightRange.min}kg - {getSizeSuggestion(sizeSelected)?.weightRange.max}kg)
											</span>
										)}
									</span>
								</span>
								<Dialog>
									<DialogTrigger>
										<span className={"cursor-pointer text-xs text-blue-600 underline md:text-sm lg:text-base"}>Hướng dẫn chọn size</span>
									</DialogTrigger>
									<DialogContent className={"max-w-[910px]!"}>
										<Tabs className={"relative"} defaultValue='choose-size'>
											<TabsList className={"h-auto cursor-pointer rounded-2xl border-2 border-gray-300 bg-white p-0 text-black"}>
												<TabsTrigger
													className={
														"h-12 cursor-pointer rounded-xl border-none bg-white font-bold data-[state=active]:bg-gray-200 data-[state=active]:shadow-none"
													}
													value='choose-size'>
													Hướng dẫn chọn size
												</TabsTrigger>
												<TabsTrigger
													className={
														"h-12 cursor-pointer rounded-xl border-none bg-white font-bold data-[state=active]:bg-gray-200 data-[state=active]:shadow-none"
													}
													value='size-table'>
													Bảng size
												</TabsTrigger>
											</TabsList>
											<TabsContent className={"py-5 lg:px-20"} value='choose-size'>
												<div className='flex w-full'>
													<span className='flex-none px-4 text-gray-500'>Chiều cao</span>
													<Slider
														className={"shrink"}
														onValueChange={handleHeightChange}
														defaultValue={heightValue}
														min={getSizeSuggestion(getMinSize(model.sizes) ?? "S")?.heightRange.min ?? 0}
														max={getSizeSuggestion(getMaxSize(model.sizes) ?? "3XL")?.heightRange.max ?? 0}
														step={1}
													/>
													<span className='flex-none px-4 text-blue-700'>{heightValue} cm</span>
												</div>

												<div className='my-5 flex w-full'>
													<span className='flex-none px-4 text-gray-500'>Cân nặng</span>
													<Slider
														className={"shrink"}
														onValueChange={handleWeightChange}
														defaultValue={heightValue}
														min={getSizeSuggestion(getMinSize(model.sizes) ?? "S")?.weightRange.min ?? 0}
														max={getSizeSuggestion(getMaxSize(model.sizes) ?? "3XL")?.weightRange.max ?? 0}
														step={1}
													/>
													<span className='flex-none px-4 text-blue-700'>{weightValue} kg</span>
												</div>

												<SameRadioGroup className={"flex"} defaultValue={"option-1"}>
													<div className='w-1/3 rounded-lg bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip1_23.jpg)] bg-cover bg-center bg-no-repeat'>
														<SameRadioGroupItem className={`relative h-full w-full cursor-pointer border-none shadow-none`} value='option-1' id='option-1'>
															<div className={`absolute inset-0 size-full h-full rounded-lg outline-4 outline-offset-2 outline-blue-700`}></div>
														</SameRadioGroupItem>
													</div>
													<div className='w-1/3 rounded-lg bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip3_97.jpg)] bg-cover bg-center bg-no-repeat'>
														<SameRadioGroupItem className={`relative h-full w-full cursor-pointer border-none shadow-none`} value='option-2' id='option-2'>
															<div className={`absolute inset-0 size-full h-full rounded-lg outline-4 outline-offset-2 outline-blue-700`}></div>
														</SameRadioGroupItem>
													</div>
													<div className='w-1/3 rounded-lg bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip0_45.png)] bg-cover bg-center bg-no-repeat'>
														<SameRadioGroupItem className={`relative h-full w-full cursor-pointer border-none shadow-none`} value='option-3' id='option-3'>
															<div className={`absolute inset-0 size-full h-full rounded-lg outline-4 outline-offset-2 outline-blue-700`}></div>
														</SameRadioGroupItem>
													</div>
												</SameRadioGroup>
												<p className='my-3 font-bold'>Coolmate gợi ý bạn:</p>
												<div className='flex flex-wrap space-y-2 space-x-4'>
													<div className='flex rounded-full bg-black p-1 text-center text-white'>Lorem ipsum.</div>
													<div className='flex rounded-full bg-black p-1 text-center text-white'>Lorem ipsum.</div>
													<div className='flex rounded-full bg-black p-1 text-center text-white'>Lorem ipsum.</div>
													<div className='flex rounded-full bg-black p-1 text-center text-white'>Lorem ipsum.</div>
												</div>
											</TabsContent>
											<TabsContent value='size-table'>
												<Table>
													<TableCaption className={"break-all"}>
														Trường hợp số đo của bạn nằm trong khoảng giữa các size với nhau: Với áo thun, bạn hãy lựa chọn ưu tiên theo chiều cao Ví dụ chiều
														cao của bạn theo size L nhưng cân nặng của bạn theo size M, Hãy chọn L. 97% khách hàng của chúng tôi đã chọn đúng size theo cách
														này.
													</TableCaption>
													<TableHeader className={"bg-blue-700"}>
														<TableRow>
															<TableHead className={"text-white"}>Size</TableHead>
															<TableHead className={"text-white"}>M</TableHead>
															<TableHead className={"text-white"}>L</TableHead>
															<TableHead className={"text-white"}>XL</TableHead>
															<TableHead className={"text-white"}>2XL</TableHead>
															<TableHead className={"text-white"}>3XL</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														<TableRow className='text-sm font-bold break-all'>
															<TableCell>Chiều cao</TableCell>
															<TableCell>1m60 - 1m65</TableCell>
															<TableCell>1m66 - 1m72</TableCell>
															<TableCell>1m72 - 1m77</TableCell>
															<TableCell>1m77 - 1m84</TableCell>
															<TableCell>
																<span>1m85 - 1m92</span>
															</TableCell>
														</TableRow>

														<TableRow className='text-sm font-bold'>
															<TableCell>Cân nặng</TableCell>
															<TableCell> 55kg - 61kg</TableCell>
															<TableCell>62kg - 68kg</TableCell>
															<TableCell>69kg - 75kg</TableCell>
															<TableCell>76kg - 84kg</TableCell>
															<TableCell>85kg - 90kg</TableCell>
														</TableRow>

														<TableRow className='text-sm font-bold'>
															<TableCell>Dài áo</TableCell>
															<TableCell>68.5</TableCell>
															<TableCell>70.5</TableCell>
															<TableCell>72.5</TableCell>
															<TableCell>74.5</TableCell>
															<TableCell>76</TableCell>
														</TableRow>

														<TableRow className='text-sm font-bold'>
															<TableCell>Rộng ngực</TableCell>
															<TableCell>52.7</TableCell>
															<TableCell>54.7</TableCell>
															<TableCell>56.7</TableCell>
															<TableCell>59.7</TableCell>
															<TableCell>62.7</TableCell>
														</TableRow>

														<TableRow className='text-sm font-bold'>
															<TableCell>Dài tay</TableCell>
															<TableCell>58.5</TableCell>
															<TableCell>60.5</TableCell>
															<TableCell>62.5</TableCell>
															<TableCell>64.5</TableCell>
															<TableCell>66.5</TableCell>
														</TableRow>
													</TableBody>
												</Table>
											</TabsContent>
										</Tabs>
									</DialogContent>
								</Dialog>
							</p>
							<div className='mb-3 flex flex-wrap gap-3'>
								<SameRadioGroup className='flex flex-wrap gap-4' value={sizeSelected} onValueChange={setSizeSelected}>
									{model.sizes.map((value, index) => {
										return (
											<HoverCard>
												<HoverCardTrigger className={"relative"}>
													<div className={"h-8 w-12 place-content-center rounded-sm bg-gray-200 text-center uppercase lg:h-8 lg:w-20 lg:rounded-full"}>
														<span>{value}</span>
													</div>
													<SameRadioGroupItem
														className={"l:h-8 absolute top-0 h-8 w-12 cursor-pointer rounded-sm lg:w-20 lg:rounded-full"}
														value={value}
														id={`${value}` + index}>
														<span className='h-8 w-12 place-content-center rounded-sm bg-black text-center text-white uppercase lg:h-8 lg:w-20 lg:rounded-full'>
															{value}
														</span>
													</SameRadioGroupItem>
												</HoverCardTrigger>
												<HoverCardContent className={"w-auto p-2"}>
													<div className=''>
														<p>
															{getSizeSuggestion(value)?.heightRange.min}cm - {getSizeSuggestion(value)?.heightRange.max}cm
														</p>
														<p>
															{getSizeSuggestion(value)?.weightRange.min}kg - {getSizeSuggestion(value)?.weightRange.max}kg
														</p>
													</div>
												</HoverCardContent>
											</HoverCard>
										);
									})}
								</SameRadioGroup>
							</div>
						</div>

						<div className='mb-3 flex'>
							<Input onChange={handleQuantityChange} value={boughtQuantity} className={"me-3! w-1/4 rounded-2xl! text-center"} type={"number"} />
							<Button
								className={"flex w-3/4 cursor-pointer items-center rounded-2xl text-center text-xs hover:bg-neutral-300 hover:text-black sm:text-sm"}
								variant='default'>
								<ShoppingBag className={""} />
								<span>{sizeSelected ? "Thêm vào giỏ hàng" : "Chọn kích thước"}</span>
							</Button>
						</div>

						<Accordion className={"rounded-lg bg-blue-50 p-3"} type='single' collapsible>
							<AccordionItem value='item-1'>
								<AccordionTrigger className={"p-0"}>
									<p className='flex flex-wrap items-center space-x-2 text-xs sm:text-sm'>
										<Crown className={"size-4 text-blue-600 sm:size-6"} /> Được hoàn
										<span className='mx-1 font-bold'>1000</span> name' Cash.
									</p>
								</AccordionTrigger>
								<AccordionContent className={"p-2 pb-0 text-xs sm:text-sm"}>
									<p className='border-t-1 px-2'>
										<span>Đây là số CoolCash ước tính bạn sẽ được hoàn lại khi mua sản phẩm hôm nay, tương ứng với quyền lợi hạng</span>
										<span className='flex items-center font-bold text-blue-600 uppercase'>
											Thành viên mới <Crown className={"ml-1 size-4 sm:size-6"} />
										</span>
									</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>

						<div className='my-2 flex items-center space-x-2 sm:my-6'>
							<ZaloIcon className={"size-6 sm:size-8"} />
							<a className='cursor-pointer text-xs text-blue-700 sm:text-sm'>Chat để coolmate tư vấn ngay (8:30 - 22:00)</a>
							<ArrowRight className={"size-4"} />
						</div>

						<div className='grid grid-cols-2 grid-rows-2 gap-6'>
							<div className={"flex items-center"}>
								<RefreshCcw className={"mr-1 flex-none font-bold"} />
								<span className='shrink text-xs md:text-sm'>Đổi trả cực dễ chỉ cần số điện thoại</span>
							</div>
							<div className={"flex items-center"}>
								<CalendarSync className={"mr-1 flex-none font-bold"} />
								<span className='shrink text-xs md:text-sm'>60 ngày đổi trả vì bất kỳ lý do gì</span>
							</div>
							<div className={"flex items-center"}>
								<PhoneCall className={"mr-1 flex-none font-bold"} />{" "}
								<span className='shrink text-xs md:text-sm'>Hotline 1900.27.27.37 hỗ trợ từ 8h30 - 22h mỗi ngày</span>
							</div>
							<div ref={triggerRef} className={"flex items-center"}>
								<MapPinHouse className={"mr-1 flex-none font-bold"} />{" "}
								<span className='shrink text-xs md:text-sm'>Đến tận nơi nhận hàng trả, hoàn tiền trong 24h</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Collapsible className={"group relative bg-neutral-200 py-5 text-sm lg:px-10 xl:px-20"}>
				<p className={"text-center font-bold uppercase sm:text-xl md:text-4xl"}>Mô tả sản phẩm</p>
				<div className='mb-3 grid grid-cols-2 gap-3'>
					<div className='p-3 px-5 text-xs'>
						<p className={"m-0 border-b-1 border-neutral-300 py-2"}>Lorem ipsum dolor sit amet.</p>
						<p className={"m-0 border-b-1 border-neutral-300 py-2"}>Lorem ipsum dolor sit amet.</p>
						<p className={"m-0 border-b-1 border-neutral-300 py-2"}>Lorem ipsum dolor sit amet.</p>
						<p className={"m-0 border-b-1 border-neutral-300 py-2"}>Lorem ipsum dolor sit amet.</p>
						<p className={"m-0 border-b-1 border-neutral-300 py-2"}>Lorem ipsum dolor sit amet.</p>
					</div>
					<img src='https://mcdn.coolmate.me/image/February2023/mceclip10_61.jpg' alt='' className='h-50! rounded-xl object-cover md:h-150!' />
				</div>
				<CollapsibleContent>
					<img src='https://mcdn.coolmate.me/image/February2023/mceclip12_56.jpg' alt='QDECC' className='' />
				</CollapsibleContent>
				<div className='mt-4 flex justify-center'>
					<CollapsibleTrigger asChild>
						<Button className={"h-10 w-1/5 rounded-lg md:w-1/10 lg:rounded-2xl"} variant='default' size='sm'>
							Xem thêm
						</Button>
					</CollapsibleTrigger>
				</div>
			</Collapsible>

			<p className={"mt-10 py-3 text-center text-xl font-bold uppercase md:text-4xl"}>Gợi ý sản phẩm</p>
			<Carousel className='w-full px-0 lg:px-5 xl:px-10'>
				<CarouselContent className={"pl-4"}>
					{products.map((card, index) => (
						<CarouselItem className={"basis-1/2 p-0 md:basis-1/4"} key={index}>
							<CardProduct {...card} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className={"left-2 rounded-2xl! outline-0"} />
				<CarouselNext className={"right-2 rounded-2xl! outline-0"} />
			</Carousel>

			<div className='mt-10 bg-neutral-100 px-4 sm:flex-none sm:ps-5 md:flex md:p-5'>
				<p className='pr-10 text-xl font-bold uppercase md:w-1/4 md:content-center md:text-4xl lg:px-12'>Đánh giá sản phẩm</p>
				<div className='content-center md:w-3/4'>
					<p className='mb-0 flex items-center text-3xl font-bold md:text-8xl'>
						<span className={"mr-2"}>4.8</span>
						<Rate className={"fill-orange-400 stroke-orange-400 md:size-8! lg:size-12!"} defaultValue={4.8} disabled={true} allowHalf={true} />
					</p>
					<p className='fw-bold text-sm text-gray-500 md:mb-10'>
						Dựa trên <span className='text-gray-800'>X</span> đánh giá đến từ khách hàng
					</p>
				</div>
			</div>
			<div className='relative flex flex-wrap bg-neutral-100 p-5 pt-0'>
				<div className='w-full max-md:hidden md:flex-none lg:w-1/4 lg:px-5 xl:px-12'>
					<Input className={"my-4 rounded-2xl bg-white max-md:visible"} placeholder='Tìm kiếm đánh giá' />

					<p className='fw-bold mb-1 text-sm text-gray-600'>Phân loại xếp hạng</p>
					<RadioGroup>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 rounded-sm! bg-white"}
								value='5'
								id='r5'
								children={<Square className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
							/>
							<Label className={"ml-1"} htmlFor='r5'>
								<Rate disabled className={"fill-black"} defaultValue={5} />
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 rounded-sm! bg-white"}
								value='4'
								id='r4'
								children={<Square className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
							/>
							<Label className={"ml-1"} htmlFor='r4'>
								<Rate disabled className={"fill-black"} defaultValue={4} />
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 rounded-sm! bg-white"}
								value='3'
								id='r3'
								children={<Square className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
							/>
							<Label className={"ml-1"} htmlFor='r3'>
								<Rate disabled className={"fill-black"} defaultValue={3} />
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 rounded-sm! bg-white"}
								value='2'
								id='r2'
								children={<Square className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
							/>
							<Label className={"ml-1"} htmlFor='r2'>
								<Rate disabled defaultValue={2} className={"fill-black"} />
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 rounded-sm! bg-white"}
								value='1'
								id='r1'
								children={<Square className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
							/>
							<Label className={"ml-1"} htmlFor='r1'>
								<Rate disabled className={"fill-black"} defaultValue={1} />
							</Label>
						</div>
					</RadioGroup>

					<div className='fw-bold my-4 flex items-center rounded-xl bg-violet-100 p-2 text-sm text-blue-700'>
						<Check className={"mr-1! size-10"} />
						<span className=''>Các review đều đến từ khách hàng đã thực sự mua hàng của Coolmate</span>
					</div>

					<p className='fw-bold mb-1 text-sm text-gray-600'>Lọc phản hồi</p>
					<RadioGroup>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 rounded-sm! bg-white"}
								value='res'
								id='res'
								children={<Square className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
							/>
							<Label className={"ml-1 text-gray-600"} htmlFor='res'>
								Đã phản hồi
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								className={"size-5 rounded-sm! bg-white"}
								value='has-image'
								id='has-image'
								children={<Square className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
							/>
							<Label className={"ml-1 text-gray-600"} htmlFor='has-image'>
								Chỉ có hình ảnh
							</Label>
						</div>
					</RadioGroup>
				</div>

				<div className='mt-5 w-full sm:mt-10 md:shrink lg:w-3/4'>
					<div className='flex items-end justify-between'>
						<p className='fw-bold text-sm text-gray-500'>
							Hiển thị đánh giá <span className='text-gray-800'>1-10</span>
						</p>
						<Select>
							<SelectTrigger className='w-60 rounded-2xl! bg-white text-center text-sm!'>
								<SelectValue placeholder='Sắp xếp' />
							</SelectTrigger>
							<SelectContent className={"bg-white text-sm"}>
								<SelectItem value='z2a'>Đánh giá: Cao đến thấp</SelectItem>
								<SelectItem value='a2z'>Đánh giá: Thấp đến cao</SelectItem>
								<SelectItem className={"sm:visible md:hidden"} value='1'>
									1 sao
								</SelectItem>
								<SelectItem className={"sm:visible md:hidden"} value='2'>
									2 sao
								</SelectItem>
								<SelectItem className={"sm:visible md:hidden"} value='3'>
									3 sao
								</SelectItem>
								<SelectItem className={"sm:visible md:hidden"} value='4'>
									4 sao
								</SelectItem>
								<SelectItem className={"sm:visible md:hidden"} value='5'>
									5 sao
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Comment id={1} name={"LamHongPhong"} description={"Hello world"} numOfStars={4.5} date={new Date(Date.now())} />
					<Pagination className={"py-2"}>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious className={"flex!"} href='#' />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink className={"flex!"} href='#'>
									1
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink className={"flex!"} href='#' isActive>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink className={"flex!"} href='#'>
									3
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext className={"flex!"} href='#' />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>

			<p className={"mt-10 py-3 text-center font-bold uppercase sm:text-xl md:text-4xl"}>Sản phẩm bạn đã xem</p>
			<Carousel className='w-full px-0 lg:px-5 xl:px-10'>
				<CarouselContent>
					{products.map((card, index) => (
						<CarouselItem className={"basis-1/2 md:basis-1/4"} key={index}>
							<CardProduct {...card} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className={"left-2 rounded-2xl! outline-0"} />
				<CarouselNext className={"right-2 rounded-2xl! outline-0"} />
			</Carousel>

			<div
				className={`fixed top-0 z-50 w-full -translate-y-full overflow-hidden border-gray-200 bg-white opacity-1 transition-all duration-900 ease-in-out ${isVisible ? "lg:h-auto lg:translate-y-0 lg:opacity-100" : "-translate-y-full overflow-hidden opacity-0"}`}>
				<div className='flex'>
					<div className='flex border-r-1'>
						<img src={model.imageUrls[0]} alt={`${product.name}-` + model.name} className='w-16 object-cover' />
						<div className='p-4'>
							<p className='flex flex-wrap gap-1'>
								<Rate className={"fill-black stroke-black"} defaultValue={3.5} allowHalf disabled />
								<p className='col-span-2 text-xs xl:text-sm'>
									<span className="pe-2 before:content-['|']"> {product.numComments}</span>
									<span className="before:content-['|']"> Đã bán (web): {product?.sold ?? Number.NaN}</span>
								</p>
							</p>
							<p className='flex flex-wrap items-center gap-4 font-bold'>
								<p className={"text-lg xl:text-xl"}>{formatCurrency(product?.discount ? product.price * (1 - product?.discount / 100) : product.price)}</p>
								{product?.discount && <Badge className='rounded-lg bg-blue-700 text-sm text-white'>-{product.discount}%</Badge>}
								<span className='text-sm text-gray-400 line-through'>{product.price}</span>
							</p>
						</div>
					</div>

					<div className='border-r-1 border-gray-200'>
						<div className='p-2'>
							<p className='mb-3 text-sm'>
								<span>Màu sắc:</span>
								<span className={"font-bold"}> {model.name}</span>
							</p>
							<SameRadioGroup onValueChange={setChooseModel} value={chooseModel} className='flex flex-wrap gap-4'>
								{product.models.map((item: ProductModelType) => (
									<SameRadioGroupItem
										style={{ backgroundColor: item.codeColor }}
										className={"rounded-sm bg-black px-6 py-4"}
										value={item.id + ""}
										id={`${item.id}` + item.name}>
										<span className='rounded-xs px-6 py-4 outline-2 outline-offset-2 outline-blue-700'></span>
									</SameRadioGroupItem>
								))}
							</SameRadioGroup>
						</div>
					</div>

					<div className='flex-none border-r-1 border-gray-200'>
						<div className='p-2'>
							<p className='mb-3 text-sm'>
								<span>Kích thước:</span>
								<span className={"font-bold"}>{sizeSelected ?? ""}</span>
								{sizeSelected && (
									<span>
										({getSizeSuggestion(sizeSelected)?.heightRange.min}cm - {getSizeSuggestion(sizeSelected)?.heightRange.max}cm |
										{getSizeSuggestion(sizeSelected)?.weightRange.min}kg - {getSizeSuggestion(sizeSelected)?.weightRange.max}kg)
									</span>
								)}
							</p>
							<SameRadioGroup onValueChange={setSizeSelected} value={sizeSelected} className='flex flex-wrap gap-4'>
								{model.sizes.map((item) => {
									return (
										<HoverCard>
											<HoverCardTrigger className={"relative"}>
												<div className={"h-10 w-12 place-content-center rounded-sm bg-gray-200 text-center uppercase"}>
													<span>{item}</span>
												</div>
												<SameRadioGroupItem className={"absolute top-0 h-10 w-12 cursor-pointer rounded-sm"} value={item} id={item}>
													<span className='h-10 w-12 place-content-center rounded-sm bg-black text-center text-white uppercase'>{item}</span>
												</SameRadioGroupItem>
											</HoverCardTrigger>
											<HoverCardContent className={"w-auto p-2"}>
												<div className=''>
													<p>
														{getSizeSuggestion(item)?.heightRange.min}cm - {getSizeSuggestion(item)?.heightRange.max}cm{" "}
													</p>
													<p>
														{getSizeSuggestion(item)?.weightRange.min}kg - {getSizeSuggestion(item)?.weightRange.max}kg
													</p>
												</div>
											</HoverCardContent>
										</HoverCard>
									);
								})}
							</SameRadioGroup>
						</div>
					</div>

					<div className='flex grow items-center px-2'>
						<Input onChange={handleQuantityChange} value={boughtQuantity} className={"me-3! w-1/4 rounded-2xl! text-center"} type={"number"} />
						<Button className={"flex w-3/4 cursor-pointer items-center rounded-2xl text-center hover:bg-neutral-300 hover:text-black"} variant='default'>
							<ShoppingBag className={"mx-2 inline-block size-6"} />
							<span>{sizeSelected ? "Thêm vào giỏ hàng" : "Chọn kích thước"}</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
