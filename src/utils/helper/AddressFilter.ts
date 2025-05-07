import { AddressType } from "@/types/profile/address.type.ts";

type CityInfo = { city: string; city_code: string };
type DistrictInfo = { district: string; district_id: string };
type WardInfo= { ward: string; ward_id: string };

const getCities = (addresses: AddressType[]): CityInfo[] => {
	const map = new Map<string, CityInfo>();

	for (const { city, city_code } of addresses) {
		if (!map.has(city_code)) {
			map.set(city_code, { city, city_code });
		}
	}

	return Array.from(map.values());
};

const getDistricts = (
	addresses: AddressType[],
	cityCode?: string | null
): DistrictInfo[] => {
	if (!cityCode) return [];

	const districtMap = new Map<string, DistrictInfo>();

	for (const { city_code, district, district_id } of addresses) {
		if (city_code === cityCode && !districtMap.has(district_id)) {
			districtMap.set(district_id, { district, district_id });
		}
	}

	return Array.from(districtMap.values());
};

const getWards = (
	addresses: AddressType[],
	cityCode?: string | null,
	districtCode?: string | null
): WardInfo[] => {
	if (!cityCode || !districtCode) return [];

	const wardMap = new Map<string, WardInfo>();

	for (const { city_code, district_id, ward, ward_id } of addresses) {
		if (
			city_code === cityCode &&
			district_id === districtCode &&
			!wardMap.has(ward_id)
		) {
			wardMap.set(ward_id, { ward, ward_id });
		}
	}

	return Array.from(wardMap.values());
};


export {getCities, getDistricts, getWards};