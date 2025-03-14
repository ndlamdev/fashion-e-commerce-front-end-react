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

export const formatDate = (date: Date) => new Intl.DateTimeFormat("vi", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);

export default { formatCurrency, formatDate };
