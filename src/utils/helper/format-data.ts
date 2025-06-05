/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:48AM - 13/03/2025
 * User: lam-nguyen
 **/

export const formatCurrency = (price: number) =>
	new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(price);

export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat("vi", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(date);

export const formatDateTime = (date: Date) =>
	new Intl.DateTimeFormat("vi", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(date);

export const formatDateFromString = (date: string) => {
	if (date.includes("-")) {
		date = date.split("-").join("/");
	}

	const [day, month, year] = date.split("/").map(Number);
	const dateObj = new Date(year, month - 1, day);
	return formatDate(dateObj);
};

export const formatDateFromArray = (date: number[]) => {
	if (date.length !== 3) return formatDate(new Date());
	const dateObj = new Date(date[0], date[1] - 1, date[2]);
	return formatDate(dateObj);
};

export const formatDateTimeFromArray = (date: number[]) => {
	if (date.length !== 6) return formatDate(new Date());
	const dateObj = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
	return formatDate(dateObj);
};

export default { formatCurrency, formatDate, formatDateFromArray, formatDateFromString, formatDateTimeFromArray };
