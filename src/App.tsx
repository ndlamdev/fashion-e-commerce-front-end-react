import "@/assets/css/App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage.tsx";
import RootLayout from "@/layouts/RootLayout.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
