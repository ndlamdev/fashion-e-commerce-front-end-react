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
import OrderStatusEnum, { OrderStatusColors } from "@/utils/enums/orderStatus.enum.ts";
import { formatCurrency, formatDateFromArray } from "@/utils/helper/format-data.ts";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import { OrderColumnProp } from "../props/orderColumn.prop";
import { translated } from "@/utils/helper/locale.ts";
const tOrderColumns = (key: string) => translated(key, "page.admin.orders.column");

export const columns = (
  watchDetail: (orderId: number, userId: number) => void,
  onDelete: (orderId: number) => void,
): ColumnDef<OrderColumnProp | unknown, string | unknown>[] => [
		{
			accessorKey: "id",
			header: tOrderColumns('id'),
			cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title={tOrderColumns('status')} />
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
				<DataTableColumnHeader column={column} title={tOrderColumns('email')} />
			),
		},
		{
			accessorKey: "full_name",
			header: ({ column }) => (
				<DataTableColumnHeader className={'cursor-pointer'} column={column} title={tOrderColumns('full_name')} />
			),
		},
		{
			accessorKey: "amount",
			header: ({ column }) => (
				<DataTableColumnHeader className={'cursor-pointer'} column={column} title={tOrderColumns('total')}/>
			),
			cell: ({ row }) => {
				return <div className=" font-medium text-center">{formatCurrency(row.getValue("amount"))}</div>;
			},
		},
		{
			accessorKey: "date",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title={tOrderColumns('create_at')} />
			),
			cell: ({ row }) => (<div className="font-medium">{formatDateFromArray(row.getValue("date"))}</div>),
		},
		{
			id: "actions",
			cell: ({ row }) => {
				//TODO: implement some action
				const data = row.original as OrderColumnProp
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="size-8 cursor-pointer p-0">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>{tOrderColumns('actions')}</DropdownMenuLabel>
							<DropdownMenuSeparator />
              <DropdownMenuItem className={'cursor-pointer'}
                onClick={() => watchDetail(data.user_id, data.id)}>{tOrderColumns('watch_detail')}</DropdownMenuItem>
              <DropdownMenuItem className={'cursor-pointer text-red-500'}
                onClick={() => onDelete(data.id)}>
                <span>{tOrderColumns('delete_order')}</span>
                <TrashIcon className={'text-red-500'} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      enableHiding: false,
    },
  ];