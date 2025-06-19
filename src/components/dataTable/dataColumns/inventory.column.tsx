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
import { translated } from "@/utils/helper/locale.ts";

const tInventoryColumns = (key: string) => translated(key, "page.admin.inventory.column");

export const inventoryColumns = (
  watchDetail: (id: string) => void,
  saveLock: (id: string) => void,
  onUpdateQuantity: (id: string, quantity: number) => void,
): ColumnDef<InventoryColumnProp | unknown, string | unknown>[] => [
    {
      accessorKey: "id",
      header: tInventoryColumns('id'),
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
    },
    {
      accessorKey: "product_id",
      header: tInventoryColumns('product_id'),
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("product_id"))}</div>),
    },
    {
      accessorKey: "sku",
      header: tInventoryColumns('sku'),
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("sku"))}</div>),
    },
    {
      accessorKey: "title",
      header: tInventoryColumns('variant_name'),
    },
    {
      accessorKey: "options",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ tInventoryColumns('option')} />
      ),
      cell: ({ row }) => {
        const data = row.original as InventoryColumnProp;

        return <div className="font-bold">{Object.values(data.options ?? {}).join(" / ")}</div>
      },
    },
    {
      accessorKey: "regular_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ tInventoryColumns('price')} />
      ),
    },
    {
      accessorKey: "compare_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ tInventoryColumns('compare_price')}/>
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ tInventoryColumns('quality')} />
      ),
    },
    {
      accessorKey: "create_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={ tInventoryColumns('create_at')} />
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
              <DropdownMenuLabel>{ tInventoryColumns('create_at')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={"cursor-pointer"}
                onClick={() => watchDetail(data.id)}>
								{ tInventoryColumns('watch_detail')}
              </DropdownMenuItem>
              <DropdownMenuItem className={"cursor-pointer"}
                onClick={() => onUpdateQuantity(data.id, data.quantity)}>
                Cập nhật số lượng
              </DropdownMenuItem>
              <DropdownMenuItem
                className={"cursor-pointer text-red-500 flex justify-between"}
                onClick={() => saveLock(data.id)}>
                <span>{ tInventoryColumns('status')}</span>
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