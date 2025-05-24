/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:33 AM - 18/05/2025
 * User: Administrator
 **/
import ProvinceType from "@/types/address/province.type.ts";
import WardType from "@/types/address/ward.type.ts";

type DistrictType = Omit<ProvinceType, "phone_code"> & {
	province_code: number;
	wards: WardType[]
};

export default DistrictType;
