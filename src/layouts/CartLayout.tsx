/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:30PM - 07/03/2025
 *  User: lam-nguyen
 **/

import "@/assets/css/App.css";
import Header from "@/components/header/Header.tsx";
import { useState } from "react";
import VerticalMenu from "@/components/menu/VerticalMenu.tsx";
import { Outlet } from "react-router";
import CartLayoutFooter from "@/components/footer/CartLayoutFooter.tsx";
import { CartContext } from "../context/CartContext.tsx";
import VoucherType from "@/types/VoucherType.ts";

export type Payment = "cash" | "zalo-pay" | "vn-pay" | "momo";

function CartLayout() {
	const [showVerticalMenu, setShowVerticalMenu] = useState<boolean>(false);
	const [showVerticalMenuComplete, setShowVerticalMenuComplete] = useState<boolean>(false);
	const [payment, setPayment] = useState<Payment>("cash");
	const [voucher, setVoucher] = useState<VoucherType>();

	return (
		<CartContext
			value={{
				payment: payment,
				setPayment: setPayment,
				voucher: voucher,
				setVoucher: setVoucher,
			}}>
			<div className={"h-full scroll-hidden"}>
				<div className={`bg-white ${showVerticalMenuComplete ? "hidden" : "block"} lg:block`}>
					<Header
						showMenu={() => {
							setShowVerticalMenu(true);
						}}
					/>
					<Outlet />
					<CartLayoutFooter />
				</div>
				<VerticalMenu
					showMenu={showVerticalMenu}
					onAnimationComplete={() => setShowVerticalMenuComplete(true)}
					onHidden={() => {
						setShowVerticalMenu(false);
						setShowVerticalMenuComplete(false);
					}}
				/>
			</div>
		</CartContext>
	);
}

export default CartLayout;
