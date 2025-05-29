/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:30PM - 24/03/2025
 * User: lam-nguyen
 **/
import NewPasswordRequest from "@/domain/resquest/newPassword.request.ts";

type ChangePasswordRequest = Omit<NewPasswordRequest, "token"> & {
	old_password: string;
};

export default ChangePasswordRequest;
