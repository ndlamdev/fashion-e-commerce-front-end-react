/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:13 AM - 18/05/2025
 * User: Administrator
 **/
import { appDispatch } from "@/configs/store.config.ts";
import { cartApi } from "@/redux/query/cart.query.ts";
import ToastErrorApi from "@/utils/helper/toastErrorApi.ts";

const modifyQuantityCartItem = async (cartItemId: number, quantity: number) => {
	return await appDispatch(
		cartApi.endpoints.modifyQuantityCartItem.initiate({
			cartItemId: cartItemId,
			quantity: quantity,
		}),
	).then(({ data, error }) => {
		if (error) {
			ToastErrorApi.toastErrorApiRTK(error);
			return Promise.reject(error);
		}

		return data;
	});
};

const deleteCartItem = async (id: any) => {
	return await appDispatch(
		cartApi.endpoints.deleteCartItem.initiate({
			cartItemId: id,
		}),
	).then(({ data, error }) => {
		if (error) {
			ToastErrorApi.toastErrorApiRTK(error);
			return Promise.reject(error);
		}

		return data;
	});
};

const cartService = {
	modifyQuantityCartItem,
	deleteCartItem,
};

export default cartService;
