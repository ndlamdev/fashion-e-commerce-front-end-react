import { createContext } from "react";
import { Payment } from "@/layouts/CartLayout.tsx";
import VoucherType from "@/types/VoucherType.ts";

export const CartContext = createContext<{
	setPayment: (payment: Payment) => void;
	payment: Payment;
	setVoucher: (voucher?: VoucherType) => void;
	voucher?: VoucherType;
	showConfirm: boolean;
	setShowConfirm: (showConfirm: boolean) => void;
}>({
	payment: "cash",
	setPayment: (_: Payment) => {},
	voucher: undefined,
	setVoucher: () => {},
	showConfirm: false,
	setShowConfirm: () => {},
});
