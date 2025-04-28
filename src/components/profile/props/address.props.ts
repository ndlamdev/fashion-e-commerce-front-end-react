import { AddressType } from "@/types/profile/address.type.ts";

export type AddressProps = AddressType & {
	onEdit?: () => void;
	onDelete?: () => void;
}