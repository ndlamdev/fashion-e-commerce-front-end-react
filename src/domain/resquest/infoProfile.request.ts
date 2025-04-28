import { CustomerType } from "@/types/profile/customer.type.ts";

export type InfoProfileRequest = Omit<CustomerType, 'email'> & {}