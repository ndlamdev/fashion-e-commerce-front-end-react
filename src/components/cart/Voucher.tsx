/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:21PM - 13/03/2025
 *  User: lam-nguyen
 **/

import { formatDate } from "@/utils/format-data.ts";
import VoucherType from "@/types/VoucherType.ts";
import { SheetTrigger } from "@/components/ui/sheet.tsx";

type VoucherProps = VoucherType & { onClick?: () => void; selected?: boolean };

function Voucher({ code, detail, expiryDate, remaining, selected, onClick }: VoucherProps & { onClick?: () => void }) {
	return (
		<div className={"flex h-30 w-80 flex-none overflow-hidden rounded-lg bg-gray-200"} onClick={onClick}>
			<div className={"relative h-full w-10 border-r-[2px] border-dashed border-gray-300"}>
				<div className={"absolute top-11 left-[-14px] z-1 h-6 w-6 rounded-full bg-white"} />
			</div>
			<div className={"flex justify-between py-2 pr-3 pl-4"}>
				<div className={"flex flex-col justify-between"}>
					<div>
						<h4 className={"mr-2 inline text-lg font-bold"}>{code}</h4>
						<i className={"inline text-sm"}>(còn {remaining})</i>
						<p className={"text-[0.8rem] text-gray-600"}>{detail}</p>
					</div>
					<p className={"text-[0.75rem]"}>HSD: {formatDate(expiryDate)}</p>
				</div>
				<div className={"relative flex h-full w-20 items-end justify-center"}>
					<input type='radio' className={"absolute top-10 h-5 w-5"} checked={selected} />
					<SheetTrigger asChild>
						<button className={"text-[0.75rem] text-blue-800"}>Điều kiện</button>
					</SheetTrigger>
				</div>
			</div>
		</div>
	);
}

export default Voucher;
