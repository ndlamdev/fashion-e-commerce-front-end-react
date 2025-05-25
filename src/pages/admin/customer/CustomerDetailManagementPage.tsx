import { EllipsisIcon, UserRoundIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { CustomerManagementData } from "@/assets/data/cusotmerManagement.data.ts";
import { useContext } from "react";
import { HoverCardContext } from "@/context/HoverCardContext.ts";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { HoverCardEnum } from "@/utils/enums/hoverCard.enum.ts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { HoverCardValues } from "@/context/provider/HoverCardProvider.tsx";
import { useDispatch } from "react-redux";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import { useParams } from "react-router";
import InfoCustomer from "@/components/admin/customer/InfoCustomer.tsx";

export default function CustomerDetailManagementPage() {
	const { showHoverCard, hoverCard } = useContext(HoverCardContext);
	const dispatch = useDispatch();
	const { id } = useParams();
	console.log(id);
	const customer = CustomerManagementData;
	const data = HoverCardValues[hoverCard];
	return (
		<>
			<main>
				<header>
					<div className="flex justify-between items-center">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href="/admin/customers"><UserRoundIcon className={"size-4 sm:size-6"} /></BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink href="#"><span className={"font-bold text-sm sm:text-2xl"}>{customer.full_name}</span></BreadcrumbLink>
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
								<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Merge Customer</p>
								<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Request customer data</p>
								<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Erase customer data</p>
								<p onClick={() => dispatch(showDialog('show-confirm'))} className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer text-red-500"}>Delete customer</p>
							</PopoverContent>
						</Popover>
					</div>
				</header>
				<section
					className={"my-4 grid grid-cols-4  rounded-lg shadow-sm shadow-accent-foreground bg-white"}>
					<HoverCard openDelay={50} closeDelay={100}>
						<HoverCardTrigger onMouseEnter={() => {
							showHoverCard(HoverCardEnum.AMOUNT_SPENT);
						}} className="p-2 hover:bg-neutral-200 rounded-lg  text-xs sm:text-sm">
							<p
								className="underline underline-offset-2 decoration-dashed cursor-pointer">Amount
								spent</p>
							<p className="">{formatCurrency(customer.amount_spent)}</p>
						</HoverCardTrigger>
						<HoverCardTrigger onMouseEnter={() => {
							showHoverCard(HoverCardEnum.ORDERS);
						}} className="p-2 hover:bg-neutral-200 rounded-lg text-xs sm:text-sm">
							<p className="underline underline-offset-2 decoration-dashed cursor-pointer">Orders</p>
							<p className="">{customer.orders}</p>
						</HoverCardTrigger>
						<HoverCardTrigger onMouseEnter={() => {
							showHoverCard(HoverCardEnum.CUSTOMER_SINCE);
						}} className="p-2 hover:bg-neutral-200 rounded-lg text-xs sm:text-sm">
							<p className="underline underline-offset-2 decoration-dashed cursor-pointer ">Customer since </p>
							<p className="">{customer.customer_since} days</p>
						</HoverCardTrigger>
						<HoverCardTrigger onMouseEnter={() => {
							showHoverCard(HoverCardEnum.RFM_GROUP);
						}} className="p-2 hover:bg-neutral-200 rounded-lg text-xs sm:text-sm">
							<p className="underline underline-offset-2 decoration-dashed cursor-pointer ">RFM Group</p>
							<p className="">{customer.rfm_group}</p>
						</HoverCardTrigger>
						<HoverCardContent
							style={{
								transform: `translate(${(-100 * ((Object.values(HoverCardValues).length - hoverCard.valueOf() - 1) % Object.values(HoverCardValues).length))}%, ${0}px)`,
							}}
							className={"text-xs sm:text-sm"}>
							<p className={"font-bold"}>{data.title}</p>
							<p className={"text-wrap"}>{data.description}</p>
							{data.footer}
						</HoverCardContent>
					</HoverCard>
				</section>

				<div className="flex items-start max-sm:flex-wrap my-5 sm:space-x-6 max-sm:space-y-4">
					<section className={"rounded-lg shadow-sm shadow-accent-foreground w-full sm:w-7/10 p-3 bg-white"}>
						{!customer.order_list?.length && <div className={"flex justify-between items-center"}>
							<div className="space-y-3">
								<p className="font-bold text-xs sm:text-sm">Last order placed</p>
								<p className="text-xs sm:text-sm text-neutral-600 italic">This customer hasn’t placed any orders yet</p>
								<Button variant={'outline'} className={'cursor-pointer'}>Create Order</Button>
							</div>
							<img src={"https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/empty-state-orders-1-3vUe-nXUGWPA.svg"} alt={""} className={'max-sm:hidden'}/>
						</div>}
					</section>
					<InfoCustomer {...customer}/>
				</div>
			</main>
		</>
	);
}