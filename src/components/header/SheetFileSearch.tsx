/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:34PM - 30/03/2025
 *  User: lam-nguyen
 **/
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet.tsx";

function SheetFileSearch() {
	return (
		<SheetContent className={"px-5"} side={"top"}>
			<SheetHeader>
				<SheetTitle>Tìm kiếm bằng hình ảnh</SheetTitle>
			</SheetHeader>
			<div className={"flex items-center justify-between"}>
				<div className={"h-[20%] w-[70%] rounded-lg border border-gray-200"}>hello</div>
			</div>
		</SheetContent>
	);
}

export default SheetFileSearch;
