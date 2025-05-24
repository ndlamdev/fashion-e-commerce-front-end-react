/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:01AM - 19/03/2025
 * User: lam-nguyen
 **/
import CartItemType from "@/types/CartItemType.ts";

type CartItemProps = CartItemType & {
	onDelete?: (id: number) => void;
	onPlus?: (id: number) => void;
	onMinute?: (id: number) => void;
	onSelect?: (value: boolean, id: number) => void;
	selected?: boolean;
};

export default CartItemProps;
