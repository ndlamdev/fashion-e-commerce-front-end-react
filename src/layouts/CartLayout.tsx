/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:30PM - 07/03/2025
 *  User: lam-nguyen
 **/

import Header from "@/components/header/Header.tsx";
import { useState } from "react";
import VerticalMenu from "@/components/menu/VerticalMenu.tsx";
import { Outlet } from "react-router";
import CartLayoutFooter from "@/components/footer/CartLayoutFooter.tsx";
import { CartContext } from "../context/CartContext.tsx";
import VoucherType from "@/types/voucher.type.ts";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet.tsx";
import { Button } from "@/components/ui/button.tsx";

export type Payment = "cash" | "zalo-pay" | "vn-pay" | "momo";

function CartLayout() {
	const [showVerticalMenu, setShowVerticalMenu] = useState<boolean>(false);
	const [showVerticalMenuComplete, setShowVerticalMenuComplete] = useState<boolean>(false);
	const [payment, setPayment] = useState<Payment>("cash");
	const [voucher, setVoucher] = useState<VoucherType>();
	const [showConfirm, setShowConfirm] = useState(false);

	return (
		<CartContext
			value={{
				payment: payment,
				setPayment: setPayment,
				voucher: voucher,
				setVoucher: setVoucher,
				showConfirm: showConfirm,
				setShowConfirm: setShowConfirm,
			}}>
			<Sheet>
				<div className={"scroll-hidden h-full"}>
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
				<SheetContent side={"bottom"}>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
					</SheetHeader>
					<div className='grid gap-4 py-4'>Hello</div>
					<SheetFooter>
						<SheetClose asChild>
							<Button type='submit'>Save changes</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</CartContext>
	);
}

export default CartLayout;
