/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:42 PM - 23/05/2025
 *  User: kimin
 **/
import { useCancelPaymentMutation } from "@/redux/api/payment.api.ts";
import { useNavigate } from "react-router";
import { usePayOS } from "@payos/payos-checkout";
import { RETURN_URL } from "@/redux/api/order.api.ts";
import { useEffect } from "react";

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
			console.log("onSuccess", e);
			onSuccess?.(orderId, e.orderCode);
			navigate("/order/result", {
				state: {
					success: true,
				},
			});
		},
		onCancel: (e) => {
			console.log("onCancel", e);
			onCancel?.(orderId, e.orderCode);
			cancelPayment(e.orderCode);
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
