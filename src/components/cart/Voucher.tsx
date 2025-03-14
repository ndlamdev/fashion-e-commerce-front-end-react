/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:21PM - 13/03/2025
 *  User: lam-nguyen
 **/

import { formatDate } from "@/utils/format-data.ts";
import VoucherType from "@/types/VoucherType.ts";

type VoucherProps = VoucherType & { onClick?: () => void; selected?: boolean };

function Voucher({ code, detail, expiryDate, remaining, selected, onClick }: VoucherProps & { onClick?: () => void }) {
	return (
		<div className={"bg-gray-200 rounded-lg w-80 h-30 overflow-hidden flex flex-none"} onClick={onClick}>
			<div className={"relative w-10 border-r-[2px] border-gray-300 h-full border-dashed"}>
				<div className={"absolute w-6 h-6 bg-white rounded-full top-11 left-[-14px] z-1"} />
			</div>
			<div className={"py-2 pl-4 pr-3 flex justify-between"}>
				<div className={"flex flex-col justify-between"}>
					<div>
						<h4 className={"font-bold text-lg inline mr-2"}>{code}</h4>
						<i className={"text-sm inline"}>(còn {remaining})</i>
						<p className={"text-[0.8rem] text-gray-600"}>{detail}</p>
					</div>
					<p className={"text-[0.75rem]"}>HSD: {formatDate(expiryDate)}</p>
				</div>
				<div className={"h-full w-20 flex items-end relative justify-center"}>
					<input type='radio' className={"w-5 h-5 absolute top-10"} checked={selected} />
					<button className={"text-[0.75rem] text-blue-800"}>Điều kiện</button>
				</div>
			</div>
		</div>
	);
}

export default Voucher;
