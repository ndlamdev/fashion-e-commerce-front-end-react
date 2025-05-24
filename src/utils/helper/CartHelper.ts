import CartItemType from "@/types/CartItemType.ts";

const totalRegularPrice = (cartItems: CartItemType[] | undefined) => {
	if (!cartItems) return 0;
	return cartItems.reduce((sum, item) => {
		return sum + item.variant.regular_price * item.quantity;
	}, 0);
};

const totalComparePrice = (cartItems: CartItemType[] | undefined) => {
	if (!cartItems) return 0;
	return cartItems.reduce((sum, item) => {
		return sum + item.variant.compare_price * item.quantity;
	}, 0);
};

export default { totalRegularPrice, totalComparePrice };
