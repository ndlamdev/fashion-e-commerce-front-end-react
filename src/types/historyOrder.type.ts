import OrderStatusEnum from "@/utils/enums/orderStatus.enum";

type HistoryOrderType = {
	id: number;
	date: number[];
	amount: number;
	status: OrderStatusEnum;
	user_id: number;
	full_name: string;
	email: string;
};

export default HistoryOrderType;
