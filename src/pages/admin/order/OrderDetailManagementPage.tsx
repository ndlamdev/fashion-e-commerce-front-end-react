import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { EllipsisIcon, InboxIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import InfoCustomer from "@/components/admin/customer/InfoCustomer.tsx";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { CustomerManagementData } from "@/assets/data/cusotmerManagement.data.ts";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { productColumns } from "@/components/dataTable/props/product.prop.tsx";
import { productColumnVariants } from "@/assets/data/admin/product/productColumns.data.ts";
import { useCallback, useState } from "react";
import FilterColumnData from "@/components/admin/filterColumnData/FiterColumndata.tsx";
import { OrderSortEnum } from "@/utils/enums/admin/sort/orderSort.enum.ts";
import { SortDirection } from "@tanstack/react-table";

const OrderDetailManagementPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	console.log(id);
	const customer = CustomerManagementData;
	const products = productColumnVariants
	const [tableData, setTableData] = useState<ProductProp[]>(products);

	const handleInputChange = useCallback((updater: (item: ProductProp, index: number) => ProductProp) => {
		setTableData(prev =>
			prev.map((item, index) => updater(item, index))
		);
	}, [])

// Before passing to <DataTable />
	const dataWithHandler = tableData.map((item, index) => ({
		...item,
		onInputChange: handleInputChange
	}));

	return (
		<>
			<main>
				<header>
					<div className="flex justify-between items-center">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href="/admin/orders"><InboxIcon className={"size-4 sm:size-6"} /></BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink href="#"><span className={"font-bold text-sm sm:text-2xl"}>#D{id}</span></BreadcrumbLink>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<Popover>
							<PopoverTrigger className={"cursor-pointer"} asChild>
								<Button variant={"outline"} className={" max-sm:size-8"}>
									<span className={'max-sm:hidden'}>More actions</span>
									<EllipsisIcon className={"sm:hidden"} />
								</Button>
							</PopoverTrigger>
							<PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
								<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Duplicate</p>
								<p onClick={() => dispatch(showDialog('show-confirm'))} className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer text-red-500"}>Delete order</p>
							</PopoverContent>
						</Popover>
					</div>
				</header>
				<section
					className={"flex justify-between my-4 p-2 space-x-3 items-start"}>
					<div className="rounded-lg shadow-sm shadow-accent-foreground  w-full sm:w-7/10 p-3 bg-white text-xs sm:text-sm text-neutral-600">
						<span>Products</span>
						<DataTable columns={productColumns} data={dataWithHandler} />
					</div>
					<InfoCustomer {...customer} />
				</section>

				<div className="flex items-start max-sm:flex-wrap my-5 sm:space-x-6 max-sm:space-y-4">
					<section className={"rounded-lg shadow-sm shadow-accent-foreground w-full sm:w-7/10 p-3 bg-white"}>
					</section>
				</div>
			</main>
		</>
	)
}

export default OrderDetailManagementPage