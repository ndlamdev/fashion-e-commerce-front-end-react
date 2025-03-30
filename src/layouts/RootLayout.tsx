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
import Footer from "@/components/footer/Footer.tsx";
import { Outlet } from "react-router";

function RootLayout() {
	const [showVerticalMenu, setShowVerticalMenu] = useState<boolean>(false);
	const [showVerticalMenuComplete, setShowVerticalMenuComplete] = useState<boolean>(false);

	return (
		<div className={"h-full"}>
			<div className={`bg-white ${showVerticalMenuComplete ? "hidden" : "block"} lg:block`}>
				<Header
					showMenu={() => {
						setShowVerticalMenu(true);
					}}
				/>
				<Outlet />
				<Footer />
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
	);
}

export default RootLayout;
