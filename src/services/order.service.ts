import { appDispatch } from "@/configs/store.config";
import CreateOrderRequest from "@/domain/resquest/createOrder.request";
import { orderApi } from "@/redux/api/order.api";
import { toast } from "sonner";

const createOrder = async (data: CreateOrderRequest) => {
	return await appDispatch(orderApi.endpoints.createOrder.initiate(data, { track: false })).then(({ data, error }) => {
		if (error) {
			toast.error("Đặt hàng thất bại");
			return Promise.reject(error);
		}
		return data.data;
	});
};


const OrderService = { createOrder };

export default OrderService;
