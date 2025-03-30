/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:57PM - 26/03/2025
 * User: lam-nguyen
 **/
import { AxiosResponse } from "axios";

export type ApiResponse<T> = {
	code: number;
	message: string;
	data: T;
};

interface AxiosResponseCustom<T> extends AxiosResponse<ApiResponse<T>, any> {}

export default AxiosResponseCustom;
