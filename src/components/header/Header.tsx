/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:46AM - 05/03/2025
 * User: lam-nguyen
 **/
import { SolarHeartLinear } from "@/assets/images/icons/SolarHeartLinear.tsx";
import { StreamlineShoppingBagHandBag2 } from "@/assets/images/icons/StreamlineShoppingBagHandBag2.tsx";
import { SolarHamburgerMenuLinear } from "@/assets/images/icons/SolarHamburgerMenuLinear.tsx";
import { LucideSearch } from "@/assets/images/icons/LucideSearch.tsx";
import Input from "@/components/form/Input.tsx";
import { SolarUserLinear } from "@/assets/images/icons/SolarUserLinear.tsx";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SolarArrowRightLinear } from "@/assets/images/icons/SolarArrowRightLinear.tsx";

function Header({ showMenu }: { showMenu: () => void }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={"relative"}>
      <motion.div
        initial={{ top: 0 }}
        animate={{ top: scrollY >= 20 ? -40 : 0 }}
        transition={{ duration: 0.75 }}
        className={`relative bg-gray-500 flex w-full items-center justify-center gap-3 text-gray-100`}
      >
        <div className={"hover:bg-gray-800 py-2 px-3 text-sm"}>Về KimiFashion</div>
        <div className={"hidden lg:flex items-center justify-center"}>
          <span className={"text-gray-400"}>|</span>
          <div className={"hover:bg-gray-800 py-2 px-3 text-sm"}>Blog</div>
          <span className={"text-gray-400"}>|</span>
          <div className={"hover:bg-gray-800 py-2 px-3 text-sm "}>Trung tâm CSKH</div>
          <span className={"text-gray-400 "}>|</span>
          <div className={"hover:bg-gray-800 py-2 px-3 text-sm "}>Đăng nhập</div>
        </div>
      </motion.div>
      <div
        className={" grid grid-cols-3 grid-rows-1 align-items-center py-3 px-4"}>
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
          <ul
            className={"hidden lg:flex items-center gap-4 justify-center mb-0"}>
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
            rightIcon={<LucideSearch width={28} height={28} />} />
          <a href={"#"}>
            <SolarUserLinear width={27} height={27} />
          </a>
          <a href={"#"}>
            <SolarHeartLinear width={29} height={29} />
          </a>
          <a href={"#"}>
            <StreamlineShoppingBagHandBag2 width={25} height={25} />
          </a>
        </div>
      </div>
      <motion.div
        initial={{ height: 35 }}
        animate={{ height: scrollY >= 10 ? 0 : 35 }}
        transition={{ duration: 0.75 }}
        className={`bg-gray-700 grid grid-cols-5 lg:grid-cols-3 gap-2 overflow-hidden w-full mb-2 ${scrollY < 10 && "py-1"}`}
      >
        <div className={"overflow-hidden col-start-2 col-span-3 lg:col-start-2 lg:col-span-1"}>
          <motion.div
            className="text-white overflow-hidden text-nowrap w-[400px] "
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            Freeship mọi đơn hàng trong tháng 3 - duy nhất tại website
          </motion.div>
        </div>
        <div className={"text-start"}>
          <SolarArrowRightLinear color={"white"} />
        </div>
      </motion.div>
    </header>
  );
}

export default Header;
