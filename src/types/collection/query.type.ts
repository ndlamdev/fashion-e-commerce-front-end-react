import { CollectionEnum } from "@/utils/enums/collection.enum.ts";

export type QueryType = {
	cid?: string | null;
	type?: CollectionEnum | string | null;
	prompt?: string | null;
	title?: string | null;
	page?: string | null;
	size?: string | null;
	tag?: string;
	direction?: string;
	colors?: string | null;
	sizes?: string[] | null;
};
