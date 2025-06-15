import OrderItemResponse from "@/domain/response/orderItem.response";

export type OrderItemColumnProp = OrderItemResponse & {
	onInputChange: (updater: (item: OrderItemResponse, index: number) => OrderItemResponse) => void;
};
