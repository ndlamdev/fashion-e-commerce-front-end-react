import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import ProductResponseType from "@/types/product/productResponse.type.ts";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { CollectionEnum } from "@/utils/enums/collection.enum.ts";
import { CollectionType } from "@/types/collection/category.type.ts";

export const BASE_COLLECTION_URL = import.meta.env.VITE_BASE_PRODUCT_URL + "/collection/v1";
const baseQuery = fetchBaseQuery({
	baseUrl: BASE_COLLECTION_URL,
});

export const collectionApi = createApi({
	reducerPath: "collectionApi",
	baseQuery: baseQuery,
	endpoints: (build) => ({
		getProductByCollectionId: build.query<ApiResponse<ApiPageResponse<ProductResponseType[]>>, {id: string | undefined, page?: number | undefined, size?: number | undefined}>({
			query: ({id, size = 8, page = 0}) => ({
				url: `/${id}/products?size=${size}&page=${page}`,
			}),
		}),
		getProductByCollectionType: build.query<ApiResponse<ApiPageResponse<ProductResponseType[]>>, {type: CollectionEnum | undefined, page?: number | undefined, size?: number | undefined}>({
			query: ({type = CollectionEnum.MALE, page = 0, size = 8} ) => ({
				url: `/type/${type}/products?size=${size}&page=${page}`,
			}),
		}),
		getCollections: build.query<ApiResponse<Record<CollectionEnum, CollectionType[]>>, void>({
			query: () => ({
				url: ``,
			}),
		}),
	}),
});

export const { useGetProductByCollectionIdQuery, useGetProductByCollectionTypeQuery, useGetCollectionsQuery } = collectionApi;
