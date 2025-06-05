import { AddressType } from "@/types/profile/address.type.ts";

function getAllCities(data: AddressType[]): string[] {
	return [...new Set(data.map((item) => item.city))].sort();
}

function getDistrictsByCity(data: AddressType[] | undefined, city: string): string[] {
	return [...new Set(data?.filter((item) => item.city === city).map((item) => item.district))].sort();
}

function getWardsByCityAndDistrict(data: AddressType[] | undefined, city: string, district: string): string[] {
	return [...new Set(data?.filter((item) => item.city === city && item.district === district).map((item) => item.ward))].sort();
}

function getCityCode(data: AddressType[] | undefined, city: string): string | null {
	const item = data?.find((item) => item.city === city);
	return item ? item.city_code : null;
}

function getDistrictId(data: AddressType[] | undefined, city: string, district: string): string | null {
	const item = data?.find((item) => item.city === city && item.district === district);
	return item ? item.district_id : null;
}

function getWardId(data: AddressType[] | undefined, city: string, district: string, ward: string): string | null {
	const item = data?.find((item) => item.city === city && item.district === district && item.ward === ward);
	return item ? item.ward_id : null;
}

export { getAllCities, getCityCode, getDistrictsByCity, getDistrictId, getWardsByCityAndDistrict, getWardId };
