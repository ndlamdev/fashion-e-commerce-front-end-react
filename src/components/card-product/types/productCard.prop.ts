import ProductType from "@/types/product/product.type.ts";

type ProductCardProp = ProductType & {
  onClick: () => void ,
}

export default ProductCardProp