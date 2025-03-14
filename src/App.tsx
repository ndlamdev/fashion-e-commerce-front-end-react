import "@/assets/css/App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage.tsx";
import RootLayout from "@/layouts/RootLayout.tsx";
import ProductDetailPage from "@/pages/ProductDetail.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path={'product-detail'} element={<ProductDetailPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
