import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader.tsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import HistoryOrderType from "@/types/historyOrder.type";
import OrderStatusEnum, { OrderStatusColors } from "@/utils/enums/orderStatus.enum.ts";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<HistoryOrderType | unknown, unknown>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' className={"cursor-pointer"} />
		),
	},
	{
		accessorKey: "id",
		header: "Order",
		cell: ({ row }) => <div className='font-bold'>#{row.getValue("id")}</div>,
	},
	{
		accessorKey: "status",
		header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
		cell: ({ row }) => (
			<div>
				<Badge variant={OrderStatusColors[row.getValue("status") as OrderStatusEnum]}>{row.getValue("status")}</Badge>
			</div>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
	},
	{
		accessorKey: "full_name",
		header: ({ column }) => <DataTableColumnHeader className={"cursor-pointer"} column={column} title='Customer' />,
	},
	{
		accessorKey: "amount",
		header: ({ column }) => <DataTableColumnHeader className={"cursor-pointer"} column={column} title='Total' />,
		cell: ({ row }) => {
			return <div className='font-medium'>{formatCurrency(row.getValue("amount"))}</div>;
		},
	},
	{
		id: "actions",
		cell: () => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='size-8 cursor-pointer p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem className={"cursor-pointer"} onClick={() => navigator.clipboard.writeText("")}>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className={"cursor-pointer"}>View customer</DropdownMenuItem>
						<DropdownMenuItem className={"cursor-pointer"}>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
