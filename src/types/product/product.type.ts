import { ProductModelType } from "@/types/product/productModels.type.ts";

type ProductType = {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  models: ProductModelType[];
  material?: string;
  numStars?: number,
  numComments?: number,
  discount?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  label?: string | undefined;
  attachGiftThumbnail?: string | undefined;
  attachGift?: ProductType;
}
export default ProductType;