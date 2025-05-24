/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:41 PM - 21/05/2025
 * User: kimin
 **/
import PaymentEnum from "@/utils/enums/payment.enum.ts";

type PaymentResponse = {
	order_code: number;
	method: PaymentEnum;
	status: string;
	checkout_url: string;
};

export default PaymentResponse;
