/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:48PM - 24/03/2025
 * User: lam-nguyen
 **/
import EmailRequest from "@/domain/resquest/email.request.ts";

interface OTPRequest extends EmailRequest {
	code: string;
}

export default OTPRequest;
