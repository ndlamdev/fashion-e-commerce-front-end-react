/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:49AM - 30/03/2025
 * User: lam-nguyen
 **/
import UserDto from "@/domain/dto/user.dto.ts";

type LoginResponse = {
	"access-token": string;
	user: UserDto;
};

export default LoginResponse;
