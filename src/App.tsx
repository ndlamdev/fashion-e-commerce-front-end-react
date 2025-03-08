import "@/assets/css/App.css";
import Header from "@/components/header/Header.tsx";
import { useState } from "react";
import VerticalMenu from "@/components/menu/VerticalMenu.tsx";
import Footer from "@/components/footer/Footer.tsx";
import CardProduct from "@/components/card-product/CardProduct.tsx";

function App() {
	const [showVerticalMenu, setShowVerticalMenu] = useState<boolean>(false);

	return (
		<div className={"bg-[#faf9f8] h-[100%]"}>
			<div>
				<Header showMenu={() => setShowVerticalMenu(true)} />
				<div className='flex flex-wrap'>
					<CardProduct />
					<CardProduct />
					<CardProduct />
          <CardProduct />
          <CardProduct />
				</div>

				<Footer />
			</div>
			<VerticalMenu
				showMenu={showVerticalMenu}
				onHidden={() => setShowVerticalMenu(false)}
			/>
		</div>
	);
}

export default App;
