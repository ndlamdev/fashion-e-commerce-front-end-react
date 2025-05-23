/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:21 AM - 18/05/2025
 * User: kimin
 **/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItemType from "@/types/CartItemType.ts";
import PaymentEnum from "@/utils/enums/payment.enum.ts";
import VoucherType from "@/types/VoucherType.ts";
import { InfoCustomerCreateOrder } from "@/domain/resquest/createOrder.request.ts";

type CartSliceState = {
	items: CartItemType[];
	payment?: PaymentEnum;
	voucher?: VoucherType;
	showConfirm: boolean;
	infoCustomerCreateOrder?: InfoCustomerCreateOrder;
	trigger: number;
};

const initialState: CartSliceState = {
	items: [],
	payment: "CASH",
	showConfirm: false,
	trigger: 0,
};

export const cartSlice = createSlice({
	name: "cart-slice",
	initialState,
	reducerPath: "cart-slice",
	reducers: {
		selectItems: (state, action: PayloadAction<CartItemType>) => {
			const { payload } = action;
			state.items.push(payload);
		},
		unselectItems: (state, action: PayloadAction<CartItemType>) => {
			const { payload } = action;
			state.items = state.items.filter((item) => item.id !== payload.id);
		},
		setPayment: (state, action: PayloadAction<PaymentEnum>) => {
			const { payload } = action;
			state.payment = payload;
		},
		setVoucher: (state, action: PayloadAction<VoucherType | undefined>) => {
			const { payload } = action;
			state.voucher = payload;
		},
		setShowConfirm: (state, action: PayloadAction<boolean>) => {
			const { payload } = action;
			state.showConfirm = payload;
		},
		updateInfoCustomerCreateOrder: (state, action: PayloadAction<InfoCustomerCreateOrder>) => {
			const { payload } = action;
			state.infoCustomerCreateOrder = { ...payload };
		},
		createOrder: (state) => {
			state.trigger = state.trigger + 1;
		},
		updateCartItemSelected: (state, action: PayloadAction<{ cartItemId: number; quantity: number }>) => {
			const {
				payload: { cartItemId, quantity },
			} = action;
			state.items = state.items.map((item) => {
				if (item.id !== cartItemId) return item;
				return {
					...item,
					quantity: quantity,
				};
			});
		},
	},
});

export const { selectItems, unselectItems, setPayment, setVoucher, setShowConfirm, updateInfoCustomerCreateOrder, createOrder, updateCartItemSelected } =
	cartSlice.actions;

export default cartSlice.reducer;
