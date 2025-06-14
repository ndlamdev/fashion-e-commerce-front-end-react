type VariantResponse = {
	id: string;
	productId: string;
	title: string;
	sku: string;
	quantity: number;
	options: object;
	pending: number;
	lock: boolean;
	regular_price: number;
	compare_price: number;
	product_allow_buy_when_clocked: boolean;
	product_exclude_discount: boolean;
	product_apply_allowance_inventory: boolean;
	product_visibility: boolean;
	is_delete: boolean;
};

export default VariantResponse;
