import { ModelProductProps } from "@/components/card-product/types/modelProduct.props.ts";

type ProductCardProp = {
  name: string,
  originPrice: number,
  numStars: number,
  numComments: number,
  models: ModelProductProps[],
  onClick: () => void ,
  label? : string | undefined,
  attachBonusUrl?: string | undefined,
  percentDiscount?: number,
  description?: string | undefined,
}

export default ProductCardProp