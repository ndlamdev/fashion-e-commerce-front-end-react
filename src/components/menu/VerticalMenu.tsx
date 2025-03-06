/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:51PM - 05/03/2025
 *  User: lam-nguyen
 **/

import { HugeiconsCancel01 } from "@/assets/images/icons/HugeiconsCancel01.tsx";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Motion from "@/assets/config/frame-animation-config.ts";

function VerticalMenu({
	showMenu,
	onHidden,
}: {
	showMenu: boolean;
	onHidden?: () => void;
}) {
	const [hiddenMenu, setHiddenMenu] = useState<boolean>(true);

	useEffect(() => {
		if (showMenu) {
			setHiddenMenu(false);
			return;
		}
		setHiddenMenu(true);
	}, [showMenu]);

	return (
		<div>
			<AnimatePresence initial={false} onExitComplete={onHidden}>
				{!hiddenMenu && (
					<>
						<Motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.4 }}
							exit={{ opacity: 0 }}
							className={
								"absolute top-0 h-[100%] w-[100%] lg:hidden bg-black opacity-40"
							}
						/>
						<div className={"absolute flex top-0 h-[100%] w-[100%] lg:hidden"}>
							<Motion.div
								animate={{ left: 0 }}
								initial={{ left: -800 }}
								transition={{ duration: 0.75 }}
								exit={{ left: -800 }}
								className={
									"relative top-0 bg-white h-[100%] md:w-[500px] w-[90%] lg:hidden"
								}
							>
								<div></div>
							</Motion.div>
							<Motion.div
								initial={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className={"h-[100%] w-[10%] flex items-center"}
							>
								<HugeiconsCancel01
									className={"p-2 cursor-pointer"}
									onClick={() => setHiddenMenu(true)}
									color={"white"}
									width={60}
									height={60}
								/>
							</Motion.div>
						</div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}

export default VerticalMenu;
