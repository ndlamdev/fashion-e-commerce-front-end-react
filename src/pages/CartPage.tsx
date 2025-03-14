/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:41AM - 13/03/2025
 *  User: lam-nguyen
 **/

import { useContext, useState } from "react";
import { useHorizontalScroll } from "@/utils/use-horizontal-scroll.ts";
import InformationCustomer from "@/components/cart/InformationCustomer.tsx";
import { CartContext } from "@/context/CartContext";
import { dataVouchers } from "@/assets/data/vouchers.ts";
import Voucher from "@/components/cart/Voucher";
import { Separator } from "@/components/ui/separator.tsx";
import { formatCurrency } from "@/utils/format-data.ts";
import CartItem from "@/components/cart/CartItem.tsx";
import dataCartItems from "@/assets/data/cart-items.ts";

function CartPage() {
  const [voucherRef, setVoucherRef] = useState<HTMLElement | null>(null);
  const { voucher, setVoucher } = useContext(CartContext);
  useHorizontalScroll(voucherRef);

  return (
    <main
      className={"lg:px-20 px-5 gap-10 pb-40 overflow-hidden grid lg:grid-cols-7 lg:grid-rows-1 grid-rows-subgrid grid-cols-1 mt-10"}>
      <div id={"left"} className={"lg:col-span-4 order-2 lg:order-1 md:block hidden"}>
        <InformationCustomer />
      </div>
      <div id={"right"} className={"lg:col-span-3 order-1 lg:order-2"}>
        <h1 className={"font-[600] text-3xl mb-5"}>Giỏ hàng</h1>
        <div className={"mt-5"}>
          <div className={"text-gray-400 uppercase text-[0.8rem] flex"}>
            <div className={"flex gap-2 sm:basis-8/12 basis-full"}>
              <div className={"flex gap-3 items-center"}>
                <input type="checkbox" className={"w-5 h-5"} />
                <p>tất cả sản phẩm</p>
              </div>
              <p>|</p>
              <p className={"p-0 m-0 cursor-pointer"}>xoa tất cả</p>
            </div>
            <div className={"basis-3/12 hidden sm:block"}>số lượng</div>
            <div className={"basis-1/12 hidden sm:block"}>giá</div>
          </div>
          <ul>
            {dataCartItems.map((it) => (
              <li>
                <CartItem {...it} />
              </li>
            ))}
          </ul>
          {/*<p className={"text-center"}>Giỏ hàng của bạn hiện đang trống.</p>*/}
        </div>
        <div className={"flex flex-col"}>
          <div
            className={"flex gap-7 overflow-x-scroll flex-nowrap scroll-show pb-1 mt-8"}
            ref={(ref) => {
              setVoucherRef(ref);
            }}>
            {dataVouchers.map((it) => (
              <Voucher {...it} key={it.code} onClick={() => setVoucher(it)} selected={it.code === voucher?.code} />
            ))}
          </div>
          <div className={"mt-4 w-full"}>
            {voucher && (
              <p className={"cursor-pointer hover:text-red-600 text-[0.9rem]"} onClick={() => setVoucher(undefined)}>
                Xóa mã giảm giá <strong>{voucher.code}</strong>
              </p>
            )}
            <div className={"flex gap-x-5 gap-y-2 sm:items-center sm:flex-row flex-col"}>
              <input
                className={"grow outline-none border-1 bg-gray-200 rounded-full px-4 py-2"}
                placeholder={"Nhập mã giảm giá"}
                value={voucher ? voucher.code : ""}
              />
              <button className={"px-5 py-2 rounded-4xl bg-black text-white hover:bg-gray-300 hover:text-black"}>Áp dụng voucher</button>
            </div>
            {voucher && <p className={"text-green-600 text-[0.9rem]"}>Mã giảm giá đã được áp dụng</p>}
          </div>
        </div>
        <Separator className={"my-5"} />
        <div className={"flex gap-4 flex-col text-[0.9rem]"}>
          <div className={"flex justify-between w-full"}>
            <p>Tạm tính</p>
            <p>{formatCurrency(0)}</p>
          </div>
          <div className={"flex justify-between w-full"}>
            <p>Giảm giá</p>
            <p>{formatCurrency(0)}</p>
          </div>
          <div className={"flex justify-between w-full"}>
            <p>Phí giao hàng</p>
            <p>{formatCurrency(0)}</p>
          </div>
        </div>
        <Separator className={"my-5"} />
        <div className={"flex justify-between w-full text-[1.1rem]"}>
          <p>Tổng</p>
          <strong>{formatCurrency(0)}</strong>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
