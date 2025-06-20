import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx";
import { ArrowRight, CalendarSync, Check, Crown, MapPinHouse, PhoneCall, RefreshCcw, Share2, ShoppingBag, Square, Ticket, Truck } from "lucide-react";
import Stack from "@/components/Stack/Stack.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion.tsx";
import { AccordionItem } from "@radix-ui/react-accordion";
import ZaloIcon from "@/assets/images/icons/ZaloIcon.tsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel.tsx";
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { Input } from "@/components/ui/input.tsx";
import Rate from "@/components/product-detail/Rate.tsx";
import { SameRadioGroup, SameRadioGroupItem } from "@/components/radio-group/SameRadioGroup.tsx";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { getSizeSuggestion } from "@/utils/sizeModelManage.ts";
import { useGetProductQuery } from "@/redux/api/product.api";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { OptionType } from "@/types/product/productOption.type.ts";
import ProductImageType from "@/types/product/productImage.type.ts";
import { CollectionValue } from "@/utils/enums/collection.enum.ts";
import { useDispatch } from "react-redux";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import cartService from "@/services/cart.service.ts";
import { useTranslation } from "react-i18next";

export default function ProductDetailPage() {
  const [MIN_BOUGHT, MAX_BOUGHT] = [1, 100];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);
  const RESOURCE_IMAGE = import.meta.env.VITE_BASE_MEDIA_URL;
  const [colorSelected, setColorSelected] = useState<string | undefined>();
  const [sizeSelected, setSizeSelected] = useState<string | undefined>();
  const [imagesColor, setImagesColor] = useState<(ProductImageType | undefined)[]>();
  const { t } = useTranslation(undefined, {
    keyPrefix: "page.product_details"
  });

  const sizes = useMemo(() => {
    return data?.data.options.find((opt) => opt.type === OptionType.SIZE) || undefined;
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setColorSelected(data.data.variants[0].options[OptionType.COLOR]);
    setSizeSelected(data.data.variants[0].options[OptionType.SIZE]);
    const colorOptions = data?.data.options_values.find((opt) => opt.type === OptionType.COLOR);
    const colorValues = data.data.options.find((opt) => opt.type === OptionType.COLOR)?.values;
    setImagesColor(
      colorValues?.map((color: string) => {
        return colorOptions?.options?.find((item) => item.title === color)?.images[0];
      }),
    );
  }, [data]);

  const variant = useMemo(() => {
    return data?.data.variants.find((v) => v.options.COLOR === colorSelected && v.options.SIZE === sizeSelected);
  }, [data, colorSelected, sizeSelected]);

  const cardData = useMemo(() => {
    const images = data?.data.options_values.find((opt) => opt.type === OptionType.COLOR)?.options?.find((item) => item.title === colorSelected)?.images;

    return images?.map((item, index) => ({
      id: index,
      img: RESOURCE_IMAGE + item.src,
    }));
  }, [data, colorSelected, RESOURCE_IMAGE]);

  // handle decrement/increment quanlity buy
  const [boughtQuantity, setBoughtQuantity] = useState<number>(MIN_BOUGHT);
  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBoughtQuantity(Number(event.target.value) <= MIN_BOUGHT ? MIN_BOUGHT : Number(event.target.value));
  };

  // handle fixed
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = "KimiFashion - " + (data?.data.title ?? "");

    const handleScroll = () => {
      if (!triggerRef.current) return;

      const triggerTop = triggerRef.current.getBoundingClientRect().top;
      setIsVisible(triggerTop < 0); // Khi trigger vào giữa màn hình thì hiện
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data?.data.title]);

  const addCartItemFc = useCallback(() => {
    if (!variant) return;
    cartService.addCartItem(variant?.id, boughtQuantity).then();
  }, [variant, boughtQuantity]);

  if (isLoading) return <Skeleton className={"h-screen w-screen"} />;
  return (
    <main className={"pb-10"}>
      <section className={"my-6 p-2 sm:p-4 lg:mx-10 xl:mx-20"}>
        <Breadcrumb className={"px-15"}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={"/"}>{t("breadcrumb.home")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className={"cursor-pointer"} onClick={() => navigate(`/collection?type=${data?.data.gender_type}`)}>
                {data?.data.gender_type && CollectionValue[data?.data.gender_type]}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{data?.data.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className={"mt-2 grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 md:gap-4"}>
          {cardData ? (
            <Stack
              randomRotation={true}
              sensitivity={200}
              sendToBackOnClick={true}
              cardsData={cardData}
              className={"grid h-dvw w-full place-items-center object-cover md:h-150 lg:h-200 xl:h-200"}
            />
          ) : (
            <Skeleton className={"w-full"} />
          )}

          <div className={"w-full"}>
            <p className={"mb-0 text-base font-bold md:text-lg lg:text-2xl"}>{data?.data.title}</p>
            <p className={"mb-4 text-base text-neutral-400"}>{data?.data.display_name_open}</p>
            <span className={"mb-5 flex space-x-10"}>
              <span className={"flex items-center space-x-25"}>
                <Rate
                  disabled={true}
                  allowHalf={true}
                  defaultValue={data?.data.review?.ratingValue}
                  className={"size-4 flex-none! fill-black md:size-5! xl:size-6"}
                />
                <span className={"text-end sm:text-center lg:pe-4 lg:text-start"}>({data?.data.review?.reviewCount})</span>
              </span>

              <span
                onClick={() => {
                  dispatch(showDialog("refer-friend"));
                }}
                className={"flex cursor-pointer items-center text-sm font-bold text-blue-600"}>
                <Share2 className={"me-1 size-3 fill-blue-800"} /> <span>{t("share")}</span>
              </span>
            </span>
            {data?.data.discount && <p className={"text-sm text-neutral-400 line-through md:text-base"}>{formatCurrency(variant?.regular_price as number)}</p>}
            <p className={"flex font-bold"}>
              <span className={"me-3 text-sm md:text-base lg:text-2xl"}>
                {formatCurrency(
                  data?.data.discount && variant ? variant.regular_price * (1 - data?.data.discount.percent / 100) : (variant?.regular_price as number),
                )}
              </span>
              {data?.data.discount && <Badge className={"bg-blue-700 text-xs font-bold text-white md:text-xl"}>-{data?.data.discount.percent}%</Badge>}
            </p>
            <p className={"flex items-center"}>
              <Truck className={"me-3 size-4 text-blue-600"} /> <span>{t("free_ship")}</span>
            </p>

            <p className={"my-5 flex items-center"}>
              <span className={"me-3 text-sm font-bold text-neutral-400 lg:text-lg"}>{t("discount_code")}</span>
              <HoverCard openDelay={50} closeDelay={100}>
                <HoverCardTrigger>
                  <Badge
                    onClick={() => {
                      navigator.clipboard.writeText("Copied!").then((r) => console.log(r));
                      toast(t("save_discount_code_success"));
                    }}
                    className={"cursor-pointer bg-orange-100 p-2"}>
                    <span className={"text-xs font-bold text-orange-500"}>-20%</span>
                    <Ticket className={"size-5! text-orange-500"} />
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className={"w-100! p-1"}>
                  <div className={"text-center"}>
                    <p className={"m-0"}>
											{t('enter')} <span className={"font-bold"}>code</span> ({t("no_available_discount_code")}) {t("to_get_discount")}.
                    </p>
                    <p className={"m-0"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, autem!</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>

            {/*{data?.data.attachGift && <Gift className={"mb-4"} />}*/}

            <p className={"my-1 text-xs md:text-sm lg:text-lg"}>
              {t("color")}: <span className={"font-bold"}>{colorSelected}</span>
            </p>
            <SameRadioGroup onValueChange={setColorSelected} defaultValue={colorSelected} className={"flex flex-wrap gap-4"}>
              {data &&
                data?.data.options
                  .find((option) => option.type === OptionType.COLOR)
                  ?.values?.map((color, index) => (
                    <SameRadioGroupItem
                      key={index}
                      className={"cursor-pointer rounded-sm px-4 py-2 lg:rounded-full lg:px-6 lg:py-4"}
                      value={color}
                      checked={color == colorSelected}
                      id={color}
                      style={{
                        backgroundImage: imagesColor ? `url("${RESOURCE_IMAGE + imagesColor[index]?.src}")` : ``,
                        objectFit: "fill",
                        backgroundSize: "auto",
                        backgroundPosition: "center",
                      }}>
                      <Label
                        htmlFor={color}
                        className='box-content rounded-sm object-center px-4 py-2 outline-2 outline-offset-2 outline-blue-700 lg:rounded-full lg:px-6 lg:py-4'></Label>
                    </SameRadioGroupItem>
                  ))}
            </SameRadioGroup>

            <div className=''>
              <p className='m-0 flex items-center justify-between'>
                <span className={"text-xs md:text-sm lg:text-lg"}>
                  {t("size")}: <span className={"mx-1 font-bold"}>{sizeSelected ?? ""}</span>
                  <span>
                    {sizeSelected && (
                      <span>
                        ({getSizeSuggestion(sizeSelected)?.heightRange.min}cm - {getSizeSuggestion(sizeSelected)?.heightRange.max}cm |
                        {getSizeSuggestion(sizeSelected)?.weightRange.min}kg - {getSizeSuggestion(sizeSelected)?.weightRange.max}kg)
                      </span>
                    )}
                  </span>
                </span>
                <span
                  onClick={() => {
                    dispatch(showDialog("guide-choose-size"));
                  }}
                  className={"cursor-pointer text-xs text-blue-600 underline md:text-sm lg:text-base"}>
                  {t("size_guide")}
                </span>
              </p>
              <div className='mb-3 flex flex-wrap gap-3'>
                <SameRadioGroup className='flex flex-wrap gap-4' onValueChange={setSizeSelected}>
                  {data &&
                    data?.data.options
                      .find((option) => option.type === OptionType.SIZE)
                      ?.values?.map((size, index) => {
                        return (
                          <HoverCard key={index} openDelay={50} closeDelay={100}>
                            <HoverCardTrigger className={"relative"}>
                              <div className={"h-8 w-12 place-content-center rounded-sm bg-gray-200 text-center uppercase lg:h-8 lg:w-20 lg:rounded-full"}>
                                <span>{size}</span>
                              </div>
                              <SameRadioGroupItem
                                className={"l:h-8 absolute top-0 h-8 w-12 cursor-pointer rounded-sm lg:w-20 lg:rounded-full"}
                                value={size}
                                checked={size === sizeSelected}>
                                <span className='h-8 w-12 place-content-center rounded-sm bg-black text-center text-white uppercase lg:h-8 lg:w-20 lg:rounded-full'>
                                  {size}
                                </span>
                              </SameRadioGroupItem>
                            </HoverCardTrigger>
                            <HoverCardContent className={"w-auto p-2"}>
                              <div className=''>
                                <p>
                                  {getSizeSuggestion(size)?.heightRange.min}cm - {getSizeSuggestion(size)?.heightRange.max}cm
                                </p>
                                <p>
                                  {getSizeSuggestion(size)?.weightRange.min}kg - {getSizeSuggestion(size)?.weightRange.max}kg
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
              <Input
                onChange={handleQuantityChange}
                value={boughtQuantity}
                className={"me-3! w-1/4 rounded-2xl! text-center"}
                type={"number"}
                min={MIN_BOUGHT}
                max={MAX_BOUGHT}
              />
              <Button
                className={"flex w-3/4 cursor-pointer items-center rounded-2xl text-center text-xs hover:bg-neutral-300 hover:text-black sm:text-sm"}
                disabled={(!!sizes && !sizeSelected) || Number(boughtQuantity) > MAX_BOUGHT}
                onClick={() => {
                  if (!sizes) {
                    const v = data?.data.variants.find((v) => v.options.COLOR === colorSelected);
                    if (!v) return;
                    cartService.addCartItem(v.id, boughtQuantity).then();
                  } else {
                    addCartItemFc();
                  }
                }}
                variant='default'>
                <ShoppingBag className={""} />
                <span>{sizeSelected || !sizes ? t("add_to_cart") : t("choose_size")}</span>
              </Button>
            </div>
            {boughtQuantity > MAX_BOUGHT && <p className='text-red-500'>{t("warning_max_bought", { max: MAX_BOUGHT })}</p>}
            <Accordion className={"rounded-lg bg-blue-50 p-3"} type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger className={"p-0"}>
                  <p className='flex flex-wrap items-center space-x-2 text-xs sm:text-sm'>
                    <Crown className={"size-4 text-blue-600 sm:size-6"} />{t("be_refunded")}
                    <span className='mx-1 font-bold'>1000</span> kimi' Cash.
                  </p>
                </AccordionTrigger>
                <AccordionContent className={"p-2 pb-0 text-xs sm:text-sm"}>
                  <p className='border-t-1 px-2'>
                    <span>{t("coolcash_refund_info")}</span>
                    <span className='flex items-center font-bold text-blue-600 uppercase'>
                      {t("new_member")} <Crown className={"ml-1 size-4 sm:size-6"} />
                    </span>
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className='my-2 flex items-center space-x-2 sm:my-6'>
              <ZaloIcon className={"size-6 sm:size-8"} />
              <a className='cursor-pointer text-xs text-blue-700 sm:text-sm'>{t("chat_support")}</a>
              <ArrowRight className={"size-4"} />
            </div>

            <div className='grid grid-cols-2 grid-rows-2 gap-6'>
              <div className={"flex items-center"}>
                <RefreshCcw className={"mr-1 flex-none font-bold"} />
                <span className='shrink text-xs md:text-sm'>{t("exchange_policy")}</span>
              </div>
              <div className={"flex items-center"}>
                <CalendarSync className={"mr-1 flex-none font-bold"} />
                <span className='shrink text-xs md:text-sm'>{t("return_policy")}</span>
              </div>
              <div className={"flex items-center"}>
                <PhoneCall className={"mr-1 flex-none font-bold"} />{" "}
                <span className='shrink text-xs md:text-sm'>{t("hotline_info")}</span>
              </div>
              <div ref={triggerRef} className={"flex items-center"}>
                <MapPinHouse className={"mr-1 flex-none font-bold"} />{" "}
                <span className='shrink text-xs md:text-sm'>{t("delivery_info")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Collapsible className={"group relative bg-neutral-200 py-5 text-sm lg:px-10 xl:px-20"}>
        <p className={"text-center font-bold uppercase sm:text-xl md:text-4xl"}>{t("product_description")}</p>
        <div className='mb-3 grid grid-cols-2 gap-3'>
          <div className='p-3 px-5 text-xs'>
            {data?.data.display_name_open}
          </div>
          <img src='https://mcdn.coolmate.me/image/February2023/mceclip10_61.jpg' alt='' className='h-50! rounded-xl object-cover md:h-150!' />
        </div>
        <CollapsibleContent>
          <img src='https://mcdn.coolmate.me/image/February2023/mceclip12_56.jpg' alt='QDECC' className='' />
        </CollapsibleContent>
        <div className='mt-4 flex justify-center'>
          <CollapsibleTrigger asChild>
            <Button className={"h-10 w-1/5 rounded-lg md:w-1/10 lg:rounded-2xl"} variant='default' size='sm'>
              {t("read_more")}
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>

      <p className={"mt-10 py-3 text-center text-xl font-bold uppercase md:text-4xl"}>{t("suggested_products")}</p>
      <Carousel className='w-full px-0 lg:px-5 xl:px-10'>
        <CarouselContent className={"pl-4"}>
          {/*{products.map((card, index) => (*/}
          {/*	<CarouselItem className={"basis-1/2 p-0 md:basis-1/4"} key={index}>*/}
          {/*		<CardProduct {...card} />*/}
          {/*	</CarouselItem>*/}
          {/*))}*/}
        </CarouselContent>
        <CarouselPrevious className={"left-2 rounded-2xl! outline-0"} />
        <CarouselNext className={"right-2 rounded-2xl! outline-0"} />
      </Carousel>

      <section className='mt-10 bg-neutral-100 px-4 sm:flex-none sm:ps-5 md:flex md:p-5'>
        <p className='pr-10 text-xl font-bold uppercase md:w-1/4 md:content-center md:text-4xl lg:px-12'>{t('review_product')}</p>
        <div className='content-center md:w-3/4'>
          <span className='mb-0 flex items-center text-3xl font-bold md:text-8xl'>
            <span className={"mr-2"}>{data?.data.review.ratingValue}</span>
            <Rate
              className={"fill-orange-400 stroke-orange-400 md:size-8! lg:size-12!"}
              defaultValue={data?.data.review.ratingValue}
              disabled={true}
              allowHalf={true}
            />
          </span>
          <p className='fw-bold text-sm text-gray-500 md:mb-10'>
            {t("based_on")} <span className='text-gray-800'>{data?.data.review.reviewCount}</span> {t("from_customer")}
          </p>
        </div>
      </section>
      <section className='relative flex flex-wrap bg-neutral-100 p-5 pt-0'>
        <div className='w-full max-md:hidden md:flex-none lg:w-1/4 lg:px-5 xl:px-12'>
          <Input className={"my-4 rounded-2xl bg-white max-md:visible"} placeholder={t("search_review_placeholder")} />

          <p className='fw-bold mb-1 text-sm text-gray-600'>{t("rating_classification")}</p>
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
            <span className=''>{t("rating_classification_description")}</span>
          </div>

          <p className='fw-bold mb-1 text-sm text-gray-600'>{t("filter_feedback")}</p>
          <RadioGroup>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem
                className={"size-5 rounded-sm! bg-white"}
                value='res'
                id='res'
                children={<Square className='absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 fill-blue-800' />}
              />
              <Label className={"ml-1 text-gray-600"} htmlFor='res'>
                {t("feedback_received")}
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
                {t("feedback_has_image_only")}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className='mt-5 w-full sm:mt-10 md:shrink lg:w-3/4'>
          <div className='flex items-end justify-between'>
            <p className='fw-bold text-sm text-gray-500'>
              {t("show_reviews")} <span className='text-gray-800'>1-10</span>
            </p>
            <Select>
              <SelectTrigger className='w-60 rounded-2xl! bg-white text-center text-sm!'>
                <SelectValue placeholder='Sắp xếp' />
              </SelectTrigger>
              <SelectContent className={"bg-white text-sm"}>
                <SelectItem value='z2a'>={t("rating_high_to_low")}</SelectItem>
                <SelectItem value='a2z'>{t("rating_low_to_high")}</SelectItem>
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
      </section>

      <p className={"mt-10 py-3 text-center font-bold uppercase sm:text-xl md:text-4xl"}>{t("products_you_viewed")}</p>
      <Carousel className='w-full px-0 lg:px-5 xl:px-10'>
        <CarouselContent>
          {/*{products.map((card, index) => (*/}
          {/*	<CarouselItem className={"basis-1/2 md:basis-1/4"} key={index}>*/}
          {/*		<CardProduct {...card} />*/}
          {/*	</CarouselItem>*/}
          {/*))}*/}
        </CarouselContent>
        <CarouselPrevious className={"left-2 rounded-2xl! outline-0"} />
        <CarouselNext className={"right-2 rounded-2xl! outline-0"} />
      </Carousel>

      <article
        className={`fixed top-0 z-50 w-full -translate-y-full overflow-hidden border-gray-200 bg-white opacity-1 transition-all duration-900 ease-in-out ${isVisible ? "lg:h-auto lg:translate-y-0 lg:opacity-100" : "-translate-y-full overflow-hidden opacity-0"}`}>
        <div className='flex'>
          <section className='flex border-r-1'>
            <img src={RESOURCE_IMAGE + data?.data.images[0].src} alt={`${variant?.title}`} className='w-16 object-cover' />
            <div className='p-4'>
              <span className='flex flex-wrap gap-1'>
                <Rate className={"fill-black stroke-black"} defaultValue={3.5} allowHalf disabled />
                <p className='col-span-2 text-xs xl:text-sm'>
                  <span className="pe-2 before:content-['|']"> {data?.data.review?.reviewCount}</span>
                  <span className="before:content-['|']"> Đã bán (web): {data?.data.display_order}</span>
                </p>
              </span>
              <span className='flex flex-wrap items-center gap-4 font-bold'>
                <p className={"text-lg xl:text-xl"}>
                  {formatCurrency(
                    data?.data.discount && variant ? variant.regular_price * (1 - data?.data.discount.percent / 100) : (variant?.regular_price as number),
                  )}
                </p>
                {data?.data.discount && <Badge className='rounded-lg bg-blue-700 text-sm text-white'>-{data?.data.discount.percent}%</Badge>}
                {data?.data.discount && <span className='text-sm text-gray-400 line-through'>{variant?.regular_price}</span>}
              </span>
            </div>
          </section>

          <section className='border-r-1 border-gray-200'>
            <div className='p-2'>
              <p className='mb-3 text-sm'>
                <span>{t("color")}:</span>
                <span className={"font-bold"}> {colorSelected}</span>
              </p>
              <SameRadioGroup onValueChange={setColorSelected} className='flex flex-wrap gap-4'>
                {data &&
                  data?.data.options
                    .find((option) => option.type === OptionType.COLOR)
                    ?.values?.map((color, index) => (
                      <SameRadioGroupItem
                        className={"cursor-pointer rounded-sm bg-black px-6 py-4"}
                        value={color}
                        key={index}
                        style={{
                          backgroundImage: imagesColor ? `url("${RESOURCE_IMAGE + imagesColor[index]?.src}")` : ``,
                          objectFit: "fill",
                          backgroundSize: "auto",
                          backgroundPosition: "center",
                        }}
                        checked={color === colorSelected}>
                        <span className='rounded-xs px-6 py-4 outline-2 outline-offset-2 outline-blue-700'></span>
                      </SameRadioGroupItem>
                    ))}
              </SameRadioGroup>
            </div>
          </section>

          <section className='flex-none border-r-1 border-gray-200'>
            <div className='p-2'>
              <p className='mb-3 text-sm'>
                <span>{t("size")}:</span>
                <span className={"font-bold"}>{sizeSelected ?? ""}</span>
                {sizeSelected && (
                  <span>
                    ({getSizeSuggestion(sizeSelected)?.heightRange.min}cm - {getSizeSuggestion(sizeSelected)?.heightRange.max}cm |
                    {getSizeSuggestion(sizeSelected)?.weightRange.min}kg - {getSizeSuggestion(sizeSelected)?.weightRange.max}kg)
                  </span>
                )}
              </p>
              <SameRadioGroup onValueChange={setSizeSelected} className='flex flex-wrap gap-4'>
                {data &&
                  data?.data.options
                    .find((option) => option.type === OptionType.SIZE)
                    ?.values?.map((size, index) => {
                      return (
                        <HoverCard key={index} openDelay={50} closeDelay={100}>
                          <HoverCardTrigger className={"relative"}>
                            <div className={"h-10 w-12 place-content-center rounded-sm bg-gray-200 text-center uppercase"}>
                              <span>{size}</span>
                            </div>
                            <SameRadioGroupItem className={"absolute top-0 h-10 w-12 cursor-pointer rounded-sm"} value={size} checked={sizeSelected === size}>
                              <span className='h-10 w-12 place-content-center rounded-sm bg-black text-center text-white uppercase'>{size}</span>
                            </SameRadioGroupItem>
                          </HoverCardTrigger>
                          <HoverCardContent className={"w-auto p-2"}>
                            <div className=''>
                              <p>
                                {getSizeSuggestion(size)?.heightRange.min}cm - {getSizeSuggestion(size)?.heightRange.max}cm
                              </p>
                              <p>
                                {getSizeSuggestion(size)?.weightRange.min}kg - {getSizeSuggestion(size)?.weightRange.max}kg
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      );
                    })}
              </SameRadioGroup>
            </div>
          </section>

          <section className='flex grow items-center px-2'>
            <Input onChange={handleQuantityChange} value={boughtQuantity} className={"me-3! w-1/4 rounded-2xl! text-center"} type={"number"} min={1} />
            <Button className={"flex w-3/4 cursor-pointer items-center rounded-2xl text-center hover:bg-neutral-300 hover:text-black"} variant='default'>
              <ShoppingBag className={"mx-2 inline-block size-6"} />
              <span>{sizeSelected ? t("add_to_cart") : t("choose_size")}</span>
            </Button>
          </section>
        </div>
      </article>
    </main>
  );
}
