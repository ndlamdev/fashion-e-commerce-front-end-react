/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:13 AM - 18/05/2025
 * User: Administrator
 **/
import { appDispatch } from "@/configs/store.config.ts";
import { cartApi } from "@/redux/api/cart.api.ts";
import ToastErrorApi from "@/utils/helper/toastErrorApi.ts";
import { toast } from "sonner";
import LocalStorage from "@/utils/helper/LocalStorage.ts";

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

const addCartItem = async (variantId: string, quantity: number) => {
	if (!LocalStorage.getValue("ACCESS_TOKEN")) {
		toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
		return Promise.reject("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
	}

	return await appDispatch(
		cartApi.endpoints.addCartItem.initiate({
			variantId: variantId,
			quantity: quantity,
		}),
	).then(({ data, error }) => {
		if (error) {
			ToastErrorApi.toastErrorApiRTK(error);
			return Promise.reject(error);
		}

		toast.success("Thêm vào giỏ hàng thành công");

		return data;
	});
};

const cartService = {
	modifyQuantityCartItem,
	deleteCartItem,
	addCartItem,
};

export default cartService;
