/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:28 AM - 18/05/2025
 * User: Administrator
 **/
import { toast } from "sonner";

const toastErrorApiRTK = (error: any) => {
	if (!error) return;
	console.log(error);
	// const response = (error as any).data as ApiResponseError<string>;
	toast.message("Có lỗi xảy ra...");
};

export default { toastErrorApiRTK };
