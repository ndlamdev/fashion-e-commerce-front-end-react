import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";
import ZoneOfProducts from "@/components/collection/ZoneOfProducts.tsx";
import sampleProducts from "@/assets/data/product.data.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function BoothPage() {
  const filters: CollectionFilterProps = mockCollectionFilters
  const products = sampleProducts
  return (
    <>
        <div className="flex p-6">
          <div className="w-1/4">
            <CollectionFilter {...filters} />
          </div>
          <div className="w-3/4 p-2">
            <ScrollArea className={'h-dvh'}>
              <ZoneOfProducts currentCategory={'lorem'} showProducts={products} TotalProducts={12}/>
            </ScrollArea>
          </div>
        </div>

      <section className={"px-5 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
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
    </>
  )
}