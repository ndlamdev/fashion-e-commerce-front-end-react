import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { Button } from "@/components/ui/button.tsx";
import { XIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { ProductVariantsType } from "@/types/product/productVariants.type.ts";
import ProductImageType from "@/types/product/productImage.type.ts";
import { OptionType } from "@/types/product/productOption.type.ts";
import { Input } from "@/components/ui/input.tsx";
import { DiscountType } from "@/types/product/product.type.ts";

export type ProductProp = ProductVariantsType & Pick<DiscountType, 'percent'> & Pick<ProductImageType, "src"> & {
	onInputChange: (updater: (item: ProductProp, index: number) => ProductProp) => void;
}

export const productColumns: ColumnDef<ProductProp | unknown, string | unknown>[] = [
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
			const product = row.original as ProductProp;
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
		header: <p className={"text-end"}>Quantity</p>,
		cell: ({ row }) => {
			const rowIndex = row.index;
			const data = row.original as ProductProp;
			const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
				const value = Math.max(Number(e.target.value), 1);
				data.onInputChange((item, index) =>
					index === rowIndex ? { ...item, quantity: value } : item
				);
			};

			return (
				<Input onChange={handleChange}
							 value={data.quantity}
							 className={"w-full sm:w-1/2 rounded-2xl text-center float-end"}
							 type={"number"}
							 min={1}
							 max={9999999}
				/>
			);
		},
	},
	{
		id: "amount",
		header: <p className={"text-end"}>Amount</p>,
		cell: ({ row }) => {
			const product = row.original as ProductProp;
			return <div className=" font-medium text-balance break-words w-25 float-end text-end">{formatCurrency(product.regular_price * product.quantity)}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			//TODO: implement some action

			return (
				<Button variant="ghost" className="size-8 cursor-pointer p-0 float-end">
					<XIcon className="size-4 text-red-500" />
				</Button>
			);
		},
	},
];