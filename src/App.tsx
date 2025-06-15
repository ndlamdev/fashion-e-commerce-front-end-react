import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import BoothPage from "@/pages/BoothPage.tsx";
import CreateProductPage from "@/pages/admin/product/CreateProductPage.tsx";
import UpdateProductPage from "@/pages/admin/product/UpdateProductPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";
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
import DialogProvider from "@/context/provider/DialogProvider.tsx";
import SheetProvider from "@/context/provider/SheetProvider.tsx";
import { CustomerManagementPage } from "@/pages/admin/customer/CustomerManagementPage.tsx";
import CustomerDetailManagementPage from "@/pages/admin/customer/CustomerDetailManagementPage.tsx";
import HoverCardProvider from "@/context/provider/HoverCardProvider.tsx";
import OrderResultPage from "@/pages/OrderResultPage.tsx";
import OrderDetailPage from "@/pages/OrderDetailPage.tsx";
import OrderManagementPage from "@/pages/admin/order/OrderManagementPage.tsx";
import OrderDetailManagementPage from "@/pages/admin/order/OrderDetailManagementPage.tsx";
import DashBoardPage from "@/pages/admin/dashboard/DashBoardPage.tsx";
import ProductManagementPage from "@/pages/admin/product/ProductManagementPage.tsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <HoverCardProvider>
          <SheetProvider>
            <Routes>
              <Route path={"/"} element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path={"test"} element={<TestPage />} />
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
                <Route path={"order/result"} element={<OrderResultPage />} />
                <Route path={"order/detail"} element={<OrderDetailPage />} />
              </Route>
              <Route path='/cart' element={<CartLayout />}>
                <Route index element={<CartPage />} />
              </Route>
              <Route path={"/admin"} element={<AdminLayout />}>
                <Route path={"products"} element={<ProductManagementPage />} />
                <Route path={"product/create"} element={<CreateProductPage />} />
                <Route path={"product/update/:id"} element={<UpdateProductPage />} />
                <Route path={"customers"} element={<CustomerManagementPage />} />
                <Route path={"customers/:id"} element={<CustomerDetailManagementPage />} />
                <Route path={"orders"} element={<OrderManagementPage />} />
                <Route path={"orders/:id"} element={<OrderDetailManagementPage />} />
                <Route path={""} element={<DashBoardPage />} />
              </Route>
              <Route path={"*"} element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </SheetProvider>
        </HoverCardProvider>
        <DialogProvider />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
