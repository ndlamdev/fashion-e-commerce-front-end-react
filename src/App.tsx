import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import BoothPage from "@/pages/BoothPage.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import Info from "@/components/profile/tab/InfoTab.tsx";
import ReferFriend from "@/components/profile/tab/ReferFriendTab.tsx";
import Review from "@/components/profile/tab/ReviewTab.tsx";
import VoucherWallet from "@/components/profile/tab/VoucherWalletTab.tsx";
import FAQTab from "@/components/profile/tab/FAQTab.tsx";
import HistoryOrder from "@/components/profile/tab/HistoryOrderTab.tsx";
import HistoryPoint from "@/components/profile/tab/HistoryPointTab.tsx";
import Address from "@/components/profile/tab/AddressTab.tsx";
import TestPage from "@/pages/TestPage.tsx";
import store from "./configs/store.config";
import { Provider } from "react-redux";
import DialogAuthProvider from "@/context/provider/DialogAuthProvider.tsx";
import SheetAccountProvider from "@/context/provider/SheetAccountProvider.tsx";
import { DialogProductProvider } from "@/context/provider/DialogProductProvider.tsx";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<DialogAuthProvider>
					<SheetAccountProvider>
						<DialogProductProvider>
							<Routes>
								<Route path={"/"} element={<RootLayout />}>
									<Route index element={<HomePage />} />
									<Route path={"/test"} element={<TestPage />} />
									<Route path={"product-detail"}>
										<Route path={":id"} element={<ProductDetailPage />} />
									</Route>
									<Route path={"collection"} element={<BoothPage />} />
									<Route path={"profile"} element={<ProfilePage />}>
										<Route path={"info"} index element={<Info />} />
										<Route path={"refer-friend"} element={<ReferFriend />} />
										<Route path={"orders"} element={<HistoryOrder />} />
										<Route path={"voucher-wallet"} element={<VoucherWallet />} />
										<Route path={"points"} element={<HistoryPoint />} />
										<Route path={"addresses"} element={<Address />} />
										<Route path={"reviews"} element={<Review />} />
										<Route path={"faq"} element={<FAQTab />} />
									</Route>
								</Route>
								<Route path="/cart" element={<CartLayout />}>
									<Route index element={<CartPage />} />
								</Route>
							</Routes>
						</DialogProductProvider>
						<Toaster />
					</SheetAccountProvider>
				</DialogAuthProvider>
			</BrowserRouter>
		</Provider>
	);
}

export default App;