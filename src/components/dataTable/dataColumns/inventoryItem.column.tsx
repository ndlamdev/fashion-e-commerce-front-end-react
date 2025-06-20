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
import { ColumnDef } from "@tanstack/react-table";
import { LockIcon, LockOpenIcon, MoreHorizontal } from "lucide-react";
import { ProductColumnProp } from "../props/productColumn.prop";

export type InventoryItemType = { id?: string, sku?: string, title: string, compare_price: number, regular_price: number, quantity: number }

export const inventoryItemColumns = (
  isCreate?: boolean
): ColumnDef<InventoryItemType | unknown, string | unknown>[] => isCreate ? [
  {
    accessorKey: "id",
    header: "Mã sản phẩm",
    cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
  },
  {
    accessorKey: "sku",
    header: "Mã sku",
    cell: ({ row }) => (<div className="font-bold">#{(row.getValue("sku"))}</div>),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
  },
  {
    accessorKey: "compare_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá so sánh" />
    ),
  },
  {
    accessorKey: "regular_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //TODO: implement some action
      const data = row.original as ProductColumnProp;

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
            // onClick={() => watchDetail(data.id)}
            >
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem
              className={"cursor-pointer text-red-500 flex justify-between"}
            // onClick={() => saveLock(data.id)}
            >
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
] : [
    {
      accessorKey: "sku",
      header: "Mã sku",
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("sku"))}</div>),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên sản phẩm" />
      ),
    },
    {
      accessorKey: "compare_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá so sánh" />
      ),
    },
    {
      accessorKey: "regular_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá" />
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số lượng" />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        //TODO: implement some action
        const data = row.original as ProductColumnProp;

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
                // onClick={() => watchDetail(data.id)}
                >
                Xem chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem
                className={"cursor-pointer text-red-500 flex justify-between"}
                // onClick={() => saveLock(data.id)}
                >
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