import OrderStatusEnum from "@/utils/enums/orderStatus.enum.ts";

export type OrderColumnProp = {
	order_number: number;
	date: number[]
	customer_name: string
	status: OrderStatusEnum
	total: number
	email: string
}