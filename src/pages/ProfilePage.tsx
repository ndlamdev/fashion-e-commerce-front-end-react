import RankingHeader from "@/components/profile/RankingHeader.tsx";
import {
	ArrowRightIcon,
	BaggageClaimIcon,
	LogOutIcon,
	MapPinHouseIcon,
	MessageCircleQuestionIcon,
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

const tabNavValues: Record<number, TabNavProps> = {
	0: { title: "Thông tin tài khoản", to: "info", iconLeft: <SquareUserRoundIcon className={'hover:text-white'}/> },
	1: { title: "Giới thiệu bạn bè", to: "refer-friend", iconLeft: <UserRoundPlusIcon className={'hover:text-white'}/> },
	2: { title: "Lịch sử đơn hàng", to: "orders", iconLeft: <BaggageClaimIcon className={'hover:text-white'}/> },
	3: { title: "Lịch sử Point", to: "voucher-wallet", iconLeft: <ReceiptIcon className={'hover:text-white'}/> },
	4: { title: "Ví voucher", to: "points", iconLeft: <TicketPercentIcon className={'hover:text-white'}/> },
	5: { title: "Sổ địa chỉ", to: "addresses", iconLeft: <MapPinHouseIcon className={'hover:text-white'}/> },
	6: { title: "Đánh giá và phản hồi", to: "reviews", iconLeft: <StarIcon className={'hover:text-white'}/> },
	7: { title: "Chính sách và câu hỏi thường gặp", to: "faq", iconLeft: <MessageCircleQuestionIcon className={'hover:text-white'}/> },
	8: { title: "Đăng xuất", to: "logout", iconLeft: <LogOutIcon className={'hover:text-white'}/> },
}

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<number>(0);
	const handleTabClick = useCallback((index: number) => {
		setActiveTab(index);
		return;
	}, []);
	return (
			<main className={'p-8 bg-neutral-300'}>
				<section>
					<RankingHeader fullName={'LamHongPhong'} levelClub={0} nextLevel={1} resetRankingDate={new Date()} nextResetRankingDate={new Date()}/>
				</section>
				<section className={'my-9 flex space-x-20'}>
					<nav className={'w-1/4'}>
						<div className="space-y-2">
							{
								Array.from(Object.keys(tabNavValues)).map((_, key: number) => {
									return (
										<TabNav key={key} onclick={() => handleTabClick(key)} style={{
											backgroundColor: activeTab === key ? 'black' : '',
											color: activeTab === key ? 'white' : '',
										}} tailwindStyle={`hover:bg-black hover:text-white`} iconLeft={tabNavValues[key].iconLeft} title={tabNavValues[key].title} to={tabNavValues[key].to} iconRight={<ArrowRightIcon className={' hover:text-white'} />}/>
									)
								})
							}
						</div>
					</nav>
					<aside className={'w-3/4'}>
						<Outlet/>
					</aside>
				</section>
			</main>
	);
}
