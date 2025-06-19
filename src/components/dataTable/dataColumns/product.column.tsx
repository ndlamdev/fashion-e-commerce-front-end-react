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
import { ProductColumnProp } from "../props/productColumn.prop";
import { translated } from "@/utils/helper/locale.ts";

const tProductColumns = (key: string) => translated(key, "page.admin.products.column");

export const productColumns = (
  watchDetail: (id: string) => void,
  saveLock: (id: string) => void,
): ColumnDef<ProductColumnProp | unknown, string | unknown>[] => [
    {
      accessorKey: "id",
      header: tProductColumns("id"),
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={tProductColumns("name")} />
      ),
    },
    {
      accessorKey: "total_variants",
      header: ({ column }) => (
        <DataTableColumnHeader className={"cursor-pointer "} column={column} title={tProductColumns("variant_total")} />
      ),
    },
    {
      accessorKey: "total_inventories",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={tProductColumns("inventory_total")}/>
      ),
    },
    {
      accessorKey: "create_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={tProductColumns("create_at")} />
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
        const data = row.original as ProductColumnProp;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 cursor-pointer p-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{tProductColumns("actions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={"cursor-pointer"}
                onClick={() => watchDetail(data.id)}>
								{tProductColumns("watch_detail")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={"cursor-pointer text-red-500 flex justify-between"}
                onClick={() => saveLock(data.id)}>
                <span>{tProductColumns("status")}</span>
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