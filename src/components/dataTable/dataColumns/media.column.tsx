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
import { MediaColumnProp } from "../props/mediaColumn.prop";
const RESOURCE_IMAGE = import.meta.env.VITE_BASE_MEDIA_URL;


export const mediaColumns = (
  watchDetail: (id: string) => void,
  saveLock: (id: string) => void,
): ColumnDef<MediaColumnProp | unknown, string | unknown>[] => [
    {
      accessorKey: "id",
      header: "Mã",
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
    },
    {
      accessorKey: "display_name",
      header: "Tiêu đề",
    },
    {
      accessorKey: "path",
      header: "Hình ảnh",
      cell: ({ row }) => (<img src={RESOURCE_IMAGE + row.getValue("path")} alt={row.getValue("display_name")} className="w-16 h-16 object-cover rounded-md" />),
    },
    {
      accessorKey: "extend",
      header: "Phần mở rộng",
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
        const data = row.original as MediaColumnProp;

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