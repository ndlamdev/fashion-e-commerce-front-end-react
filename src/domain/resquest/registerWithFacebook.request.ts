/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:21PM - 24/03/2025
 * User: lam-nguyen
 **/
import RegisterRequest from "@/domain/resquest/register.request.ts";

type RegisterWithFacebookRequest = Omit<RegisterRequest, "full_name"> & {
	token: string;
};

export default RegisterWithFacebookRequest;
