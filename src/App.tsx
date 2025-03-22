import "@/assets/css/App.css";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import BoothPage from "@/pages/BoothPage.tsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<RootLayout />}>
					<Route index element={<HomePage />} />
					<Route path={'product-detail'}>
						<Route path={':id'} element={<ProductDetailPage />} />
					</Route>
          <Route path={'collection'} element={<BoothPage/>}>
          </Route>
				</Route>
				<Route path='/cart' element={<CartLayout />}>
					<Route index element={<CartPage />} />
				</Route>
			</Routes>
			<Toaster />
		</BrowserRouter>
	);
}

export default App;
