/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:50PM - 26/03/2025
 *  User: lam-nguyen
 **/

import axios from "axios";
import AxiosResponseCustom from "@/domain/ApiResponse.ts";
import LocalStorage from "@/utils/helper/LocalStorage.ts";
import { appDispatch } from "@/configs/store.config.ts";
import { closeDialogLoading, showDialogLoading } from "@/redux/slice/dialog.slice.ts";

const api = axios.create({
	// baseURL: "https://fashion-server.ndlamdev.website/fashion-e-commerce/",
	baseURL: import.meta.env.VITE_BASE_URL + "/",
	timeout: 5000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

axios.interceptors.response.use(
	function (response: AxiosResponseCustom<any>) {
		appDispatch(closeDialogLoading());
		// Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
		// Làm gì đó với dữ liệu response
		return response;
	},
	function (error) {
		appDispatch(closeDialogLoading());
		// Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
		// Làm gì đó với lỗi response
		return Promise.reject(error);
	},
);

axios.interceptors.request.use(
	(config) => {
		appDispatch(showDialogLoading());
		const token = LocalStorage.getValue("ACCESS_TOKEN");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		appDispatch(closeDialogLoading());
		return Promise.reject(error);
	},
);

export default api;
