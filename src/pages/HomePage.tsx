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
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useHorizontalScroll } from "@/utils/helper/use-horizontal-scroll.ts";
import RecentActivity from "@/components/collection/RecentActivity.tsx";
import CarouselResource from "@/assets/images/carousel/carousel.resouse";
import { useTranslation } from "react-i18next";

function HomePage() {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useHorizontalScroll(ref);
  const { t } = useTranslation(undefined, {
    keyPrefix: "page.home"
  });

  useEffect(() => {
    console.log(t);
    document.title = t("title");
  }, [t]);

  return (
    <main className={"flex w-full flex-col justify-center"}>
      <section>
        <Carousel className={"w-full"}>
          <CarouselContent>
            {CarouselResource.map((item, index) => (
              <CarouselItem key={index}>
                <img src={item} alt={`Carousel item ${index + 1}`} className='flex aspect-[5/3] items-center justify-center  lg:aspect-[5/2]' />
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
              {t("product_types.male.title")}
            </TabsTrigger>
            <TabsTrigger
              className={
                "text-md w-32 rounded-4xl bg-gray-200 p-3 font-bold text-black shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:bg-black data-[state=active]:text-white"
              }
              value='female'>
              {t("product_types.female.title")}
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
                <h5 className={"font-bold uppercase"}>{t("product_types.male.items.tshirts")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/so-mi-cate_10.jpg'
                    alt='so_mi.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.male.items.shirts")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/ao-khoac-cate_16.jpg'
                    alt='ao_khoac.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.male.items.jackets")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-dai-cate_24.jpg'
                    alt='quan_dai.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.male.items.pants")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-short-cate_36.jpg'
                    alt='quan_short.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.male.items.shorts")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-lot-cate_7.jpg'
                    alt='quan_short.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.male.items.boxers")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/phu-kien-cate_63.jpg'
                    alt='phu_kien.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.male.items.accessories")}</h5>
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
                <h5 className={"font-bold uppercase"}>{t("product_types.female.items.bra_&_leggings")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/Frame_img_(1).jpg'
                    alt='ao_the_thao.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.female.items.sports_top")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image_(3).jpg'
                    alt='quan_the_thao.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.female.items.sports_pants")}</h5>
              </div>
              <div className={"flex h-full flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] overflow-hidden p-0 transition-all md:w-[195px] lg:w-[230px]"}>
                  <img
                    className={"transition-all hover:scale-[1.1]"}
                    src='https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image_96.png'
                    alt='phu_kien.png'
                  />
                </Card>
                <h5 className={"font-bold uppercase"}>{t("product_types.female.items.accessories")}</h5>
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
              <h3 className={"w-1/2 text-2xl font-bold text-white uppercase md:w-1/3 lg:w-1/2 lg:text-3xl"}>{t("collections.male.title")}</h3>
              <p className={"text-white"}>{t("collections.male.code")}</p>
              <a href={"#"} className={"rounded-4xl bg-white px-8 py-3 uppercase"}>
                {t("collections.male.buy_now")}
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
              <h3 className={"w-2/3 text-2xl font-bold text-white uppercase md:w-1/2 lg:w-2/3 lg:text-3xl"}>{t("collections.female.title")}</h3>
              <p className={"text-white"}>{t("collections.female.code")}</p>
              <a href={"#"} className={"rounded-4xl bg-white px-8 py-3 font-light uppercase"}>
                {t("collections.female.buy_now")}
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
          <h3 className={"mb-2 text-4xl font-bold text-white md:text-5xl lg:text-7xl uppercase"}>{t("discover.title")}</h3>
          <p className={"text-white"}>{t("discover.description")}</p>
          <a href={"#"} className={"mt-7 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xl md:px-10 md:py-5"}>
            <span>{t("discover.button")}</span>
            <ArrowRight />
          </a>
        </div>
        <div className={"px-5 py-6 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
          <h3 className={"text-2xl font-bold md:text-3xl uppercase"}>{t("discover.sub_title")}</h3>
          <div className={"mt-3"}></div>
        </div>
      </section>
      <section>
        <div
          className={
            "md:10 flex h-[30rem] w-full flex-col items-start justify-end bg-[url('https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/running-desk-chung_23.jpg')] bg-cover bg-no-repeat p-5 lg:p-14"
          }>
          <h3 className={"mb-2 text-4xl font-bold text-white md:text-5xl lg:text-7xl uppercase"}>{t("running.title")}</h3>
          <p className={"text-white"}>{t("running.description")}</p>
          <a href={"#"} className={"mt-7 flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xl md:px-10 md:py-5"}>
            <span>{t("running.button")}</span>
            <ArrowRight />
          </a>
        </div>
        <div className={"px-5 py-6 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
          <h3 className={"text-2xl font-bold md:text-3xl"}>{t("running.sub_title")}</h3>
          <div className={"mt-3"}></div>
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
        <RecentActivity />
      </section>
    </main>
  );
}

export default HomePage;
