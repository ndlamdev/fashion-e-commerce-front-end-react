import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader.tsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button.tsx";
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
import { formatCurrency, formatDateFromArray } from "@/utils/helper/format-data.ts";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, TrashIcon } from "lucide-react";

export const columns = (
	watchDetail: (id: number) => void,
	onDelete: (id: number) => void,
): ColumnDef<HistoryOrderType | unknown, string | unknown>[] => [
		{
			accessorKey: "id",
			header: 'Order',
			cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
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
			accessorKey: "full_name",
			header: ({ column }) => (
				<DataTableColumnHeader className={'cursor-pointer'} column={column} title="Customer" />
			),
		},
		{
			accessorKey: "amount",
			header: ({ column }) => (
				<DataTableColumnHeader className={'cursor-pointer'} column={column} title="Total" />
			),
			cell: ({ row }) => {
				return <div className=" font-medium text-center">{formatCurrency(row.getValue("amount"))}</div>;
			},
		},
		{
			accessorKey: "date",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Date" />
			),
			cell: ({ row }) => (<div className="font-medium">{formatDateFromArray(row.getValue("date"))}</div>),
		},
		{
			id: "actions",
			cell: ({ row }) => {
				//TODO: implement some action
				const data = row.original as HistoryOrderType
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="size-8 cursor-pointer p-0">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Hành động</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className={'cursor-pointer'} onClick={() => watchDetail(data.id)}>Xem chi tiết</DropdownMenuItem>
							<DropdownMenuItem className={'cursor-pointer text-red-500'} onClick={() => onDelete(data.id)}><span>Xóa đơn hàng</span> <TrashIcon className={'text-red-500'} /></DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	];