import { OptionType, ProductOptionType, ProductOptionValueType } from "@/types/product/productOption.type.ts";
import { ProductImageType } from "@/types/product/productImage.type.ts";
import { ProductTagType } from "@/types/product/productTag.type.ts";
import { ProductVariantsType } from "@/types/product/productVariants.type.ts";
import { ProductReviewType } from "@/types/product/productReview.type.ts";
import { GenderType } from "@/types/profile/customer.type.ts";

type ProductType = {
	id: string;
	collection_id: string
	display_order: number
	title: string
	vendor: string
	tags: ProductTagType[]
	options: OptionType[]
	images: ProductImageType[]
	available: boolean
	variants: ProductVariantsType[]
	options_value: OptionValueType[]
	discount: DiscountType
	review: ProductReviewType
	is_lock: boolean
	create_by: string
	create_at: number[]
	update_by: string
	update_at: number[]
	seo_alias: string
	youtube_video: string
	coming_soon: boolean
	display_name_open: string
	icon_thumbnail: string
	gender_type?: GenderType
};

type DiscountType = {
	percent: number;
	start: Date;
	end: Date;
}
type OptionValueType = {
	title: string;
	type: OptionType
	values: string[]
}
export default ProductType;
