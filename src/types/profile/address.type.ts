export type AddressShippingType = AddressType & {
	id: number
	full_name: string
	phone: string
	country_code: string
	active: boolean
	street?: string
}

export type AddressType = {
	city: string
	city_code: string
	district: string
	district_id: string
	ward: string
	ward_id: string
}

// api address
// https://www.coolmate.me/json/treeVN.min.json