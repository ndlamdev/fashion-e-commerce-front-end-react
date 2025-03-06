/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:18PM - 05/03/2025
 *  User: lam-nguyen
 **/

import { LucideSearch } from "@/assets/images/icons/LucideSearch";

function HorizontalMenu() {
	return (
		<div className={"w-[100%] hidden lg:grid grid-cols-4 grid-rows-1 mt-4"}>
			<div className={"col-span-1"}></div>
			<div className={"col-span-2 "}>
				<ul className={"flex items-center gap-4 justify-center mb-0"}>
					<li className={"text-lg font-medium"}>Menu 1</li>
					<li className={"text-lg font-medium"}>Menu 2</li>
					<li className={"text-lg font-medium"}>Menu 3</li>
					<li className={"text-lg font-medium"}>Menu 4</li>
				</ul>
			</div>
			<div className={"col-span-1 flex justify-center"}>
				<div className={"flex border-b-1 border-black  w-[70%]"}>
					<LucideSearch
						className={"w-[27px] h-[27px] me-2"}
						strokeWidth={1}
						width={27}
						height={27}
					/>
					<input
						className={
							"w-[100%]  border-none focus:outline-none active:border-none active:outline-none"
						}
					/>
				</div>
			</div>
		</div>
	);
}

export default HorizontalMenu;
