import { CustomerDetailManagementType } from "@/types/admin/customer/customerDetailManagement.type.ts";

export type InfoCustomerProp = CustomerDetailManagementType & {
	no_order?: number;
	hidden_no_order?: boolean;
};