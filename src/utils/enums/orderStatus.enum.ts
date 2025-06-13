/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:13 PM - 21/05/2025
 * User: kimin
 **/

type OrderStatusEnum = "PENDING" | "SUCCESS" | "SHIPPING" | "COMPLETED" | "CANCEL";

type variantBadgeType = "default" | "secondary" | "success" | "destructive" | "outline" | null | undefined;
export const OrderStatusColors: Record<OrderStatusEnum, variantBadgeType> = {
	CANCEL: "destructive",
	COMPLETED: "success",
	PENDING: "secondary",
	SUCCESS: "outline",
	SHIPPING: "default",
};

export default OrderStatusEnum;