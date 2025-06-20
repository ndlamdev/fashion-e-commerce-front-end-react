type InventoryResponse = {
	id: string;
	product_id: string;
	title: string;
	sku: string;
	regular_price: number;
	compare_price: number;
	options: Record<string, string>;
	quantity: number;
	create_at: Date;
	lock: boolean;
};

export default InventoryResponse;
