/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:06AM - 14/03/2025
 * User: lam-nguyen
 **/

type ShoppingBagItemType = {
	id: number;
	variant: {
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
	product: {
		id: string;
		lock: boolean;
		title: string;
		image: {
			id: string;
			src: string;
		};
		available: boolean;
		seo_alias: string;
	};
	quantity: number;
	lock: boolean;
	create_at?: string[] | null;
	update_at?: string[] | null;
};
export default ShoppingBagItemType;
