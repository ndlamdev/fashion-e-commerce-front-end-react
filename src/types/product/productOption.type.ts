export type ProductOptionType = {
	type: OptionType,
	title: string;
	values: string[];
}

export enum OptionType {
	COLOR = "COLOR",
	SIZE = "SIZE"
}