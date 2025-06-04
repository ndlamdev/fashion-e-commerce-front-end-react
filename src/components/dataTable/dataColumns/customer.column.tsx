import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDateFromArray } from "@/utils/helper/format-data.ts";
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
import { CustomerColumnProp } from "@/components/dataTable/props/customerColumn.prop.ts";


export const customerColumns: ColumnDef<CustomerColumnProp | unknown, string | unknown>[] = [
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
		accessorKey: "name",
		header: 'Tên',
		cell: ({ row }) => (<div className="font-bold">{(row.getValue("name"))}</div>),
	},
	{
		accessorKey: "create_at",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Ngày tạo" />
		),
		cell: ({ row }) => (<div className="font-bold">{formatDateFromArray(row.getValue("create_at"))}</div>),
	},
	{
		accessorKey: "location",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Địa chỉ" />
		),
	},
	{
		accessorKey: "no_orders",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Số đơn hàng" />
		),
		cell: ({ row }) => (<div className="font-medium">{row.getValue("no_orders")}</div>),
	},
	{
		accessorKey: "amount_spent",
		header: ({ column }) => (
			<DataTableColumnHeader className={'cursor-pointer'} column={column} title="Đã chi tiêu" />
		),
		cell: ({ row }) => {
			return <div className=" font-medium text-center">{formatCurrency(row.getValue("amount_spent"))}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			//TODO: implement some action
			const data = row.original
			console.log(data);

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
						<DropdownMenuItem className={'cursor-pointer'}>Xem chi tiết</DropdownMenuItem>
						<DropdownMenuItem className={'cursor-pointer'}>Xóa</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
];