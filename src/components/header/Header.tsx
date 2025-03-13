/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:46AM - 05/03/2025
 * User: lam-nguyen
 **/
import { SolarHamburgerMenuLinear } from "@/assets/images/icons/SolarHamburgerMenuLinear.tsx";
import { LucideSearch } from "@/assets/images/icons/LucideSearch.tsx";
import Input from "@/components/form/Input.tsx";
import { FaSolidUserAlt } from "@/assets/images/icons/FaSolidUserAlt.tsx";
import { SolarHeartBold } from "@/assets/images/icons/SolarHeartBold.tsx";
import ShoppingBag from "@/components/cart/ShoppingBag.tsx";
import { motion } from "motion/react";
import { SolarArrowRightLinear } from "@/assets/images/icons/SolarArrowRightLinear";
import useScrolled from "@/utils/use-scrolled.ts";
import { useState } from "react";
import { Separator } from "@/components/ui/separator.tsx";
import ShoppingBagItem from "@/components/cart/ShoppingBagItem.tsx";
import dataShoppingBagItems from "@/assets/data/shopping-bag-items.ts";

function Header({ showMenu }: { showMenu: () => void }) {
  const [, scrollY] = useScrolled();
  const [scrollUp, setScrollUp] = useState(false);

  return (
    <motion.header className={"sticky top-0 z-2 bg-white"} initial={{ top: 0 }} animate={{ top: scrollY >= 100 ? -40 : 0 }} transition={{ duration: 0.75 }}>
      <div className={`relative bg-gray-500 flex w-full items-center justify-center gap-3 text-gray-100`}>
        <div className={"hover:bg-gray-800 py-2 px-3 text-sm"}>Về KimiFashion</div>
        <div className={"hidden lg:flex items-center justify-center"}>
          <span className={"text-gray-400"}>|</span>
          <div className={"hover:bg-gray-800 py-2 px-3 text-sm"}>Blog</div>
          <span className={"text-gray-400"}>|</span>
          <div className={"hover:bg-gray-800 py-2 px-3 text-sm "}>Trung tâm CSKH</div>
          <span className={"text-gray-400 "}>|</span>
          <div className={"hover:bg-gray-800 py-2 px-3 text-sm "}>Đăng nhập</div>
        </div>
      </div>
      <div className={" grid grid-cols-3 grid-rows-1 align-items-center py-1 px-4 lg:mx-16"}>
        <div className={"flex items-center gap-3"}>
          <div onClick={showMenu} className={"lg:hidden"}>
            <SolarHamburgerMenuLinear width={30} height={30} />
          </div>

          <div className={"hidden lg:block"}>
            <div className={"flex size-18 items-center justify-center bg-blue-400"}>Logo</div>
          </div>
          <LucideSearch className={"lg:hidden block"} width={30} height={30} />
        </div>
        <div className="flex justify-center">
          <div className={"lg:hidden block"}>
            <div className={"flex size-[60px] items-center justify-center bg-blue-400"}>Logo</div>
          </div>
          <ul className={"hidden lg:flex items-center gap-4 justify-center mb-0"}>
            <li className={"text-lg font-medium"}>Menu 1</li>
            <li className={"text-lg font-medium"}>Menu 2</li>
            <li className={"text-lg font-medium"}>Menu 3</li>
            <li className={"text-lg font-medium"}>Menu 4</li>
          </ul>
        </div>
        <div className={"lg: flex justify-end gap-3 items-center"}>
          <Input
            className={"hidden  items-center lg:flex p-2 w-[50%] border-1 border-gray-500 hover:border-black  rounded-4xl rounded]"}
            placeholder={"Tìm kiếm sản phẩm..."}
            inputClassName={"p-1 text-sm"}
            rightIcon={<LucideSearch width={28} height={28} />}
          />
          <a href={"#"}>
            <FaSolidUserAlt width={24} height={24} />
          </a>
          <a href={"#"}>
            <SolarHeartBold width={29} height={29} />
          </a>
          <div className={"relative group"}>
            <a href={"#"}>
              <ShoppingBag countItem={dataShoppingBagItems.length} />
            </a>
            <div className={"absolute top-0 right-0 hidden group-hover:lg:block w-[25rem] z-2"}>
              <div className={"relative top-16 right-0 bg-white rounded-2xl max-h-[27rem]  p-4 overflow-y-scroll"}>
                {dataShoppingBagItems.length ? (
                  <div className={"h-full overflow-auto"}>
                    <div className={"flex justify-between"}>
                      <p>{dataShoppingBagItems.length} sản phẩm</p>
                      <a href={"#"} className={"text-blue-500"}>
                        Xem tất cả
                      </a>
                    </div>
                    <Separator className={"my-2"} />
                    <ul className={"flex flex-col justify-between h-full"}>
                      {dataShoppingBagItems.map((value, index) => (
                        <ShoppingBagItem {...value} key={`asdfafdas${index}`} />
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className={"text-center"}>Giỏ hàng chưa có gì :(, chọn mua đồ bạn nhé</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ height: 35 }}
        animate={{ height: scrollY >= 10 ? 0 : 35 }}
        transition={{ duration: 0.75 }}
        onUpdate={(latest) => {
          if (scrollUp) window.scrollTo({ top: window.scrollY - (latest as { height: number }).height - 5 });
        }}
        onAnimationStart={(value) => setScrollUp((value as { height: number }).height != 0)}
        className={`bg-gray-700 grid grid-cols-5 lg:grid-cols-3 gap-2 overflow-hidden w-full mb-2 ${scrollY < 10 && "py-1"}`}>
        <div className={"overflow-hidden col-start-2 col-span-3 lg:col-start-2 lg:col-span-1"}>
          <motion.div
            className="text-white overflow-hidden text-nowrap w-[400px] "
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
            Freeship mọi đơn hàng trong tháng 3 - duy nhất tại website
          </motion.div>
        </div>
        <div className={"text-start"}>
          <SolarArrowRightLinear color={"white"} />
        </div>
      </motion.div>
    </motion.header>
  );
}

export default Header;
