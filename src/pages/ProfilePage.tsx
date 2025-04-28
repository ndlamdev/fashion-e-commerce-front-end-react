import RankingHeader from "@/components/profile/RankingHeader.tsx";
import {
	ArrowRightIcon,
	BaggageClaimIcon,
	LogOutIcon,
	MapPinHouseIcon,
	MessageCircleQuestionIcon,
	MoveLeftIcon,
	ReceiptIcon,
	SquareUserRoundIcon,
	StarIcon,
	TicketPercentIcon,
	UserRoundPlusIcon,
} from "lucide-react";
import { Outlet } from "react-router";
import { TabNavProps } from "@/components/profile/props/tabNav.props.ts";
import { TabNav } from "@/components/profile/TabNav.tsx";
import { useCallback, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { DialogProfileProvider } from "@/context/provider/DialogProfileProvider.tsx";

const tabNavValues: Record<number, TabNavProps> = {
	0: { title: "Thông tin tài khoản", to: "info", iconLeft: <SquareUserRoundIcon className={'hover:text-white  flex-none'}/> },
	1: { title: "Giới thiệu bạn bè", to: "refer-friend", iconLeft: <UserRoundPlusIcon className={'hover:text-white flex-none'}/> },
	2: { title: "Lịch sử đơn hàng", to: "orders", iconLeft: <BaggageClaimIcon className={'hover:text-white flex-none'}/> },
	3: { title: "Lịch sử Point", to: "points", iconLeft: <ReceiptIcon className={'hover:text-white flex-none'}/> },
	4: { title: "Ví voucher", to: "voucher-wallet", iconLeft: <TicketPercentIcon className={'hover:text-white flex-none'}/>},
	5: { title: "Sổ địa chỉ", to: "addresses", iconLeft: <MapPinHouseIcon className={'hover:text-white flex-none'}/> },
	6: { title: "Đánh giá và phản hồi", to: "reviews", iconLeft: <StarIcon className={'hover:text-white flex-none'}/> },
	7: { title: "Chính sách và câu hỏi thường gặp", to: "faq", iconLeft: <MessageCircleQuestionIcon className={'hover:text-white flex-none'}/> },
	8: { title: "Đăng xuất", to: "logout", iconLeft: <LogOutIcon className={'hover:text-white flex-none'}/> },
}

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<number>(0);
	const handleTabClick = useCallback((index: number) => {
		setActiveTab(index);
	}, []);
	const isDesktop = useMediaQuery("(min-width: 769px)");
	return (
		<DialogProfileProvider>
			<main className={'p-4 md:p-8 bg-neutral-300'}>
				<section>
					<RankingHeader fullName={'LamHongPhong'} levelClub={0} nextLevel={1} resetRankingDate={new Date()} nextResetRankingDate={new Date()}/>
				</section>
				<section className={'my-9 flex space-x-20'}>
					<nav className={'w-1/4 max-md:w-full'}>
						<Sheet >
							<div className="space-y-2" >
								{
									Array.from(Object.keys(tabNavValues)).map((_, key: number) => {
										return (
											<SheetTrigger key={key} asChild>
												<TabNav onClick={() => handleTabClick(key)} style={{
													backgroundColor: activeTab === key ? 'black' : '',
													color: activeTab === key ? 'white' : '',
												}} tailwindStyle={`hover:bg-black hover:text-white `} iconLeft={tabNavValues[key].iconLeft} title={tabNavValues[key].title} to={tabNavValues[key].to} iconRight={<ArrowRightIcon className={' hover:text-white'} />}/>
											</SheetTrigger>
										)
									})
								}
							</div>
							{!isDesktop &&
								<SheetContent className={'!w-screen !max-w-none rounded-none bg-white p-2 sm:p-10'} classNameClose="left-4" iconRight={<MoveLeftIcon className={'size-8 !fill-black !bg-neutral-300 rounded-full p-1'} />}>
									<ScrollArea className={'h-screen scrollbar-none overflow-auto'}>
										<Outlet/>
									</ScrollArea>
								</SheetContent>
							}
						</Sheet>
					</nav>
					{isDesktop &&
						<aside className={'w-3/4 rounded-md bg-white p-10 shadow-lg'}>
							<Outlet/>
						</aside>
					}
				</section>
			</main>
		</DialogProfileProvider>
	);
}
