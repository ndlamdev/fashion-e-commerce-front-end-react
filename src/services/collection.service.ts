import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/domain/ApiResponse.ts";
import ProductResponseType from "@/types/product/productResponse.type.ts";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { CollectionEnum } from "@/utils/enums/collection.enum.ts";
import { CollectionType } from "@/types/collection/category.type.ts";
import { QueryType } from "@/types/collection/query.type.ts";

export const BASE_COLLECTION_URL = import.meta.env.VITE_BASE_PRODUCT_URL + "/collection/v1";
const baseQuery = fetchBaseQuery({
	baseUrl: BASE_COLLECTION_URL,
});

export const collectionApi = createApi({
	reducerPath: "collectionApi",
	baseQuery: baseQuery,
	endpoints: (build) => ({
		getProductByCollectionId: build.query<ApiResponse<ApiPageResponse<ProductResponseType[]>>, QueryType>({
			query: ({cid, size = '12', page = '0', sort = '', colors = '', sizes = ''}) => ({
				url: `/${cid}/products?size=${size}&page=${page}` + (colors && `&colors=${colors}`) + (sizes && `&sizes=${sizes}`) + (sort && `&sort=${sort}`),
			}),
		}),
		getProductByCollectionType: build.query<ApiResponse<ApiPageResponse<ProductResponseType[]>>, QueryType>({
			query: ({type = CollectionEnum.MALE, page = '0', size = '12', sort = '', colors = '', sizes = ''} ) => ({
				url: `/type/${type}/products?size=${size}&page=${page}` + (colors && `&colors=${colors}`) + (sizes && `&sizes=${sizes}`) + (sort && `&sort=${sort}`),
			}),
		}),
		getCollections: build.query<ApiResponse<Record<CollectionEnum, CollectionType[]>>, void>({
			query: () => ``
		}),
	}),
});

export const { useGetProductByCollectionIdQuery, useGetProductByCollectionTypeQuery, useGetCollectionsQuery } = collectionApi;
