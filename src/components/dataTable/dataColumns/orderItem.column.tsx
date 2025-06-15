import { OrderItemColumnProp } from "@/components/dataTable/props/orderItemColumn.prop";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Input } from "@/components/ui/input.tsx";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { ColumnDef } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { ChangeEvent } from "react";
const RESOURCE_IMAGE = import.meta.env.VITE_BASE_MEDIA_URL;

export const orderItemColumns: ColumnDef<OrderItemColumnProp | unknown, string | unknown>[] = [
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
        className={"cursor-pointer"}
      />
    ),
  },
  {
    header: "Product",
    cell: ({ row }) => {
      const orderItem = row.original as OrderItemColumnProp;
      return (
        <div className=" flex items-center space-x-2">
          <img className={"size-10 border border-neutral-500 rounded-lg object-cover"} src={RESOURCE_IMAGE + orderItem.product.image.src} alt={orderItem.product.title} />
          <div className="">
            <p>{orderItem.product.title}</p>
            <p>{Object.values(orderItem.variant.options).join(" / ")}</p>
            <p>{formatCurrency(orderItem.regular_price)}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: 'Quantity',
    cell: ({ row }) => {
      const rowIndex = row.index;
      const data = row.original as OrderItemColumnProp;
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), 1);
        data.onInputChange((item, index) =>
          index === rowIndex ? { ...item, quantity: value } : item
        );
      };

      return (
        <Input onChange={handleChange}
          value={data.quantity}
          className={"w-full sm:w-1/2 rounded-2xl text-center float-start"}
          type={"number"}
          min={1}
          max={9999999}
        />
      );
    },
  },
  {
    id: "amount",
    header: 'Amount',
    cell: ({ row }) => {
      const product = row.original as OrderItemColumnProp;
      return <div className=" font-medium text-balance break-words w-25 float-start text-start">{formatCurrency(product.regular_price * product.quantity)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //TODO: implement some action
      console.log(row);

      return (
        <Button variant="ghost" className="size-8 cursor-pointer p-0 float-end">
          <XIcon className="size-4 text-red-500" />
        </Button>
      );
    },
  },
];