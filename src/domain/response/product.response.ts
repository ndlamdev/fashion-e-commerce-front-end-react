import { ProductOptionType } from "@/types/product/productOption.type.ts";
import ProductImageType from "@/types/product/productImage.type.ts";
import { ProductTagType } from "@/types/product/productTag.type.ts";
import { ProductVariantsType } from "@/types/product/productVariants.type.ts";
import { ProductReviewType } from "@/types/product/productReview.type.ts";
import { CollectionEnum } from "@/utils/enums/collection.enum.ts";

type ProductResponseType = {
	id: string;
	collection_id: string;
	display_order: number;
	title: string;
	vendor: string;
	tags: ProductTagType[];
	options: ProductOptionType[];
	images: ProductImageType[];
	available: boolean;
	variants: ProductVariantsType[];
	options_values: ProductOptionType[];
	discount: DiscountType;
	review: ProductReviewType;
	is_lock: boolean;
	create_by: string;
	create_at: number[];
	update_by: string;
	update_at: number[];
	seo_alias: string;
	youtube_video: string;
	coming_soon: boolean;
	display_name_open: string;
	icon_thumbnail?: ProductImageType;
	gender_type?: CollectionEnum;
};

type DiscountType = {
	percent: number;
	start: Date;
	end: Date;
};
export default ProductResponseType;
