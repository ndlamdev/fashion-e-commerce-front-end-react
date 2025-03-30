/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:49AM - 30/03/2025
 * User: lam-nguyen
 **/
import EmailResponse from "@/domain/response/email.response.ts";

type LoginResponse = EmailResponse & {
	"access-token": string;
};

export default LoginResponse;
