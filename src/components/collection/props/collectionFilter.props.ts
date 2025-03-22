import { CategoryType } from "@/types/collection/category.type.ts";
import { ProductModelType } from "@/types/product/productModels.type.ts";

export type CollectionFilterProps = {
  color: Pick<ProductModelType, 'name' | 'codeColor'>[],
  size: string[],
  categoryGroup?: CategoryType[],
  material?: string[],
  fitWith?: string[]
}