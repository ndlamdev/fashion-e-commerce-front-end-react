import OrderStatusEnum, { OrderStatusColors } from "@/utils/enums/orderStatus.enum.ts";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDateFromArray } from "@/utils/helper/format-data.ts";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader.tsx";

export type OrderColumn = {
	order_number: number;
	date: number[]
	customer_name: string
	status: OrderStatusEnum
	total: number
	email: string
}

export const columns: ColumnDef<OrderColumn | unknown, string | unknown>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className={'cursor-pointer'}
			/>
		),
	},
	{
		accessorKey: "order_number",
		header: 'Order',
		cell: ({ row }) => (<div className="font-bold">#{(row.getValue("order_number"))}</div>),
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => (
			<div>
				<Badge variant={OrderStatusColors[row.getValue("status") as OrderStatusEnum]}>
				{(row.getValue("status"))}
				</Badge>
			</div>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => (<div className="font-medium">{formatDateFromArray(row.getValue("date"))}</div>),
	},
	{
		accessorKey: "customer_name",
		header: ({ column }) => (
			<DataTableColumnHeader className={'cursor-pointer'} column={column} title="Customer" />
		),
	},
	{
		accessorKey: "total",
		header: ({ column }) => (
			<DataTableColumnHeader className={'cursor-pointer'} column={column} title="Total" />
		),
		cell: ({ row }) => {
			return <div className=" font-medium text-center">{formatCurrency(row.getValue("total"))}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			//TODO: implement some action
			console.log(row.original);

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="size-8 cursor-pointer p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							className={'cursor-pointer'}
							onClick={() => navigator.clipboard.writeText('')}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className={'cursor-pointer'}>View customer</DropdownMenuItem>
						<DropdownMenuItem className={'cursor-pointer'}>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
];