export type ProductVariantsType = {
	id: string;
	title: string;
	quantity: number;
	options: {COLOR: string, SIZE: number};
	pending: number;
	delete: boolean;
	product_id: string;
	regular_price: number;
	compare_price: number;
	product_visibility: boolean;
	product_allow_buy_when_hidden: boolean;
	product_exclude_discount: boolean;
	product_apply_allowance_inventory: boolean;
}
