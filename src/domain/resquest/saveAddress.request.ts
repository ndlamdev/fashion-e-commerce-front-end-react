import { AddressShippingType } from "../../types/profile/address.type";

export type SaveAddressRequest = Omit<AddressShippingType, 'id'> & {
	id?: number
}