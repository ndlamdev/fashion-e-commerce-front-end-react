import { AddressShippingType } from "@/types/profile/address.type.ts";

export type AddressProps = AddressShippingType & {
	onEdit?: () => void;
	onDelete?: () => void;
}