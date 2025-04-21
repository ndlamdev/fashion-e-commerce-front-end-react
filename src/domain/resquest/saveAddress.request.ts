import { AddressType } from "@/types/profile/address.type.ts";

export type SaveAddressRequest = Omit<AddressType, 'id'> & {
	id?: number
}