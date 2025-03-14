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
  Share,
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
import { productCardSamples } from "@/assets/data/productCard.data.ts";
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

        <div className="grid grid-cols-2 grid-rows-1 gap-1 mt-2d">
          <Stack
            randomRotation={true}
            sensitivity={90}
            sendToBackOnClick={true}
            cardDimensions={{ width: 537, height: 716 }}
            cardsData={images}
          />

          <div className="">
            <p className={"text-2xl font-bold mb-0"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <p className={"text-base text-neutral-400"}>Lorem ipsum dolor.</p>
            <p className={"flex items-center"}>
              <Rate
                count={3}
              />
              <span className="ml-1">(2.5)</span>

              <Dialog>
                <DialogTrigger>
                  <span
                    className={
                      "ms-6 flex items-center text-blue-600 font-bold text-sm cursor-pointer"
                    }
                  >
								<Share className={"size-3 me-1 "} /> <span> chia sẻ</span>
							</span>
                </DialogTrigger>
                <DialogContent className={"pr-0 pb-0 max-w-[660px]!"}>
                  <ScrollArea className={"h-146 border-none"}>
                    <div className="grid grid-cols-2">
                      <div className="">
                        <p className="pe-6 text-3xl font-bold">Giới thiệu bạn bè
                          Nhận ngay 10% CoolCash</p>
                        <p className="text-sm my-5">Bạn sẽ nhận được 10% giá trị đơn hàng đầu tiên của bạn bè và được trả bằng CoolCash khi họ là thành viên
                          CoolClub và mua sản phẩm Coolmate bất kỳ.</p>
                        <div className="p-3 mb-3 rounded-lg bg-neutral-100 ">
                          <p className="text-neutral-400 uppercase text-sm">Gửi mã giới thiệu đến với bạn bè</p>
                          <div className="border-1 border-neutral-300"></div>
                          <p className="flex items-center p-2">
                            <span className="uppercase text-lg text-neutral-700 ">Lorem ipsum dolor.</span>
                            <span className="flex text-blue-700 text-sm cursor-pointer"><Copy className={"mx-1"} /> Copy</span>
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-neutral-100 mb-3">
                          <p className="text-neutral-400 uppercase text-sm">Gửi link giới thiệu đến với bạn bè</p>
                          <div className="px-2 flex items-center bg-white rounded-3xl border-2 ">
                            <Input className={"border-none! w-3/4!"} type={"text"} value={"https://mcdn.coolmate.me/image/September2024/mceclip0_28"} />
                            <span className="flex text-blue-700 text-sm cursor-pointer"><Copy className={"mx-1"} /> Copy</span>
                          </div>
                        </div>

                        <Button className={"w-full mb-2 cursor-pointer rounded-2xl"} variant={"default"}>
                          <Share2 />
                          <span>Chia sẻ</span>
                        </Button>

                        <p className="text-sm font-bold">Bạn sẽ nhận được CoolCash khi:</p>
                        <ul className={"text-sm"}>
                          <li className={"flex items-center"}><Check className={"size-4 flex-none mr-1"} /> <span className={"shrink"}>Bạn bè của bạn tham gia CoolClub</span>
                          </li>
                          <li className={"flex items-center"}><Check className={"size-4 flex-none mr-1"} /> <span className={"shrink"}>Bạn bè của bạn hoàn thành đơn hàng đầu tiên trên website</span>
                          </li>
                          <li className={"flex items-center"}><Check className={"size-4 flex-none mr-1"} /> <span className={"shrink"}>Sau 7 ngày kể từ ngày đơn hàng giao thành công và không đổi trả, bạn có thể nhận và sử dụng CoolCash của bạn</span>
                          </li>
                        </ul>

                        <a href="#"><span className="text-xs underline decoration-gray-400 text-gray-400">*Chính sách và điều khoản</span></a>
                      </div>
                      <img src="https://mcdn.coolmate.me/image/September2024/mceclip0_28.png" alt="" className="h-120 place-self-end object-cover" />
                    </div>
                  </ScrollArea>
                </DialogContent>

              </Dialog>

            </p>
            <p className={"text-base line-through text-neutral-400"}>100000</p>
            <p className="flex font-bold text-2xl ">
              <span className="me-3">100.000</span>
              <Badge className={"text-white font-bold text-xl bg-blue-700"}>
                -10%
              </Badge>
            </p>
            <p className="flex items-center">
              <Truck className={"size-4 me-3 text-blue-600 "} /> Freeship
            </p>

            <p className="flex items-center">
							<span className="me-3 text-lg font-bold text-neutral-400">
								Mã giảm giá
							</span>
              <HoverCard>
                <HoverCardTrigger>
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
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="relative cursor-pointer">
                    <Ticket className={"size-20 text-amber-200"} />
                    <span
                      className={
                        "absolute text-xs top-1/3 left-1/4 font-bold text-orange-500"
                      }
                    >
										-20%
									</span>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>

            <Gift />

            <p className="m-0">
              Màu sắc: <span className="font-bold">Lorem ipsum.</span>
            </p>
            <div className="flex flex-wrap gap-4 mb-4 ">
              <div className="w-12 h-6 rounded-2xl outline-2 outline-offset-2 outline-neutral-700 bg-blue-600"></div>
            </div>

            <p className="m-0 flex justify-between">
							<span>
								Kích thước áo: <span className={"font-bold"}>size</span>{" "}
                <span>mô tả size</span>
							</span>
              <Dialog>
                <DialogTrigger>
                  <span className={"text-blue-600 text-decoration-underline decoration-blue-400 cursor-pointer hover:text-black"}>
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
                    <TabsContent className={"px-20 py-5 peer"} value="choose-size">
                      <div className="w-full flex">
                        <span className="text-gray-500 flex-none px-4">Chiều cao</span>
                        <Slider className={"shrink"} defaultValue={[155]} min={155} max={190} step={1} />
                        <span className="text-blue-700 flex-none px-4">cm</span>
                      </div>

                      <div className="w-full flex my-5">
                        <span className="text-gray-500 flex-none px-4">Cân nặng</span>
                        <Slider className={"shrink"} defaultValue={[40]} min={40} max={90} step={1} />
                        <span className="text-blue-700 flex-none px-4">kg</span>
                      </div>

                      <RadioGroup className={"flex"} defaultValue={"option-1"}>
                        <div className="relative">
                          <img src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip1_23.jpg"
                               alt="" className="w-55 h-62 object-cover rounded-lg" />
                          <RadioGroupItem className={"absolute top-0 right-0 w-55 h-62  border-none shadow-none cursor-pointer"} value="option-1" id="option-1">
                            <div className={" w-55 h-62 border-4 rounded-lg border-blue-700 "}></div>
                          </RadioGroupItem>
                        </div>
                        <div className="relative">
                          <img src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip3_97.jpg"
                               alt="" className="w-55 h-62 object-cover rounded-lg" />
                          <RadioGroupItem className={"absolute top-0 right-0 w-55 h-62  border-none shadow-none cursor-pointer"} value="option-2" id="option-2">
                            <div className={" w-55 h-62 border-4 rounded-lg border-blue-700 "}></div>
                          </RadioGroupItem>
                        </div>
                        <div className="relative">
                          <img src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2023/mceclip0_45.png"
                               alt="" className="w-55 h-62 object-cover rounded-lg" />
                          <RadioGroupItem className={"absolute top-0 right-0 w-55 h-62  border-none shadow-none cursor-pointer"} value="option-3" id="option-3">
                            <div className={" w-55 h-62 border-4 rounded-lg border-blue-700 "}></div>
                          </RadioGroupItem>
                        </div>
                      </RadioGroup>
                      <p className="font-bold my-3">Coolmate gợi ý bạn:</p>
                      <div className="grid grid-cols-6 grid-flow-col gap-4">
                        <div className="bg-black rounded-full p-1 text-white text-center">Lorem ipsum.</div>
                        <div className="bg-black rounded-full p-1 text-white text-center">Lorem ipsum.</div>
                        <div className="bg-black rounded-full p-1 text-white text-center">Lorem ipsum.</div>
                        <div className="bg-black rounded-full p-1 text-white text-center">Lorem ipsum.</div>

                      </div>
                    </TabsContent>
                    <TabsContent value="size-table">
                      <Table>
                        <TableCaption>Trường hợp số đo của bạn nằm trong khoảng giữa các size với nhau:
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
                          <TableRow className="text-sm font-bold">
                            <TableCell>Chiều cao</TableCell>
                            <TableCell>1m60 - 1m65</TableCell>
                            <TableCell>1m66 - 1m72</TableCell>
                            <TableCell>1m72 - 1m77</TableCell>
                            <TableCell>1m77 - 1m84</TableCell>
                            <TableCell>1m85 - 1m92</TableCell>
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
              <HoverCard>
                <HoverCardTrigger>
                  <div className="cursor-pointer w-1/8 h-12 bg-black text-white text-center content-center rounded-2xl">
                    Size
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className={"text-center"}>
                    <p className={"m-0"}>Lorem ipsum.</p>
                    <p className={"m-0"}>Lorem ipsum.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="cursor-pointer w-1/8 h-12 bg-neutral-200 text-center content-center rounded-xl">
                    Size
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className={"text-center"}>
                    <p className={"m-0"}>Lorem ipsum.</p>
                    <p className={"m-0"}>Lorem ipsum.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="flex mb-3">
              <Input
                defaultValue={1}
                className={"w-1/4 rounded-2xl! me-3! text-center"}
                type={"number"}
              />
              <Button
                className={"w-3/4  rounded-2xl flex text-center items-center cursor-pointer hover:bg-neutral-300 hover:text-black"}
                variant="default"
              >
                <ShoppingBag className={"size-6 inline-block mx-2"} />
                <span>Lorem ipsum dolor sit amet.</span>
              </Button>
            </div>

            <Accordion
              className={"rounded-lg bg-blue-50 p-3"}
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className={"h-4! text-sm! p-0 "}>
                  <p className="flex items-center">
                    <Crown className={"mr-1 text-blue-600"} /> Được hoàn
                    <span className="font-bold px-2">1000</span>name' Cash.
                  </p>
                </AccordionTrigger>
                <AccordionContent className={"p-2 pb-0"}>
                  <p className="px-2 border-t-1">
                    <span>
										Đây là số CoolCash ước tính bạn sẽ được hoàn lại khi mua sản
										phẩm hôm nay, tương ứng với quyền lợi hạng
									</span>
                    <span className="text-blue-600 font-bold flex items-center uppercase">
										Thành viên mới <Crown className={"ml-1 "} />
									</span>
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex my-3 items-center">
              <ZaloIcon />
              <a className="text-blue-700! px-2 cursor-pointer">
                Chat để coolmate tư vấn ngay (8:30 - 22:00)
              </a>
              <ArrowRight className={"size-4"} />
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-3">
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
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 px-5 ">
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
            className="object-cover rounded-xl h-150!"
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
              className={"w-1/10 h-10 rounded-[50px] outline-2 outline-black outline-offset-2"}
              variant="default"
              size="sm"
            >
              More
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>

      <p className={"uppercase text-center py-3 font-bold text-4xl"}>Gợi ý sản phẩm</p>
      <Carousel className="w-full">
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

      <div className="flex p-5 bg-neutral-200">
        <div className="w-1/3">
          <h1 className="fw-bold uppercase w-1/2">Đánh giá sản phẩm</h1>
          <Input
            className={"rounded-2xl! w-1/2! mb-4"}
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
                  count={5}
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
                  count={4}
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
                  count={3}
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
                  count={2}
                  className={"text-black!"}
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
                  count={1}
                  className={"text-black!"}
                />
              </Label>
            </div>
          </RadioGroup>

          <div className="w-1/2 my-4 flex items-center p-2 text-blue-700 bg-violet-100 rounded-xl fw-bold text-sm">
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

        <div className="w-2/3">
          <p className="mb-0 flex items-center font-bold text-8xl">4.5
            <Rate className={"text-4xl! text-orange-400!"} count={5} />
          </p>
          <p className="mb-10 text-sm text-gray-500 fw-bold">Dựa trên <span className="text-gray-800">X</span> đánh giá đến từ khách hàng</p>
          <div className="flex justify-between items-end">
            <p className="text-sm text-gray-500 fw-bold">Hiển thị đánh giá <span className="text-gray-800">1-10</span></p>
            <Select>
              <SelectTrigger className="w-60 bg-white rounded-2xl! text-sm! text-center">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent className={"bg-white text-sm"}>
                <SelectItem value="z2a">Đánh giá: Cao đến thấp</SelectItem>
                <SelectItem value="a2z">Đánh giá: Thấp đến cao</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Comment id={1} name={"LamHongPhong"} description={"Hello world"} numOfStars={4.1} date={new Date(Date.now())} />
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

      <p className={"uppercase text-center py-3 font-bold text-4xl"}>Sản phẩm bạn đã xem</p>
      <Carousel className="w-full">
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
