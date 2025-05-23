import { ArrowDownUpIcon, EllipsisIcon, SearchIcon, Trash2Icon, UserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import Input from "@/components/form/Input.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export function CustomerManagementPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = parseInt(searchParams.get("page") ?? "0");
	const goToPage = (page: number) => {
		searchParams.set("page", page + "");
		setSearchParams(searchParams);
	};
	const DataIds = [0, 1, 2];

	const [selectedAll, setSelectedAll] = useState<boolean>();
	const [selectedCustomers, setSelectedCustomers] = useState<number[]>();
	const handleDeleteCustomersChange = (index: number) => {
		if (!selectedCustomers?.includes(index)) {
			setSelectedCustomers((prev) => [...(prev as number[]), index].sort((a, b) => a - b));
		} else {
			setSelectedCustomers(prev => prev?.filter(c => c !== index).sort((a, b) => a - b));
		}
	};
	useEffect(() => {
		if (selectedAll) {
			setSelectedCustomers(DataIds);
		} else {
			setSelectedCustomers([]);
		}
	}, [selectedAll]);
	return (
		<main>
			<header className={""}>
				<div className="flex justify-between items-center">
					<p className="flex justify-end items-center space-x-2">
						<UserRoundIcon />
						<span className={"font-bold text-2xl"}>Customer</span>
					</p>
					<div className="flex space-x-2 text-center">
						<Button variant={"outline"} className={"cursor-pointer active:bg-violet-700"}>Export</Button>
						<Button variant={"outline"} className={"cursor-pointer"}>Import</Button>
						<Button className={"cursor-pointer"}>Add customer</Button>
					</div>
				</div>
			</header>
			<section className={"my-5"}>
				<div className={"flex py-2 justify-between"}>
					<Input leftIcon={<SearchIcon />}
								 className={"p-1 flex items-center space-x-2 w-8/10 bg-neutral-200 rounded-lg"}
								 placeholder={"Search customers"} />
					<div className="flex items-center space-x-2">
						<span className={"font-bold"}>0 customers</span>
						<Popover>
							<PopoverTrigger className={"cursor-pointer"} asChild>
								<Button variant={"outline"} className={"cursor-pointer"}>
									<ArrowDownUpIcon />
								</Button>
							</PopoverTrigger>
							<PopoverContent className={"-translate-1/14 translate-y-2"}>
								<p>Sort by</p>
								<RadioGroup defaultValue="last-update" className={"border-b py-3"}>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="last-update" id="last-update" />
										<Label htmlFor="last-update">Last update</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="amount-spent" id="amount-spent" />
										<Label htmlFor="amount-spent">Amount spent</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="total-orders" id="total-orders" />
										<Label htmlFor="total-orders">Total orders</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="last-order-date" id="last-order-date" />
										<Label htmlFor="last-order-date">Last order date</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="first-order-date" id="first-order-date" />
										<Label htmlFor="first-order-date">
											First order date</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="date-added-as-customer" id="date-added-as-customer" />
										<Label htmlFor="date-added-as-customer">
											Date added as customer</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="last-abandoned-order-date" id="last-abandoned-order-date" />
										<Label htmlFor="last-abandoned-order-date">Last abandoned order date</Label>
									</div>
								</RadioGroup>
								<RadioGroup defaultValue="o2n" className={"py-3"}>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="o2n" id="o2n" />
										<Label htmlFor="o2n">Oldest to newest</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="n2o" id="n2o" />
										<Label htmlFor="n2o">Newest to oldest</Label>
									</div>
								</RadioGroup>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<div className="flex items-center">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="space-x-2"><Checkbox className={"cursor-pointer"} checked={selectedAll || !!selectedCustomers?.length}
																													 onCheckedChange={(value) => setSelectedAll(!!value)} />
									<span>{selectedCustomers?.length} Customer name</span></TableHead>
								{!selectedCustomers?.length && (<>
									<TableHead> Email subscription</TableHead>
									<TableHead>Location</TableHead>
									<TableHead>Orders</TableHead>
									<TableHead className="text-right">Amount spent</TableHead>
								</>)}
							</TableRow>
						</TableHeader>
					</Table>
					{!!selectedCustomers?.length && <>
						<Popover>
							<PopoverTrigger className={"cursor-pointer"} asChild>
								<Button variant={"outline"} className={"cursor-pointer"}>
									<EllipsisIcon/>
								</Button>
							</PopoverTrigger>
							<PopoverContent className={"-translate-1/14 translate-y-2 p-2 text-sm"}>
								<p className={'p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}>Add tag</p>
								<p className={'p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}>Remove tag</p>
								<p className={'text-red-500 flex space-x-2 items-center p-1 hover:bg-neutral-200 rounded-lg cursor-pointer'}><Trash2Icon className={'size-4 flex-none'}/> <span>Delete customer</span></p>
							</PopoverContent>
						</Popover>
					</>}
				</div>
				<Table>
					<TableBody className={"odd:bg-white even:bg-gray-50"}>
						{DataIds.map((id) => (
							<TableRow key={id}>
								<TableCell className="font-medium space-x-2"><Checkbox value={id}
																																			 checked={(selectedCustomers && selectedCustomers.includes(id))}
																																			 onCheckedChange={() => handleDeleteCustomersChange(id)} />
									<span>Customer name</span></TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>Credit Card</TableCell>
								<TableCell>0 orders</TableCell>
								<TableCell className="text-right">$250.00</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
			<Pagination>
				<PaginationContent>
					<PaginationItem className={"cursor-pointer"}>
						<PaginationPrevious onClick={() => goToPage(page <= 0 ? 0 : page - 1)} />
					</PaginationItem>
					<PaginationItem className={"cursor-pointer"}>
						<PaginationLink
							onClick={() => goToPage(page <= 0 ? 0 : page)}
						>{page}</PaginationLink>
					</PaginationItem>
					{/*{page < props.page.totalPages - 1 &&*/}
					{/*	<PaginationItem>*/}
					{/*		<PaginationEllipsis />*/}
					{/*	</PaginationItem>}*/}
					{/*{(page < props.page.totalPages - 1) &&*/}
					{/*	<PaginationItem className={'cursor-pointer'}>*/}
					{/*		<PaginationNext onClick={() => goToPage(page + 1)}/>*/}
					{/*	</PaginationItem>*/}
					{/*}*/}
				</PaginationContent>
			</Pagination>
		</main>
	);
}