import { AddressShippingType } from "@/types/profile/address.type.ts";

export type AddAddressRequest = Omit<AddressShippingType, "id"> & {}