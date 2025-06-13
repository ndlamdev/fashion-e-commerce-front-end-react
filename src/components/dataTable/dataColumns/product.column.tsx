import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { Button } from "@/components/ui/button.tsx";
import { XIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { OptionType } from "@/types/product/productOption.type.ts";
import { Input } from "@/components/ui/input.tsx";
import { ChangeEvent } from "react";
import { ProductColumnProp } from "@/components/dataTable/props/productColumn.prop.ts";

export const productColumns: ColumnDef<ProductColumnProp | unknown, string | unknown>[] = [
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
			const product = row.original as ProductColumnProp;
			return (
				<div className=" flex items-center space-x-2">
					<img className={"size-10 border border-neutral-500 rounded-lg object-cover"} src={product.src} alt={product.title} />
					<div className="">
						<p>{product.title}</p><p>{product.options[OptionType.COLOR]}/{product.options[OptionType.SIZE]}</p>
						<p>{formatCurrency(product.regular_price)}</p>
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
			const data = row.original as ProductColumnProp;
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
			const product = row.original as ProductColumnProp;
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