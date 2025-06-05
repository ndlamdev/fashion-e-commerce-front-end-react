/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:21PM - 24/03/2025
 * User: lam-nguyen
 **/
import LoginRequest from "@/domain/resquest/login.request.ts";

type RegisterRequest = LoginRequest & {
	phone: string;
	full_name: string;
	confirm_password: string;
};

export default RegisterRequest;
