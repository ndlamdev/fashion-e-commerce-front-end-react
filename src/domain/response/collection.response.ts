import { CollectionEnum } from "@/utils/enums/collection.enum";

type CollectionResponse = {
	id: string;
	title: string;
	type: CollectionEnum;
	total_products: number;
	create_at: Date;
	lock: boolean;
};

export default CollectionResponse;
