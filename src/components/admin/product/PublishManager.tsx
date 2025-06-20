/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:26 AM - 17/04/2025
 *  User: kimin
 **/

import { HealthiconsIScheduleSchoolDateTimeOutline } from "@/assets/images/icons/HealthiconsIScheduleSchoolDateTimeOutline.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

function PublishManager(
	props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		onDateOpenStoreChange: (value: Dayjs | null) => void;
	},
) {
	const [open, setOpen] = useState(false);

	return (
		<div {...props}>
			<div>
				<h5 className={"text-sm font-[510] text-gray-700"}>Kênh phân phối</h5>
				<div className={"mt-0.5 flex items-center justify-between"}>
					<div className={"flex items-center gap-2"}>
						<span className={"block h-2 w-2 rounded-[2px] border-1 border-gray-500"} />
						<span className={"text-[13px] text-gray-500"}>Cửa hàng trực tuyến</span>
					</div>
					<HealthiconsIScheduleSchoolDateTimeOutline width={20} height={20} color={"gray"} className={"cursor-pointer"} onClick={() => setOpen(true)} />
					<div className={"hidden"}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker open={open} onClose={() => setOpen(false)} onChange={props.onDateOpenStoreChange} defaultValue={dayjs()} />
						</LocalizationProvider>
					</div>
				</div>
			</div>
			<div>
				<h5 className={"mt-2 text-sm font-[510] text-gray-700"}>Địa điểm</h5>
				<div className={"mt-0.5 flex items-center justify-between"}>
					<div className={"flex items-center gap-2"}>
						<span className={"block h-2 w-2 rounded-[2px] border-1 border-gray-500"} />
						<span className={"text-[13px] text-gray-500"}>Việt Nam</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PublishManager;
