import OrderItemResponse from "@/domain/response/orderItem.response";

export type ProductColumnProp = OrderItemResponse & {
	onInputChange: (updater: (item: OrderItemResponse, index: number) => OrderItemResponse) => void;
};
