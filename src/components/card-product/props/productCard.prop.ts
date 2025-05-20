import ProductResponseType from "@/types/product/productResponse.type.ts";

type ProductCardProp = ProductResponseType & {
	className?: string;
};

export default ProductCardProp;
