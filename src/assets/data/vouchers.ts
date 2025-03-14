/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:07PM - 13/03/2025
 * User: lam-nguyen
 **/
import VoucherType from "@/types/VoucherType.ts";

export const dataVouchers: VoucherType[] = [
	{
		code: "CM05",
		detail: "Giảm 5% đơn từ 300K (giảm tối đa 50K, trừ Outlet, Mix & Match)",
		expiryDate: new Date("2025-03-31"),
		remaining: 175,
		condition: {
			minPrice: 300,
		},
		maxDiscount: 50,
		percentDiscount: 5,
	},
	{
		code: "CM06",
		detail: "Giảm 5% đơn từ 300K (giảm tối đa 50K, trừ Outlet, Mix & Match)",
		expiryDate: new Date("2025-03-31"),
		remaining: 175,
		condition: {
			minPrice: 300,
		},
		maxDiscount: 50,
		percentDiscount: 5,
	},
	{
		code: "CM07",
		detail: "Giảm 5% đơn từ 300K (giảm tối đa 50K, trừ Outlet, Mix & Match)",
		expiryDate: new Date("2025-03-31"),
		remaining: 175,
		condition: {
			minPrice: 300,
		},
		maxDiscount: 50,
		percentDiscount: 5,
	},
];
