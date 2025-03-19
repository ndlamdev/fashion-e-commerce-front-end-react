/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:17AM - 13/03/2025
 *  User: lam-nguyen
 **/

import { HeroiconsShoppingBagSolid } from "@/assets/images/icons/HeroiconsShoppingBagSolid.tsx";
import ShoppingBagProps from "@/components/cart/props/shopping-bag.prop.ts";

function ShoppingBag({ countItem = 0, onClick }: ShoppingBagProps) {
	return (
		<div className={"relative h-8 w-8"} onClick={onClick}>
			<HeroiconsShoppingBagSolid width={28} height={28} />
			<div className={`absolute right-0 bottom-0 z-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white`}>{countItem}</div>
		</div>
	);
}

export default ShoppingBag;
