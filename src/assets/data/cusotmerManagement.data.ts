import { CustomerDetailManagementType } from "@/types/admin/customer/customerDetailManagement.type.ts";

export const CustomerManagementData: CustomerDetailManagementType = {
	full_name: 'phong',
	amount_spent: 10,
	email_subscribed: 'email',
	orders: 2,
	location: 'Binh thuan',
	id: 1,
	address_default: {full_name: 'Lamhongphong', phone: '0123456789', country_code: 'VN', active: true, city_code: '1', city: 'Hanoi', id: 12, ward_id: '2', ward: 'ward', district_id: '13', district: 'distric', street: 'so nha 12'},
	customer_since: 2,
	phone: '012345678',
	email: 'giotrang124@gmail.com',
	order_list: [],
	rfm_group: 'analytics',
}