/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:46AM - 05/03/2025
 * User: lam-nguyen
 **/
import { SolarHamburgerMenuLinear } from "@/assets/images/icons/SolarHamburgerMenuLinear.tsx";
import { LucideSearch } from "@/assets/images/icons/LucideSearch.tsx";
import Input from "@/components/form/Input.tsx";
import { SolarHeartBold } from "@/assets/images/icons/SolarHeartBold.tsx";
import ShoppingBag from "@/components/cart/ShoppingBag.tsx";
import { motion } from "motion/react";
import { SolarArrowRightLinear } from "@/assets/images/icons/SolarArrowRightLinear";
import useScrolled from "@/utils/use-scrolled.ts";
import { useContext, useState } from "react";
import { Separator } from "@/components/ui/separator.tsx";
import ShoppingBagItem from "@/components/cart/ShoppingBagItem.tsx";
import dataShoppingBagItems from "@/assets/data/shopping-bag-items.ts";
import { useNavigate } from "react-router";
import HeaderProps from "@/components/header/props/header-prop.ts";
import { DialogAuthContext } from "@/context/DialogAuthContext.tsx";
import { FaSolidUserAlt } from "@/assets/images/icons/FaSolidUserAlt.tsx";
import LocalStorage from "@/utils/LocalStorage.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { SheetTrigger } from "@/components/ui/sheet.tsx";

function Header({ showMenu }: HeaderProps) {
	const [, scrollY] = useScrolled();
	const [scrollUp, setScrollUp] = useState(false);
	const navigate = useNavigate();
	const { showDialog } = useContext(DialogAuthContext);

	return (
		<motion.header className={"sticky top-0 z-2 bg-white"} initial={{ top: 0 }} animate={{ top: scrollY >= 100 ? -40 : 0 }} transition={{ duration: 0.75 }}>
			<div className={`relative flex w-full items-center justify-center gap-3 bg-gray-500 text-gray-100`}>
				<div className={"px-3 py-2 text-sm hover:bg-gray-800"}>Về KimiFashion</div>
				<div className={"hidden items-center justify-center lg:flex"}>
					<span className={"text-gray-400"}>|</span>
					<div className={"px-3 py-2 text-sm hover:bg-gray-800"}>Blog</div>
					<span className={"text-gray-400"}>|</span>
					<div className={"px-3 py-2 text-sm hover:bg-gray-800"}>Trung tâm CSKH</div>
					<span className={"text-gray-400"}>|</span>
					<div className={"px-3 py-2 text-sm hover:bg-gray-800"} onClick={() => showDialog("login")}>
						Đăng nhập
					</div>
				</div>
			</div>
			<div className={"align-items-center grid grid-cols-3 grid-rows-1 px-4 py-1 lg:mx-16"}>
				<div className={"flex items-center gap-3"}>
					<div onClick={showMenu} className={"lg:hidden"}>
						<SolarHamburgerMenuLinear width={30} height={30} />
					</div>

					<div className={"hidden lg:block"}>
						<div className={"flex size-18 cursor-pointer items-center justify-center bg-blue-400"} onClick={() => navigate("/")}>
							Logo
						</div>
					</div>
					<LucideSearch className={"block lg:hidden"} width={30} height={30} />
				</div>
				<div className='flex justify-center'>
					<div className={"block lg:hidden"}>
						<div className={"flex size-[60px] cursor-pointer items-center justify-center bg-blue-400"} onClick={() => navigate("/")}>
							Logo
						</div>
					</div>
					<ul className={"mb-0 hidden items-center justify-center gap-4 lg:flex"}>
						<li className={"text-lg font-medium"}>Menu 1</li>
						<li className={"text-lg font-medium"}>Menu 2</li>
						<li className={"text-lg font-medium"}>Menu 3</li>
						<li className={"text-lg font-medium"}>Menu 4</li>
					</ul>
				</div>
				<div className={"lg: relative flex items-center justify-end gap-3"}>
					<Input
						className={"rounded] z-4 hidden w-[50%] items-center rounded-4xl border-1 border-gray-500 p-2 hover:border-black lg:flex"}
						placeholder={"Tìm kiếm sản phẩm..."}
						inputClassName={"p-1 text-sm"}
						rightIcon={<LucideSearch width={28} height={28} />}
					/>
					<a href={"#"} className={"z-4"}>
						{LocalStorage.getValue("ACCESS_TOKEN") ? (
							<SheetTrigger>
								<Avatar>
									<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</SheetTrigger>
						) : (
							<FaSolidUserAlt width={24} height={24} onClick={() => showDialog("login")} />
						)}
					</a>
					<a href={"#"} className={"z-4"}>
						<SolarHeartBold width={29} height={29} />
					</a>
					<div className={"group relative"}>
						<a href={"/cart"} className={"relative z-3"}>
							<ShoppingBag countItem={dataShoppingBagItems.length} />
						</a>
						<div className={"absolute top-0 right-0 z-2 hidden w-[25rem] group-hover:lg:block"}>
							<div className={"relative top-16 right-0 max-h-[27rem] overflow-y-scroll rounded-2xl bg-white p-4"}>
								{dataShoppingBagItems.length ? (
									<div className={"h-full overflow-auto"}>
										<div className={"flex justify-between"}>
											<p>{dataShoppingBagItems.length} sản phẩm</p>
											<a href={"/cart"} className={"text-blue-500"}>
												Xem tất cả
											</a>
										</div>
										<Separator className={"my-2"} />
										<ul className={"flex h-full flex-col justify-between"}>
											{dataShoppingBagItems.map((value, index) => (
												<ShoppingBagItem {...value} key={`asdfafdas${index}`} />
											))}
										</ul>
									</div>
								) : (
									<p className={"text-center"}>Giỏ hàng chưa có gì :(, chọn mua đồ bạn nhé</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<motion.div
				initial={{ height: 35 }}
				animate={{ height: scrollY >= 10 ? 0 : 35 }}
				transition={{ duration: 0.75 }}
				onUpdate={(latest) => {
					if (scrollUp) window.scrollTo({ top: (window.scrollY - (latest as { height: number }).height) * 1.5 - 5 });
				}}
				onAnimationStart={(value) => setScrollUp((value as { height: number }).height != 0)}
				className={`mb-2 grid w-full grid-cols-5 gap-2 overflow-hidden bg-gray-700 lg:grid-cols-3 ${scrollY < 10 && "py-1"}`}>
				<div className={"col-span-3 col-start-2 overflow-hidden lg:col-span-1 lg:col-start-2"}>
					<motion.div
						className='w-[400px] overflow-hidden text-nowrap text-white'
						animate={{ x: ["100%", "-100%"] }}
						transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
						Freeship mọi đơn hàng trong tháng 3 - duy nhất tại website
					</motion.div>
				</div>
				<div className={"text-start"}>
					<SolarArrowRightLinear color={"white"} />
				</div>
			</motion.div>
		</motion.header>
	);
}

export default Header;
