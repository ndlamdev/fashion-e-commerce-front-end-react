import { AddressShippingType } from "@/types/profile/address.type.ts";

export type CustomerType = {
	fullName: string
	phone: string
	email: string
	gender?: GenderType
	birthday?: number[]
	levelClub?: string
	height?: string
	weight?: string
	addresses?: AddressShippingType[]
	discountCodeBirthday?: string
	isUpLevelRanking?: boolean
}

export enum GenderType {
	MALE = "MALE",
	FEMALE = "FEMALE",
	OTHER = "OTHER",
}