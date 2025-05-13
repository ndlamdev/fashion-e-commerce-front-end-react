/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:45PM - 10/03/2025
 *  User: lam-nguyen
 **/
import Input from "@/components/form/Input.tsx";
import { LucideSearch } from "@/assets/images/icons/LucideSearch.tsx";
import { CilMicrophone } from "@/assets/images/icons/CilMicrophone.tsx";
import { SystemUiconsPicture } from "@/assets/images/icons/SystemUiconsPicture.tsx";
import { useDispatch } from "react-redux";
import { setSheetType } from "@/redux/slice/sheet.slice.ts";

function Searcher() {
	const dispatch = useDispatch();
	return (
		<Input
			className={"rounded] z-4 hidden w-[50%] items-center rounded-4xl border-1 border-gray-500 p-2 hover:border-black lg:flex"}
			placeholder={"Tìm kiếm sản phẩm..."}
			inputClassName={"p-1 text-sm"}
			rightIcon={
				<div className={"flex gap-1"}>
					<LucideSearch width={25} height={25} />
					<CilMicrophone width={25} height={25} />
					<SystemUiconsPicture width={25} height={25} onClick={() => dispatch(setSheetType("FILE_SEARCH"))} />
				</div>
			}
		/>
	);
}

export default Searcher;
