import { OrderSortEnum } from "./sort/orderSort.enum";
import { CustomerSortEnum } from "./sort/customerSort.enum";
import { ProductSortEnum } from "./sort/productSort.enum";
import { CustomerColumnProp } from "../../../components/dataTable/props/customerColumn.prop";
import { OrderColumnProp } from "../../../components/dataTable/props/orderColumn.prop";
import { ProductColumnProp } from "../../../components/dataTable/props/productColumn.prop";

export const columnNameConcealmentRecord: Record<keyof CustomerColumnProp | keyof OrderColumnProp | keyof ProductColumnProp | string, OrderSortEnum | CustomerSortEnum | ProductSortEnum> = {
	 name: CustomerSortEnum.CUSTOMER_NAME,
	location: CustomerSortEnum.LOCATION,
	no_orders: CustomerSortEnum.NO_ORDERS,
	amount_spent: CustomerSortEnum.AMOUNT_SPENT,
	create_at: CustomerSortEnum.CREATE_AT,
	id: OrderSortEnum.ORDER_NUMBER,
	full_name: OrderSortEnum.CUSTOMER_NAME,
	status: OrderSortEnum.STATUS,
	email: OrderSortEnum.EMAIL,
	amount: OrderSortEnum.TOTAL_PRICE,
	date: OrderSortEnum.DATE,
}