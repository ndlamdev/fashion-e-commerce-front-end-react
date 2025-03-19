import ProductType from "@/types/product/product.type.ts";

type ProductCardProp = ProductType & {
	className?: string;
};

export default ProductCardProp;
