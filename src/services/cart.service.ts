/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:13 AM - 18/05/2025
 * User: Administrator
 **/
import { appDispatch } from "@/configs/store.config.ts";
import { cartApi } from "@/redux/query/cart.query.ts";
import { ApiResponseError } from "@/domain/ApiResponseError.ts";
import { toast } from "sonner";

const getCart = async () => {
	return await appDispatch(cartApi.endpoints.getCart.initiate()).then(({ data, error }) => {
		if (error) {
			const response = (error as any).data as ApiResponseError<string>;
			toast.message(response.detail || response.error);
			return Promise.reject(error);
		}

		return data;
	});
};

const cartService = {
	getCart,
};

export default cartService;
