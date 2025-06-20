/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:13 PM - 21/05/2025
 * User: kimin
 **/

type OrderStatusEnum = "PENDING" | "SUCCESS" | "SHIPPING" | "COMPLETED" | "CANCEL";

const statusFlow: OrderStatusEnum[] = [
  "PENDING",
  "SUCCESS",
  "SHIPPING",
  "COMPLETED"
  // "CANCEL" thường là ngoại lệ, không nằm trong flow chính
];

export function getNextStatus(current: OrderStatusEnum): OrderStatusEnum | null {
  const index = statusFlow.indexOf(current);
  if (index >= 0 && index < statusFlow.length - 1) {
    return statusFlow[index + 1];
  }
  return null; // Không có trạng thái tiếp theo
}

type variantBadgeType = "default" | "secondary" | "success" | "destructive" | "outline" | null | undefined;
export const OrderStatusColors: Record<OrderStatusEnum, variantBadgeType> = {
	CANCEL: "destructive",
	COMPLETED: "success",
	PENDING: "secondary",
	SUCCESS: "outline",
	SHIPPING: "default",
};

export default OrderStatusEnum;