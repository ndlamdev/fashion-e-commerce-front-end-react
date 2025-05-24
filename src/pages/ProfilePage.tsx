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
import { Outlet, useLocation, useNavigate } from "react-router";
import { TabNavProps } from "@/components/profile/props/tabNav.props.ts";
import { TabNav } from "@/components/profile/TabNav.tsx";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { DialogProfileProvider } from "@/context/provider/DialogProfileProvider.tsx";
import { useDispatch } from "react-redux";
import authenticationService from "@/services/authentication.service.ts";
import { toast } from "sonner";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import { DialogProfileContext } from "@/context/dialogProfileContext.props.ts";
import { cartApi } from "@/redux/query/cart.query.ts";

const tabNavValues: Record<string, TabNavProps> = {
	"0": {
		title: "Thông tin tài khoản",
		to: "info#0",
		iconLeft: <SquareUserRoundIcon className={"flex-none hover:text-white"} />,
	},
	"1": {
		title: "Giới thiệu bạn bè",
		to: "refer-friend#1",
		iconLeft: <UserRoundPlusIcon className={"flex-none hover:text-white"} />,
	},
	"2": {
		title: "Lịch sử đơn hàng",
		to: "orders#2",
		iconLeft: <BaggageClaimIcon className={"flex-none hover:text-white"} />,
	},
	"3": { title: "Lịch sử Point", to: "points#3", iconLeft: <ReceiptIcon className={"flex-none hover:text-white"} /> },
	"4": {
		title: "Ví voucher",
		to: "voucher-wallet#4",
		iconLeft: <TicketPercentIcon className={"flex-none hover:text-white"} />,
	},
	"5": {
		title: "Sổ địa chỉ",
		to: "addresses#5",
		iconLeft: <MapPinHouseIcon className={"flex-none hover:text-white"} />,
	},
	"6": {
		title: "Đánh giá và phản hồi",
		to: "reviews#6",
		iconLeft: <StarIcon className={"flex-none hover:text-white"} />,
	},
	"7": {
		title: "Chính sách và câu hỏi thường gặp",
		to: "faq#7",
		iconLeft: <MessageCircleQuestionIcon className={"flex-none hover:text-white"} />,
	},
};

export default function ProfilePage() {
	const { hash: index } = useLocation();
	const [activeTab, setActiveTab] = useState<string>();
	const [openDialog, setOpenDialog] = useState<"none" | "show-confirm" | "show-dialog">("none");
	const { showDialog } = useContext(DialogProfileContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		dispatch(cartApi.util.invalidateTags(["Cart"]));
		authenticationService
			.logout()
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				toast("Logout failed");
			});
	};
	const isDesktop = useMediaQuery("(min-width: 769px)");

	useEffect(() => {
		setActiveTab(index.substring(1));
	}, [index]);
	return (
		<DialogProfileProvider>
			<main className={"bg-neutral-300 p-4 md:p-8"}>
				<section>
					<RankingHeader fullName={"LamHongPhong"} levelClub={0} nextLevel={1} resetRankingDate={new Date()} nextResetRankingDate={new Date()} />
				</section>
				<section className={"my-9 flex space-x-20"}>
					<nav className={"w-1/4 max-md:w-full"}>
						<Sheet>
							<div className='space-y-2'>
								{Array.from(Object.keys(tabNavValues)).map((key) => {
									return (
										<SheetTrigger key={key} asChild>
											<TabNav
												style={{
													backgroundColor: activeTab == key ? "black" : "",
													color: activeTab === key ? "white" : "",
												}}
												tailwindStyle={`hover:bg-black hover:text-white `}
												iconLeft={tabNavValues[key].iconLeft}
												title={tabNavValues[key].title}
												to={tabNavValues[key].to}
												iconRight={<ArrowRightIcon className={"hover:text-white"} />}
											/>
										</SheetTrigger>
									);
								})}
								<TabNav
									to={window.location.href}
									onClick={() => setOpenDialog("show-confirm")}
									tailwindStyle={`hover:bg-black hover:text-white `}
									iconLeft={<LogOutIcon className={"flex-none hover:text-white"} />}
									title={"Đăng xuất"}
									iconRight={<ArrowRightIcon className={"hover:text-white"} />}
								/>
								<DialogConfirm
									open={openDialog === "show-confirm"}
									onOpenChange={(value) => !value && showDialog("none")}
									onClickCancel={() => {
										setOpenDialog("none");
									}}
									onClickSubmit={() => {
										handleLogout();
										setOpenDialog("none");
										showDialog("none");
									}}
								/>
							</div>
							{!isDesktop && (
								<SheetContent
									className={"!w-screen !max-w-none rounded-none bg-white p-2 sm:p-10"}
									classNameClose='left-4'
									iconRight={<MoveLeftIcon className={"size-8 rounded-full !bg-neutral-300 !fill-black p-1"} />}>
									<ScrollArea className={"scrollbar-none h-screen overflow-auto"}>
										<Outlet />
									</ScrollArea>
								</SheetContent>
							)}
						</Sheet>
					</nav>
					{isDesktop && (
						<aside className={"w-3/4 rounded-md bg-white p-10 shadow-lg"}>
							<Outlet />
						</aside>
					)}
				</section>
			</main>
		</DialogProfileProvider>
	);
}
