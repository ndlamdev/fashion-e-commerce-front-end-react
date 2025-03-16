import { ProductModelProps } from "@/components/card-product/types/productModel.props.ts";

export type GiftProps = {
  id: number;
  name: string;
  promotion: number;
  models: ProductModelProps
}