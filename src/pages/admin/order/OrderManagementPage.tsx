import { InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { mockPayments } from "@/assets/data/admin/order/orders.data.ts";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { columns } from "@/components/dataTable/props/order.prop.tsx";
import FilterColumnData from "@/components/admin/filterColumnData/FilterColumndata.tsx";
import { OrderSortEnum } from "@/utils/enums/admin/sort/orderSort.enum.ts";
import { SortDirection } from "@tanstack/react-table";

export default function OrderManagementPage() {
	const data = mockPayments;
	return (
		<div>
			<header className={"mb-3"}>
				<div className='flex items-end justify-between'>
					<p className='flex items-center justify-end space-x-2 text-sm sm:text-lg lg:text-2xl'>
						<InboxIcon className={"size-4 sm:size-6 lg:size-8"} />
						<span className={"font-bold"}>Orders</span>
					</p>
					<div className='flex items-center space-x-2 text-center'>
						<Button variant={"outline"} className={"sm:text-md cursor-pointer text-xs max-sm:h-8"}>
							Export
						</Button>
						<Button className={"sm:text-md cursor-pointer text-xs max-sm:h-8"}>Create Order</Button>
					</div>
				</div>
			</header>
			<main>
				<FilterColumnData sortEnum={OrderSortEnum} placeholderInput={"Search Order"} DirectionSortBy={DirectionValues} />
				<DataTable columns={columns} data={data} />
			</main>
		</div>
	);
}

const DirectionValues: Record<SortDirection, string> = {
	asc: "Oldest to newest",
	desc: "Newest to oldest",
};
