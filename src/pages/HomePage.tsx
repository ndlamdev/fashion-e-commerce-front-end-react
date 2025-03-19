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
import { useRef } from "react";
import { useHorizontalScroll } from "@/utils/useHorizontalScroll";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";


function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  useHorizontalScroll(ref.current);

  return (
    <main className={"w-full flex flex-col justify-center"}>
      <section>
        <Carousel className={"w-full"}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex aspect-[5/3] lg:aspect-[5/2] items-center justify-center p-6 bg-blue-400">
                  <span className="text-4xl font-semibold ">{index + 6}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={"rounded-circle left-3 size-10 bg-gray-200"} />
          <CarouselNext className={"rounded-circle right-3 size-10 bg-gray-200"} />
        </Carousel>
      </section>
      <section className={"px-5 md:px-10 lg:px-15 py-6 md:py-10 lg:py-14 flex flex-col gap-10"}>
        <Tabs defaultValue={"male"}>
          <TabsList className={"h-auto bg-[none] gap-2 md:gap-4 lg:gap-8 mb-5"}>
            <TabsTrigger
              className={"data-[state=active]:bg-black w-32 rounded-4xl text-black font-bold bg-gray-200 data-[state=active]:text-white text-md p-3 data-[state=active]:border-black data-[state=active]:border-b-2 shadow-none"}
              value="male">ĐỒ NAM</TabsTrigger>
            <TabsTrigger
              className={"data-[state=active]:bg-black w-32 rounded-4xl text-black font-bold bg-gray-200 data-[state=active]:text-white text-md p-3 data-[state=active]:border-black data-[state=active]:border-b-2 shadow-none"}
              value="female">ĐỒ NỮ</TabsTrigger>
          </TabsList>
          <TabsContent value={"male"}>
            <div
              ref={ref}
              className={"h-[280px] md:h-[315px] lg:h-[350px] transition-all flex gap-4 overflow-x-scroll scroll-hidden"}>
              <div className={"h-full  flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/ao-thun-cate_86.jpg"
                       alt="ao_thun.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>áo thun</h5>
              </div>
              <div className={"h-full  flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/so-mi-cate_10.jpg"
                       alt="so_mi.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>sơ mi</h5>
              </div>
              <div className={" h-full flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/ao-khoac-cate_16.jpg"
                       alt="ao_khoac.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>áo khoác</h5>
              </div>
              <div className={" h-full flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-dai-cate_24.jpg"
                       alt="quan_dai.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>quần dài</h5>
              </div>
              <div className={" h-full flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-short-cate_36.jpg"
                       alt="quan_short.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>quần short</h5>
              </div>
              <div className={" h-full flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/quan-lot-cate_7.jpg"
                       alt="quan_short.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>quần lót</h5>
              </div>
              <div className={" h-full flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/phu-kien-cate_63.jpg"
                       alt="phu_kien.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>phụ kiện</h5>
              </div>
            </div>
          </TabsContent>
          <TabsContent value={"female"}>
            <div className={"h-[280px] md:h-[315px] lg:h-[350px] transition-all flex md:justify-center gap-4 overflow-x-scroll scroll-hidden md:scroll-show"}>
              <div className={"h-full  flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/Frame_img.jpg"
                       alt="bra_&_leggings.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>bra & leggings</h5>
              </div>
              <div className={" h-full flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/Frame_img_(1).jpg"
                       alt="ao_the_thao.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>áo thể thao</h5>
              </div>
              <div className={" h-full flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image_(3).jpg"
                       alt="quan_the_thao.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>quần thể thao</h5>
              </div>
              <div className={" h-full flex flex-col items-center gap-2"}>
                <Card className={"h-full w-[180px] md:w-[195px] lg:w-[230px] transition-all p-0 overflow-hidden"}>
                  <img className={"hover:scale-[1.1] transition-all"}
                       src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image_96.png"
                       alt="phu_kien.png" />
                </Card>
                <h5 className={"font-bold uppercase"}>phụ hiện</h5>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className={"flex flex-col lg:flex-row gap-10"}>
          <div id={"main-collection"}
               className={"flex-1 aspect-[3/2] rounded-3xl overflow-hidden relative group"}>
            <img src="https://media3.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/February2025/mceclip0_122.jpg"
                 alt="image.png" className={"size absolute top-0 left-0 group-hover:scale-[1.03] duration-200 transition ease-in"} />
            <div className={"absolute top-0 left-0 flex flex-col gap-3 justify-end size-full items-start p-5"}>
              <h3 className={"font-bold uppercase text-white lg:text-3xl text-2xl w-1/2 md:w-1/3 lg:w-1/2"}>man wear collection</h3>
              <p className={"text-white"}>Nhập CM10 Giảm thểm 10% tối đa 100k</p>
              <a href={"#"} className={"uppercase px-8 py-3 bg-white rounded-4xl"}>Mua ngay</a>
            </div>
          </div>
          <div id={"women-collection"}
               className={"flex-1 aspect-[3/2] rounded-3xl overflow-hidden relative group"}>
            <img src="https://media3.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/February2025/mceclip1_37.jpg"
                 alt="image.png" className={"size absolute top-0 left-0 group-hover:scale-[1.03] duration-200 transition ease-in"} />
            <div className={"absolute top-0 left-0 flex flex-col gap-3 justify-end size-full items-start p-5"}>
              <h3 className={"font-bold uppercase text-white lg:text-3xl text-2xl w-2/3 md:w-1/2 lg:w-2/3"}>women active collection</h3>
              <p className={"text-white"}>Nhập CMWMHELLO Giảm thêm 15% tối đa 100K</p>
              <a href={"#"} className={"uppercase px-8 py-3 bg-white rounded-4xl font-light"}>Mua ngay</a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className={"h-[30rem] bg-no-repeat bg-cover w-full flex flex-col items-start justify-end lg:p-14 md:10 p-5 bg-[url('https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/hang-ngay-desk-chung.jpg')]"}>
          <h3 className={"md:text-5xl lg:text-7xl text-4xl text-white font-bold mb-2"}>MẶC HẰNG NGÀY</h3>
          <p className={"text-white"}>Thoải mái, thanh lịch | Nhập CM10 giảm 10% đơn từ 600K</p>
          <a href={"#"} className={"flex text-xl items-center md:py-5 md:px-10 py-2 px-5 bg-white rounded-full gap-2 mt-7"}>
            <span>khám phá ngay</span>
            <ArrowRight />
          </a>
        </div>
        <div className={"px-5 md:px-10 lg:px-15 py-6 md:py-10 lg:py-14"}>
          <h3 className={"font-bold md:text-3xl text-2xl"}>SẢN PHẨM MẶC HẰNG NGÀY</h3>
          <div className={"mt-3"}>
            sản phẩm
          </div>
        </div>
      </section>
      <section>
        <div
          className={"h-[30rem] bg-no-repeat bg-cover w-full flex flex-col items-start justify-end lg:p-14 md:10 p-5 bg-[url('https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/running-desk-chung_23.jpg')]"}>
          <h3 className={"md:text-5xl lg:text-7xl text-4xl text-white font-bold mb-2"}>ĐỒ CHẠY BỘ</h3>
          <p className={"text-white"}>Co giãn, thoáng khí | Mua combo tiết kiệm đến 30%</p>
          <a href={"#"} className={"flex text-xl items-center md:py-5 md:px-10 py-2 px-5 bg-white rounded-full gap-2 mt-7"}>
            <span>khám phá ngay</span>
            <ArrowRight />
          </a>
        </div>
        <div className={"px-5 md:px-10 lg:px-15 py-6 md:py-10 lg:py-14"}>
          <h3 className={"font-bold md:text-3xl text-2xl"}>SẢN PHẨM CHẠY BỘ</h3>
          <div className={"mt-3"}>
            sản phẩm
          </div>
        </div>
      </section>
      <section>
        <a href="#">
          <img className={"px-5 md:px-10 lg:px-15 pb-6 md:pb-10 lg:pb-14 flex"}
               src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/mceclip33.png" alt="image.png" />
        </a>
      </section>
      <section className={"px-5 md:px-10 lg:px-15 py-6 md:py-10 lg:py-14"}>
        <div className={"bg-[#F1F1F1] rounded-2xl lg:p-10 md:p-8 p-5 flex md:flex-row flex-col gap-8 items-center"}>
          <div className={"flex-2/3"}>
            <h3 className={"font-bold md:text-2xl text-xl md:mb-5 mb-3"}>ĐẶC QUYỀN DÀNH CHO 363,688 THÀNH VIÊN KIMICLUB</h3>
            <div className={"gap-3 flex md:flex-row flex-col"}>
              <picture className={"w-full"}>
                <source
                  media={"(max-width: 768px)"}
                  srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip15.png"}
                />
                <img src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip18.png"}
                     alt={"image.png"}
                     className={"rounded-2xl flex-1 aspect-[5/3] md:size-full h-15 w-full overflow-hidden"} />
              </picture>
              <picture className={"w-full"}>
                <source
                  media={"(max-width: 768px)"}
                  srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip14.png"} />
                <img src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/mceclip19.png"}
                     alt={"image.png"}
                     className={"rounded-2xl flex-1 aspect-[5/3] overflow-hidden md:size-full h-15 w-full"} />
              </picture>
              <picture className={"w-full"}>
                <source media={"(max-width: 768px)"}
                        srcSet={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/mceclip3_71.png"} />
                <img src={"https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/mceclip2_81.png"}
                     alt={"image.png"}
                     className={"rounded-2xl flex-1 aspect-[5/3] overflow-hidden md:size-full h-15 w-full"} />
              </picture>
            </div>
          </div>
          <div className={"md:block hidden bg-radial from-gray-400 from-10% to-white rounded-l-8xl rounded-r-8xl rounded-b-2xl rounded-t-2xl w-2 h-46"} />
          <div className={"flex-1/3 flex flex-col items-center overflow-hidden w-full"}>
            <h3 className={"font-bold md:text-2xl text-xl text-center md:mb-5 mb-3"}>HOẠT ĐỘNG GẦN ĐÂY</h3>
            <div className={"flex flex-col justify-between h-full items-center w-full"}>
              <div className={"flex flex-col justify-around h-full py-3"}>
                <motion.p className={"text-nowrap flex gap-3"}
                          animate={{ x: ["100%", "-100%"] }}
                          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                  < span> Các hoạt động gần đây</span>
                  <span>Các hoạt động gần đây</span>
                  <span>Các hoạt động gần đây</span>
                  <span>Các hoạt động gần đây</span>
                </motion.p>
                <motion.p className={"text-nowrap flex gap-3"}
                          animate={{ x: ["100%", "-100%"] }}
                          transition={{ repeat: Infinity, duration: 10, ease: "linear", delay: 2 }}
                >
                  <span>Các hoạt động gần đây</span>
                  <span>Các hoạt động gần đây</span>
                  <span>Các hoạt động gần đây</span>
                  <span>Các hoạt động gần đây</span>
                </motion.p>
              </div>
              <a href={"#"} className={"flex items-center flex-nowrap lg:flex-row md:flex-col flex-row text-white bg-black rounded-full py-3 px-5"}>
                <span className={"text-wrap text-center"}>GIA NHẬP COOLCLUB NGAY</span>
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
    ;
}

export default HomePage;