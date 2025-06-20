import ProductResponseType from "@/domain/response/product.response";

type ProductResponseProp = ProductResponseType & {
	className?: string;
};

export default ProductResponseProp;
