import { CustomerSortEnum } from "@/utils/enums/admin/sort/customerSort.enum.ts";
import { OrderSortEnum } from "@/utils/enums/admin/sort/orderSort.enum.ts";
import { ProductSortEnum } from "@/utils/enums/admin/sort/productItemSort.enum";

export type FilterColumnDataProps = {
	sortEnum: typeof CustomerSortEnum | typeof OrderSortEnum | typeof ProductSortEnum;
	placeholderInput?: string;
	infoData?: string;
	DirectionSortBy?:Record<string, string>;
};
