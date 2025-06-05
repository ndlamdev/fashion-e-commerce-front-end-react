import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import ProductResponseType from "@/types/product/productResponse.type.ts";

export type ZoneOfProductsProps = {
	page: ApiPageResponse<ProductResponseType> | undefined;
};
