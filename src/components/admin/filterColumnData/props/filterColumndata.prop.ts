import { CustomerSortEnum } from "@/utils/enums/admin/sort/customerSort.enum.ts";
import { OrderSortEnum } from "@/utils/enums/admin/sort/orderSort.enum.ts";

export type FilterColumnDataProps = {
	sortEnum: CustomerSortEnum | OrderSortEnum;
	placeholderInput?: string;
	infoData?: string
	DirectionSortBy?: unknown
}