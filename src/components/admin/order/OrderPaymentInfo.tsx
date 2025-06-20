import { OrderPaymentInfoProp } from "@/components/admin/order/props/orderPament.prop.ts";
import { formatCurrency } from "@/utils/helper/format-data.ts";
import { FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

const OrderPaymentInfo: FC<OrderPaymentInfoProp> = memo((props: OrderPaymentInfoProp) => {
	const totalPriceProduct: number = useMemo(() => (props.item_details?.reduce((previousValue, currentValue) => previousValue + (currentValue.compare_price * currentValue.quantity), 0)), [props.item_details])
	const totalRealProduct: number = useMemo(() => (props.item_details?.reduce((previousValue, currentValue) => previousValue + (currentValue.regular_price * currentValue.quantity), 0)), [props.item_details])
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.orders.payment_info"
	});
	return (
		<div className="grid grid-cols-3 p-2 rounded-lg border border-neutral-500 text-neutral-500 text-xs sm:text-sm">
			<div className="">
				<p>{t("subtotal")}</p><p>{t("discount")}</p><p>{t("shipping_fee")}</p><p>Method</p><p className={"font-bold"}>{t("total")}</p>
			</div>
			<div className="">
				<p>{props.item_details?.length} {t("item")}</p>
			</div>
			<div className="place-items-end">
				<p>{formatCurrency(totalPriceProduct)}</p>
				<p>{formatCurrency(totalPriceProduct - totalRealProduct)}</p>
				<p>{formatCurrency(0)}</p>
				<p>{props.payment_response.method}</p>
				<p>{formatCurrency(totalRealProduct)}</p>
			</div>
		</div>
	);
});

export default OrderPaymentInfo;