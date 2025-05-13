import { ProductImageType } from "@/types/product/productImage.type.ts";

export type ProductOptionType = {
	type: OptionType,
	title: string;
	values: string[];
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