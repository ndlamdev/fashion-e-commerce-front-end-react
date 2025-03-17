import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../@/components/ui/breadcrumb.tsx";
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
import { Badge } from "../../@/components/ui/badge.tsx";
import { Accordion, AccordionContent, AccordionTrigger } from "../../@/components/ui/accordion.tsx";
import { AccordionItem } from "@radix-ui/react-accordion";
import ZaloIcon from "@/assets/images/icons/ZaloIcon.tsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../@/components/ui/collapsible.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../@/components/ui/carousel.tsx";
import sampleProducts from "@/assets/data/product.data.ts";
import CardProduct from "@/components/card-product/CardProduct.tsx";
import { RadioGroup, RadioGroupItem } from "../../@/components/ui/radio-group.tsx";
import { Label } from "../../@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../@/components/ui/select.tsx";
import Comment from "@/components/product-detail/Comment.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../@/components/ui/pagination.tsx";
import { Button } from "@/components/ui/button.tsx";
import Gift from "@/components/product-detail/Gift.tsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { Input } from "../../@/components/ui/input.tsx";
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
  const [chooseModel, setChooseModel] = useState<string>(product.models[0].id+'');

  // find model
  const model: ProductModelType = product.models.find((m) => m.id === Number(chooseModel)) ?? product.models[0];

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
  const [sizeSelected, setSizeSelected] = useState<SizeName | null>(null); // Giá trị mặc định

  const handleSizeChange = (value: SizeName) => {
    setSizeSelected(value);
  };

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
    <div className={""}>
      <div className="p-2 my-6 sm:p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 md:gap-4 mt-2">
          <Stack
            randomRotation={true}
            sensitivity={90}
            sendToBackOnClick={true}
            cardsData={imageUrls}
            className={"w-full h-dvw xl:h-200 lg:h-200 md:h-150 grid place-items-center"}
          />

          <div className="w-full">
            <p className={"lg:text-2xl md:text-lg text-base font-bold mb-0"}>
              {product.name}
            </p>
            <p className={"text-base text-neutral-400 mb-4"}>{product?.material}</p>
            <p className={"flex space-x-10 mb-5"}>
              <p className="flex space-x-25 items-center">
                <Rate
                  disabled={true}
                  allowHalf={true}
                  defaultValue={product?.numStars}
                  className={"flex-none! fill-black xl:size-6 md:size-5! size-4"}
                />
                <span className={" lg:text-start lg:pe-4 sm:text-center text-end"}>({product?.numComments})</span>
              </p>

              <Dialog>
                <DialogTrigger>
                  <span
                    className={
                      "flex items-center text-blue-600 font-bold text-sm cursor-pointer"
                    }
                  >
								<Share2 className={"size-3 me-1 fill-blue-800"} /> <span> chia sẻ</span>
							</span>
                </DialogTrigger>
                <DialogContent className={" pb-0 xl:max-w-[660px]!"}>
                  <ScrollArea className={"h-146 border-none"}>
                    <div className="grid xl:grid-cols-2 lg:grid-cols-1">
                      <div className="">
                        <p className="pe-6 text-3xl font-bold">Giới thiệu bạn bè
                          Nhận ngay 10% CoolCash</p>
                        <p className="text-sm my-5">Bạn sẽ nhận được 10% giá trị đơn hàng đầu tiên của bạn bè và được trả bằng CoolCash khi họ là thành viên
                          CoolClub và mua sản phẩm Coolmate bất kỳ.</p>
                        <div className="p-3 mb-3 rounded-lg bg-neutral-100 ">
                          <p className="text-neutral-400 uppercase text-sm">Gửi mã giới thiệu đến với bạn bè</p>
                          <div className="border-1 border-neutral-300"></div>
                          <p className="flex items-center justify-between p-2">
                            <span className="uppercase text-lg text-neutral-700 ">{model.codeModel}</span>
                            <span onClick={() => {
                              copyToClipboard(model.codeModel);
                              toast("Đã copy mã giới thiệu");
                            }} className="flex text-blue-700 text-sm cursor-pointer"><Copy className={"mx-1"} /> Copy</span>
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-neutral-100 mb-3">
                          <p className="text-neutral-400 uppercase text-sm">Gửi link giới thiệu đến với bạn bè</p>
                          <div className="px-2 flex items-center justify-between bg-white rounded-3xl border-2 ">
                            <Input className={"border-none! w-3/4! focus-visible:border-none"} type={"text"}
                                   value={"http://localhost:5173/product-detail"} />
                            <span onClick={() => {
                              copyToClipboard(model.codeModel);
                              toast("Đã copy mã giới thiệu");
                            }} className="flex text-blue-700 text-sm cursor-pointer"><Copy className={"mx-1"} /> Copy</span>
                          </div>
                        </div>

                        <Button onClick={() => toast("Đã copy link giới thiệu")} className={"w-full mb-2 cursor-pointer rounded-2xl"} variant={"default"}>
                          <Share2 />
                          <span>Chia sẻ</span>
                        </Button>

                        <p className="text-sm font-bold">Bạn sẽ nhận được CoolCash khi:</p>
                        <ul className={"text-sm"}>
                          <li className={"flex items-center"}><Check className={"size-4 flex-none mr-1"} /> <span className={"shrink text-sm "}>Bạn bè của bạn tham gia CoolClub</span>
                          </li>
                          <li className={"flex items-center"}><Check className={"size-4 flex-none mr-1"} /> <span className={"shrink text-sm "}>Bạn bè của bạn hoàn thành đơn hàng đầu tiên trên website</span>
                          </li>
                          tẽ
                          <li className={"flex items-center"}><Check className={"size-4 flex-none mr-1"} /> <span className={"shrink text-sm "}>Sau 7 ngày kể từ ngày đơn hàng giao thành công và không đổi trả, bạn có thể nhận và sử dụng CoolCash của bạn</span>
                          </li>
                        </ul>

                        <NavLink to={"/"}><span className="text-xs underline decoration-gray-400 text-gray-400">*Chính sách và điều khoản</span></NavLink>
                      </div>
                      <img src="https://mcdn.coolmate.me/image/September2024/mceclip0_28.png" alt=""
                           className="xl:w-full xl:h-auto w-0 h-0 place-self-end object-cover" />
                    </div>
                  </ScrollArea>
                </DialogContent>

              </Dialog>

            </p>
            {product?.discount && <p className={"md:text-base text-sm line-through text-neutral-400"}>{formatCurrency(product.price)}</p>}
            <p className="flex font-bold ">
              <span
                className="me-3 text-sm lg:text-2xl md:text-base">{formatCurrency(product.discount ? (product.price * (1 - product.discount / 100)) : product.price)}</span>
              {product?.discount && (<Badge className={"text-white font-bold md:text-xl text-xs bg-blue-700"}>
                -{product.discount}%
              </Badge>)}
            </p>
            <p className="flex items-center">
              <Truck className={"size-4 me-3 text-blue-600 "} /> Freeship
            </p>

            <p className="flex items-center my-5">
							<span className="me-3 lg:text-lg text-sm font-bold text-neutral-400">
								Mã giảm giá
							</span>
              <HoverCard>
                <HoverCardTrigger>
                  <Badge
                    onClick={() => {
                      copyToClipboard(model.codeModel);
                      toast("Lưu mã giảm giá thành công");
                    }}
                    className="p-2 cursor-pointer bg-orange-100">
                    <span
                      className={
                        " text-xs font-bold text-orange-500"
                      }
                    >
										-20%
									</span>
                    <Ticket className={"size-5! text-orange-500"} />
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className={"w-100! p-1"}>
                  <div className={"text-center"}>
                    <p className={"m-0"}>
                      Nhập <span className="font-bold">code</span> (còn number
                      lượt)
                    </p>
                    <p className={"m-0"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aliquam, autem!
                    </p>
                  </div>

                </HoverCardContent>
              </HoverCard>
            </p>

            {product.attachGift && <Gift className={"mb-4"} />}

            <p className="lg:text-lg md:text-sm text-xs my-1">
              Màu sắc: <span className="font-bold">{model.name}</span>
            </p>
            <SameRadioGroup onValueChange={setChooseModel} value={chooseModel} className="flex flex-wrap gap-4">
              {product.models.map((model) => (
                <SameRadioGroupItem style={{ backgroundColor: model.codeColor }}
                                    className={"px-4 py-2 lg:px-6 lg:py-4 rounded-sm lg:rounded-full cursor-pointer"}
                                    value={model.id + ""} id={model.id + ""}>
                  <span className="px-4 py-2 lg:px-6 lg:py-4 rounded-sm lg:rounded-full outline-2 outline-offset-2 outline-blue-700"></span>
                </SameRadioGroupItem>
              ))}
            </SameRadioGroup>

            <div className="">
              <p className="m-0 flex justify-between items-center">
							<span className={"lg:text-lg md:text-sm text-xs"}>
								Kích thước áo: <span className={"font-bold mx-1"}>{sizeSelected ?? ""}</span>
                <span>
                  {sizeSelected &&
                    <span>({getSizeSuggestion(sizeSelected)?.heightRange.min}cm - {getSizeSuggestion(sizeSelected)?.heightRange.max}cm |
                      {getSizeSuggestion(sizeSelected)?.weightRange.min}kg - {getSizeSuggestion(sizeSelected)?.weightRange.max}kg)</span>
                  }
                </span>
							</span>
                <Dialog>
                  <DialogTrigger>
                  <span className={"text-blue-600 underline cursor-pointer lg:text-base md:text-sm text-xs"}>
                    Hướng dẫn chọn size
							    </span>
                  </DialogTrigger>
                  <DialogContent className={"max-w-[910px]!"}>
                    <Tabs className={"relative"} defaultValue="choose-size">
                      <TabsList className={"h-auto p-0 text-black  border-2 border-gray-300 bg-white rounded-2xl  cursor-pointer"}>
                        <TabsTrigger
                          className={"h-12 bg-white data-[state=active]:bg-gray-200 data-[state=active]:shadow-none border-none rounded-xl font-bold cursor-pointer"}
                          value="choose-size">Hướng dẫn chọn size</TabsTrigger>
                        <TabsTrigger
                          className={"h-12 bg-white data-[state=active]:bg-gray-200 data-[state=active]:shadow-none border-none rounded-xl font-bold cursor-pointer"}
                          value="size-table">Bảng size</TabsTrigger>
                      </TabsList>
                      <TabsContent className={"lg:px-20 py-5"} value="choose-size">
                        <div className="w-full flex">
                          <span className="text-gray-500 flex-none px-4">Chiều cao</span>
                          <Slider className={"shrink"}
                                  onValueChange={handleHeightChange}
                                  defaultValue={heightValue}
                                  min={getSizeSuggestion(getMinSize(model.sizes) ?? "S")?.heightRange.min ?? 0}
                                  max={getSizeSuggestion(getMaxSize(model.sizes) ?? "3XL")?.heightRange.max ?? 0}
                                  step={1} />
                          <span className="text-blue-700 flex-none px-4">{heightValue} cm</span>
                        </div>

                        <div className="w-full flex my-5">
                          <span className="text-gray-500 flex-none px-4">Cân nặng</span>
                          <Slider className={"shrink"}
                                  onValueChange={handleWeightChange}
                                  defaultValue={heightValue}
                                  min={getSizeSuggestion(getMinSize(model.sizes) ?? "S")?.weightRange.min ?? 0}
                                  max={getSizeSuggestion(getMaxSize(model.sizes) ?? "3XL")?.weightRange.max ?? 0}
                                  step={1} />
                          <span className="text-blue-700 flex-none px-4">{weightValue} kg</span>
                        </div>

                        <SameRadioGroup className={"flex"} defaultValue={"option-1"}>
                          <div
                            className="w-1/3 rounded-lg bg-cover bg-center bg-no-repeat bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip1_23.jpg)]">
                            <SameRadioGroupItem className={`w-full h-full relative border-none shadow-none cursor-pointer`} value="option-1" id="option-1">
                              <div className={`h-full size-full absolute inset-0 rounded-lg outline-4 outline-offset-2 outline-blue-700 `}></div>
                            </SameRadioGroupItem>
                          </div>
                          <div
                            className="w-1/3 rounded-lg bg-cover bg-center bg-no-repeat bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip3_97.jpg)]">
                            <SameRadioGroupItem className={`w-full h-full relative border-none shadow-none cursor-pointer`} value="option-2" id="option-2">
                              <div className={`h-full size-full absolute inset-0 rounded-lg outline-4 outline-offset-2 outline-blue-700 `}></div>
                            </SameRadioGroupItem>
                          </div>
                          <div
                            className="w-1/3 rounded-lg bg-cover bg-center bg-no-repeat bg-[url(https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip0_45.png)]">
                            <SameRadioGroupItem className={`w-full h-full relative border-none shadow-none cursor-pointer`} value="option-3" id="option-3">
                              <div className={`h-full size-full absolute inset-0 rounded-lg outline-4 outline-offset-2 outline-blue-700 `}></div>
                            </SameRadioGroupItem>
                          </div>

                        </SameRadioGroup>
                        <p className="font-bold my-3">Coolmate gợi ý bạn:</p>
                        <div className="flex flex-wrap space-x-4 space-y-2">
                          <div className="flex bg-black rounded-full p-1 text-white text-center">Lorem ipsum.</div>
                          <div className="flex bg-black rounded-full p-1 text-white text-center">Lorem ipsum.</div>
                          <div className="flex bg-black rounded-full p-1 text-white text-center">Lorem ipsum.</div>
                          <div className="flex bg-black rounded-full p-1 text-white text-center">Lorem ipsum.</div>

                        </div>
                      </TabsContent>
                      <TabsContent value="size-table">
                        <Table>
                          <TableCaption className={"break-all"}>Trường hợp số đo của bạn nằm trong khoảng giữa các size với nhau:
                            Với áo thun, bạn hãy lựa chọn ưu tiên theo chiều cao
                            Ví dụ chiều cao của bạn theo size L nhưng cân nặng của bạn theo size M, Hãy chọn L.
                            97% khách hàng của chúng tôi đã chọn đúng size theo cách này.</TableCaption>
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
                            <TableRow className="text-sm font-bold break-all">
                              <TableCell>Chiều cao</TableCell>
                              <TableCell>1m60 - 1m65</TableCell>
                              <TableCell>1m66 - 1m72</TableCell>
                              <TableCell>1m72 - 1m77</TableCell>
                              <TableCell>1m77 - 1m84</TableCell>
                              <TableCell><span>1m85 - 1m92</span></TableCell>
                            </TableRow>

                            <TableRow className="text-sm font-bold">
                              <TableCell>Cân nặng</TableCell>
                              <TableCell> 55kg - 61kg</TableCell>
                              <TableCell>62kg - 68kg</TableCell>
                              <TableCell>69kg - 75kg</TableCell>
                              <TableCell>76kg - 84kg</TableCell>
                              <TableCell>85kg - 90kg</TableCell>
                            </TableRow>

                            <TableRow className="text-sm font-bold">
                              <TableCell>Dài áo</TableCell>
                              <TableCell>68.5</TableCell>
                              <TableCell>70.5</TableCell>
                              <TableCell>72.5</TableCell>
                              <TableCell>74.5</TableCell>
                              <TableCell>76</TableCell>
                            </TableRow>

                            <TableRow className="text-sm font-bold">
                              <TableCell>Rộng ngực</TableCell>
                              <TableCell>52.7</TableCell>
                              <TableCell>54.7</TableCell>
                              <TableCell>56.7</TableCell>
                              <TableCell>59.7</TableCell>
                              <TableCell>62.7</TableCell>
                            </TableRow>

                            <TableRow className="text-sm font-bold">
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
              <div className="flex flex-wrap gap-3 mb-3">
                <SameRadioGroup className="flex flex-wrap gap-4" onValueChange={handleSizeChange}>
                  {model.sizes.map((value, index) => {
                    return (<HoverCard>
                      <HoverCardTrigger className={"relative"}>
                        <div className={"w-12 h-8 lg:w-20 lg:h-8 bg-gray-200 rounded-sm lg:rounded-full  text-center place-content-center uppercase"}>
                          <span>{value}</span></div>
                        <SameRadioGroupItem
                          className={"absolute rounded-sm lg:rounded-full cursor-pointer top-0 w-12 h-8 lg:w-20 l:h-8"} value={value} id={`${value}` + index}>
                          <span
                            className="w-12 h-8 lg:w-20 lg:h-8 rounded-sm lg:rounded-full bg-black text-white text-center place-content-center uppercase">{value}</span>
                        </SameRadioGroupItem>
                      </HoverCardTrigger>
                      <HoverCardContent className={"p-2 w-auto"}>
                        <div className="">
                          <p>{getSizeSuggestion(value)?.heightRange.min}cm - {getSizeSuggestion(value)?.heightRange.max}cm</p>
                          <p>{getSizeSuggestion(value)?.weightRange.min}kg - {getSizeSuggestion(value)?.weightRange.max}kg</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>);
                  })}
                </SameRadioGroup>
              </div>
            </div>

            <div className="flex mb-3">
              <Input
                onChange={handleQuantityChange}
                value={boughtQuantity}
                className={"w-1/4 rounded-2xl! me-3! text-center"}
                type={"number"}
              />
              <Button
                className={"w-3/4 text-xs sm:text-sm rounded-2xl flex text-center items-center cursor-pointer hover:bg-neutral-300 hover:text-black"}
                variant="default"
              >
                <ShoppingBag className={""} />
                <span>{sizeSelected ? "Thêm vào giỏ hàng" : "Chọn kích thước"}</span>
              </Button>
            </div>

            <Accordion
              className={"rounded-lg bg-blue-50 p-3"}
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className={"p-0"}>
                  <p className="flex flex-wrap text-xs sm:text-sm space-x-2 items-center">
                    <Crown className={"size-4 sm:size-6 text-blue-600"} /> Được hoàn
                    <span className="font-bold mx-1">1000</span> name' Cash.
                  </p>
                </AccordionTrigger>
                <AccordionContent className={"p-2 pb-0 text-xs sm:text-sm"}>
                  <p className="px-2 border-t-1">
                    <span>
										Đây là số CoolCash ước tính bạn sẽ được hoàn lại khi mua sản
										phẩm hôm nay, tương ứng với quyền lợi hạng
									</span>
                    <span className="text-blue-600 font-bold flex items-center uppercase">
										Thành viên mới <Crown className={"ml-1 size-4 sm:size-6 "} />
									</span>
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex space-x-2 my-2 sm:my-6 items-center ">
              <ZaloIcon className={"size-6 sm:size-8 "} />
              <a className=" text-xs sm:text-sm text-blue-700 cursor-pointer">
                Chat để coolmate tư vấn ngay (8:30 - 22:00)
              </a>
              <ArrowRight className={"size-4"} />
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-6">
              <div className={"flex items-center"}>
                <RefreshCcw className={"font-bold mr-1 flex-none"} />
                <span className="shrink text-xs md:text-sm">
                  Đổi trả cực dễ chỉ cần số điện thoại
                </span>
              </div>
              <div className={"flex items-center"}>
                <CalendarSync className={"font-bold mr-1 flex-none"} />
                <span className="shrink text-xs md:text-sm">
                   60 ngày đổi trả vì
                bất kỳ lý do gì
                </span>
              </div>
              <div className={"flex items-center"}>
                <PhoneCall className={"font-bold mr-1 flex-none"} /> <span className="shrink text-xs md:text-sm">
                Hotline 1900.27.27.37
                hỗ trợ từ 8h30 - 22h mỗi ngày
              </span>
              </div>
              <div ref={triggerRef} className={"flex items-center"}>
                <MapPinHouse className={"font-bold mr-1 flex-none"} /> <span className="shrink text-xs md:text-sm">
                Đến tận nơi nhận
                hàng trả, hoàn tiền trong 24h
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Collapsible className={"relative group p-5 bg-neutral-200 text-sm"}>
        <p className={"uppercase text-center font-bold md:text-4xl sm:text-xl"}>Mô tả sản phẩm</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 px-5 text-xs">
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
            src="src/assets/images/product-detail-image/quan-dai-kaki-ecc-pants-den_(4).jpeg"
            alt=""
            className="object-cover rounded-xl md:h-150! h-50!"
          />
        </div>
        <CollapsibleContent>
          <img
            src="src/assets/images/product-detail-image/QDECC.webp"
            alt="QDECC"
            className=""
          />
        </CollapsibleContent>
        <div className="flex justify-center mt-4">
          <CollapsibleTrigger asChild>
            <Button
              className={"md:w-1/10 w-1/5 h-10 lg:rounded-2xl rounded-lg"}
              variant="default"
              size="sm"
            >
              More
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>

      <p className={"uppercase text-center py-3 font-bold md:text-4xl text-xl"}>Gợi ý sản phẩm</p>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((card, index) => (
            <CarouselItem className={" lg:basis-1/4 basis-1/2"} key={index}>
              <CardProduct {...card} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={"left-2 rounded-2xl! outline-0"} />
        <CarouselNext className={"right-2 rounded-2xl! outline-0"} />
      </Carousel>

      <div className="px-4 md:flex sm:flex-none md:p-5 sm:ps-5 pt-5 bg-neutral-100">
        <p className="md:w-1/4  uppercase md:text-4xl text-xl font-bold  md:content-center md:px-12">Đánh giá sản phẩm</p>
        <div className="md:w-3/4 content-center">
          <p className="mb-0 flex items-center font-bold md:text-8xl text-3xl">4.8
            <Rate className={"lg:size-12! md:size-8! fill-orange-400 stroke-orange-400"} defaultValue={4.8} disabled={true} allowHalf={true} />
          </p>
          <p className="md:mb-10 text-sm text-gray-500 fw-bold">Dựa trên <span className="text-gray-800">X</span> đánh giá đến từ khách hàng</p>
        </div>
      </div>
      <div className="flex flex-wrap p-5 pt-0 bg-neutral-100">
        <div className="lg:w-1/4 md:flex-none lg:px-12 px-4 max-md:hidden">
          <Input
            className={"rounded-2xl my-4 bg-white max-md:visible"}
            placeholder="Tìm kiếm đánh giá"
          />

          <p className="text-sm text-gray-600 fw-bold mb-1">
            Phân loại xếp hạng
          </p>
          <RadioGroup>
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value="5"
                id="r5"
                children={<Square className="size-3 fill-blue-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
              />
              <Label className={" ml-1"} htmlFor="r5">
                <Rate
                  disabled
                  className={"fill-black"}
                  defaultValue={5}
                />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value="4"
                id="r4"
                children={<Square className="size-3 fill-blue-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
              />
              <Label className={"ml-1"} htmlFor="r4">
                <Rate
                  disabled
                  className={"fill-black"}
                  defaultValue={4}
                />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value="3"
                id="r3"
                children={<Square className="size-3 fill-blue-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
              />
              <Label className={" ml-1"} htmlFor="r3">
                <Rate
                  disabled
                  className={"fill-black"}
                  defaultValue={3}
                />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value="2"
                id="r2"
                children={<Square className="size-3 fill-blue-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
              />
              <Label className={" ml-1"} htmlFor="r2">
                <Rate
                  disabled
                  defaultValue={2}
                  className={"fill-black"}
                />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value="1"
                id="r1"
                children={<Square className="size-3 fill-blue-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
              />
              <Label className={" ml-1"} htmlFor="r1">
                <Rate
                  disabled
                  className={"fill-black"}
                  defaultValue={1}
                />
              </Label>
            </div>
          </RadioGroup>

          <div className="my-4 flex items-center p-2 text-blue-700 bg-violet-100 rounded-xl fw-bold text-sm">
            <Check className={"mr-1! size-10"} />
            <span className="">
							Các review đều đến từ khách hàng đã thực sự mua hàng của Coolmate
						</span>
          </div>

          <p className="text-sm text-gray-600 fw-bold mb-1">Lọc phản hồi</p>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value="res"
                id="res"
                children={<Square className="size-3 fill-blue-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
              />
              <Label className={" ml-1 text-gray-600"} htmlFor="res">
                Đã phản hồi
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className={"size-5 bg-white rounded-sm!"}
                value="has-image"
                id="has-image"
                children={<Square className="size-3 fill-blue-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
              />
              <Label className={"ml-1 text-gray-600"} htmlFor="has-image">
                Chỉ có hình ảnh
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="lg:w-3/4 md:shrink w-full sm:mt-10 mt-5">
          <div className="flex justify-between items-end">
            <p className="text-sm text-gray-500 fw-bold">Hiển thị đánh giá <span className="text-gray-800">1-10</span></p>
            <Select>
              <SelectTrigger className="w-60 bg-white rounded-2xl! text-sm! text-center">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent className={"bg-white text-sm"}>
                <SelectItem value="z2a">Đánh giá: Cao đến thấp</SelectItem>
                <SelectItem value="a2z">Đánh giá: Thấp đến cao</SelectItem>
                <SelectItem className={"md:hidden sm:visible "} value="1">1 sao</SelectItem>
                <SelectItem className={"md:hidden sm:visible "} value="2">2 sao</SelectItem>
                <SelectItem className={"md:hidden sm:visible "} value="3">3 sao</SelectItem>
                <SelectItem className={"md:hidden sm:visible "} value="4">4 sao</SelectItem>
                <SelectItem className={"md:hidden sm:visible "} value="5">5 sao</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Comment id={1} name={"LamHongPhong"} description={"Hello world"} numOfStars={4.5} date={new Date(Date.now())} />
          <Pagination className={"py-2"}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className={"flex!"} href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className={"flex!"} href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className={"flex!"} href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className={"flex!"} href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className={"flex!"} href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <p className={"uppercase text-center py-3 font-bold md:text-4xl sm:text-xl"}>Sản phẩm bạn đã xem</p>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((card, index) => (
            <CarouselItem className={" lg:basis-1/4 basis-1/2"} key={index}>
              <CardProduct {...card} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={"left-2 rounded-2xl! outline-0"} />
        <CarouselNext className={"right-2 rounded-2xl! outline-0"} />
      </Carousel>

      <div
        className={`fixed top-0 z-50 bg-white w-full border-gray-200 opacity-1 overflow-hidden -translate-y-full ease-in-out transition-all duration-900 ${isVisible ? "lg:opacity-100 lg:h-auto lg:translate-y-0" : "opacity-0  overflow-hidden -translate-y-full"}`}>
        <div className="flex">
          <div className="border-r-1 flex">
            <img src={model.imageUrls[0]} alt={`${product.name}-` + model.name} className="object-cover w-16" />
            <div className="p-4 ">
              <p className="flex flex-wrap gap-1">
                <Rate className={"fill-black stroke-black "} defaultValue={3.5} allowHalf disabled />
                <p className="col-span-2 xl:text-sm text-xs">
                  <span className="before:content-['|'] pe-2"> {product.numComments}</span>
                  <span className="before:content-['|']"> Đã bán (web): {product?.sold ?? Number.NaN}</span>
                </p>
              </p>
              <p className="flex flex-wrap items-center gap-4 font-bold">
                <p className={"xl:text-xl text-lg"}>{formatCurrency(product?.discount ? product.price * (1 - product?.discount / 100) : product.price)}</p>
                {product?.discount && <Badge className="text-sm  rounded-lg bg-blue-700 text-white">-{product.discount}%</Badge>}
                <span className=" text-sm line-through text-gray-400">{product.price}</span>
              </p>
            </div>
          </div>

          <div className="border-r-1 border-gray-200">
            <div className="p-2">
              <p className="text-sm mb-3"><span>Màu sắc:</span><span className={"font-bold"}> {model.name}</span></p>
              <SameRadioGroup onValueChange={setChooseModel} value={chooseModel} className="flex flex-wrap gap-4">
                {product.models.map((item) => (
                  <SameRadioGroupItem style={{ backgroundColor: item.codeColor }} className={"px-6 py-4 rounded-sm bg-black "} value={item.id + ""}
                                      id={`${item.id}` + item.name}>
                    <span className="px-6 py-4 rounded-xs outline-2 outline-offset-2 outline-blue-700"></span>
                  </SameRadioGroupItem>
                ))}
              </SameRadioGroup>
            </div>
          </div>

          <div className="flex-none border-r-1 border-gray-200">
            <div className="p-2">
              <p className="text-sm mb-3">
                <span>Kích thước:</span><span className={"font-bold"}>{sizeSelected ?? ""}</span>
                {sizeSelected &&
                  <span>({getSizeSuggestion(sizeSelected)?.heightRange.min}cm - {getSizeSuggestion(sizeSelected)?.heightRange.max}cm |
                    {getSizeSuggestion(sizeSelected)?.weightRange.min}kg - {getSizeSuggestion(sizeSelected)?.weightRange.max}kg)</span>
                }
              </p>
              <SameRadioGroup className="flex flex-wrap gap-4">
                {model.sizes.map((item) => {
                  return (<HoverCard>
                    <HoverCardTrigger className={"relative"}>
                      <div className={"w-12 h-10 bg-gray-200 rounded-sm  text-center place-content-center uppercase"}><span>{item}</span></div>
                      <SameRadioGroupItem className={"absolute rounded-sm cursor-pointer top-0 w-12 h-10"} value={item} id={item}>
                        <span className="w-12 h-10 rounded-sm bg-black text-white text-center place-content-center uppercase">{item}</span>
                      </SameRadioGroupItem>
                    </HoverCardTrigger>
                    <HoverCardContent className={"p-2 w-auto"}>
                      <div className="">
                        <p>{getSizeSuggestion(item)?.heightRange.min}cm - {getSizeSuggestion(item)?.heightRange.max}cm </p>
                        <p>{getSizeSuggestion(item)?.weightRange.min}kg - {getSizeSuggestion(item)?.weightRange.max}kg</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>)
                })}
              </SameRadioGroup>
            </div>
          </div>

          <div className="grow flex items-center px-2">
            <Input
              onChange={handleQuantityChange}
              value={boughtQuantity}
              className={"w-1/4 rounded-2xl! me-3! text-center"}
              type={"number"}
            />
            <Button
              className={"w-3/4 rounded-2xl flex text-center items-center cursor-pointer hover:bg-neutral-300 hover:text-black"}
              variant="default"
            >
              <ShoppingBag className={"size-6 inline-block mx-2"} />
              <span>{sizeSelected ? "Thêm vào giỏ hàng" : "Chọn kích thước"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
