import { DiscountType } from "@/types/product/product.type.ts";
import paymentEnum from "@/utils/enums/payment.enum.ts";
import { ProductProp } from "@/components/dataTable/props/product.prop.tsx";

export type OrderPaymentInfoProp = {
	productItems: ProductProp[],
	shippingFee: number;
	paymentMethod: paymentEnum;
	discount?: DiscountType;
}