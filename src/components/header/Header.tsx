/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:46AM - 05/03/2025
 * User: lam-nguyen
 **/
import { SolarHeartLinear } from "@/assets/images/icons/SolarHeartLinear.tsx";
import { StreamlineShoppingBagHandBag2 } from "@/assets/images/icons/StreamlineShoppingBagHandBag2.tsx";
import { SolarHamburgerMenuLinear } from "@/assets/images/icons/SolarHamburgerMenuLinear.tsx";
import { LucideSearch } from "@/assets/images/icons/LucideSearch.tsx";

function Header({ showMenu }: { showMenu: () => void }) {
	return (
		<div>
			<div
				className={"grid grid-cols-3 grid-rows-1 align-items-center py-3 px-4"}
			>
				<div className={"col-span-1 flex align-items-center gap-3"}>
					<div onClick={showMenu} className={"lg:hidden"}>
						<SolarHamburgerMenuLinear width={30} height={30} />
					</div>

					<div className={"bg-blue-400 p-4"}>Logo</div>
				</div>
				<div className='lg:col-span-1 flex justify-center'>
					<ul className={"flex items-center gap-4 justify-center mb-0"}>
						<li className={"text-lg font-medium"}>Menu 1</li>
						<li className={"text-lg font-medium"}>Menu 2</li>
						<li className={"text-lg font-medium"}>Menu 3</li>
						<li className={"text-lg font-medium"}>Menu 4</li>
					</ul>
				</div>
				<div className={"lg:col-span-1 flex justify-end gap-3"}>
					<a href={"#"}>
						<LucideSearch width={30} height={30} />
					</a>
					<a href={"#"}>
						<SolarHeartLinear width={30} height={30} />
					</a>
					<a href={"#"}>
						<StreamlineShoppingBagHandBag2 width={28} height={28} />
					</a>
				</div>
			</div>
		</div>
	);
}

export default Header;
