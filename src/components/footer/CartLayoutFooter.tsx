/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:45PM - 13/03/2025
 * User: lam-nguyen
 **/
import momo from "@/assets/images/icons/momo.png";
import zaloPay from "@/assets/images/icons/zalo-pay.png";
import { LaShippingFast } from "@/assets/images/icons/LaShippingFast";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { PayOs } from "@/assets/images/icons/PayOs.tsx";
import CartHelper from "@/utils/helper/CartHelper.ts";
import { createOrder, setShowConfirm } from "@/redux/slice/cart.slice";
import { toast } from "sonner";
import { useCallback, useEffect } from "react";
import { useCreateOrderMutation } from "@/redux/query/order.query.ts";
import { InfoCustomerCreateOrder, VariantRequestType } from "@/domain/resquest/createOrder.request.ts";
import CartItemType from "@/types/CartItemType.ts";
import { showDialogPayOs } from "@/redux/slice/dialog.slice.ts";

function CartLayoutFooter() {
  const cartItemsSelected = useSelector((state: RootState) => state.cartSlice.items);
  const { user, access_token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { payment, showConfirm } = useSelector((state: RootState) => state.cartSlice);
  const { infoCustomerCreateOrder, items } = useSelector((state: RootState) => state.cartSlice);
  const [createOrderApi, { data }] = useCreateOrderMutation();

  const onSubmit = () => {
    if (!user || !access_token) {
      toast.error("Vui lòng đăng nhập để thanh toán");
      return;
    }

    if (!items.length) {
      toast.error("Vui lòng chọn sản phẩm");
      return;
    }

    dispatch(setShowConfirm(false));
    dispatch(createOrder());
  };

  const callApi = useCallback((info: InfoCustomerCreateOrder, itemsSelected: CartItemType[]) => {
    const items = itemsSelected.map<VariantRequestType>((it) => {
      return {
        variantId: it.variant.id,
        quantity: it.quantity,
      };
    });
    createOrderApi({ ...info, items: items });
  }, [createOrderApi]);

  useEffect(() => {
    if (!infoCustomerCreateOrder) {
      toast.error("Vui lòng nhập thông tin khách hàng");
      return;
    }

    let emptyField = false;
    Object.entries(infoCustomerCreateOrder).forEach(([key, value]) => {
      if (key == "note") return;
      if (!emptyField)
        emptyField = !value || !value.length;
    });
    if (emptyField) return;

    callApi(infoCustomerCreateOrder, items);
  }, [infoCustomerCreateOrder, callApi]);

  useEffect(() => {
    if (!data) return;
    const paymentResponse = data.data.payment_response;
    if (!paymentResponse) {
      toast.info("Đơn hàng đã được tạo thành công, vui lòng kiểm tra lại thông tin đơn hàng");
      return;
    }

    if (paymentResponse.method === "PAY_OS") {
      const { returnUrl, checkoutUrl } = paymentResponse;
      dispatch(showDialogPayOs({
        RETURN_URL: returnUrl, // required
        CHECKOUT_URL: checkoutUrl, // required
      }));
    }
  }, [data, dispatch]);

  return (
    <div
      className={`fixed bottom-0 z-3 flex w-full flex-col md:flex-row`}
      style={{
        boxShadow: "0px -5px 20px 0px rgba(0,0,0,0.1)",
      }}>
      <ul className={`${showConfirm ? "flex" : "hidden"} size-full h-25 items-center justify-center bg-blue-50 md:flex`}>
        <li className={`${payment === "CASH" ? "block" : "hidden"}`}>
          <div className="flex flex-col items-center gap-4 px-3 lg:flex-row">
            <LaShippingFast width={40} height={40} />
            <p className={"text-center text-gray-700"}>Thanh toán khi nhận hàng</p>
          </div>
        </li>
        <li className={`${payment === "MOMO" ? "block" : "hidden"}`}>
          <div className="flex flex-col items-center gap-4 px-3 lg:flex-row">
            <img src={momo} alt={"momo.png"} className={"h-13 w-13"} />
            <p className={"text-center text-gray-700"}>Thanh toán qua ví Momo</p>
          </div>
        </li>
        <li className={`${payment === "ZALO_PAY" ? "block" : "hidden"}`}>
          <div className="flex flex-col items-center gap-4 px-3 lg:flex-row">
            <img src={zaloPay} alt={"zalo-pay.png"} className={"h-13 w-13 rounded-[0.5rem]"} />
            <p className={"text-center text-gray-700"}>Thanh toán qua ZaloPay</p>
          </div>
        </li>
        <li className={`${payment === "PAY_OS" ? "block" : "hidden"}`}>
          <div className="flex flex-col items-center gap-4 px-3 lg:flex-row">
            <PayOs className={"h-13 w-13 rounded-[0.5rem]"} />
            <p className={"text-center text-gray-700"}>Thanh toán qua PayOs</p>
          </div>
        </li>
      </ul>
      <div className={"flex size-full h-25 items-center justify-between gap-2 bg-white px-5 sm:col-span-2 sm:justify-end"}>
        <div className={"text-start sm:text-end"}>
          <p className={"text-[0.9rem]"}>
            Thành tiền <span className={"text-[1.3rem] font-bold text-blue-700"}>{formatCurrency(CartHelper.totalRegularPrice(cartItemsSelected))}</span>
          </p>
          <p className={"text-[0.9rem] text-gray-600"}>
            Tiết kiệm {formatCurrency(CartHelper.totalComparePrice(cartItemsSelected) - CartHelper.totalRegularPrice(cartItemsSelected))}
          </p>
        </div>
        <button
          className={`${showConfirm ? "hidden" : "flex"} items-center rounded-full bg-black px-4 py-2 text-white md:hidden md:px-10 md:py-4`}
          onClick={() => dispatch(setShowConfirm(true))}>
          Thanh toán
          <ArrowRight color={"white"} />
        </button>
        <button
          className={`${showConfirm ? "block" : "hidden"} rounded-full bg-black px-4 py-2 text-white transition-all duration-200 active:bg-gray-500 md:block md:px-10 md:py-4`}
          onClick={onSubmit}>
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default CartLayoutFooter;
