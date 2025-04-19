import RankingHeader from "@/components/profile/RankingHeader.tsx";
import TabNav from "@/components/profile/TabNav.tsx";
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

export default function ProfilePage() {
	return (
			<main className={'p-8 bg-neutral-300'}>
				<section>
					<RankingHeader fullName={'LamHongPhong'} levelClub={0} nextLevel={1} resetRankingDate={new Date()} nextResetRankingDate={new Date()}/>
				</section>
				<section className={'my-9'}>
					<nav className={'w-1/4'}>
						<ul className="list-none space-y-2">
							<li>
								<TabNav tailwindStyle={'bg-black text-white hover:bg-black hover:text-white'} iconLeft={<SquareUserRoundIcon className={'text-white hover:text-white'}/>} title={'Thông tin tài khoản'} to={'/info'} iconRight={<ArrowRightIcon className={'text-white hover:text-white'} />}/>
							</li>
							<li>
								<TabNav tailwindStyle={'hover:bg-black hover:text-white'} iconLeft={<UserRoundPlusIcon className={'hover:text-white'}/>} title={'Giới thiệu bạn bè'} to={'/refer-friend'} iconRight={<ArrowRightIcon className={'hover:text-white'} />}/>
							</li>
							<li>
								<TabNav tailwindStyle={'hover:bg-black hover:text-white'} iconLeft={<BaggageClaimIcon className={'hover:text-white'}/>} title={'Lịch sử đơn hàng'} to={'/orders'} iconRight={<ArrowRightIcon className={'hover:text-white'} />}/>
							</li>
							<li>
								<TabNav tailwindStyle={'hover:bg-black hover:text-white'} iconLeft={<ReceiptIcon className={'hover:text-white'}/>} title={'Ví voucher'} to={'/voucher-wallet'} iconRight={<ArrowRightIcon className={'hover:text-white'} />}/>
							</li>
							<li>
								<TabNav tailwindStyle={'hover:bg-black hover:text-white'} iconLeft={<TicketPercentIcon className={'hover:text-white'}/>} title={'Lịch sử Point'} to={'/point'} iconRight={<ArrowRightIcon className={'hover:text-white'} />}/>
							</li>
							<li>
								<TabNav tailwindStyle={'hover:bg-black hover:text-white'} iconLeft={<MapPinHouseIcon className={'hover:text-white'}/>} title={'Sổ địa chỉ`'} to={'/addresses'} iconRight={<ArrowRightIcon className={'hover:text-white'} />}/>
							</li>
							<li>
								<TabNav tailwindStyle={'hover:bg-black hover:text-white'} iconLeft={<StarIcon className={'hover:text-white'}/>} title={'Đánh giá và phản hồi'} to={'/reviews'} iconRight={<ArrowRightIcon className={'hover:text-white'} />}/>
							</li>
							<li>
								<TabNav tailwindStyle={'hover:bg-black hover:text-white'} iconLeft={<MessageCircleQuestionIcon className={'hover:text-white'}/>} title={'Chính sách và câu hỏi thường gặp'} to={'/fag'} iconRight={<ArrowRightIcon className={'hover:text-white'} />}/>
							</li>
							<li>
								<TabNav tailwindStyle={'hover:bg-black hover:text-white'} iconLeft={<LogOutIcon className={'hover:text-white'}/>} title={'Đăng xuất'} to={'/logout`'} iconRight={<ArrowRightIcon className={'hover:text-white'} />}/>
							</li>
						</ul>
					</nav>
					<aside className={'w-3/4'}>

					</aside>
				</section>
			</main>
	);
}
