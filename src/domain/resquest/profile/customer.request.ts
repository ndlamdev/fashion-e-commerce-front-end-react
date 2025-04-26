import { CustomerType } from "../../../types/profile/customer.type";

export type CustomerRequest = Omit<CustomerType, 'discountCodeBirthday' | 'addresses' | 'isUpLevelRanking' | 'levelClub'> & {
}