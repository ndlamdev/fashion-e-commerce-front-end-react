import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import BoothPage from "@/pages/BoothPage.tsx";
import CreateProductPage from "@/pages/admin/CreateProductPage.tsx";
import UpdateProductPage from "@/pages/admin/UpdateProductPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<RootLayout />}>
					<Route index element={<HomePage />} />
					<Route path={"product-detail"}>
						<Route path={":id"} element={<ProductDetailPage />} />
					</Route>
					<Route path={"collection"} element={<BoothPage />}></Route>
				</Route>
				<Route path='/cart' element={<CartLayout />}>
					<Route index element={<CartPage />} />
				</Route>
				<Route path={"/admin"} element={<AdminLayout />}>
					<Route path={"product/create"} element={<CreateProductPage />} />
					<Route path={"product/update/:id"} element={<UpdateProductPage />} />
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Toaster />
		</BrowserRouter>
	);
}

export default App;
