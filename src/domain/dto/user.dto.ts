/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:25 PM - 18/04/2025
 * User: kimin
 **/

type UserDto = {
	id: number;
	full_name: string;
	avatar: string;
	phone: string;
	gender: string;
	birthday: number[];
	height: number;
	weight: number;
	country_code: string;
};

export default UserDto;
