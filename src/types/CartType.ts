/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:06AM - 14/03/2025
 * User: lam-nguyen
 **/
import CartItemType from "@/types/CartItemType.ts";

type CartType = {
	id: number;
	user_id: number;
	cart_items: CartItemType[];
	lock: boolean;
	create_at?: null | string[];
	update_at?: null | string[];
};
export default CartType;
