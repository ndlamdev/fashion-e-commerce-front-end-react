import { AddressShippingType } from "../../../types/profile/address.type";

export type AddAddressRequest = Omit<AddressShippingType, 'id'> & {}