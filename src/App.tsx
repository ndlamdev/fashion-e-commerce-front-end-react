import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import { GlobalContext } from "@/context/GlobalContext.tsx";
import LoginDialog from "@/components/authentication/LoginDialog.tsx";
import { useState } from "react";
import RegisterDialog from "@/components/authentication/RegisterDialog.tsx";
import DialogTypeEnum from "@/utils/dialog.type.enum.ts";
import ForgotPasswordDialog from "@/components/authentication/ForgotPasswordDialog.tsx";
import InputOTPDialog from "@/components/authentication/InputOTPDialog.tsx";
import NewPasswordDialog from "@/components/authentication/NewPasswordDialog.tsx";
import BoothPage from "@/pages/BoothPage.tsx";

function App() {
	const [dialog, setDialog] = useState<DialogTypeEnum>("none");
	const [callbacks, setCallback] = useState<((args?: Map<string, object>) => any)[] | undefined>();

	return (
		<GlobalContext.Provider
			value={{
				showDialog: (type, callback) => {
					setDialog(type);
					setCallback(callback);
				},
			}}>
			<>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<RootLayout />}>
							<Route index element={<HomePage />} />
							<Route path={"product-detail"}>
								<Route path={":id"} element={<ProductDetailPage />} />
							</Route>
						</Route>
						<Route path={'collection'} element={<BoothPage/>} />
						<Route path='/cart' element={<CartLayout />}>
							<Route index element={<CartPage />} />
						</Route>
					</Routes>
					<Toaster />
				</BrowserRouter>
				<LoginDialog open={dialog === "login"} />
				<RegisterDialog open={dialog === "register"} />
				<ForgotPasswordDialog open={dialog === "forgot-password"} />
				<NewPasswordDialog open={dialog === "new-password"} />
				<InputOTPDialog
					open={dialog === "input-otp"}
					onSubmit={
						!callbacks || callbacks.length < 0
							? undefined
							: async (data) => {
									callbacks[0](new Map<string, any>([["otp", data]]));
								}
					}
					onResendHandle={
						!callbacks || callbacks.length < 1
							? undefined
							: async () => {
									callbacks[1]();
								}
					}
				/>
			</>
		</GlobalContext.Provider>
	);
}

export default App;
