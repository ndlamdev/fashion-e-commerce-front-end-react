/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:08 PM - 21/05/2025
 * User: kimin
 **/

import ProductInCartResponse from "./productInCart.response";
import VariantResponse from "./variant.response";

type OrderItemResponse = {
	id: number;
	variant: VariantResponse;
	product: ProductInCartResponse;
	quantity: number;
	compare_price: number;
	regular_price: number;
};

export default OrderItemResponse;
