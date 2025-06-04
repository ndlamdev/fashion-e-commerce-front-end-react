import { OrderColumn } from "@/components/dataTable/dataColumns/order.column.tsx";

export const mockPayments: OrderColumn[] = [
	{
		order_number: 1001,
		date: [2025, 5, 20],
		customer_name: "Alice Nguyen",
		status: "CANCEL",
		total: 150.75,
		email: "alice.nguyen@example.com"
	},
	{
		order_number: 1002,
		date: [2025, 5, 21],
		customer_name: "Bob Tran",
		status: "PENDING",
		total: 89.50,
		email: "bob.tran@example.com"
	},
	{
		order_number: 1003,
		date: [2025, 5, 19],
		customer_name: "Charlie Le",
		status: "SHIPPING",
		total: 120.00,
		email: "charlie.le@example.com"
	},
	{
		order_number: 1004,
		date: [2025, 5, 22],
		customer_name: "Diana Pham",
		status: "COMPLETED",
		total: 220.00,
		email: "diana.pham@example.com"
	},
	{
		order_number: 1005,
		date: [2025, 5, 23],
		customer_name: "Ethan Hoang",
		status: "PAYMENT",
		total: 75.25,
		email: "ethan.hoang@example.com"
	},
	{
		order_number: 1006,
		date: [2025, 5, 24],
		customer_name: "Fiona Vo",
		status: "PENDING",
		total: 310.40,
		email: "fiona.vo@example.com"
	},
	{
		order_number: 1007,
		date: [2025, 5, 18],
		customer_name: "George Dang",
		status: "PENDING",
		total: 99.99,
		email: "george.dang@example.com"
	},
	{
		order_number: 1008,
		date: [2025, 5, 17],
		customer_name: "Hannah Bui",
		status: "SHIPPING",
		total: 45.00,
		email: "hannah.bui@example.com"
	},
	{
		order_number: 1009,
		date: [2025, 5, 25],
		customer_name: "Ivan Ngo",
		status: "SHIPPING",
		total: 199.95,
		email: "ivan.ngo@example.com"
	},
	{
		order_number: 1010,
		date: [2025, 5, 26],
		customer_name: "Jenny Mai",
		status: "COMPLETED",
		total: 130.00,
		email: "jenny.mai@example.com"
	}
];