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
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";

//TODO: replace customer ids
const DataIds = [0, 1, 2];

export function CustomerManagementPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const isDesktop = useMediaQuery("(min-width: 640px)");

	const page = parseInt(searchParams.get("page") ?? "0");
	const goToPage = (page: number) => {
		searchParams.set("page", page + "");
		setSearchParams(searchParams);
	};

	const [selectedAll, setSelectedAll] = useState<boolean>();
	const [selectedCustomers, setSelectedCustomers] = useState<number[]>();
	const handleDeleteCustomersChange = (index: number) => {
		if (!selectedCustomers?.includes(index)) {
			setSelectedCustomers((prev) => [...(prev as number[]), index].sort((a, b) => a - b));
		} else {
			setSelectedCustomers((prev) => prev?.filter((c) => c !== index).sort((a, b) => a - b));
		}
	};
	useEffect(() => {
		if (selectedAll) {
			setSelectedCustomers(DataIds);
		} else {
			setSelectedCustomers([]);
		}
	}, [selectedAll]);

	const opacity = useMemo(() => (selectedCustomers?.length ? "opacity-0" : ""), [selectedCustomers?.length]);

	return (
		<div className='flex h-full flex-col gap-y-5'>
			<header className='flex items-end justify-between'>
				<p className='flex items-center justify-end space-x-2 text-sm sm:text-lg lg:text-2xl'>
					<UserRoundIcon className={"size-4 sm:size-6 lg:size-8"} />
					<span className={"font-bold"}>Customer</span>
				</p>
				<div className='flex items-center space-x-2 text-center'>
					<Popover>
						<PopoverTrigger className={"visible cursor-pointer sm:hidden"} asChild>
							<Button variant={"outline"} className={"cursor-pointer max-sm:size-8"}>
								<EllipsisIcon />
							</Button>
						</PopoverTrigger>
						<PopoverContent className={"w-auto -translate-1/14 translate-y-2 p-2 text-center text-sm"}>
							<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Import</p>
							<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Export</p>
						</PopoverContent>
					</Popover>
					<Button variant={"outline"} className={"cursor-pointer max-sm:hidden"}>
						Export
					</Button>
					<Button variant={"outline"} className={"cursor-pointer max-sm:hidden"}>
						Import
					</Button>
					<Button className={"sm:text-md cursor-pointer text-xs max-sm:h-8"}>Add customer</Button>
				</div>
			</header>
			<main className='flex flex-1 flex-col'>
				<section className={"mb-5 flex-1"}>
					<div className={"flex justify-between py-2 max-sm:flex-wrap"}>
						<Input
							leftIcon={<SearchIcon />}
							className={"flex w-full items-center space-x-2 rounded-lg bg-neutral-200 p-1 sm:w-1/2 lg:w-8/10"}
							placeholder={"Search customers"}
						/>
						<div className='flex items-center space-x-2 max-sm:my-2 max-sm:w-full max-sm:justify-between'>
							<span className={"font-bold"}>0 customers</span>
							<Popover>
								<PopoverTrigger className={"cursor-pointer"} asChild>
									<Button variant={"outline"} className={"cursor-pointer max-sm:size-8"}>
										<ArrowDownUpIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent className={"w-auto max-sm:p-2 max-sm:text-xs sm:-translate-2 sm:translate-y-2"}>
									<p>Sort by</p>
									<RadioGroup defaultValue='last-update' className={"border-b py-3"}>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='last-update' id='last-update' />
											<Label htmlFor='last-update'>Last update</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='amount-spent' id='amount-spent' />
											<Label htmlFor='amount-spent'>Amount spent</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='total-orders' id='total-orders' />
											<Label htmlFor='total-orders'>Total orders</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='last-order-date' id='last-order-date' />
											<Label htmlFor='last-order-date'>Last order date</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='first-order-date' id='first-order-date' />
											<Label htmlFor='first-order-date'>First order date</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='date-added-as-customer' id='date-added-as-customer' />
											<Label htmlFor='date-added-as-customer'>Date added as customer</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='last-abandoned-order-date' id='last-abandoned-order-date' />
											<Label htmlFor='last-abandoned-order-date'>Last abandoned order date</Label>
										</div>
									</RadioGroup>
									<RadioGroup defaultValue='o2n' className={"py-3"}>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='o2n' id='o2n' />
											<Label htmlFor='o2n'>Oldest to newest</Label>
										</div>
										<div className='flex items-center space-x-2'>
											<RadioGroupItem value='n2o' id='n2o' />
											<Label htmlFor='n2o'>Newest to oldest</Label>
										</div>
									</RadioGroup>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					{isDesktop ? (
						<div className='flex items-center'>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='w-[250px] space-x-2'>
											<Checkbox
												className={"cursor-pointer"}
												checked={selectedAll || !!selectedCustomers?.length}
												onCheckedChange={(value) => setSelectedAll(!!value)}
											/>
											<span>{selectedCustomers?.length} Customer name</span>
										</TableHead>
										<TableHead className={cn(opacity, "text-center")}>Email subscription</TableHead>
										<TableHead className={cn(opacity, "text-center")}>Location</TableHead>
										<TableHead className={cn(opacity, "text-center")}>Orders</TableHead>
										<TableHead className='w-[150px] text-right'>
											{!selectedCustomers?.length ? (
												"Amount spent"
											) : (
												<Popover>
													<PopoverTrigger className={"cursor-pointer"} asChild>
														<Button variant={"outline"} className={"cursor-pointer"}>
															<EllipsisIcon />
														</Button>
													</PopoverTrigger>
													<PopoverContent className={"-translate-1/14 translate-y-2 p-2 text-sm"}>
														<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Add tag</p>
														<p className={"cursor-pointer rounded-lg p-1 hover:bg-neutral-200"}>Remove tag</p>
														<p className={"flex cursor-pointer items-center space-x-2 rounded-lg p-1 text-red-500 hover:bg-neutral-200"}>
															<Trash2Icon className={"size-4 flex-none"} /> <span>Delete customer</span>
														</p>
													</PopoverContent>
												</Popover>
											)}
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody className={"odd:bg-white even:bg-gray-50"}>
									{DataIds.map((id) => (
										<TableRow key={id}>
											<TableCell className='space-x-2 font-medium'>
												<Checkbox
													value={id}
													checked={selectedCustomers && selectedCustomers.includes(id)}
													onCheckedChange={() => handleDeleteCustomersChange(id)}
												/>
												<span>Customer name</span>
											</TableCell>
											<TableCell className={"text-center"}>Paid</TableCell>
											<TableCell className={"text-center"}>Credit Card</TableCell>
											<TableCell className={"text-center"}>0 orders</TableCell>
											<TableCell className={"text-right"}>$250.00</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					) : (
						<>
							{DataIds.map((id) => (
								<div className={"border-b py-2 text-xs"} key={id}>
									<p className='font-bold'>Customer name</p>
									<p className=''>Location</p>
									<p className='space-x-2'>
										<span>0 orders</span>
										<span>0VND</span>
									</p>
								</div>
							))}
						</>
					)}
				</section>
				<Pagination>
					<PaginationContent>
						<PaginationItem className={"cursor-pointer"}>
							<PaginationPrevious onClick={() => goToPage(page <= 0 ? 0 : page - 1)} />
						</PaginationItem>
						<PaginationItem className={"cursor-pointer"}>
							<PaginationLink onClick={() => goToPage(page <= 0 ? 0 : page)}>{page}</PaginationLink>
						</PaginationItem>
						{page < 10 - 1 && (
							<PaginationItem className={"cursor-pointer"}>
								<PaginationNext onClick={() => goToPage(page + 1)} />
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			</main>
		</div>
	);
}
