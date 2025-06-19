import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MediaColumnProp } from "../props/mediaColumn.prop";
import MediaResponse from "@/domain/response/media.response";
const RESOURCE_IMAGE = import.meta.env.VITE_BASE_MEDIA_URL;


export const mediaChooseColumns = (
  onSelect: (data: MediaResponse, values: boolean) => void,
): ColumnDef<MediaColumnProp & { checked: boolean } | unknown, string | unknown>[] => [
    {
      accessorKey: "id",
      header: "Mã",
      cell: ({ row }) => (<div className="font-bold">#{(row.getValue("id"))}</div>),
    },
    {
      accessorKey: "path",
      header: "Hình ảnh",
      cell: ({ row }) => (<img src={RESOURCE_IMAGE + row.getValue("path")} alt={row.getValue("display_name")} className="w-16 h-16 object-cover rounded-md" />),
    },
    {
      accessorKey: "display_name",
      header: "Tiêu đề",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        //TODO: implement some action
        const data = row.original as MediaColumnProp & { checked: boolean };

        return (
          <Checkbox onCheckedChange={(checked) => onSelect(data, checked === true)} checked={data.checked} />
        );
      },
    },
  ];