import { ProductModelType } from "@/types/product/productModels.type.ts";

export type GiftProps = {
	id: number;
	name: string;
	promotion: number;
	models: ProductModelType ;
};
