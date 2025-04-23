import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import BoothPage from "@/pages/BoothPage.tsx";
import TestPage from "@/pages/TestPage.tsx";
import store from "./configs/store.config";
import { Provider } from "react-redux";
import DialogAuthProvider from "@/context/provider/DialogAuthProvider.tsx";
import SheetAccountProvider from "@/context/provider/SheetAccountProvider.tsx";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
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
