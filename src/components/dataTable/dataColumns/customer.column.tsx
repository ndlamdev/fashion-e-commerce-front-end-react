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
import { LockIcon, LockOpenIcon, MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader.tsx";
import { CustomerColumnProp } from "@/components/dataTable/props/customerColumn.prop.ts";


export const customerColumns = (
  watchDetail: (id: number) => void,
  saveLock: (id: number) => void,
): ColumnDef<CustomerColumnProp | unknown, string | unknown>[] => [
    {
      accessorKey: "name",
      header: "Tên",
      cell: ({ row }) => (<div className="font-bold">{(row.getValue("name"))}</div>),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
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
        <DataTableColumnHeader className={"cursor-pointer "} column={column} title="Đã chi tiêu" />
      ),
      cell: ({ row }) => {
        return <div className=" font-medium">{formatCurrency(row.getValue("amount_spent"))}</div>;
      },
    },
    {
      accessorKey: "create_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ row }) => (<div className="font-bold">{formatDateFromArray(row.getValue("create_at"))}</div>),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        //TODO: implement some action
        const data = row.original as CustomerColumnProp;

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
              <DropdownMenuItem className={"cursor-pointer"}
                onClick={() => watchDetail(data.id)}>
                Xem chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem className={"cursor-pointer text-red-500 flex justify-between"}
                onClick={() => saveLock(data.id)}>
                <span>Tình trạng</span>
                {!data.is_locked
                  ? <LockOpenIcon className={'flex-none text-red-500'} />
                  : <LockIcon className={'flex-none text-red-500'} />}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false
    },
  ];