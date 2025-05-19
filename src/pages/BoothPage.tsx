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
import { useQuickSearchQuery, useSearchByImageMutation, useSearchByTextQuery } from "@/services/product.service.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useGetProductByCollectionIdQuery, useGetProductByCollectionTypeQuery } from "@/services/collection.service.ts";
import ProductResponseType from "@/types/product/productResponse.type.ts";
import { ApiPageResponse } from "@/domain/ApiPageResponse.ts";
import { LoaderIcon } from "lucide-react";
import { CollectionEnum } from "@/utils/enums/collection.enum.ts";

export default function BoothPage() {
	const [searchParams] = useSearchParams();
	const queryObj = Object.fromEntries(searchParams.entries()); // get all key-value
	const location = useLocation();
	const { file, prompt, name } = location.state || { file: undefined, prompt: undefined, name: undefined };
	const [data, setData] = useState<ApiPageResponse<ProductResponseType[]> | undefined>();
	const filters: CollectionFilterProps = mockCollectionFilters;
	const sportDescriptions = categoryDescriptionSamples;
	const [requestImageSearch, {
		isLoading: isLoadingImageSearch,
		isError: isErrorImageSearch,
		data: dataImageSearch,
	}] = useSearchByImageMutation();

	const {
		data: productsOfId,
		isLoading: isLoadingPOI,
	} = useGetProductByCollectionIdQuery({
		...queryObj
	}, { skip: !queryObj["cid"] });

	const {
		data: productsOfType,
		isLoading: isLoadingPOT,
	} = useGetProductByCollectionTypeQuery({
		...queryObj
	}, { skip: !!queryObj["cid"] });


	// const {
	// 	data: dataVoiceSearch,
	// 	isLoading: isLoadingVoiceSearch,
	// 	isError: isErrorVoiceSearch,
	// } = useVoiceSearchQuery(prompt, { skip: !prompt });
	const {
		data: dataSearchByText,
		isLoading: isLoadingSearchByText,
		isError: isErrorSearchByText,
	} = useSearchByTextQuery({ ...queryObj, prompt: prompt }, { skip: !prompt });

	console.log('booth render', name);

	useEffect(() => {
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);
		requestImageSearch(formData).unwrap().then((res) => {
			if(res.code >= 400) return;
			setData(res.data);
		}).catch((err) => {
			console.log(err);
			setData(undefined);
		})
	}, [dataImageSearch, file, requestImageSearch]);

	useEffect(() => {
		if (!prompt) return;
		console.log(prompt);
		setData(dataSearchByText?.data);
	}, [prompt, dataSearchByText]);

	useEffect(() => {
		setData(productsOfId?.data);
		if(queryObj['cid']) return
		setData(productsOfType?.data);
		console.log('click type');
	}, [productsOfId, productsOfType, queryObj]);

	return (
		<main>
			<div className="p-3 sm:flex">
				<div className="hidden sm:block sm:w-1/4">
					<CollectionFilter {...filters} />
				</div>
				<div className="sm:w-3/4">
					<ScrollArea className={"h-dvh"}>
						{(isErrorImageSearch || isErrorSearchByText) ?
							<p className={"text-red-500 text-center"}>Lỗi tìm kiếm bằng {file} {prompt} {queryObj["query"]}</p> :
							((isLoadingPOI || isLoadingPOT || isLoadingImageSearch  || isLoadingSearchByText) ?
								<Skeleton className={"w-full h-screen place-content-center place-items-center items-center"}>
									<LoaderIcon className={"text-gray-600 size-10"} /></Skeleton> :
								<ZoneOfProducts collection={{
									type: queryObj["type"] ?? CollectionEnum.MALE,
									title: name,
								}} page={data} />)
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
