import ProductDetailProp from "@/components/product-detail/props/productDetail.prop.ts";

export type ZoneOfProductsProps = {
	currentCategory: string;
	showProducts: ProductDetailProp[] | undefined;
	parentCategory?: string;
	TotalProducts: number | undefined;
};
