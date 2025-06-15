import ProductCardProp from "@/components/card-product/props/productCard.prop";

export type ProductColumnProp = ProductCardProp & {
	onInputChange: (updater: (item: ProductCardProp, index: number) => ProductCardProp) => void;
};
