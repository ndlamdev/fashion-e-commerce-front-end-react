import { AddressType } from "@/types/profile/address.type.ts";

export type CustomerType = {
	fullName: string
	phone: string
	email: string
	gender?: GenderType
	birthday?: Date
	levelClub?: string
	height?: string
	weight?: string
	addresses?: AddressType[]
	discountCodeBirthday?: string
	isUpLevelRanking?: boolean
}

export enum GenderType {
	Male = "Male",
	Female = "Female",
	Other = "Other",
}