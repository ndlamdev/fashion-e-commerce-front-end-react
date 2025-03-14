import { ModelProductProps } from "@/components/card-product/types/modelProduct.props.ts";

type ProductCardProp = {
  name: string,
  originPrice: number,
  percentDiscount: number,
  numStars: number,
  numComments: number,
  label : string, // tempt
  models: ModelProductProps[],
  attachBonusUrl: string | undefined,
  onClick: () => void ,
}

export default ProductCardProp