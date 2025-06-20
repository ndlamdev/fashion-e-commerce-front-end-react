import Address from "@/components/profile/tab/AddressTab.tsx";
import FAQTab from "@/components/profile/tab/FAQTab.tsx";
import HistoryOrder from "@/components/profile/tab/HistoryOrderTab.tsx";
import HistoryPoint from "@/components/profile/tab/HistoryPointTab.tsx";
import Info from "@/components/profile/tab/InfoTab.tsx";
import ReferFriend from "@/components/profile/tab/ReferFriendTab.tsx";
import Review from "@/components/profile/tab/ReviewTab.tsx";
import VoucherWallet from "@/components/profile/tab/VoucherWalletTab.tsx";
import DialogProvider from "@/context/provider/DialogProvider.tsx";
import HoverCardProvider from "@/context/provider/HoverCardProvider.tsx";
import SheetProvider from "@/context/provider/SheetProvider.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";
import RootLayout from "@/layouts/RootLayout.tsx";
import BoothPage from "@/pages/BoothPage.tsx";
import CartPage from "@/pages/CartPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import OrderDetailPage from "@/pages/OrderDetailPage.tsx";
import OrderResultPage from "@/pages/OrderResultPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import TestPage from "@/pages/TestPage.tsx";
import CustomerDetailManagementPage from "@/pages/admin/customer/CustomerDetailManagementPage.tsx";
import { CustomerManagementPage } from "@/pages/admin/customer/CustomerManagementPage.tsx";
import DashBoardPage from "@/pages/admin/dashboard/DashBoardPage.tsx";
import OrderDetailManagementPage from "@/pages/admin/order/OrderDetailManagementPage.tsx";
import OrderManagementPage from "@/pages/admin/order/OrderManagementPage.tsx";
import CreateProductPage from "@/pages/admin/product/CreateProductPage.tsx";
import ProductManagementPage from "@/pages/admin/product/ProductManagementPage.tsx";
import UpdateProductPage from "@/pages/admin/product/UpdateProductPage.tsx";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import store, { useAppSelector } from "./configs/store.config";
import jwtHelper from "./utils/helper/jwtHelper";
import CollectionManagementPage from "./pages/admin/collection/CollectionManagementPage";
import InventoryManagementPage from "./pages/admin/inventory/InventoryManagementPage";
import MediaManagementPage from "./pages/admin/media/MediaManagementPage";
import "@/configs/i18n.config.ts";

function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}


function MainRouter() {
  const { access_token } = useAppSelector((state) => state.auth);

  const isRoleAdmin = useMemo(() => {
    try {
      const payload = jwtHelper.getPayload(access_token ?? "");
      return payload?.roles.includes("ROLE_ADMIN")
    } catch (e) {
      console.error(e)
      return false;
    }
  }, [access_token])

  return (
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
            {isRoleAdmin && <Route path={"/admin"} element={<AdminLayout />}>
              <Route path={"products"} element={<ProductManagementPage />} />
              <Route path={"product/create"} element={<CreateProductPage />} />
              <Route path={"product/update/:id"} element={<UpdateProductPage />} />
              <Route path={"customers"} element={<CustomerManagementPage />} />
              <Route path={"customers/segments"} element={<NotFoundPage />} />
              <Route path={"customers/:id"} element={<CustomerDetailManagementPage />} />
              <Route path={"orders"} element={<OrderManagementPage />} />
              <Route path={"orders/abandoned-checkouts"} element={<OrderManagementPage abandonedCheckout={true} />} />
              <Route path={"orders/:id"} element={<OrderDetailManagementPage />} />
              <Route path={""} element={<DashBoardPage />} />
              <Route path={"collections"} element={<CollectionManagementPage />} />
              <Route path={"inventories"} element={<InventoryManagementPage />} />
              <Route path={"medias"} element={<MediaManagementPage />} />
            </Route>}
            <Route path={"*"} element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </SheetProvider>
      </HoverCardProvider>
      <DialogProvider />
    </BrowserRouter>
  )
}


export default App;
