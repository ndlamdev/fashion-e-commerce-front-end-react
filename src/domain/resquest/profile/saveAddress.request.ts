import { AddressShippingType } from "@/types/profile/address.type.ts";

export type SaveAddressRequest = Omit<AddressShippingType, "id"> & {
  id?: number
}