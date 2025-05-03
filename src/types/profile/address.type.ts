export type AddressShippingType= AddressType & {
	id: number
	full_name: string
	phone: string
	// country: string
	// countryCode: string
	active: boolean
	street?: string
}

export type AddressType = {
	city: string
	city_code: string
	district: string
	district_code: string
	ward: string
	ward_code: string
}

// api address
// https://www.coolmate.me/json/treeVN.min.json