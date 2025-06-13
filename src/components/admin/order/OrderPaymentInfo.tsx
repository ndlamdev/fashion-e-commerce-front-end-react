import { FC, memo, useMemo } from "react";
import { OrderPaymentInfoProp } from "@/components/admin/order/props/orderPament.prop.ts";
import { formatCurrency } from "@/utils/helper/format-data.ts";

const OrderPaymentInfo: FC<OrderPaymentInfoProp> = memo((props: OrderPaymentInfoProp) => {
	const subTotal: number = useMemo(() => (props.productItems?.reduce((previousValue, currentValue) => previousValue + (currentValue.regular_price * currentValue.quantity), 0)), [props.productItems])
	return (
		<div className="grid grid-cols-3 p-2 rounded-lg border border-neutral-500 text-neutral-500 text-xs sm:text-sm">
			<div className="">
				<p>Subtotal</p><p>Discount</p><p>Shipping fee</p><p>Method</p><p className={"font-bold"}>Total</p>
			</div>
			<div className="">
				<p>{props.productItems?.length} item</p>
				<p>{props.discount?.percent ?? "__"}</p>
			</div>
			<div className="place-items-end">
				<p>{formatCurrency(subTotal)}</p>
				<p>{formatCurrency(props.discount?.percent ? props.discount?.percent * subTotal : 0)}</p>
				<p>{formatCurrency(props.shippingFee)}</p>
				<p>{props.paymentMethod}</p>
				<p>{formatCurrency(subTotal + props.shippingFee - (props.discount?.percent && props.discount?.percent * subTotal))}</p>
			</div>
		</div>
	);
});

export default OrderPaymentInfo;