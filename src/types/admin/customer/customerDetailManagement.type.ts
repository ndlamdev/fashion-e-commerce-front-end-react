import { CustomerManagementType } from "@/types/admin/customer/customerManagement.type.ts";
import { AddressShippingType } from "@/types/profile/address.type.ts";
import { OrderManagementType } from "@/types/admin/order/orderManagement.type.ts";

export type CustomerDetailManagementType = CustomerManagementType & {
	customer_since: number; // thời gian tạo tài khoản cho đến hiện tại
	rfm_group: string;
	email?: string;
	phone?: string;
	address_default?: AddressShippingType
	order_list?: OrderManagementType[] //TODO: chỉnh lại
	addresses_shipping?: AddressShippingType[]
}