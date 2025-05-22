import { CollectionEnum } from "@/utils/enums/collection.enum.ts";

export type CollectionType = {
	id: string;
	type: CollectionEnum | string
	title: string;
	products?: string[]
}

