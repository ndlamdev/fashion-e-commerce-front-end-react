/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:41AM - 13/03/2025
 *  User: lam-nguyen
 **/
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useHorizontalScroll } from "@/utils/helper/use-horizontal-scroll.ts";
import InformationCustomer from "@/components/cart/InformationCustomer.tsx";
import { dataVouchers } from "@/assets/data/vouchers.ts";
import Voucher from "@/components/cart/Voucher";
import { Separator } from "@/components/ui/separator.tsx";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import CartItem from "@/components/cart/CartItem.tsx";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetCartQuery } from "@/redux/api/cart.api";
import cartService from "@/services/cart.service.ts";
import ToastErrorApi from "@/utils/helper/toastErrorApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import {
  selectItems,
  setShowConfirm,
  setVoucher,
  unselectItems,
  updateCartItemSelected,
} from "@/redux/slice/cart.slice.ts";
import CartHelper from "@/utils/helper/CartHelper.ts";
import { useTranslation } from "react-i18next";

function CartPage() {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.cart"
	});
  const [voucherRef, setVoucherRef] = useState<HTMLElement | null>(null);
  useHorizontalScroll(voucherRef);
  const [confirmDeleted, setConfirmDeleted] = useState(false);
  const { data, error } = useGetCartQuery();
  const cartItemsSelected = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { voucher, showConfirm } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    ToastErrorApi.toastErrorApiRTK(error);
  }, [error]);

  const modifyQuantityCartItem = (id: number, quantity: number) => {
    cartService.modifyQuantityCartItem(id, quantity).then((response) => {
      dispatch(updateCartItemSelected(response.data));
    });
  };

  const deleteCartItem = useCallback((id: number) => {
    cartService.deleteCartItem(id).then();
    document.title = "KimiFashion - "+t('cart');
  }, []);

  const checkboxAllHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const check = e.currentTarget.checked;
    if (check) {
      data?.data.cart_items.forEach((it) => {
        dispatch(selectItems(it));
      });
    } else {
      data?.data.cart_items.forEach((it) => {
        dispatch(unselectItems(it));
      });
    }
  };

  const deleteAllProduct = useCallback(() => {
    data?.data.cart_items.forEach((it) => {
      deleteCartItem(it.id);
    });
  }, [data?.data.cart_items, deleteCartItem]);

  return (
    <Dialog open={confirmDeleted} onOpenChange={() => setConfirmDeleted(true)}>
      <div className={"mt-10 grid grid-cols-1 grid-rows-subgrid gap-10 overflow-hidden pb-40 md:grid lg:grid-cols-7 lg:grid-rows-1 lg:px-20"}>
        <div
          id={"left"}
          className={`order-2 w-full bg-white transition-all duration-500 md:block lg:order-1 lg:col-span-4 ${showConfirm ? "block" : "hidden"}`}>
          <div className={"flex items-center justify-between border-b-1 border-gray-300 px-5 pb-10 md:hidden"}>
            <ArrowLeft width={30} height={30} color={"blue"} onClick={() => dispatch(setShowConfirm(false))} />
            <p className={"text-bold text-2xl"}>{t('checkout')}</p>
            <span />
          </div>
          <InformationCustomer />
        </div>
        <div id={"right"} className={`order-1 px-5 md:block lg:order-2 lg:col-span-3 lg:px-0 ${!showConfirm ? "block" : "hidden"}`}>
          <h1 className={"mb-5 text-3xl font-[600]"}>{t('cart')}</h1>
          <div className={"mt-5"}>
            {!data?.data.cart_items.length ? (
              <p className={"text-center"}>{t('empty_cart_message')}</p>
            ) : (
              <>
                <div className={"flex border-b-1 border-gray-300 pb-5 text-[0.8rem] text-gray-400 uppercase"}>
                  <div className={"flex basis-full gap-2 sm:basis-8/12"}>
                    <div className={"flex items-center gap-3"}>
                      <input
                        type='checkbox'
                        className={"h-5 w-5"}
                        onChange={checkboxAllHandler}
                        checked={cartItemsSelected.length === data?.data.cart_items.length}
                      />
                      <p>{t('all_products')}</p>
                    </div>
                    <p>|</p>
                    <DialogTrigger className={"m-0 cursor-pointer p-0 uppercase"}>{t('remove_all')}</DialogTrigger>
                  </div>
                  <div className={"hidden basis-3/12 sm:block"}>{t('quantity')}</div>
                  <div className={"hidden basis-1/12 sm:block"}>{t('price')}</div>
                </div>
                <ul>
                  {data?.data.cart_items.map((it) => (
                    <li key={`cart_item_${it.id}`}>
                      <CartItem
                        selected={!!cartItemsSelected.find((item) => item.id === it.id)}
                        onDelete={(id) => deleteCartItem(id)}
                        onPlus={(id) => modifyQuantityCartItem(id, 1)}
                        onMinute={(id) => modifyQuantityCartItem(id, -1)}
                        onSelect={(value) => {
                          if (value) dispatch(selectItems(it));
                          else dispatch(unselectItems(it));
                        }}
                        {...it}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className={"flex flex-col"}>
            <div
              className={"scroll-show mt-8 flex flex-nowrap gap-7 overflow-x-scroll pb-2"}
              ref={(ref) => {
                setVoucherRef(ref);
              }}>
              {dataVouchers.map((it) => (
                <Voucher {...it} key={it.code} onClick={() => dispatch(setVoucher(it))} selected={it.code === voucher?.code} />
              ))}
            </div>
            <div className={"mt-4 w-full"}>
              {voucher && (
                <p className={"cursor-pointer text-[0.9rem] hover:text-red-600"} onClick={() => dispatch(setVoucher(undefined))}>
									{t('remove_voucher')} <strong>{voucher.code}</strong>
                </p>
              )}
              <div className={"flex flex-col gap-x-5 gap-y-2 sm:flex-row sm:items-center"}>
                <input
                  className={"grow rounded-full border-1 bg-gray-200 px-4 py-2 outline-none"}
                  placeholder={t('enter_voucher')}
                  value={voucher ? voucher.code : ""}
                  onChange={() => { }}
                />
                <button className={"rounded-4xl bg-black px-5 py-2 text-white hover:bg-gray-300 hover:text-black"}>{t('apply_voucher')}</button>
              </div>
              {voucher && <p className={"text-[0.9rem] text-green-600"}>{t('voucher_applied')}</p>}
            </div>
          </div>
          <Separator className={"my-5"} />
          <div className={"flex flex-col gap-4 text-[0.9rem]"}>
            <div className={"flex w-full justify-between"}>
              <p>{t('subTotal')}</p>
              <p>{formatCurrency(CartHelper.totalComparePrice(cartItemsSelected))}</p>
            </div>
            <div className={"flex w-full justify-between"}>
              <p>{t('discount')}</p>
              <p>{formatCurrency(CartHelper.totalComparePrice(cartItemsSelected) - CartHelper.totalRegularPrice(cartItemsSelected))}</p>
            </div>
            <div className={"flex w-full justify-between"}>
              <p>{t('shipping_fee')}</p>
              <p>{formatCurrency(0)}</p>
            </div>
          </div>
          <Separator className={"my-5"} />
          <div className={"flex w-full justify-between text-[1.1rem]"}>
            <p>{t('total')}</p>
            <strong>{formatCurrency(CartHelper.totalRegularPrice(cartItemsSelected))}</strong>
          </div>
        </div>
      </div>
      <DialogContent classIcon={"hidden"}>
        <DialogHeader>
          <DialogTitle className={"text-center text-xl"}>{t('confirm_clear_cart')}</DialogTitle>
          <DialogDescription className={"mt-5 flex w-full gap-5 px-10"}>
            <button className={"w-full rounded-full border-2 border-black py-2 text-lg text-black"} onClick={() => setConfirmDeleted(false)}>
							{t('no')}
            </button>
            <button
              className={"w-full rounded-full bg-black py-2 text-lg text-white"}
              onClick={() => {
                setConfirmDeleted(false);
                deleteAllProduct();
              }}>
							{t('yes')}
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CartPage;
