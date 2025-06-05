import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx";
import { EllipsisIcon, InboxIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import InfoCustomer from "@/components/admin/customer/InfoCustomer.tsx";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { CustomerManagementData } from "@/assets/data/cusotmerManagement.data.ts";
import DataTable from "@/components/dataTable/DataTable.tsx";
import { productColumns, ProductProp } from "@/components/dataTable/props/product.prop.tsx";
import { productColumnVariants } from "@/assets/data/admin/product/productColumns.data.ts";
import { useCallback, useState } from "react";
import OrderPaymentInfo from "@/components/admin/order/OrderPaymentInfo.tsx";
import FilterColumnData from "@/components/admin/filterColumnData/FilterColumndata.tsx";
import { SortDirection } from "@tanstack/react-table";
import { ProductSortEnum } from "@/utils/enums/admin/sort/productItemSort.enum.ts";

const customer = CustomerManagementData;

const OrderDetailManagementPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const products = productColumnVariants;
	const [tableData, setTableData] = useState<ProductProp[]>(products);

	const handleInputChange = useCallback((updater: (item: ProductProp, index: number) => ProductProp) => {
		setTableData((prev) => prev.map((item, index) => updater(item, index)));
	}, []);

	// Before passing to <DataTable />
	const dataWithHandler = tableData.map((item) => ({
		...item,
		onInputChange: handleInputChange,
	}));

	return (
		<>
			<header>
				<div className='flex items-center justify-between'>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href='/admin/orders'>
									<InboxIcon className={"size-4 sm:size-6"} />
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href='#'>
									<span className={"text-sm font-bold sm:text-2xl"}>#D{id}</span>
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<Popover>
						<PopoverTrigger className={"cursor-pointer"} asChild>
							<Button variant={"outline"} className={"max-sm:size-8"}>
								<span className={"max-sm:hidden"}>More actions</span>
								<EllipsisIcon className={"sm:hidden"} />
							</Button>
						</PopoverTrigger>
						<PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
							<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Duplicate</p>
							<p onClick={() => dispatch(showDialog("show-confirm"))} className={"cursor-pointer rounded-lg p-1 text-red-500 hover:bg-neutral-200"}>
								Delete order
							</p>
						</PopoverContent>
					</Popover>
				</div>
			</header>
			<main>
				<section className={"my-4 flex items-start justify-between space-x-3 max-sm:flex-wrap max-sm:space-y-2"}>
					<div className='shadow-accent-foreground w-full rounded-lg bg-white p-3 text-xs text-neutral-600 shadow-sm sm:w-7/10 sm:text-sm'>
						<span>Products</span>
						<FilterColumnData sortEnum={ProductSortEnum} placeholderInput={"Search prodcut"} DirectionSortBy={DirectionValues} />
						<DataTable columns={productColumns} data={dataWithHandler} />
					</div>
					<InfoCustomer {...customer} />
				</section>
				<div className='my-5 flex items-start max-sm:flex-wrap max-sm:space-y-4 sm:space-x-6'>
					<section className={"shadow-accent-foreground w-full rounded-lg bg-white p-3 shadow-sm sm:w-7/10"}>
						<span>Payment</span>
						<OrderPaymentInfo productItems={products} shippingFee={200000} paymentMethod={"MOMO"} />
					</section>
				</div>
			</main>
		</>
	);
};
const DirectionValues: Record<SortDirection, string> = {
	asc: "Oldest to newest",
	desc: "Newest to oldest",
};
export default OrderDetailManagementPage;
