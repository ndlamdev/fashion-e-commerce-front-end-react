import { EllipsisIcon, UserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { SortDirection } from "@tanstack/react-table";
import FilterColumnData from "@/components/admin/filterColumnData/FiterColumndata.tsx";
import { CustomerSortEnum } from "@/utils/enums/admin/sort/customerSort.enum.ts";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { customerColumns } from "@/components/dataTable/dataColumns/customer.column.tsx";
import { customers } from "@/assets/data/admin/customer/customerDataColumn.data.ts";
import { useCallback } from "react";
import { useNavigate } from "react-router";

const DirectionValues: Record<SortDirection, string> = {
	asc: 'Tăng dần',
	desc: 'Giảm dần',
}

export function CustomerManagementPage() {
	const data = customers
	const navigate = useNavigate();
	const handleWatchDetail = useCallback((id: number) => {
		navigate(`/admin/customers/${id}`);
	}, [])
	const handleSaveLock = useCallback((id: number) => {
		//TODO: implement here
		console.log(id);
	}, [])
	return (
		<>
			<main>
				<header className={""}>
					<div className="flex justify-between items-end">
						<p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
							<UserRoundIcon className={'size-4 sm:size-6 lg:size-8'} />
							<span className={"font-bold "}>Khách hàng</span>
						</p>
						<div className="flex items-center space-x-2 text-center">
							<Popover>
								<PopoverTrigger className={"cursor-pointer visible sm:hidden"} asChild>
									<Button variant={"outline"} className={"cursor-pointer max-sm:size-8"}>
										<EllipsisIcon/>
									</Button>
								</PopoverTrigger>
								<PopoverContent className={"w-auto text-center -translate-1/14 translate-y-2 p-2 text-sm"}>
									<p className={'p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}>Nhập</p>
									<p className={'p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}>Xuất</p>
								</PopoverContent>
							</Popover>
							<Button variant={"outline"} className={"cursor-pointer max-sm:hidden"}>Nhập</Button>
							<Button variant={"outline"} className={"cursor-pointer max-sm:hidden"}>Xuất</Button>
							<Button className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>Thêm Khách hàng</Button>
						</div>
					</div>
				</header>
				<section className={"my-5"}>
					<FilterColumnData sortEnum={CustomerSortEnum} infoData={'0 khách hàng'} placeholderInput={'Tìm tên KH'} DirectionSortBy={DirectionValues} />
					<DataTable columns={customerColumns(handleWatchDetail, handleSaveLock)} data={data}/>
				</section>
			</main>
		</>
	);
}