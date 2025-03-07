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

function Header({ showMenu }: { showMenu: () => void }) {
  return (
    <div>
      <div
        className={"grid grid-cols-3 grid-rows-1 align-items-center py-3 px-4"}>
        <div className={" flex align-items-center gap-3"}>
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
    </div>
  );
}

export default Header;
