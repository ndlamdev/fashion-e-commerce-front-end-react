/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:03 PM - 21/05/2025
 * User: kimin
 **/
import OrderItemResponse from "@/domain/response/orderItem.response.ts";
import OrderStatusResponse from "@/domain/response/orderStatus.response.ts";
import PaymentResponse from "@/domain/response/payment.response.ts";

type OrderDetailResponse = {
	id: number;
	user_id: number;
	name: string;
	phone: string;
	email: string;
	address_detail: string;
	ward: string;
	district: string;
	province: string;
	note: string;
	items: (Omit<OrderItemResponse, "product" | "variant"> & { product_id: string; variant_id: string })[];
	statuses: OrderStatusResponse[];
	payment_response: PaymentResponse;
	item_details: OrderItemResponse[];
	update_at: number[];
};

export default OrderDetailResponse;
