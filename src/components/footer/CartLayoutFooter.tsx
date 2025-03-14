/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:45PM - 13/03/2025
 * User: lam-nguyen
 **/
import { useContext } from "react";
import { CartContext } from "@/context/CartContext.tsx";
import momo from "@/assets/images/icons/momo.png";
import zaloPay from "@/assets/images/icons/zalo-pay.png";
import { LaShippingFast } from "@/assets/images/icons/LaShippingFast";
import vnPay from "@/assets/images/icons/vn-pay.png";
import { formatCurrency } from "@/utils/format-data.ts";

function CartLayoutFooter() {
  const { payment } = useContext(CartContext);

  return (
    <div
      className={"fixed bottom-0 h-25 w-full grid grid-cols-4 grid-rows-1 z-3"}
      style={{
        boxShadow: "0px -5px 20px 0px rgba(0,0,0,0.1)",
      }}>
      <div className={"col-span-2 bg-blue-50 h-full sm:block hidden"}>
        <ul className={"h-full flex items-center justify-center"}>
          <li className={`${payment === "cash" ? "block" : "hidden"}`}>
            <div className="flex items-center gap-4 lg:flex-row flex-col px-3">
              <LaShippingFast width={40} height={40} />
              <p className={"text-gray-700 text-center"}>Thanh toán khi nhận hàng</p>
            </div>
          </li>
          <li className={`${payment === "momo" ? "block" : "hidden"}`}>
            <div className="flex items-center gap-4 lg:flex-row flex-col  px-3">
              <img src={momo} alt={"momo.png"} className={"w-13 h-13"} />
              <p className={"text-gray-700  text-center"}>Thanh toán qua ví Momo</p>
            </div>
          </li>
          <li className={`${payment === "zalo-pay" ? "block" : "hidden"}`}>
            <div className="flex items-center gap-4 lg:flex-row flex-col  px-3">
              <img src={zaloPay} alt={"zalo-pay.png"} className={"w-13 h-13 rounded-[0.5rem]"} />
              <p className={"text-gray-700  text-center"}>Thanh toán qua ZaloPay</p>
            </div>
          </li>
          <li className={`${payment === "vn-pay" ? "block" : "hidden"}`}>
            <div className="flex items-center gap-4 lg:flex-row flex-col  px-3">
              <img src={vnPay} alt={"vn-pay.png"} className={"w-13 h-13 rounded-[0.5rem]"} />
              <p className={"text-gray-700  text-center"}>Thanh toán qua VnPay</p>
            </div>
          </li>
        </ul>
      </div>
      <div className={"sm:col-span-2 col-span-4 bg-white h-full flex items-center gap-2 sm:justify-end justify-between px-5"}>
        <div className={"text-start sm:text-end"}>
          <p className={"text-[0.9rem]"}>
            Thành tiền <span className={"text-blue-700 text-[1.3rem] font-bold"}>{formatCurrency(0)}</span>
          </p>
          <p className={"text-[0.9rem] text-gray-600"}>Tiết kiệm {formatCurrency(0)}</p>
        </div>
        <button className={" text-white bg-gray-300 rounded-full px-4 py-2 md:py-4 md:px-10"}>Thanh toán</button>
      </div>
    </div>
  );
}

export default CartLayoutFooter;
