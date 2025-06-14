import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import ProductResponseType from "@/domain/response/product.response";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { CollectionEnum } from "@/utils/enums/collection.enum.ts";
import { CollectionType } from "@/types/collection/category.type.ts";
import { QueryType } from "@/types/collection/query.type.ts";

export const BASE_COLLECTION_URL = import.meta.env.VITE_BASE_URL + "/collection/v1";
const baseQuery = fetchBaseQuery({
	baseUrl: BASE_COLLECTION_URL,
});

export const collectionApi = createApi({
	reducerPath: "collectionApi",
	baseQuery: baseQuery,
	endpoints: (build) => ({
		getProductByCollectionId: build.query<ApiResponse<ApiPageResponse<ProductResponseType>>, QueryType>({
			query: ({ cid, size = "12", page = "0", colors, sizes = [], tag, direction }) => ({
				url:
					`/${cid}/products?size=${size}&page=${page}` +
					(colors ? `&colors=${colors}` : "") +
					(sizes?.length ? `&sizes=${sizes?.join(",")}` : "") +
					(tag ? `&sort.tag=${tag}&sort.direction=${direction ?? "ASC"}` : ""),
			}),
		}),
		getProductByCollectionType: build.query<ApiResponse<ApiPageResponse<ProductResponseType>>, QueryType>({
			query: ({ type = CollectionEnum.MALE, page = "0", size = "12", colors, sizes = [], tag, direction }) => ({
				url:
					`/type/${type}/products?size=${size}&page=${page}` +
					(colors ? `&colors=${colors}` : "") +
					(sizes?.length ? `&sizes=${sizes?.join(",")}` : "") +
					(tag ? `&sort.tag=${tag}&sort.direction=${direction ?? "ASC"}` : ""),
			}),
		}),
		getCollections: build.query<ApiResponse<Record<CollectionEnum, CollectionType[]>>, void>({
			query: () => ``,
		}),
	}),
});

export const { useGetProductByCollectionIdQuery, useGetProductByCollectionTypeQuery, useGetCollectionsQuery } = collectionApi;
