/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:21PM - 24/03/2025
 * User: lam-nguyen
 **/
import LoginRequest from "@/domain/resquest/login.request.ts";

type RegisterRequest = LoginRequest & {
	phoneNumber: string;
	fullName: string;
};

export default RegisterRequest;
