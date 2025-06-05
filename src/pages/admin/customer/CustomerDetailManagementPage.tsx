import { ClipboardIcon, EllipsisIcon, UserRoundIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx";
import { CustomerManagementData } from "@/assets/data/cusotmerManagement.data.ts";
import { useContext } from "react";
import { HoverCardContext } from "@/context/HoverCardContext.ts";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { HoverCardEnum } from "@/utils/enums/hoverCard.enum.ts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx";
import { HoverCardValues } from "@/context/provider/HoverCardProvider.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useDispatch, useSelector } from "react-redux";
import { hiddenDialog, showDialog } from "@/redux/slice/dialog.slice.ts";
import { RootState } from "@/configs/store.config.ts";
import DialogConfirm from "@/components/dialog/DialogConfirm.tsx";
import { useParams } from "react-router";

const customer = CustomerManagementData;

export default function CustomerDetailManagementPage() {
	const { showHoverCard, hoverCard } = useContext(HoverCardContext);
	const dispatch = useDispatch();
	const { dialog } = useSelector((state: RootState) => state.dialog);
	const { id } = useParams();
	console.log(id);
	const data = HoverCardValues[hoverCard];
	return (
		<>
			<header>
				<div className='flex items-center justify-between'>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href='/admin/customers'>
									<UserRoundIcon className={"size-4 sm:size-6"} />
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href='#'>
									<span className={"text-sm font-bold sm:text-2xl"}>{customer.full_name}</span>
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
							<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Merge Customer</p>
							<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Request customer data</p>
							<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Erase customer data</p>
							<p onClick={() => dispatch(showDialog("show-confirm"))} className={"cursor-pointer rounded-lg p-1 text-red-500 hover:bg-neutral-200"}>
								Delete customer
							</p>
						</PopoverContent>
					</Popover>
				</div>
			</header>
			<main>
				<section className={"shadow-accent-foreground my-4 grid grid-cols-4 rounded-lg bg-white shadow-sm"}>
					<HoverCard openDelay={50} closeDelay={100}>
						<HoverCardTrigger
							onMouseEnter={() => {
								showHoverCard(HoverCardEnum.AMOUNT_SPENT);
							}}
							className='rounded-lg p-2 text-xs hover:bg-neutral-200 sm:text-sm'>
							<p className='cursor-pointer underline decoration-dashed underline-offset-2'>Amount spent</p>
							<p className=''>{formatCurrency(customer.amount_spent)}</p>
						</HoverCardTrigger>
						<HoverCardTrigger
							onMouseEnter={() => {
								showHoverCard(HoverCardEnum.ORDERS);
							}}
							className='rounded-lg p-2 text-xs hover:bg-neutral-200 sm:text-sm'>
							<p className='cursor-pointer underline decoration-dashed underline-offset-2'>Orders</p>
							<p className=''>{customer.orders}</p>
						</HoverCardTrigger>
						<HoverCardTrigger
							onMouseEnter={() => {
								showHoverCard(HoverCardEnum.CUSTOMER_SINCE);
							}}
							className='rounded-lg p-2 text-xs hover:bg-neutral-200 sm:text-sm'>
							<p className='cursor-pointer underline decoration-dashed underline-offset-2'>Customer since </p>
							<p className=''>{customer.customer_since} days</p>
						</HoverCardTrigger>
						<HoverCardTrigger
							onMouseEnter={() => {
								showHoverCard(HoverCardEnum.RFM_GROUP);
							}}
							className='rounded-lg p-2 text-xs hover:bg-neutral-200 sm:text-sm'>
							<p className='cursor-pointer underline decoration-dashed underline-offset-2'>RFM Group</p>
							<p className=''>{customer.rfm_group}</p>
						</HoverCardTrigger>
						<HoverCardContent
							style={{
								transform: `translate(${-100 * ((Object.values(HoverCardValues).length - hoverCard.valueOf() - 1) % Object.values(HoverCardValues).length)}%, ${0}px)`,
							}}
							className={"text-xs sm:text-sm"}>
							<p className={"font-bold"}>{data.title}</p>
							<p className={"text-wrap"}>{data.description}</p>
							{data.footer}
						</HoverCardContent>
					</HoverCard>
				</section>

				<div className='my-5 flex items-start max-sm:flex-wrap max-sm:space-y-4 sm:space-x-6'>
					<section className={"shadow-accent-foreground w-full rounded-lg bg-white p-3 shadow-sm sm:w-7/10"}>
						{!customer.order_list?.length && (
							<div className={"flex items-center justify-between"}>
								<div className='space-y-3'>
									<p className='text-xs font-bold sm:text-sm'>Last order placed</p>
									<p className='text-xs text-neutral-600 italic sm:text-sm'>This customer hasn’t placed any orders yet</p>
									<Button variant={"outline"} className={"cursor-pointer"}>
										Create Order
									</Button>
								</div>
								<img
									src={"https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/empty-state-orders-1-3vUe-nXUGWPA.svg"}
									alt={""}
									className={"max-sm:hidden"}
								/>
							</div>
						)}
					</section>
					<section className={"shadow-accent-foreground w-full rounded-lg bg-white p-3 text-xs text-neutral-600 shadow-sm sm:w-3/10 sm:text-sm"}>
						<div className='flex items-center justify-between'>
							<span className={"font-bold"}>Customer</span>
							<Popover>
								<PopoverTrigger className={"cursor-pointer"} asChild>
									<Button variant={"ghost"} className={"cursor-pointer max-sm:size-8"}>
										<EllipsisIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-xs sm:text-sm"}>
									<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Edit contact information</p>
									<p onClick={() => dispatch(showDialog("manage-addresses"))} className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>
										Manage address
									</p>
									<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Edit marketing settings</p>
									<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Edit tax details</p>
								</PopoverContent>
							</Popover>
						</div>
						<p className={"my-2 font-bold"}>Contact information</p>
						<p className={"flex justify-between"}>
							<span className={"cursor-pointer text-sky-700 hover:underline"}>{customer.email}</span>{" "}
							<ClipboardIcon onClick={() => navigator.clipboard.writeText(customer.email ?? "")} className={"size-4 cursor-pointer"} />
						</p>
						{customer.phone && <p>{customer.phone}</p>}
						<p className={"my-2 font-bold"}>Default address</p>
						<p>{customer.full_name}</p>
						<p>{customer.address_default?.street}</p>
						<p>{customer.address_default?.ward}</p>
						<p>{customer.address_default?.district}</p>
						<p>{customer.address_default?.city}</p>
						<p>{customer.address_default?.phone}</p>
						<p className={"my-2 font-bold"}>Marketing</p>
						<div className='mb-2 flex space-x-2'>
							<Checkbox value={"email-subscribed"} id={"email-subscribed"} />
							<Label htmlFor={"email-subscribed"} className={"text-xs sm:text-sm"}>
								Email not subscribed
							</Label>
						</div>
						<div className='flex space-x-2'>
							<Checkbox value={"SMS-subscribed"} id={"SMS-subscribed"} />
							<Label htmlFor={"SMS-subscribed"} className={"text-xs sm:text-sm"}>
								SMS subscribed
							</Label>
						</div>
					</section>
				</div>
			</main>
			<DialogConfirm
				open={dialog === "show-confirm"}
				onOpenChange={(value) => !value && showDialog("none")}
				onClickCancel={() => {
					dispatch(hiddenDialog());
				}}
				onClickSubmit={() => {
					dispatch(hiddenDialog());
					showDialog("none");
				}}
				title={"Are you sure you want to delete this customer?"}
			/>
		</>
	);
}
