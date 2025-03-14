/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:17AM - 13/03/2025
 *  User: lam-nguyen
 **/

import { HeroiconsShoppingBagSolid } from "@/assets/images/icons/HeroiconsShoppingBagSolid.tsx";

function ShoppingBag({ countItem = 0 }: { countItem?: number }) {
	return (
		<div className={"relative w-8 h-8"}>
			<HeroiconsShoppingBagSolid width={28} height={28} />
			<div className={`absolute bottom-0 right-0 rounded-full bg-red-600 text-white text-[10px] z-1 w-4 h-4 flex justify-center items-center`}>{countItem}</div>
		</div>
	);
}

export default ShoppingBag;
