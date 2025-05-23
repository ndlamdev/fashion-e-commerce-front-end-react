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

type CreateOrderResponse = {
	id: number;
	customer_id: number;
	name: string;
	phone: string;
	email: string;
	address_detail: string;
	ward: string;
	district: string;
	province: string;
	note: string;
	items: OrderItemResponse[];
	statuses: OrderStatusResponse[];
	payment_response: PaymentResponse;
	update_at: number[];
};

export default CreateOrderResponse;
