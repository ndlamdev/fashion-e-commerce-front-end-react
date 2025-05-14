import { ProductImageType } from "@/types/product/productImage.type.ts";

export type ProductOptionType = {
	type: OptionType,
	title: string;
	values?: string[];
	options?: ProductOptionValueType[]
}

export type ProductOptionValueType = {
	title: string;
	slug: string;
	label: string;
	images: ProductImageType[];
}

export enum OptionType {
	COLOR = "COLOR",
	SIZE = "SIZE"
}