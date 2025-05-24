import { ClipboardIcon, EllipsisIcon, UserRoundIcon } from "lucide-react";
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
import { HoverCardContext } from "@/context/admin/customer/HoverCardContext.ts";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { HoverCardEnum } from "@/utils/enums/hoverCard.enum.ts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { HoverCardValues } from "@/context/admin/customer/provider/HoverCardProvider.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

export default function CustomerDetailManagementPage() {
	const { showHoverCard, hoverCard } = useContext(HoverCardContext);
	// const { id } = useParams();
	const customer = CustomerManagementData;
	const data = HoverCardValues[hoverCard];
	return (
		<>
			<main>
				<header>
					<div className="flex justify-between items-end">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href="/admin"><UserRoundIcon className={"size-4 sm:size-6"} /></BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink href="#"><span className={"font-bold text-xs sm:text-2xl"}>{customer.full_name}</span></BreadcrumbLink>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<Popover>
							<PopoverTrigger className={"cursor-pointer"} asChild>
								<Button variant={"outline"} className={"cursor-pointer max-sm:size-8"}>
									More actions
								</Button>
							</PopoverTrigger>
							<PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
								<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Merge Customer</p>
								<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Request customer data</p>
								<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Erase customer data</p>
								<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer text-red-500"}>Delete customer</p>
							</PopoverContent>
						</Popover>
					</div>
				</header>
				<section
					className={"my-4 grid grid-cols-4  rounded-lg shadow-sm shadow-accent-foreground bg-white"}>
					<HoverCard openDelay={50} closeDelay={100}>
						<HoverCardTrigger onMouseEnter={() => {
							showHoverCard(HoverCardEnum.AMOUNT_SPENT);
						}} className="p-2 hover:bg-neutral-200 rounded-lg">
							<p
								className="underline underline-offset-2 decoration-dashed cursor-pointer">Amount
								spent</p>
							<p className="">{formatCurrency(customer.amount_spent)}</p>
						</HoverCardTrigger>
						<HoverCardTrigger onMouseEnter={() => {
							showHoverCard(HoverCardEnum.ORDERS);
						}} className="p-2 hover:bg-neutral-200 rounded-lg">
							<p className="underline underline-offset-2 decoration-dashed cursor-pointer">Orders</p>
							<p className="">{customer.orders}</p>
						</HoverCardTrigger>
						<HoverCardTrigger onMouseEnter={() => {
							showHoverCard(HoverCardEnum.CUSTOMER_SINCE);
						}} className="p-2 hover:bg-neutral-200 rounded-lg">
							<p className="underline underline-offset-2 decoration-dashed cursor-pointer">Customer since </p>
							<p className="">{customer.customer_since} days</p>
						</HoverCardTrigger>
						<HoverCardTrigger onMouseEnter={() => {
							showHoverCard(HoverCardEnum.RFM_GROUP);
						}} className="p-2 hover:bg-neutral-200 rounded-lg">
							<p className="underline underline-offset-2 decoration-dashed cursor-pointer">RFM Group</p>
							<p className="">{customer.rfm_group}</p>
						</HoverCardTrigger>
						<HoverCardContent
							style={{
								transform: `translate(${(-100 * ((Object.values(HoverCardValues).length - hoverCard.valueOf() - 1) % Object.values(HoverCardValues).length))}%, ${0}px)`,
							}}
							className={""}>
							<p className={"font-bold"}>{data.title}</p>
							<p className={"text-wrap"}>{data.description}</p>
							{data.footer}
						</HoverCardContent>
					</HoverCard>
				</section>

				<div className="flex items-start max-sm:flex-wrap my-5 space-x-6">
					<section className={"rounded-lg shadow-sm shadow-accent-foreground w-7/10 p-3 bg-white"}>
						{!customer.order_list?.length && <div className={"flex justify-between items-center"}>
							<div className="space-y-3">
								<p className="font-bold text-xs sm:text-sm">Last order placed</p>
								<p className="text-xs sm:text-sm text-neutral-600 italic">This customer hasn’t placed any orders yet</p>
								<Button variant={'outline'} className={'cursor-pointer'}>Create Order</Button>
							</div>
							<img src={"https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/empty-state-orders-1-3vUe-nXUGWPA.svg"} alt={""} />
						</div>}
					</section>
					<section className={"rounded-lg shadow-sm shadow-accent-foreground w-3/10 p-3 bg-white text-xs sm:text-sm text-neutral-600"}>
						<div className="flex justify-between items-center">
							<span className={'font-bold'}>Customer</span>
							<Popover>
								<PopoverTrigger className={"cursor-pointer"} asChild>
									<Button variant={"ghost"} className={"cursor-pointer max-sm:size-8"}>
										<EllipsisIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
									<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Edit contact information</p>
									<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Manage address</p>
									<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer"}>Edit marketing settings</p>
									<p className={"p-1 hover:bg-neutral-200 rounded-lg cursor-pointer "}>Edit tax details</p>
								</PopoverContent>
							</Popover>
						</div>
						<p className={'font-bold my-2'}>Contact information</p>
						<p className={'flex justify-between'}><span className={'text-sky-700 hover:underline cursor-pointer'}>{customer.email}</span> <ClipboardIcon onClick={() => navigator.clipboard.writeText(customer.email ?? '')} className={'size-4 cursor-pointer'}/></p>
						{customer.phone && <p>{customer.phone}</p>}
						<p className={'font-bold my-2'}>Default address</p>
						<p>{customer.full_name}</p>
						<p>{customer.address_default?.street}</p>
						<p>{customer.address_default?.ward}</p>
						<p>{customer.address_default?.district}</p>
						<p>{customer.address_default?.city}</p>
						<p>{customer.address_default?.phone}</p>
						<p className={'font-bold my-2'}>Marketing</p>
						<div className="flex space-x-2 mb-2">
							<Checkbox value={'email-subscribed'} id={'email-subscribed'}/>
							<Label htmlFor={'email-subscribed'}>Email not subscribed</Label>
						</div>
						<div className="flex space-x-2">
							<Checkbox value={'SMS-subscribed'} id={'SMS-subscribed'}/>
							<Label htmlFor={'SMS-subscribed'}>SMS subscribed</Label>
						</div>
					</section>
				</div>
			</main>
		</>
	);
}