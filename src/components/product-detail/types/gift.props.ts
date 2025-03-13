import { ModelProductProps } from "@/components/card-product/types/modelProduct.props.ts";

export type GiftProps = {
  id: number;
  name: string;
  promotion: number;
  models: ModelProductProps
}