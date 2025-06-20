/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:42 PM - 23/05/2025
 *  User: kimin
 **/
import { cartApi } from "@/redux/api/cart.api";
import { RETURN_URL } from "@/redux/api/order.api.ts";
import { useCancelPaymentMutation } from "@/redux/api/payment.api.ts";
import { usePayOS } from "@payos/payos-checkout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const DialogPayOs = ({
  orderCode,
  orderId,
  checkoutUrl,
  onExit,
  onCancel,
  onSuccess,
}: {
    orderId: number;
    orderCode: number;
    checkoutUrl: string;
    onExit?: (orderId: number, orderCode: number) => void;
    onCancel?: (orderId: number, orderCode: number) => void;
    onSuccess?: (orderId: number, orderCode: number) => void;
}) => {
  const [cancelPayment] = useCancelPaymentMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { open, exit } = usePayOS({
    embedded: false,
    CHECKOUT_URL: checkoutUrl,
    RETURN_URL: RETURN_URL,
    ELEMENT_ID: "pay-os-container",
    onExit: (e) => {
      console.log("onExit", e);
      onExit?.(orderId, orderCode);
    },
    onSuccess: (e) => {
      onSuccess?.(orderId, e.orderCode);
      dispatch(cartApi.util.invalidateTags(["Cart"]))
      navigate("/order/result", {
        state: {
          success: true,
        },
      });
    },
    onCancel: (e) => {
      onCancel?.(orderId, e.orderCode);
      cancelPayment(e.orderCode);
      dispatch(cartApi.util.invalidateTags(["Cart"]))
      navigate("/order/result", {
        state: {
          success: false,
        },
      });
    },
  });

  useEffect(() => {
    open();

    return () => {
      exit();
    };
  }, [open, exit]);

  return <></>;
};

export default DialogPayOs;