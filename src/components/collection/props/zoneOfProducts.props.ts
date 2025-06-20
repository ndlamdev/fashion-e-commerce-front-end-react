import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import ProductResponseType from "@/domain/response/product.response";

export type ZoneOfProductsProps = {
	page: ApiPageResponse<ProductResponseType> | undefined;
};
