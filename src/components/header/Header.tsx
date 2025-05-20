/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:46AM - 05/03/2025
 * User: lam-nguyen
 **/
import { SolarHamburgerMenuLinear } from "@/assets/images/icons/SolarHamburgerMenuLinear.tsx";
import { LucideSearch } from "@/assets/images/icons/LucideSearch.tsx";
import { SolarHeartBold } from "@/assets/images/icons/SolarHeartBold.tsx";
import ShoppingBag from "@/components/cart/ShoppingBag.tsx";
import { AnimatePresence, motion } from "motion/react";
import { SolarArrowRightLinear } from "@/assets/images/icons/SolarArrowRightLinear";
import useScrolled from "@/utils/helper/use-scrolled.ts";
import { memo, useCallback, useState } from "react";
import { Separator } from "@/components/ui/separator.tsx";
import ShoppingBagItem from "@/components/cart/ShoppingBagItem.tsx";
import dataShoppingBagItems from "@/assets/data/shopping-bag-items.ts";
import { useNavigate } from "react-router";
import HeaderProps from "@/components/header/props/header-prop.ts";
import { FaSolidUserAlt } from "@/assets/images/icons/FaSolidUserAlt.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { SheetTrigger } from "@/components/ui/sheet.tsx";
import { RootState } from "@/configs/store.config.ts";
import { useDispatch, useSelector } from "react-redux";
import Searcher from "@/components/header/Searcher.tsx";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import { useGetCollectionsQuery } from "@/services/collection.service.ts";
import { CollectionEnum, CollectionValue } from "@/utils/enums/collection.enum.ts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import QuickSearchProduct from "@/components/product/QuickSearchProduct.tsx";
import { debounce } from "lodash";
import { useQuickSearchQuery } from "@/services/product.service.ts";
import { cn } from "@/lib/utils.ts";

