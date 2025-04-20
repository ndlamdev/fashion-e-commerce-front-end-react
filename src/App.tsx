import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import { CallbackDialogProps, GlobalContext } from "@/context/GlobalContext.tsx";
import LoginDialog from "@/components/authentication/LoginDialog.tsx";
import { useState } from "react";
import RegisterDialog from "@/components/authentication/RegisterDialog.tsx";
import DialogTypeEnum from "@/utils/dialog.type.enum.ts";
import ForgotPasswordDialog from "@/components/authentication/ForgotPasswordDialog.tsx";
import InputOTPDialog from "@/components/authentication/InputOTPDialog.tsx";
import NewPasswordDialog from "@/components/authentication/NewPasswordDialog.tsx";
import BoothPage from "@/pages/BoothPage.tsx";
import SheetAccount from "@/components/header/SheetAccount.tsx";
import { Sheet } from "@/components/ui/sheet.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import Info from "@/components/profile/InfoTab.tsx";
import ReferFriend from "@/components/profile/ReferFriendTab.tsx";
import HistoryOrderTab from "@/components/profile/ReviewTab.tsx";
import ReviewTab from "@/components/profile/ReviewTab.tsx";
import VoucherWalletTab from "@/components/profile/VoucherWalletTab.tsx";
import HistoryPointTab from "@/components/profile/HistoryPointTab.tsx";
import AddressTab from "@/components/profile/AddressTab.tsx";
import FAQTab from "@/components/profile/FAQTab.tsx";
import EditInfoProfileDialog from "@/components/profile/EditInfoProfileDialog.tsx";
import ResetPasswordDialog from "@/components/profile/ResetPasswordDialog.tsx";

function App() {
	const [dialog, setDialog] = useState<DialogTypeEnum>("none");
	const [callbackDialog, setCallbackDialog] = useState<CallbackDialogProps | undefined>({});
	const [sheetAccount, setSheetAccount] = useState(false);

	return (
		<GlobalContext.Provider
			value={{
				showDialog: (type, callback) => {
					setDialog(type);
					setCallbackDialog(callback);
				},
				callBacksDialog: callbackDialog,
				sheetAccount: setSheetAccount,
			}}>
			<BrowserRouter>
				<Sheet open={sheetAccount} onOpenChange={(value) => setSheetAccount(value)}>
					<Routes>
						<Route path={"/"} element={<RootLayout />}>
							<Route index element={<HomePage />} />
							<Route path={"product-detail"}>
								<Route path={":id"} element={<ProductDetailPage />} />
							</Route>
							<Route path={"collection"} element={<BoothPage />} />
							<Route path={"profile"} element={<ProfilePage />} >
								<Route path={'info'} index element={<Info />} />
								<Route path={'refer-friend'} element={<ReferFriend />} />
								<Route path={'orders'} element={<HistoryOrderTab />} />
								<Route path={'voucher-wallet'} element={<VoucherWalletTab />} />
								<Route path={'points'} element={<HistoryPointTab />} />
								<Route path={'addresses'} element={<AddressTab />} />
								<Route path={'reviews'} element={<ReviewTab />} />
								<Route path={'faq'} element={<FAQTab />} />
							</Route>
						</Route>
						<Route path='/cart' element={<CartLayout />}>
							<Route index element={<CartPage />} />
						</Route>
					</Routes>
					<Toaster />
					<>
						<LoginDialog open={dialog === "login"} />
						<RegisterDialog open={dialog === "register"} />
						<ForgotPasswordDialog open={dialog === "forgot-password"} />
						<NewPasswordDialog open={dialog === "new-password"} />
						<InputOTPDialog open={dialog === "input-otp"} sendOtp={callbackDialog?.sendOtp} resendOtp={callbackDialog?.resendOtp} />
						<EditInfoProfileDialog open={dialog === "edit-info-profile"} />
						<ResetPasswordDialog open={dialog === "reset-password"} />
					</>
					<>
						<SheetAccount />
					</>
				</Sheet>
			</BrowserRouter>
		</GlobalContext.Provider>
	);
}

export default App;
