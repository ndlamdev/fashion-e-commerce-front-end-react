/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:25 PM - 18/04/2025
 * User: kimin
 **/
import { GenderType } from "@/types/profile/profile.type.ts";

type UserDto = {
	id: number;
	full_name: string;
	email: string;
	avatar: string;
	phone: string;
	gender: GenderType;
	birthday: number[];
	height: number;
	weight: number;
	country_code: string;
	create_at: number[];
};

export default UserDto;
