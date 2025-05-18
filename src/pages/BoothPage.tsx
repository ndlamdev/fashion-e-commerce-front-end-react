import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";
import { mockCollectionFilters } from "@/assets/data/collection/collectionFileterProp.data.ts";
import CollectionFilter from "@/components/collection/CollectionFilter.tsx";
import ZoneOfProducts from "@/components/collection/ZoneOfProducts.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import CategoryDescription from "@/components/collection/CategoryDescription.tsx";
import { categoryDescriptionSamples } from "@/assets/data/collection/categoryDescription.data.ts";
import { useLocation, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import RecentActivity from "@/components/collection/RecentActivity.tsx";
import { useSearchByImageMutation } from "@/services/product.service.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useGetProductByCollectionIdQuery, useGetProductByCollectionTypeQuery } from "@/services/collection.service.ts";
import ProductResponseType from "@/types/product/productResponse.type.ts";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { CollectionEnum } from "@/utils/enums/collection.enum.ts";

export default function BoothPage() {
	const location = useLocation();
	const { file, prompt } = location.state || { file: undefined, prompt: undefined };
	const [data, setData] = useState<ApiPageResponse<ProductResponseType[]> | undefined
	>();
	const filters: CollectionFilterProps = mockCollectionFilters;
	const sportDescriptions = categoryDescriptionSamples;
	const [requestImageSearch, { isLoading: isLoadingImageSearch }] = useSearchByImageMutation();
	const [searchParams] = useSearchParams();
	const {
		data: productsOfId,
		isLoading: isLoadingPOI,
	} = useGetProductByCollectionIdQuery({cid: searchParams.get('cid'), page: searchParams.get('page')}, { skip: !searchParams.get('cid')});

	const {
		data: productsOfType,
		isLoading: isLoadingPOT,
	} = useGetProductByCollectionTypeQuery({type: searchParams.get('type') ?? CollectionEnum.MALE, page: searchParams.get('page')} , {skip: searchParams.get('cid') !== null});
	console.log(searchParams.get('page'), productsOfType);

	useEffect(() => {
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);
		requestImageSearch(formData).unwrap().then((res) => {
			setData(res.data);
		});
	}, [file, requestImageSearch]);

	useEffect(() => {
		if (!prompt) return;
		// TODO: Hiện thực chức năng tìm kiếm vằn bảng hoặc tìm kiếm bằng giọng nói tại đây. Chỉ cần gửi prompt lên server
		console.log(prompt);
	}, [prompt]);

	useEffect(() => {
		setData(productsOfId?.data);
	}, [productsOfId]);
  useEffect(() => {
    setData(productsOfType?.data);
  }, [productsOfType]);
	return (
		<main>
			<div className="p-3 sm:flex">
				<div className="hidden sm:block sm:w-1/4">
					<CollectionFilter {...filters} />
				</div>
				<div className="sm:w-3/4">
					<ScrollArea className={"h-dvh"}>
						{(isLoadingPOI || isLoadingPOT || isLoadingImageSearch) ? <Skeleton className={"w-full h-full"} /> :
							<ZoneOfProducts collection={{type: searchParams.get('type') ?? '', id: searchParams.get('cid') ?? '', title: searchParams.get('type')?.toUpperCase() ?? '' }} page={data} />
						}
					</ScrollArea>
				</div>
			</div>
			<CategoryDescription {...sportDescriptions} />
			<section className={"px-5 md:px-10 md:py-10 lg:px-15 lg:py-14"}>
				<RecentActivity />
			</section>
		</main>
	);
}
