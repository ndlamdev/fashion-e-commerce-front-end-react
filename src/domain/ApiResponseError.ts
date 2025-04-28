/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:57PM - 26/03/2025
 * User: lam-nguyen
 **/
import { AxiosError } from "axios";

export type ApiResponseError<T> = {
	code: number;
	error: string;
	detail: T;
};

class AxiosErrorCustom<T> extends AxiosError<ApiResponseError<T>, any> {}

export default AxiosErrorCustom;
