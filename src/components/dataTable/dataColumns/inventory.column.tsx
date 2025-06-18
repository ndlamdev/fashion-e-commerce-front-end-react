import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { formatDateFromArray } from "@/utils/helper/format-data.ts";
import { ColumnDef } from "@tanstack/react-table";
import { LockIcon, LockOpenIcon, MoreHorizontal } from "lucide-react";
import { InventoryColumnProp } from "../props/inventoryColumn.prop";


export const inventoryColumns = (
  watchDetail: (id: string) => void,
  saveLock: (id: string) => void,
): ColumnDef<InventoryColumnProp | unknown, string | unknown>[] => [
    {
      accessorKey: "id",
      header: "Mã tồn kho",
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
    },
    {
      accessorKey: "product_id",
      header: "Mã sản phẩm",
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("product_id"))}</div>),
    },
    {
      accessorKey: "sku",
      header: "Mã SKU",
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("sku"))}</div>),
    },
    {
      accessorKey: "title",
      header: "Tên biến thể",
    },
    {
      accessorKey: "options",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tùy chọn" />
      ),
      cell: ({ row }) => {
        const data = row.original as InventoryColumnProp;

        return <div className="font-bold">{Object.values(data.options ?? {}).join(" / ")}</div>
      },
    },
    {
      accessorKey: "regular_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá bán" />
      ),
    },
    {
      accessorKey: "compare_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá so sánh" />
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số lượng" />
      ),
    },
    {
      accessorKey: "create_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày tạo" />
      ),
      cell: ({ row }) => (
        <div className="font-bold">
          {formatDateFromArray(row.getValue("create_at"))}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        //TODO: implement some action
        const data = row.original as InventoryColumnProp;

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
              <DropdownMenuItem
                className={"cursor-pointer text-red-500 flex justify-between"}
                onClick={() => saveLock(data.id)}>
                <span>Tình trạng</span>
                {!data.lock
                  ? <LockOpenIcon className={'flex-none text-red-500'} />
                  : <LockIcon className={'flex-none text-red-500'} />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];