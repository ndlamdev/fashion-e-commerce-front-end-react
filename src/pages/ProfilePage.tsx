import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import { TabNavProps } from "@/components/profile/props/tabNav.props.ts";
import RankingHeader from "@/components/profile/RankingHeader.tsx";
import { TabNav } from "@/components/profile/TabNav.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { RootState } from "@/configs/store.config.ts";
import { cartApi } from "@/redux/api/cart.api.ts";
import authenticationService from "@/services/authentication.service.ts";
import { useMediaQuery } from "@uidotdev/usehooks";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
const tabNavValues: TabNavProps[] = [
  {
    title: "Thông tin tài khoản",
    to: "info",
    iconLeft: <SquareUserRoundIcon className={"flex-none hover:text-white"} />,
  },
  {
    title: "Giới thiệu bạn bè",
    to: "refer-friend",
    iconLeft: <UserRoundPlusIcon className={"flex-none hover:text-white"} />,
  },
  {
    title: "Lịch sử đơn hàng",
    to: "orders",
    iconLeft: <BaggageClaimIcon className={"flex-none hover:text-white"} />,
  },
  {
    title: "Lịch sử Point",
    to: "points",
    iconLeft: <ReceiptIcon className={"flex-none hover:text-white"} />,
  },
  {
    title: "Ví voucher",
    to: "voucher-wallet",
    iconLeft: <TicketPercentIcon className={"flex-none hover:text-white"} />,
  },
  {
    title: "Sổ địa chỉ",
    to: "addresses",
    iconLeft: <MapPinHouseIcon className={"flex-none hover:text-white"} />,
  },
  {
    title: "Đánh giá và phản hồi",
    to: "reviews",
    iconLeft: <StarIcon className={"flex-none hover:text-white"} />,
  },
  {
    title: "Chính sách và câu hỏi thường gặp",
    to: "faq",
    iconLeft: <MessageCircleQuestionIcon className={"flex-none hover:text-white"} />,
  },
];

export default function ProfilePage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname.split("/").pop() || "info");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    authenticationService
      .logout()
      .then(() => {
        navigate("/");
        setOpenDialog(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        dispatch(cartApi.util.invalidateTags(["Cart"]));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed");
      });
  };
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const { user, access_token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setActiveTab(location.pathname.split("/").pop() || "info");
  }, [location]);

  useEffect(() => {
    if (!user || !access_token) navigate("/");
  }, [user, access_token, navigate]);

  return (
    <main className={"bg-neutral-300 p-4 md:p-8"}>
      <section>
        <RankingHeader fullName={user?.full_name ?? ""} levelClub={0} nextLevel={1} resetRankingDate={new Date()} nextResetRankingDate={new Date()} />
      </section>
      <section className={"my-9 flex space-x-20"}>
        <nav className={"w-1/4 max-md:w-full"}>
          <Sheet>
            <div className='space-y-2'>
              {tabNavValues.map((tabNav, index) => {
                return (
                  <SheetTrigger key={`tab-native-${index}`} asChild>
                    <TabNav
                      style={{
                        backgroundColor: activeTab == tabNav.to ? "black" : "",
                        color: activeTab === tabNav.to ? "white" : "",
                      }}
                      tailwindStyle={`hover:bg-black hover:text-white `}
                      iconLeft={tabNav.iconLeft}
                      title={tabNav.title}
                      to={tabNav.to}
                      iconRight={<ArrowRightIcon className={"hover:text-white"} />}
                    />
                  </SheetTrigger>
                );
              })}
              <TabNav
                to={window.location.href}
                onClick={() => setOpenDialog(true)}
                tailwindStyle={`hover:bg-black hover:text-white `}
                iconLeft={<LogOutIcon className={"flex-none hover:text-white"} />}
                title={"Đăng xuất"}
                iconRight={<ArrowRightIcon className={"hover:text-white"} />}
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
      <DialogConfirm
        open={openDialog}
        onClickCancel={() => {
          setOpenDialog(false);
        }}
        onClickSubmit={handleLogout}
      />
    </main>
  );
}
