/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:28 AM - 18/05/2025
 * User: Administrator
 **/
import { ApiResponseError } from "@/domain/ApiResponseError.ts";
import { toast } from "sonner";

const toastErrorApiRTK = (error: any) => {
	if (!error) return;
	const response = (error as any).data as ApiResponseError<string>;
	toast.message(response.detail || response.error);
};

export default { toastErrorApiRTK };
