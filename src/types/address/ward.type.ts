/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:33 AM - 18/05/2025
 * User: Administrator
 **/
import ProvinceType from "@/types/address/province.type.ts";

type WardType = Omit<ProvinceType, "phone_code"> & {
	district_code: number;
};

export default WardType;
