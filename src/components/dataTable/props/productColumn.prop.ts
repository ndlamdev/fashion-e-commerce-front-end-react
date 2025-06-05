import { ProductVariantsType } from "@/types/product/productVariants.type.ts";
import { DiscountType } from "@/types/product/product.type.ts";
import ProductImageType from "@/types/product/productImage.type.ts";

export type ProductColumnProp = ProductVariantsType & Pick<DiscountType, 'percent'> & Pick<ProductImageType, "src"> & {
	onInputChange: (updater: (item: ProductColumnProp, index: number) => ProductColumnProp) => void;
}