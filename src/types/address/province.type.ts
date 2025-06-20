/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:33 AM - 18/05/2025
 * User: Administrator
 **/

import DistrictType from "./districtType";

type ProvinceType = {
	name: string;
	code: number;
	division_type: string;
	codename: string;
	phone_code: number;
	districts: DistrictType[];
};

export default ProvinceType;
