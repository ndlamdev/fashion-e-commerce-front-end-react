type AdminSubProductResponse = {
	id: string;
	title: string;
	total_inventories: number;
	total_variants: number;
	create_at: number[];
	lock: boolean;
};

export default AdminSubProductResponse;
