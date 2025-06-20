/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:06AM - 14/03/2025
 * User: lam-nguyen
 **/

import ProductInCartResponse from "@/domain/response/productInCart.response";
import VariantResponse from "@/domain/response/variant.response";

type CartItemType = {
	id: number;
	variant: VariantResponse;
	product: ProductInCartResponse;
	quantity: number;
	lock: boolean;
	create_at?: string[] | null;
	update_at?: string[] | null;
};
export default CartItemType;
