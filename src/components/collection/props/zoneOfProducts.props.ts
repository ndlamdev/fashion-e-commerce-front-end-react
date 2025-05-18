import { CollectionType } from "@/types/collection/category.type.ts";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import ProductResponseType from "@/types/product/productResponse.type.ts";

export type ZoneOfProductsProps = {
	collection: CollectionType;
	page: ApiPageResponse<ProductResponseType[]> | undefined;
};