function Header({ showMenu }: HeaderProps) {
	const [, scrollY] = useScrolled();
	const [scrollUp, setScrollUp] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { access_token, user } = useSelector((state: RootState) => state.auth);
	const [searchAction, setSearchAction] = useState<"SEARCH" | "EXIT" | "HIDDEN">("HIDDEN");
	const { data, isLoading } = useGetCollectionsQuery();
	const [type, setType] = useState<CollectionEnum>(CollectionEnum.MALE)


	const [title, setTitle] = useState<string>()
	const {
		data: dataQuickSearch,
		isLoading: isLoadingQuickSearch,
		isError: isErrorQuickSearch,
	} = useQuickSearchQuery(title, { skip: !title});

	const debounceSearch = debounce((title: string) => {
		onSearchHandle(title);
	}, 500);

	const onSearchHandle = useCallback((title: string) => {
		console.log(title);
			setTitle(title);
	}, []);

	const onSearchHandler = useCallback(
		(title: string) => {
			if (!title) return;
			navigate("/collection", {
				state: {
					prompt: title,
				},
			});
			setSearchAction("HIDDEN");
		},
		[navigate],
	);
	return (
		<div>
			<motion.header className={"sticky top-0 z-2 bg-white"} initial={{ top: 0 }} animate={{ top: scrollY >= 100 ? -40 : 0 }} transition={{ duration: 0.75 }}>
				<div className={`relative flex w-full items-center justify-center gap-3 bg-gray-500 text-gray-100`}>
					<div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>Về KimiFashion</div>
					<div className={"hidden items-center justify-center lg:flex"}>
						<span className={"text-gray-400"}>|</span>
						<div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>Blog</div>
						<span className={"text-gray-400"}>|</span>
						<div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"}>Trung tâm CSKH</div>
						<span className={"text-gray-400"}>|</span>
						<div className={"cursor-pointer px-3 py-2 text-sm hover:bg-gray-800"} onClick={() => dispatch(showDialog("login"))}>
							Đăng nhập
						</div>
					</div>
				</div>
				<div className={"align-items-center grid grid-cols-7 grid-rows-1 px-4 py-1 lg:mx-8"}>
					<div className={"col-span-2 flex items-center gap-2"}>
						<div onClick={showMenu} className={"lg:hidden"}>
							<SolarHamburgerMenuLinear width={30} height={30} />
						</div>

						<div className={"hidden lg:block"}>
							<div className={"flex size-18 cursor-pointer items-center justify-center bg-blue-400"} onClick={() => navigate("/")}>
								Logo
							</div>
						</div>
						<div className={"search-component relative block lg:hidden"}>
							<AnimatePresence initial={true} onExitComplete={() => setSearchAction("HIDDEN")}>
								{searchAction === "SEARCH" && (
									<motion.div
										animate={{ width: "100vw", opacity: 1, left: -54 }}
										initial={{ width: 0, opacity: 0, left: 0 }}
										exit={{ width: 0, opacity: 0, left: 0 }}
										transition={{ duration: 0.4 }}
										className={`absolute -top-[19px] z-5 block h-[68px] bg-white px-5 py-4`}>
										<div className={"flex h-full gap-2"}>
											<Searcher
												className={"border-center flex h-full w-full items-center rounded-full border px-2 py-1"}
												autoFocus={true}
												onTextChange={debounceSearch}
												onSearch={onSearchHandler}
												onEnter={onSearchHandler}
											/>
											<p
												className={`flex aspect-square h-full items-center justify-center rounded-md border-1 border-red-500 ${searchAction === "SEARCH" ? "flex" : "hidden"}`}
												onClick={() => setSearchAction("EXIT")}>
												X
											</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
							<LucideSearch width={30} height={30} onClick={() => setSearchAction("SEARCH")} />
						</div>
					</div>
					<div className={"col-span-3 flex justify-center"}>
						<div className={"block lg:hidden"}>
							<div className={"flex size-[60px] cursor-pointer items-center justify-center bg-blue-400"} onClick={() => navigate("/")}>
								Logo
							</div>
						</div>
						<div className={"mb-0 hidden items-center justify-center gap-4 lg:flex"}>
								<HoverCard openDelay={50} closeDelay={100}>
									{
										Object.values(CollectionEnum).map((collection: CollectionEnum) => (
											<HoverCardTrigger
												key={collection}
												onMouseEnter={() => setType(collection)}
												onClick={() => navigate(`/collection?type=${collection}`, { state: { type: CollectionValue[collection] } })}
												className={"cursor-pointer text-lg font-bold uppercase hover:border-b-2"}>
												{CollectionValue[collection]}
											</HoverCardTrigger>
										))
									}
									<HoverCardContent className={"translate-y-6 -translate-x-12	grid min-h-25 w-[80vw] grid-cols-3 gap-2 place-content-around bg-linear-to-t  to-sky-400"}>
										{isLoading && <Skeleton className={"w-[75vw]"} />}
										{data?.data &&
											data.data[type].map((item, index) => (
												<span
													key={index}
													onClick={() => navigate(`collection?cid=${item.id}&type=${type}`, { state: { name: item.title } })}
													className={"cursor-pointer hover:text-sky-600 font-bold italic "}>
												{item.title}
											</span>
											))}
									</HoverCardContent>
								</HoverCard>
						</div>
					</div>
					<div className={"relative col-span-2 flex items-center justify-end gap-2"}>
						<Searcher readOnly={true} onClick={() => setSearchAction("SEARCH")} onSearch={() => setSearchAction("SEARCH")} />
						<AnimatePresence initial={true} onExitComplete={() => setSearchAction("HIDDEN")}>
							{searchAction === "SEARCH" && (
								<motion.div
									animate={{ width: "99dvw", opacity: 1, right: -45 }}
									initial={{ width: 0, opacity: 0, right: 0 }}
									exit={{ width: 0, opacity: 0, right: 0 }}
									transition={{ duration: 0.4 }}
									className={`absolute -right-[54px] z-5 hidden h-full overflow-hidden bg-white px-5 py-4 lg:block`}>
									<div className={"flex h-full gap-2"}>
										<Searcher
											className={"border-center flex h-full w-full items-center rounded-full border px-2 py-1"}
											autoFocus={true}
											onTextChange={debounceSearch}
											onSearch={onSearchHandler}
											onEnter={onSearchHandler}
										/>
										<p
											className={`flex aspect-square h-full items-center justify-center rounded-md border-1 border-red-500 ${searchAction === "SEARCH" ? "flex" : "hidden"}`}
											onClick={() => setSearchAction("EXIT")}>
											X
										</p>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						<a href={"#"} className={"z-4"}>
							{access_token && user ? (
								<SheetTrigger>
									<Avatar>
										<AvatarImage src={"https://github.com/shadcn.png"} alt={"@shadcn"} />
										<AvatarFallback>{user.full_name}</AvatarFallback>
									</Avatar>
								</SheetTrigger>
							) : (
								<FaSolidUserAlt width={24} height={24} onClick={() => dispatch(showDialog("login"))} />
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
			{searchAction === "SEARCH" && (
				<div
					className={cn(
						"border-gray absolute top-[115px] left-0 z-3 flex  w-full flex-col gap-y-5 overflow-x-hidden overflow-y-auto border-t-5 bg-white p-5", dataQuickSearch ? 'h-screen sm:h-100' : 'h-[50vw] sm:h-25')
					}>
					{isLoadingQuickSearch && <Skeleton className={'w-full min-h-5'} />}
					{isErrorQuickSearch && <p className={'text-red-500 normal-case'} >lỗi tìm thấy sản phẩm</p>}
					{dataQuickSearch && dataQuickSearch.data.map((it) => (
						<QuickSearchProduct
							className={"flex w-full flex-row items-center gap-2 cursor-pointer"}
							key={`quick_search_product_${it.id}`}
							{...it}
							image={it.image}
							onClick={() => {
								navigate(`/product-detail/${it.id}`)
								setSearchAction('EXIT')
							}}
						/>
					))}
					{!dataQuickSearch && <div className={'text-center font-bold w-full min-h-5'}>Nhập sản phẩm bạn muốn tìm.</div>}
				</div>
			)}
		</div>
	);
}

export default memo(Header);
