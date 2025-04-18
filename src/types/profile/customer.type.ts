import { AddressType } from "@/types/profile/address.type.ts";

export type CustomerType = {
	fullName: string
	phone: string
	email: string
	gender?: string
	birthday?: string
	levelClub?: string
	height?: string
	weight?: string
	addresses?: AddressType[]
	discountCodeBirthday?: string
	isUpLevelRanking?: boolean
}