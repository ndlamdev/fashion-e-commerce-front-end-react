import "@/assets/css/App.css";
import Header from "@/components/header/Header.tsx";
import { useState } from "react";
import VerticalMenu from "@/components/menu/VerticalMenu.tsx";
import Footer from "@/components/footer/Footer.tsx";
import { productCardSamples } from "@/assets/data/productCard.data.ts";
import CardProduct from "@/components/card-product/CardProduct.tsx";

function App() {
	const [showVerticalMenu, setShowVerticalMenu] = useState<boolean>(false);
  const productCardDataSample = productCardSamples

	return (
		<div className={"bg-[#faf9f8] h-[100%]"}>
			<div>
				<Header showMenu={() => setShowVerticalMenu(true)} />
				<div className='flex flex-wrap'>
					{productCardDataSample.map((item, index) => (
						<CardProduct key={index} {...item} />
					))}
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
