import { InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { mockPayments } from "@/assets/data/admin/order/orders.data.ts";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { columns } from "@/components/dataTable/dataColumns/order.column.tsx";
import FilterColumnData from "@/components/admin/filterColumnData/FiterColumndata.tsx";
import { OrderSortEnum } from "@/utils/enums/admin/sort/orderSort.enum.ts";
import { SortDirection } from "@tanstack/react-table";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export default function OrderManagementPage() {
	const data = mockPayments
	const navigate = useNavigate();
	const handleWatchDetail = useCallback((id: number) => {
		navigate(`/admin/orders/${id}`);
	}, [])
	const handleDelete = useCallback((id: number) => {
		//TODO: implement delete here
		console.log(id);
	}, [])
	return (
		<main>
			<header className={"my-3"}>
				<div className="flex justify-between items-end">
					<p className="flex justify-end items-center space-x-2 text-sm sm:text-lg lg:text-2xl">
						<InboxIcon className={'size-4 sm:size-6 lg:size-8'} />
						<span className={"font-bold "}>Orders</span>
					</p>
					<div className="flex items-center space-x-2 text-center">
						<Button variant={"outline"} className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>Export</Button>
						<Button className={"cursor-pointer text-xs sm:text-md max-sm:h-8"}>Create Order</Button>
					</div>
				</div>
			</header>
			<FilterColumnData sortEnum={OrderSortEnum} placeholderInput={'Search Order'} DirectionSortBy={DirectionValues}/>
			<DataTable columns={columns(handleWatchDetail, handleDelete)} data={data} />
		</main>
	)
}

const DirectionValues: Record<SortDirection, string> = {
	asc: 'Oldest to newest',
	desc: 'Newest to oldest',
}