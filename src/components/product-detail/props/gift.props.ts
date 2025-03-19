import { ProductModelProps } from "@/components/card-product/props/productModel.props.ts";

export type GiftProps = {
	id: number;
	name: string;
	promotion: number;
	models: ProductModelProps;
};
