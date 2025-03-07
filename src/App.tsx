import "@/assets/css/App.css";
import Header from "@/components/header/Header.tsx";
import { useState } from "react";
import VerticalMenu from "@/components/menu/VerticalMenu.tsx";
import Footer from "@/components/footer/Footer.tsx";

function App() {
  const [showVerticalMenu, setShowVerticalMenu] = useState<boolean>(false);
  const [showVerticalMenuComplete, setShowVerticalMenuComplete] = useState<boolean>(false);

  return (
    <div className={"h-full"}>
      <div className={`bg-[#faf9f8] ${showVerticalMenuComplete ? "hidden" : "block"} lg:block`}>
        <Header showMenu={() => {
          setShowVerticalMenu(true);
        }} />
        <Footer />
      </div>
      <VerticalMenu
        showMenu={showVerticalMenu}
        onAnimationComplete={() => setShowVerticalMenuComplete(true)}
        onHidden={() => {
          setShowVerticalMenu(false);
          setShowVerticalMenuComplete(false);
        }}
      />
    </div>
  );
}

export default App;
