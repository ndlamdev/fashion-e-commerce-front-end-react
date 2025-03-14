/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:19PM - 13/03/2025
 *  User: lam-nguyen
 **/
import ShoppingBagItemType from "@/types/ShoppingBagItemType.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { TablerPlus } from "@/assets/images/icons/TablerPlus.tsx";
import { TablerMinus } from "@/assets/images/icons/TablerMinus.tsx";
import { formatCurrency } from "@/utils/format-data.ts";
import { Fa6RegularTrashCan } from "@/assets/images/icons/Fa6RegularTrashCan.tsx";

export type CartItemProps = ShoppingBagItemType & {
  sizes: string[];
  colors: string[];
};

function CartItem({ id, name, image, color, size, amount, colors, sizes, discount, price }: CartItemProps) {
  return (
    <div className={"flex items-center pt-4 pb-10 border-b-1  border-gray-300 gap-3 min-h-55 "}>
      <input type={"checkbox"} className={"w-5 h-5 flex-none"} />
      <img src={image} alt="image.png" className={"rounded-xl w-33 h-full"} />
      <div className={"h-full flex flex-col align-bottom w-full justify-between "}>
        <div>
          <p>{name}</p>
          <p className={"text-sm text-gray-600"}>
            {color} / {size}
          </p>
        </div>
        <div className={"grid sm:grid-rows-1 grid-rows-subgrid sm:grid-cols-2 grid-cols-1 "}>
          <div className={"flex sm:flex-col gap-y-1 gap-x-5 items-end sm:items-start justify-end flex-row flex-wrap"}>
            <Select onValueChange={(_) => {
            }} defaultValue={"Tím"}>
              <SelectTrigger className="border-0 bg-gray-200 text-black outline-none rounded-full px-3 py-0 sm:w-auto">
                <SelectValue className={"text-black"}>Tím</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {colors.map((color, index) => (
                  <SelectItem value={color} key={`${id}_color_${index}`}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(_) => {
            }} defaultValue={"XS"}>
              <SelectTrigger className="border-0 bg-gray-200 text-black outline-none rounded-full px-3 py-0 sm:w-auto">
                <SelectValue className={"text-black"}>XS</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size, index) => (
                  <SelectItem value={color} key={`${id}_size_${index}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button className={"hover:text-red-600 items-center gap-2 text-sm cursor-pointer hidden md:flex"}>
              <Fa6RegularTrashCan width={13} height={13} />
              Xóa
            </button>
          </div>
          <div className={"flex sm:items-center items-end justify-end flex-col sm:flex-row mt-2 md:mt-0 flex-wrap gap-x-2"}>
            <div className={"min-w-20 flex-none flex gap-2 items-center justify-between rounded-full border-1 border-gray-300 overflow-hidden p-2"}>
              <TablerMinus width={15} height={15} className={"cursor-pointer"} />
              <p className={"text-center text-sm"}>{amount}</p>
              <TablerPlus width={15} height={15} className={"cursor-pointer"} />
            </div>
            <div className={"flex md:flex-col justify-end flex-row items-end gap-x-2 flex-wrap sm:mt-0 mt-2"}>
              <p className={"pb-0 mb-0  text-end"}>{formatCurrency(discount ? discount : price)}</p>
              {discount && <p className={"text-sm  line-through text-end text-gray-400"}>{formatCurrency(price)}</p>}
            </div>
          </div>
          <button className={"hover:text-red-600 items-center gap-2 text-sm cursor-pointer flex md:hidden justify-end sm:justify-start mt-2"}>
            <Fa6RegularTrashCan width={13} height={13} />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
