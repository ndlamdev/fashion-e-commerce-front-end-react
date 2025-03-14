import "@/assets/css/App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage.tsx";
import RootLayout from "@/layouts/RootLayout.tsx";
import CartPage from "@/pages/CartPage.tsx";
import CartLayout from "@/layouts/CartLayout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/cart" element={<CartLayout />}>
          <Route index element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
