import ProductResponseType from "@/domain/response/product.response";

type ProductCardProp = ProductResponseType & {
	className?: string;
};

export default ProductCardProp;
