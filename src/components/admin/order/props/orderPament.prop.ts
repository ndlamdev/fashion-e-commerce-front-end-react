import { DiscountType } from "@/types/product/product.type.ts";
import paymentEnum from "@/utils/enums/payment.enum.ts";
import { ProductColumn } from "@/components/dataTable/dataColumns/product.column.tsx";

export type OrderPaymentInfoProp = {
	productItems: ProductColumn[],
	shippingFee: number;
	paymentMethod: paymentEnum;
	discount?: DiscountType;
}