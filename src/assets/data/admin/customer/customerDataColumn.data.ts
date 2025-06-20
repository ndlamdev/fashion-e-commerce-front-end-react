import { CustomerColumnProp } from "@/components/dataTable/props/customerColumn.prop.ts";

export const customers: CustomerColumnProp[] = [
	{
		id: 1,
		name: "Alice Johnson",
		create_at: [2023, 5, 12],
		location: "New York",
		no_orders: 12,
		amount_spent: 1250.00,
		is_locked: false
	},
	{
		id: 2,
		name: "Bob Smith",
		create_at: [2022, 11, 3],
		location: "Los Angeles",
		no_orders: 5,
		amount_spent: 430.00,
		is_locked: false
	},
	{
		id: 3,
		name: "Charlie Nguyen",
		create_at: [2024, 1, 20],
		location: "Chicago",
		no_orders: 8,
		amount_spent: 780.50,
		is_locked: false
	},
	{
		id: 4,
		name: "Diana Lee",
		create_at: [2023, 8, 9],
		location: "Houston",
		no_orders: 15,
		amount_spent: 2100.00,
		is_locked: false
	},
	{
		id: 5,
		name: "Edward Kim",
		create_at: [2023, 3, 17],
		location: "San Francisco",
		no_orders: 3,
		amount_spent: 320.99,
		is_locked: false
	},
	{
		id: 6,
		name: "Fatima Zahra",
		create_at: [2022, 7, 25],
		location: "Seattle",
		no_orders: 18,
		amount_spent: 3150.75,
		is_locked: false
	},
	{
		id: 7,
		name: "George Wilson",
		create_at: [2023, 10, 1],
		location: "Miami",
		no_orders: 9,
		amount_spent: 940.00,
		is_locked: false
	},
	{
		id: 8,
		name: "Hannah Brown",
		create_at: [2024, 2, 14],
		location: "Denver",
		no_orders: 6,
		amount_spent: 610.25,
		is_locked: false
	},
	{
		id: 9,
		name: "Ivan Petrov",
		create_at: [2023, 6, 30],
		location: "Boston",
		no_orders: 11,
		amount_spent: 1470.00,
		is_locked: false,
	},
	{
		id: 10,
		name: "Julia Martínez",
		create_at: [2022, 12, 5],
		location: "Phoenix",
		no_orders: 7,
		amount_spent: 725.00,
		is_locked: true
	}
];
