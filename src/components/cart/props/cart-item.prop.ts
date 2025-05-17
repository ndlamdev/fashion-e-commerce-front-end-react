/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:01AM - 19/03/2025
 * User: lam-nguyen
 **/
import ShoppingBagItemType from "@/types/ShoppingBagItemType.ts";

type CartItemProps = ShoppingBagItemType & {
	onDelete?: () => void;
	onPlus?: () => void;
	onMinute?: () => void;
};

export default CartItemProps;
