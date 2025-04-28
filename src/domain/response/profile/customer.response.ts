import { CustomerType } from "@/types/profile/customer.type.ts";

export type CustomerResponse = Omit<CustomerType, 'discountCodeBirthday' | 'addresses' | 'isUpLevelRanking' | 'levelClub'> & {
}