import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import BoothPage from "@/pages/BoothPage.tsx";
import SheetAccount from "@/components/header/SheetAccount.tsx";
import { Sheet } from "@/components/ui/sheet.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import Info from "@/components/profile/tab/InfoTab.tsx";
import ReferFriend from "@/components/profile/tab/ReferFriendTab.tsx";
import Review from "@/components/profile/tab/ReviewTab.tsx";
import VoucherWallet from "@/components/profile/tab/VoucherWalletTab.tsx";
import FAQTab from "@/components/profile/tab/FAQTab.tsx";
import EditInfoProfileDialog from "@/components/profile/dialog/EditInfoProfileDialog.tsx";
import ResetPasswordDialog from "@/components/profile/dialog/ResetPasswordDialog.tsx";
import HistoryOrder from "@/components/profile/tab/HistoryOrderTab.tsx";
import HistoryPoint from "@/components/profile/tab/HistoryPointTab.tsx";
import Address from "@/components/profile/tab/AddressTab.tsx";
import SaveAddressDialog from "@/components/profile/dialog/SaveAddressDialog.tsx";
import TestPage from "@/pages/TestPage.tsx";
import store from "./configs/store.config";
import { Provider } from "react-redux";
import DialogAuthProvider from "@/context/provider/DialogAuthProvider.tsx";
import SheetAccountProvider from "@/context/provider/SheetAccountProvider.tsx";

function App() {
	return (
		<Provider store={store}>
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
								<Route path={'orders'} element={<HistoryOrder />} />
								<Route path={'voucher-wallet'} element={<VoucherWallet />} />
								<Route path={'points'} element={<HistoryPoint />} />
								<Route path={'addresses'} element={<Address />} />
								<Route path={'reviews'} element={<Review />} />
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
						<SaveAddressDialog open={dialog === "save-address"} />
					</>
					<>
						<SheetAccount />
					</>
				</Sheet>
				<DialogAuthProvider>
					<SheetAccountProvider>
						<Routes>
							<Route path={"/"} element={<RootLayout />}>
								<Route index element={<HomePage />} />
								<Route path={"/test"} element={<TestPage />} />
								<Route path={"product-detail"}>
									<Route path={":id"} element={<ProductDetailPage />} />
								</Route>
								<Route path={"collection"} element={<BoothPage />} />
							</Route>
							<Route path='/cart' element={<CartLayout />}>
								<Route index element={<CartPage />} />
							</Route>
						</Routes>
						<Toaster />
					</SheetAccountProvider>
				</DialogAuthProvider>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
