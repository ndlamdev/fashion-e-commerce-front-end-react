/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:00AM - 14/03/2025
 * User: lam-nguyen
 **/
import { CartItemProps } from "@/components/cart/CartItem.tsx";

const dataCartItems: CartItemProps[] = [
	{
		id: 1,
		name: "Áo Singlet nữ chạy bộ Core Tank",
		image:
			"https://media3.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/March2025/ao-singlet-nu-chay-bo-core-tee-sieu-nhe-0_-hong_lotus.jpg",
		size: "L",
		color: "Hồng Lotus",
		amount: 100000,
		price: 189000,
		discount: 168000,
		colors: ["Hồng", "Tím", "Vàng"],
		sizes: ["XS", "S", "M", "L", "XL"],
	},
];

export default dataCartItems;
