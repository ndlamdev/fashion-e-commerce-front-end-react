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

export const columns = (
  watchDetail: (orderId: number, userId: number) => void,
  onDelete: (orderId: number) => void,
): ColumnDef<OrderColumnProp | unknown, string | unknown>[] => [
    {
      accessorKey: "id",
      header: 'Đơn hàng',
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => (
        <Badge variant={OrderStatusColors[row.getValue("status") as OrderStatusEnum]}>
          {(row.getValue("status"))}
        </Badge>
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
        <DataTableColumnHeader className={'cursor-pointer'} column={column} title="Họ Tên" />
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader className={'cursor-pointer'} column={column} title="Tổng tiền" />
      ),
      cell: ({ row }) => {
        return <div className=" font-medium text-center">{formatCurrency(row.getValue("amount"))}</div>;
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày đặt" />
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
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={'cursor-pointer'}
                onClick={() => watchDetail(data.user_id, data.id)}>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem className={'cursor-pointer text-red-500'}
                onClick={() => onDelete(data.id)}>
                <span>Xóa đơn hàng</span>
                <TrashIcon className={'text-red-500'} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      enableHiding: false,
    },
  ];